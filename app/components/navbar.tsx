"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { LogIn, Menu, Users, X } from "lucide-react";

import baroqueBorder from "@/public/baroqueborder.png";
import hackwartsLogo from "@/public/logo.png";
import magehat from "@/public/magehat.png";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function MobileMenu({ onClose }: { onClose: () => void }) {
  const { data: session } = useSession();
  return (
    <div className="fixed inset-0 z-40 backdrop-blur bg-black bg-opacity-35 pointer-events-none flex flex-col items-center justify-center p-4 overflow-y-auto">
      <div className="z-50 w-full max-w-sm bg-[#F3E5AB] bg-blend-multiply bg-cover bg-center rounded-lg p-8 transform rotate-1 shadow-xl border-4 border-[#8E6F3E] relative pointer-events-auto">
        <Image
          src={magehat}
          alt="A blue mage hat"
          className="w-32 h-32 absolute -top-16 -left-12 -rotate-[20deg] "
        />
        <Button
          variant="hackwarts"
          className="absolute top-2 right-2"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </Button>
        <h2 className="text-6xl font-bold text-[#4A0E0E] text-center mb-6 font-serif text-harryp">
          Menu
        </h2>
        <Button
          variant="hackwarts"
          className="bg-amber-600 text-amber-950 w-full mb-4"
          onClick={() => {
            session
              ? signOut()
              : signIn("google", { callbackUrl: "/challenges" });
            onClose();
          }}
        >
          <LogIn className="w-6 h-6" /> {session ? "Logout" : "Login"}
        </Button>
        <Link
          className={cn(
            "w-full",
            buttonVariants({
              variant: "hackwarts",
              size: "lg",
              className: "mb-4",
            }),
            "bg-[#6f2f2a] text-yellow-400 ",
          )}
          href="/register"
          onClick={onClose}
        >
          <Users className="w-6 h-6" /> Register Team
        </Link>
      </div>
    </div>
  );
}

const Navbar = () => {
  const { data: session } = useSession();
  const [toggle, setToggle] = useState(false);
  return (
    <div className="sticky z-40 top-0 left-4 right-4 box-border p-6 mt-4">
      <nav className="backdrop-blur-md flex items-center justify-between relative w-full h-full py-1 px-6 box-border border-t-2 border-b-2 border-yellow-500 ">
        {/* Baroque border design */}
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

        <div className="relative z-10">
          <Image
            src={hackwartsLogo}
            width={150}
            height={150}
            alt="Hackwarts logo"
          />
        </div>
        <div className="hidden md:flex items-center gap-2 relative z-10">
          <Button
            variant="hackwarts"
            className="bg-amber-600 text-amber-950"
            onClick={() =>
              session
                ? signOut()
                : signIn("google", { callbackUrl: "/challenges" })
            }
          >
            <LogIn className="w-4 h-4" /> {session ? "Logout" : "Login"}
          </Button>
          <Link href="/register">
            <Button variant="hackwarts">
              <Users className="w'4 h-4" />
              Register Team
            </Button>
          </Link>
        </div>
        <div className="block md:hidden">
          <Button
            onClick={() => {
              setToggle((prev) => !prev);
            }}
            variant="hackwarts"
            className="bg-amber-600 text-amber-950"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </nav>
      {toggle && <MobileMenu onClose={() => setToggle(false)} />}
    </div>
  );
};

export default Navbar;
