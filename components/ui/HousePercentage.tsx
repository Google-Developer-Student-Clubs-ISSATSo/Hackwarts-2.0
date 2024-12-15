"use client";
import HouseBanner from "@/components/ui/house-banner";
import NumberTicker from "@/components/ui/number-ticker";
import { useEffect, useState } from "react";
interface HousePercentage {
  numberOfTeams: number;
  gryffindor: number;
  slytherin: number;
  hufflepuff: number;
  ravenclaw: number;
}
export default function HousePercentage() {
  const [stats, setStats] = useState<HousePercentage>();
  useEffect(() => {
    const getTeamStats = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/teams-stats`
        );
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    };
    getTeamStats();
  }, []);
  return (
    <div>
      <h1 className="text-4xl text-harryp text-center mb-4">
        How many members in each house?
      </h1>
      <div className="text-center text-2xl mb-4">
        <span className="font-bold">Total Teams: </span>
        <NumberTicker className="text-inherit" value={stats?.numberOfTeams ?? 0} />
      </div>
      <div className="flex items-center justify-center">
        <HouseBanner house="Gryffindor" value={stats?.gryffindor ?? 0} />
        <HouseBanner house="Hufflepuff" value={stats?.slytherin ?? 0} />
        <HouseBanner house="Slytherin" value={stats?.hufflepuff ?? 0} />
        <HouseBanner house="Ravenclaw" value={stats?.ravenclaw ?? 0} />
      </div>
    </div>
  );
}
