import { Team } from "@/app/models/Team";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import getServerSession from "next-auth"
import { config } from "@/app/auth.config";

export async function GET(request: Request) {
  const aa =  getServerSession(config);
  const session = await aa.auth();

  await connectToDatabase();
  const team = await Team.findOne({
    leader_email: session?.user?.email,
  });
  console.log(team);
  if (!team) {
    return NextResponse.json({
      hasTeam: false,
    });
  }
  return NextResponse.json({
    team,
  });
}
