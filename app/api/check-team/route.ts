import { Team } from "@/app/models/Team";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ hasTeam: false });
  }

  await connectToDatabase();
  await Team.syncIndexes();
  const team = await Team.findOne({ leader_email: email });

  return NextResponse.json({ hasTeam: !!team });
}

