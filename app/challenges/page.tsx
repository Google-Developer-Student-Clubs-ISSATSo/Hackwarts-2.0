"use server";
import { Challenge } from "@/app/models/Challenge";
import { connectToDatabase } from "@/lib/mongodb";
import ChallengeCard from "@/components/ui/ChallengeCard";

async function getChallenges() {
  await connectToDatabase();
  await Challenge.syncIndexes();
  const challenges = await Challenge.find({});
  return challenges.map((challenge) => ({
    _id: challenge.id,
    name: challenge.name,
    sponsor_name: challenge.sponsor_name,
    description: challenge.description,
    prize: challenge.prize,
    link: challenge.link,
    createdAt: challenge.createdAt?.toISOString(),
    updatedAt: challenge.updatedAt?.toISOString(),
  }));
}

export default async function ChallengesPage() {
  const challenges = await getChallenges();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rosewood to-blackbean overflow-hidden py-20">
      <div className="max-w-6xl w-full mx-4">
        <h1 className="text-6xl text-harryp text-center mb-12 text-sunset">
          Magical Challenges
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge._id} challenge={challenge} />
          ))}
        </div>
      </div>
    </div>
  );
}
