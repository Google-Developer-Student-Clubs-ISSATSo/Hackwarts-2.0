"use client";

import { Button } from "@/components/ui/button";
import { Swords, Scroll, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import baroqueBorder from "@/public/baroqueborder.png";
import goldenball from "@/public/goldenball.png";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { SuccessDialog } from "./SuccessDialog";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Challenge {
  _id: string;
  name: string;
  sponsor_name: string;
  description: string;
  prize: string;
  link: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ButtonState {
  primary: {
    disabled: boolean;
    text: string;
    onClick?: () => void;
  };
  secondary: {
    disabled: boolean;
    text: string;
    onClick: () => void;
  } | null;
}

export default function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const { data: session } = useSession();
  const [isSelected, setIsSelected] = useState(false);
  const [maxChallengesReached, setMaxChallengesReached] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const router = useRouter();
  const [numberOfTeams, setNumberOfTeams] = useState(0);

  useEffect(() => {
    if (session?.user?.email) {
      checkChallengeStatus();
      checkHowManyTeamsSelectedTheChallenge();
    }
  }, [session]);

const checkHowManyTeamsSelectedTheChallenge = async () =>{
  try{
    const res = await fetch(`/api/challenge-data?challengeId=${challenge._id}`)
    const data = await res.json();
    setNumberOfTeams(data.numberOfTeams);
  }catch(err){
    console.error(err);
  }
}

  const checkChallengeStatus = async () => {
    try {
      const res = await fetch(
        `/api/teams/challenges-status?email=${session?.user?.email}`,
      );
      const data = await res.json();

      setIsSelected(data.selectedChallenges.includes(challenge._id));
      setMaxChallengesReached(data.selectedChallenges.length >= 1);
    } catch (error) {
      console.error("Error checking challenge status:", error);
    }
  };

  const handleSelectChallenge = async () => {
    if (!session?.user?.email) return;
    setShowConfirmDialog(true);
  };

  const handleConfirmSelection = async () => {
    try {
      const res = await fetch("/api/challenges/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamEmail: session?.user?.email,
          challengeId: challenge._id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setDialogMessage(`You've successfully selected "${challenge.name}"`);
      setShowSuccessDialog(true);
      checkChallengeStatus();
    } catch (error: any) {
      setDialogMessage(error.message);
      setShowSuccessDialog(true);
    } finally {
      setShowConfirmDialog(false);
    }
  };

  const handleSubmitChallenge = () => {
    router.push(`/submission/${challenge._id}`);
  };

  const getButtonState = (): ButtonState | null => {
    if (!session?.user?.email) return null;
    if (isSelected) {
      return {
        primary: { disabled: true, text: "Already Selected" },
        secondary: {
          disabled: false,
          text: "Submit Challenge",
          onClick: handleSubmitChallenge,
        },
      };
    }
    if (maxChallengesReached)
      return {
        primary: {
          disabled: true,
          text: "Max selected challenges",
          onClick: handleSelectChallenge,
        },
        secondary: null,
      };
    return {
      primary: {
        disabled: false,
        text: "Select Challenge",
        onClick: handleSelectChallenge,
      },
      secondary: null,
    };
  };

  const buttonState = getButtonState();

  if (!buttonState) return null;

  return (
    <>
      <div className="relative border-2 border-yellow-600 p-8 rounded-xl bg-[#c7b256] shadow-[0_0_50px_rgba(255,215,0,0.3)] backdrop-blur-sm flex flex-col">
        <Image
          src={baroqueBorder}
          alt="Baroque border"
          className="absolute -top-4 -left-2 h-12 w-auto"
        />
        <Image
          src={baroqueBorder}
          alt="Baroque border"
          className="absolute h-12 w-auto -bottom-4 -left-2 -scale-y-100"
        />
        <Image
          src={baroqueBorder}
          alt="Baroque border"
          className="absolute h-12 w-auto -top-4 -right-2 -scale-x-100"
        />
        <Image
          src={baroqueBorder}
          alt="Baroque border"
          className="absolute h-12 w-auto -bottom-4 -right-2 -scale-y-100 -scale-x-100"
        />

        <div className="relative flex-1">
          <Image
            src={goldenball}
            alt="Golden ball"
            className="w-12 absolute -top-6 -right-4 animate-sinusoidal"
          />
          <h2 className="text-3xl text-harryp font-bold text-licorice mb-3">
            {challenge.name}
          </h2>
          <p className="text-sm font-semibold text-licorice mb-2">
            Sponsored by {challenge.sponsor_name}
          </p>
          <p className="text-licorice mb-4">{challenge.description}</p>
          <Link
            href={challenge.link || "#"}
            className="text-licorice mb-3 hover:underline font-bold"
          >
            <span className="flex underline">              <ArrowUpRight/> More details  </span>
          </Link>
          <p className="text-sm font-bold text-licorice">
            Prize: {challenge.prize}
          </p>
          <p className="text-lg font-bold text-rosewood underline">
            Selected by {numberOfTeams} teams.
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <Button
            variant="hackwarts"
            onClick={buttonState.primary.onClick}
            disabled={buttonState.primary.disabled}
          >
            <Swords className="w-4 h-4 mr-2" />
            {buttonState.primary.text}
          </Button>
          {buttonState.secondary && (
            <Button
              variant="hackwarts"
              onClick={buttonState.secondary.onClick}
              disabled={buttonState.secondary.disabled}
            >
              <Scroll className="w-4 h-4 mr-2" />
              {buttonState.secondary.text}
            </Button>
          )}
        </div>
      </div>
      <ConfirmationDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmSelection}
        title="Select Challenge"
        description={`Are you sure you want to select "${challenge.name}"? This action cannot be undone.`}
      />
      <SuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        title="Magic Spell Result"
        message={dialogMessage}
      />
    </>
  );
}
