import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/session";

export async function GET(request: Request) {
  return NextResponse.redirect(new URL("/", request.url), 303);
}

export async function POST(request: Request) {
  const json = request.headers.get("accept")?.includes("application/json");
  const res = json
    ? NextResponse.json({ ok: true, admin: false })
    : NextResponse.redirect(new URL("/", request.url), 303);
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
