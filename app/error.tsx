"use client";

import { Button } from "@/components/ui/button";
import { Home, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import baroqueBorder from "@/public/baroqueborder.png";
import magehat from "@/public/magehat.png";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-[#F3E5AB] m-6 p-8 rounded-lg relative border-4 border-[#8E6F3E]">
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
        <Image
          src={magehat}
          alt="A blue mage hat"
          className="w-32 h-32 absolute -top-16 -left-12 -rotate-[20deg]"
        />

        <div className="text-center pt-4">
          <XCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
          <h2 className="text-4xl font-bold text-[#4A0E0E] mb-4 font-serif text-harryp">
            Magical Mishap!
          </h2>
          <p className="text-lg mb-6 text-[#4A0E0E]">
            Something went wrong with the spell. Let's try again!
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              variant="hackwarts"
              onClick={reset}
              className="bg-[#6f2f2a] text-yellow-400"
            >
              Try Again
            </Button>
            <Link href="/">
              <Button
                variant="hackwarts"
                className="bg-amber-600 text-amber-950"
              >
                <Home className="mr-2" /> Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

