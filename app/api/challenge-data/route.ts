import { Team } from "@/app/models/Team";
import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const { searchParams } = new URL(req.url);
  const challengeId = searchParams.get("challengeId");
  await connectToDatabase();
    // find the teams that have the challngeId in their selected_challenges (array)
    const teams = await Team.find({selected_challenges: challengeId});
    console.log(teams)

    return NextResponse.json({numberOfTeams: teams.length, teams: teams});

    
}