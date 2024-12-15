import { NextRequest, NextResponse } from "next/server";
import { Team } from "@/app/models/Team";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req: NextRequest){
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    console.log("hh")
    if(!email){
        return NextResponse.error();
    }
    await connectToDatabase();
    const team = await Team.findOne({leader_email: email});
    if(!team){
        return NextResponse.error();
    }
    return NextResponse.json({id: team._id});
}