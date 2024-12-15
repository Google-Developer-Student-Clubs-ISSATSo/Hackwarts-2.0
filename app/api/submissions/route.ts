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

    const subs = await Submission.find();
    let newSubs = [];
    let names = [];
    for (let i = 0; i < subs.length; i++) {
        const team = await Team.findById(subs[i].team_id);
        const challenge = await Challenge.findById(subs[i].challenge_id);
        names.push(team?.name);
        newSubs.push({
            team: {
                name: team?.name,
                house: team?.house
            },
            challenge: {
                name: challenge?.name,
                sponsor_name: challenge?.sponsor_name
            },
            subs: {
                submission_url: subs[i].submission_url,
                deployement_url: subs[i].deployement_url,
                createdAt: subs[i].createdAt
            }
        });
    }

    return NextResponse.json({newSubs, names});
}