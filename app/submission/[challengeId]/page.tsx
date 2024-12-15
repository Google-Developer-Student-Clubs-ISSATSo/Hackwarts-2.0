import { Challenge } from "@/app/models/Challenge";
import { Submission } from "@/app/models/Submission";
import { connectToDatabase } from "@/lib/mongodb";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { SubmitForm } from "./submit-form";
import getServerSession from "next-auth"
import {config} from "@/app/auth.config"
async function getChallengeDetails(challengeId: string) {
  await connectToDatabase();
  try {
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) notFound();
    return challenge;
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      notFound();
    }
    throw new Error("Error fetching challenge details");
  }
}

async function getSubmissionCount(challengeId: string) {
  await connectToDatabase();
  return await Submission.countDocuments({ challenge_id: challengeId });
}

const page = async (props: { params: Promise<{ challengeId: string, teamId: string }> }) => {
  const params = await props.params;
  const challenge = await getChallengeDetails(params.challengeId);
  const submissionCount = await getSubmissionCount(params.challengeId);
  const aa =  getServerSession(config);
  const session = await aa.auth();
  const resp = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/get-team-id?email=${session?.user?.email}`)
  const data = await resp.json();
  const teamId = data.id;
  const challengeObj = {
    _id: challenge.id,
    name: challenge.name,
    sponsor_name: challenge.sponsor_name,
    description: challenge.description,
    prize: challenge.prize,
    createdAt: challenge.createdAt?.toISOString(),
    updatedAt: challenge.updatedAt?.toISOString(),
  }

  return (
    <SubmitForm challenge={challengeObj} submissionCount={submissionCount} teamId={teamId}/>
  );
};

export default page;
