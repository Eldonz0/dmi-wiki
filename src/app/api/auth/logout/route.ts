import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/session";

function clear(request: Request) {
  const res = NextResponse.redirect(new URL("/", request.url), 303);
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}

export async function GET(request: Request) {
  return clear(request);
}

export async function POST(request: Request) {
  return clear(request);
}
