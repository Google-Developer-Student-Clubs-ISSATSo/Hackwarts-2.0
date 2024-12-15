import { Team } from "@/app/models/Team";
import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import getServerSession from "next-auth"
import { config } from "@/app/auth.config";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const teamId = searchParams.get("teamId");
  if (!teamId) {
    return NextResponse.json(
      { hasTeam: false },
      {
        status: 400, // Bad Request
      }
    );
  }
  await connectToDatabase();
  const team = await Team.findOne({ id: teamId });
  if (!team) {
    return NextResponse.json(
      { hasTeam: false },
      {
        status: 404, // Not Found
      }
    );
  }
  return NextResponse.json({ hasTeam: true, member: team.members });
}

export async function POST(request: NextRequest) {
  const { name, email } = await request.json();
  const aa =  getServerSession(config);
  const session = await aa.auth();

  await connectToDatabase();
  const team = await Team.findOne({
    leader_email: session?.user?.email,
  });
  if (!team) {
    return NextResponse.json(
      { message: "Team not found" },
      {
        status: 404, // Not Found
      }
    );
  }

  if (team.members.length >= 5) {
    return NextResponse.json(
      { message: "Team is full" },
      {
        status: 400, // Bad Request
      }
    );
  }

  // find if the user is in any other team
  const memberExists = await Team.exists({
    $or: [{ "members.email": email }, { leader_email: email }],
  });

  if (memberExists) {
    return NextResponse.json(
      { message: "Member already exists in another team" },
      {
        status: 400, // Bad Request
      }
    );
  }

  team.members.push({ name, email });
  await team.save();

  return NextResponse.json({
    message: "Member added successfully",
    members: team.members,
  });
}

export async function DELETE(request: NextRequest) {
  const email = new URL(request.url).searchParams.get("email");
  const aa =  getServerSession(config);
  const session = await aa.auth()

  await connectToDatabase();
  const team = await Team.findOne({
    leader_email: session?.user?.email,
  });
  if (!team) {
    return NextResponse.json(
      { message: "Team not found" },
      {
        status: 404, // Not Found
      }
    );
  }

  team.members = team.members.filter((member) => member.email !== email);
  await team.save();

  return NextResponse.json({
    message: "Member removed successfully",
    members: team.members,
  });
}
