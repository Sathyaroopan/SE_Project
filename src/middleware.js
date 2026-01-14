import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  const protectedPaths = ["/dashboard", "/profile", "/planner"];

  if (protectedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    try {
      verifyToken(token);
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}
