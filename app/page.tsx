import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPinned, Scroll, Wand } from "lucide-react";
import Image from "next/image";

import HousePercentage from "@/components/ui/HousePercentage";
import prize from "@/public/HogwartsHouseCup.webp";
import baroqueBorder from "@/public/baroqueborder.png";
import magicien from "@/public/fly.png";
import gdgcissatso from "@/public/gdgcissatso.png";
import goldenball from "@/public/goldenball.png";
import issat from "@/public/issat.png";
import logo from "@/public/logo.png";
import moon from "@/public/moon.png";
import Link from "next/link";
function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-rosewood overflow-hidden">
      <div className="relative m-5">
        <Image src={logo} alt="Hackwarts logo" />
        <Image
          src={magicien}
          alt="Magicien"
          className="w-40 -top-14 left-1/2  md:w-60 absolute md:-top-20 md:-right-20 invert animate-sinusoidal"
        />
        <div className="w-full flex items-center gap-2 justify-center flex-wrap">
        <Link href={"/plan"}>
          <Button
            variant="hackwarts"
            className="relative text-md font-semibold"
          >
            <Wand />{" "}
            <Image
              src={goldenball}
              className="w-10 h-10 absolute animate-fly "
              alt="challenge ball flying around the button"
            />
            Start casting magic
          </Button>
          </Link>
          <Link href={"/challenges"}>
          <Button
            variant="hackwarts"
            className="text-md font-bold bg-white text-amber-800"
            
          >
            <Scroll /> List of challenges
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Location() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 m-6 py-6 relative border-t-2 border-b-2 border-yellow-500 mt-28">
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
      <div className="flex flex-col gap-2 justify-center p-10">
        <h2 className="text-7xl text-harryp">Time & Location</h2>
        <p className="text-xl flex items-center gap-2">
          <MapPinned className="w-5 h-5" /> You can find us at ISSAT University
          Sousse, Tunisia
        </p>
        <p className="text-xl flex items-center gap-2">
          <Calendar className="w-5 h-5" /> The event will take place on 16th
          December 2024
        </p>
        <p className="text-xl flex items-center gap-2">
          <Clock /> From 10:00 to 18:00 Next Day
        </p>
        <p className="text-xl font-thin">
          Bring your own wand, and don't forget to wear your wizard hat and the
          secret ingredient, coffee!
        </p>
        <Button
          variant="hackwarts"
          className="w-fit mt-4 text-lg font-semibold"
        >
          <Wand /> Start Casting Magic
        </Button>
      </div>
      <div className="relative flex items-center justify-center">
        <Image src={issat} alt="ISSAT University Sousse" />
        <Image
          src={goldenball}
          alt="Golden ball"
          className="w-60 absolute top-0 left-10 animate-sinusoidal"
        />
      </div>
    </div>
  );
}

function Prize() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 m-6 py-6 relative border-t-2 border-b-2 border-yellow-500 p-6 mt-28">
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
      <div className="flex items-center justify-center relative">
        <Image src={moon} alt="Moon" className="w-96" />
        <div className="rotate-12 absolute top-4 right-28">
          <Image
            src={prize}
            alt="Hogwarts House Cup"
            className="w-52 animate-sinusoidal"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 justify-center p-10">
        <h2 className="text-7xl text-harryp">One Night Lots of Prizes!</h2>

        <p className="text-xl font-thin">
          Win lots of prizes and learn new spells and potions. The house with
          the most points will win the Hogwarts Prize.
        </p>
        <Button
          variant="hackwarts"
          className="w-fit mt-4 text-lg font-semibold"
        >
          <Wand /> Start Casting Magic
        </Button>
      </div>
    </div>
  );
}


function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center py-6 mt-12 bg-rosewood text-white">
      <div className="flex items-center gap-4">
        <Image src={logo} alt="Hackwarts logo" className="w-28 mb-2" />
        <Image
          src={gdgcissatso}
          alt="GDGC IssatSO Logo"
          className="w-28 mb-2 "
        />
      </div>
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Hackwarts GDGC. All rights reserved.
      </p>
    </footer>
  );
}

export default function Home() {
  return (
    <div>
      <Hero />
      <HousePercentage />
      <Location />
      <Prize />
      <h1 className="text-6xl text-harryp text-center mt-12">And more...</h1>
      <Footer />
    </div>
  );
}
