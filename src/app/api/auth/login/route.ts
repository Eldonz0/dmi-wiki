import { NextResponse } from "next/server";
import {
  adminUser,
  checkPassword,
  makeSessionCookie,
  SESSION_COOKIE,
} from "@/lib/session";

function safeNext(raw: string) {
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.includes("\\")) {
    return "/";
  }
  return raw;
}

function attachSession(res: NextResponse) {
  res.cookies.set(SESSION_COOKIE, makeSessionCookie(adminUser()), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}

/** GET must not set a session — browsers prefetch Sign in links. */
export async function GET(request: Request) {
  return NextResponse.redirect(new URL("/login", request.url), 303);
}

export async function POST(request: Request) {
  const form = await request.formData();
  const user = String(form.get("user") ?? "");
  const password = String(form.get("password") ?? "");
  const next = safeNext(String(form.get("next") ?? "/"));
  const json = request.headers.get("accept")?.includes("application/json");

  if (!checkPassword(user, password)) {
    if (json) return NextResponse.json({ ok: false, error: "Wrong username or password." }, { status: 401 });
    return NextResponse.redirect(new URL("/login?error=1", request.url), 303);
  }

  if (json) return attachSession(NextResponse.json({ ok: true, admin: true }));
  return attachSession(NextResponse.redirect(new URL(next, request.url), 303));
}
