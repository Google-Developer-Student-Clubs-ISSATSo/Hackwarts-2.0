"use server";
import { connectToDatabase } from "@/lib/mongodb";
import { Team } from "../models/Team";
import { z } from "zod";
import { redirect } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  leader_name: z.string(),
  leader_email: z.string().email(),
  house: z.enum(["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]),
  members: z
    .array(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
      })
    )
    .max(4), // Max 4 additional members + 1 leader = 5 total
});

export const createTeam = async (formData: FormData) => {
  "use server";

  const rawData = {
    name: formData.get("name"),
    house: formData.get("house"),
    leader_name: formData.get("leader_name"),
    leader_email: formData.get("leader_email"),
    members: [] as Array<{ name: string; email: string }>,
  };

  const entries = Array.from(formData.entries());
  entries.forEach(([key, value]) => {
    if (key.startsWith("members.")) {
      const [, index, field] = key.split(".");
      if (!rawData.members[parseInt(index)]) {
        rawData.members[parseInt(index)] = { name: "", email: "" };
      }
      rawData.members[parseInt(index)][field as "name" | "email"] =
        value as string;
    }
  });

  const teamData = formSchema.parse(rawData);
  await connectToDatabase();
  // check if team leader exists
  const leaderExists = await Team.exists({
    leader_email: teamData.leader_email,
  });
  // check if email exists in all members of all the teams in the database
  const memberExists = await Team.exists({
    $or: [
      { "members.email": teamData.leader_email },
      { leader_email: teamData.leader_email },
    ],
  });

  // do not allow anyone to be a member of more than one team
  const memberEmails = teamData.members.map((member) => member.email);
  const memberExistsInOtherTeam = await Team.exists({
    $or: [
      { "members.email": { $in: memberEmails } },
      { leader_email: { $in: memberEmails } },
    ],
  });

  if (memberExistsInOtherTeam) {
    throw new Error("Email already registered in another team");
  }

  if (memberExists) {
    throw new Error("Email already registered in another team");
  }

  if (leaderExists) {
    throw new Error("Team leader already exists");
  }
  // check if team name exists
  const teamExists = await Team.exists({ name: teamData.name });
  if (teamExists) {
    throw new Error("Team name already exists");
  }
  // create team
  const team = await Team.create(teamData);
  if (!team) {
    throw new Error("Failed to create team");
  }
  redirect("/challenges");
};
