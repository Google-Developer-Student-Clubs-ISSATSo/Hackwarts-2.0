import { Submission } from "@/app/models/Submission";
import { connectToDatabase } from "@/lib/mongodb";
import { Challenge } from "@/app/models/Challenge";
import { Team } from "@/app/models/Team";
import { NextResponse } from "next/server";

type Submission = {
    team: {
      name: string;
      house: string;
    };
    challenge: {
      name: string;
      sponsor_name: string;
    };
    subs: {
      submission_url: string;
      deployement_url?: string;
      createdAt: string;
    };
  };
export async function GET() {
    await connectToDatabase();
    //get all submissions and populate the team_id and the challenge_id4
    const submissions = await Submission.find().populate("team_id").populate("challenge_id");
    



  return NextResponse.json({
    submissions: submissions
  });}
