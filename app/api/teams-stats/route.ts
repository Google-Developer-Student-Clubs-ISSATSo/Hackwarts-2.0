import { Team } from "@/app/models/Team";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDatabase();
    const teams = await Team.find();
    const numberOfTeams = teams.length;
    const gryffindor = teams.filter((team)=> team.house === "Gryffindor")
    const slytherin = teams.filter((team)=> team.house === "Slytherin")
    const hufflepuff = teams.filter((team)=> team.house === "Hufflepuff")
    const ravenclaw = teams.filter((team)=> team.house === "Ravenclaw")
    const returnObject = {
        numberOfTeams: teams.length,
        gryffindor: Math.floor(gryffindor.length * 100 / numberOfTeams),
        slytherin:  Math.floor(slytherin.length * 100 / numberOfTeams),
        hufflepuff: Math.floor(hufflepuff.length * 100 / numberOfTeams),
        ravenclaw:  Math.floor(ravenclaw.length * 100 / numberOfTeams),
    }

    return NextResponse.json(returnObject)

}