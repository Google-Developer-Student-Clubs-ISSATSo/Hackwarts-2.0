"use client";
import { Button } from "@/components/ui/button";
import baroqueBorder from "@/public/baroqueborder.png";
import magicien from "@/public/fly.png";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useTeamCheck } from "@/hooks/useTeamCheck";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { data: session } = useSession();
  const { hasTeam } = useTeamCheck(session?.user?.email);
  const router = useRouter();

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/create-team" });
  };

  useEffect(() => {
    if (session) {
      if (hasTeam) {
        router.push("/challenges");
      } else {
        router.push("/create-team");
      }
    }
  }, [session, hasTeam]);

  return (
    <div className="h-screen w-screen flex items-start justify-center py-10">
      <div className="max-w-2xl w-full mx-4 relative border-2 border-yellow-600 p-8 rounded-xl bg-[#c7b256] shadow-[0_0_50px_rgba(255,215,0,0.3)] backdrop-blur-sm">
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

        <div className="relative">
          <Image
            src={magicien}
            alt="Magicien"
            className="w-32 absolute -top-10 -right-10 invert animate-sinusoidal"
          />
          <h1 className="text-6xl text-harryp text-center mb-12 text-licorice drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
            December 1<sup className="text-[2rem]">4</sup>
            <span className="text-[2.5rem]">/</span>
            <sub className="text-[2rem]">5</sub>
          </h1>
          <div className="text-center text-lg mb-8 text-licorice font-bold tracking-wider drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">
            <p>Your ticket to the magical world of Hackwarts awaits!</p>
            <p>Join us with spellbinding code and enchanted innovation.</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <Button
            variant="outline"
            size="lg"
            onClick={handleGoogleSignIn}
            className="w-full max-w-sm flex items-center justify-center gap-2 text-lg 
              bg-gradient-to-r from-copper to-sunset
              text-blackbean font-bold
              border-2 border-yellow-600
              hover:scale-105 hover:brightness-110
              hover:text-blackbean
              transition-all duration-300 ease-out
              shadow-[0_0_15px_rgba(255,215,0,0.3)]
              hover:shadow-[0_0_25px_rgba(255,215,0,0.5)]"
          >
            <FcGoogle className="w-6 h-6 bg-white rounded-full" />
            Board with Google
          </Button>

          <p className="text-sm text-licorice text-center max-w-sm font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
            By boarding, you agree to follow the rules of Hackwarts and maintain
            the secrecy of the magical world.
          </p>
        </div>
      </div>
    </div>
  );
}
