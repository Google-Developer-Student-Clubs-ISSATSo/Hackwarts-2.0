import { connectToDatabase } from "@/lib/mongodb";
import { Team } from "@/app/models/Team";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { teamEmail, challengeId } = await req.json();
    await connectToDatabase();

    const team = await Team.findOne({ leader_email: teamEmail });
    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    if (team.selected_challenges.length >= 1) {
      return NextResponse.json(
        { error: "Maximum challenges already selected" },
        { status: 400 },
      );
    }

    if (team.selected_challenges.includes(challengeId)) {
      return NextResponse.json(
        { error: "Challenge already selected" },
        { status: 400 },
      );
    }

    team.selected_challenges.push(challengeId);
    await team.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

