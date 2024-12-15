import { NextConfig } from "next";
import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const config =  {
    providers: [Google({ allowDangerousEmailAccountLinking: true })],
    trustHost: true,
    pages: {
      signIn: "/register",
      error: "/register",
    },
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async signIn() {
        return true;
      },
      async session({ session, token }) {
        return { ...session, user: { ...session.user, id: token.sub } };
      },
    },
} satisfies NextAuthConfig;

