"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import Image from "next/image";
import baroqueBorder from "@/public/baroqueborder.png";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowBigLeft, CheckCircle, Users } from "lucide-react";
import NumberTicker from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SuccessDialog } from "@/components/ui/SuccessDialog";
import { useRouter } from "next/navigation";
type SubmitFormProps = {
    submissionCount: number,
    teamId: string,
    challenge: { _id: any; name: string; sponsor_name: string; description: string; prize: string; createdAt: string | undefined; updatedAt: string | undefined};
}
export function SubmitForm({challenge, submissionCount, teamId}: SubmitFormProps){
    const [submissionUrl, setSubmissionUrl] = useState("");
    const [deploymentUrl, setDeploymentUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [error, setError] = useState("");
    const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
    const handleSubmit = async (e: React.FormEvent) => {
      if (!submissionUrl) {
        setError("Please provide a Github repository URL.");
        return;
      }
      e.preventDefault();
      setLoading(true);
      try {
        const response = await fetch("/api/submit-challenge", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            teamId: teamId,
            challengeId: challenge._id,
            submissionUrl,
            deploymentUrl,
          }),
        });
        const data = await response.json();
        console.log(data)
        if (data.ok) {
          setShowSuccessDialog(true)

        } else {
            setShowErrorDialog(true)
          setError("Something went wrong. Please contact one of GDGC members");
        }
      } catch (error) {
        setError("Something went wrong. Please contact one of GDGC members");
      }
      setLoading(false);
    }
    

    return(
    <div className="flex items-center justify-center">
      <div className="w-full max-w-[600px] m-6">
        <Link
          className={cn(
            "w-full",
            buttonVariants({
              variant: "hackwarts",
              size: "lg",
              className: "mb-10",
            }),
            "bg-[#6f2f2a] text-yellow-400 "
          )}
          href="/challenges"
        >
          <ArrowBigLeft /> Back to Challenges
        </Link>
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
            onChange={(e) => setSubmissionUrl(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Label className="text-sunset">Deployment URL (Optional)</Label>
          <Input
            placeholder="e.g https://www.example.com"
            className="bg-white"
            onChange={(e) => setDeploymentUrl(e.target.value)}/>
        </div>
        <Button
          variant="hackwarts"
          className="w-full hover:scale-100 font-bold"
          onClick={handleSubmit}
        >
          Submit Project <CheckCircle />
        </Button>
        <SuccessDialog isOpen={showSuccessDialog} onClose={()=>{
            setShowSuccessDialog(false)
            router.push("/challenges")
        }}
        message="Challenge submission was successful."
        title="Magic Spell Result"
        />
        <SuccessDialog isOpen={showErrorDialog} onClose={()=>{
            setShowErrorDialog(false)
            router.push("/challenges")
        }}
        message={error}
        title="Magic Spell Error"
        />
      </div>
    </div>
    )
}