"use client";
import { useTeamCheck } from "@/hooks/useTeamCheck";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Book, Loader, LogIn, Menu, Swords, Users, X } from "lucide-react";

import baroqueBorder from "@/public/baroqueborder.png";
import hackwartsLogo from "@/public/logo.png";
import magehat from "@/public/magehat.png";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function MobileMenu({ onClose }: { onClose: () => void }) {
  const { data: session } = useSession();
  const { hasTeam } = useTeamCheck(session?.user?.email);

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
        {session &&
          (hasTeam ? (
            <Link
              className={cn(
                "w-full",
                buttonVariants({
                  variant: "hackwarts",
                  size: "lg",
                  className: "mb-4",
                }),
                "bg-[#6f2f2a] text-yellow-400 "
              )}
              href="/challenges"
              onClick={onClose}
            >
              <Swords className="w-6 h-6" /> Challenges
            </Link>
          ) : (
            <Link
              className={cn(
                "w-full",
                buttonVariants({
                  variant: "hackwarts",
                  size: "lg",
                  className: "mb-4",
                }),
                "bg-[#6f2f2a] text-yellow-400 "
              )}
              href="/create-team"
              onClick={onClose}
            >
              <Users className="w-6 h-6" /> Create Team
            </Link>
          ))}
        {!session && (
          <Link
            className={cn(
              "w-full",
              buttonVariants({
                variant: "hackwarts",
                size: "lg",
                className: "mb-4",
              }),
              "bg-[#6f2f2a] text-yellow-400 "
            )}
            href="/register"
            onClick={onClose}
          >
            <Users className="w-6 h-6" /> Register Team
          </Link>
        )}
        <Link
          className={cn(
            "w-full",
            buttonVariants({
              variant: "hackwarts",
              size: "lg",
              className: "mb-4",
            }),
            "bg-[#6f2f2a] text-yellow-400 "
          )}
          href="/plan"
          onClick={onClose}
        >
          <Book className="w-6 h-6" /> Plan
        </Link>
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
      </div>
    </div>
  );
}

const Navbar = () => {
  const { data: session, status } = useSession();
  const { hasTeam } = useTeamCheck(session?.user?.email);
  const [toggle, setToggle] = useState(false);

  return (
    <div className="relative z-40 py-3 px-1">
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
          <Link href="/">
            <Image
              src={hackwartsLogo}
              width={150}
              height={150}
              alt="Hackwarts logo"
            />
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-2 relative z-10">
          {status === "loading" ? (
            <Loader className="w-6 h-6 animate-spin" />
          ) : status === "unauthenticated" ? (
            <>
              <Link href="/plan">
                <Button variant="hackwarts">
                  <Book className="w-4 h-4" />
                  Plan
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="hackwarts">
                  <Users className="w-4 h-4" />
                  Register Team
                </Button>
              </Link>
              <Button
                variant="hackwarts"
                className="bg-amber-600 text-amber-950"
                onClick={() => signIn("google", { callbackUrl: "/challenges" })}
              >
                <LogIn className="w-4 h-4" /> Login
              </Button>
            </>
          ) : (
            <>
              {status === "authenticated" &&
                (hasTeam ? (
                  <>
                    <Link href="/plan">
                      <Button variant="hackwarts">
                        <Book className="w-4 h-4" />
                        Plan
                      </Button>
                    </Link>
                    <Link href="/challenges">
                      <Button variant="hackwarts">
                        <Swords className="w-4 h-4" />
                        Challenges
                      </Button>
                    </Link>
                    <Link href={`/teamprofile`}>
                      <Button variant="hackwarts">
                        <Users className="w-4 h-4" />
                        Team Profile
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/plan">
                      <Button variant="hackwarts">
                        <Book className="w-4 h-4" />
                        Plan
                      </Button>
                    </Link>
                    <Link href="/create-team">
                      <Button variant="hackwarts">
                        <Users className="w-4 h-4" />
                        Create Team
                      </Button>
                    </Link>
                  </>
                ))}
              <Button
                variant="hackwarts"
                className="bg-amber-600 text-amber-950"
                onClick={() => signOut()}
              >
                <LogIn className="w-4 h-4" /> Logout
              </Button>
            </>
          )}
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
