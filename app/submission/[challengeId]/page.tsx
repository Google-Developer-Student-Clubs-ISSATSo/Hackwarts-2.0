import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import Image from "next/image";

import baroqueBorder from "@/public/baroqueborder.png";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, CheckCircle, Users } from "lucide-react";
import NumberTicker from "@/components/ui/number-ticker";
import { Challenge } from "@/app/models/Challenge";
import { Submission } from "@/app/models/Submission";
import { connectToDatabase } from "@/lib/mongodb";

async function getChallengeDetails(challengeId: string) {
  await connectToDatabase();
  const challenge = await Challenge.findById(challengeId);
  if (!challenge) throw new Error("Challenge not found");
  return challenge;
}

async function getSubmissionCount(challengeId: string) {
  await connectToDatabase();
  return await Submission.countDocuments({ challenge_id: challengeId });
}

const page = async ({ params }: { params: { challengeId: string } }) => {
  const challenge = await getChallengeDetails(params.challengeId);
  const submissionCount = await getSubmissionCount(params.challengeId);

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-[600px] m-6">
        <Button variant="hackwarts" className="mb-10 ">
          <ArrowBigLeft /> Navigate Back to Challenges
        </Button>
        <div className="w-full relative p-10 mb-14 grid grid-cols-2 border-t-2 border-b-2 border-yellow-500">
          <Image
            src={baroqueBorder}
            alt="Baroque border"
            className="absolute -top-4 -left-2 h-12 w-auto"
          />
          <Image
            src={baroqueBorder}
            alt="Baroque border"
            className="absolute h-12 w-auto -bottom-4 -left-2 -scale-y-100"
          />
          <Image
            src={baroqueBorder}
            alt="Baroque border"
            className="absolute h-12 w-auto -top-4 -right-2 -scale-x-100"
          />
          <Image
            src={baroqueBorder}
            alt="Baroque border"
            className="absolute h-12 w-auto -bottom-4 -right-2 -scale-y-100 -scale-x-100"
          />
          <div>
            <h1 className="text-4xl font-bold text-harryp">{challenge.name}</h1>
            <p className="text-lg">{challenge.description}</p>
            <p className="text-lg font-bold mt-2">Prize: {challenge.prize}</p>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/challengetestimage.png"
              alt="Challenge Image"
              className="w-40"
            />
          </div>
        </div>
        <div className="mt-4 text-2xl text-center mb-6 text-harryp flex items-center justify-center gap-1">
          <Users />{" "}
          <NumberTicker className="text-copper" value={submissionCount} /> Teams
          Submitted
        </div>
        <h1 className="text-4xl font-bold text-harryp">Project Submission</h1>
        <div className="mb-4">
          <Label className="text-sunset">Github Repository</Label>
          <Input
            placeholder="e.g https://www.github.com/username/myproject"
            className="bg-white"
          />
        </div>
        <div className="mb-4">
          <Label className="text-sunset">Deployment URL (Optional)</Label>
          <Input
            placeholder="e.g https://www.example.com"
            className="bg-white"
          />
        </div>
        <Button
          variant="hackwarts"
          className="w-full hover:scale-100 font-bold"
        >
          Submit Project <CheckCircle />
        </Button>
      </div>
    </div>
  );
};

export default page;
