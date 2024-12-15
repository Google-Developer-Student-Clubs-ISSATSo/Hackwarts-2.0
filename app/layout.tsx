import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "../components/ui/navbar";
import "./globals.css";
import Providers from "./providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Starfield from "@/components/ui/starfield";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Hackwarts V2.0",
  description: "Hackwarts Challenge V2.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <Starfield />
          {children}
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
