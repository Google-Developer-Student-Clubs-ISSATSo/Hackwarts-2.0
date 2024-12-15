import { auth } from "@/app/auth";
import { NextResponse } from "next/server";

async function checkTeam(email: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/check-team?email=${email}`
  );
  const data = await response.json();
  return data.hasTeam;
}

export default auth(async (req) => {
  const isAuth = !!req.auth;
  req.headers.set("X-Forwarded-Host", process.env.AUTH_TRUST_HOST as string);
  req.headers.set("X-Forwarded-Proto", process.env.AUTH_TRUST_HOST as string);
  const protectedRoutes = [
    "/challenges",
    "/profile",
    "/create-team",
    "/submission",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );
  const userEmail = req.auth?.user?.email;
  if (isProtectedRoute) {
    if (!isAuth) {
      return NextResponse.redirect(new URL("/register", req.nextUrl.href));
    }

    if (req.nextUrl.pathname === "/create-team") {
      const hasTeam = await checkTeam(userEmail as string);
      if (hasTeam) {
        return NextResponse.redirect(new URL("/challenges", req.nextUrl.href));
      }
    }

    if (req.nextUrl.pathname !== "/create-team") {
      const hasTeam = await checkTeam(userEmail as string);
      if (!hasTeam) {
        return NextResponse.redirect(new URL("/create-team", req.nextUrl.href));
      }
    }
  }

  if (req.nextUrl.pathname === "/register" && isAuth) {
    if (userEmail) {
      const hasTeam = await checkTeam(userEmail);
      if (hasTeam) {
        return NextResponse.redirect(new URL("/challenges", req.nextUrl.href));
      }
      return NextResponse.redirect(new URL("/create-team", req.nextUrl.href));
    }
  }

  return NextResponse.next();
});


export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
