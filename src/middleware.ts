import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { readSession } from "@/lib/session";

export function middleware(request: NextRequest) {
  const session = readSession(request.cookies.get("dmi_session")?.value);
  if (!session) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
