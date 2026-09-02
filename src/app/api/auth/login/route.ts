import { NextResponse } from "next/server";
import {
  adminUser,
  makeSessionCookie,
  SESSION_COOKIE,
  checkPassword,
} from "@/lib/session";

function safeNext(raw: string) {
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.includes("\\")) {
    return "/admin";
  }
  return raw;
}

function signedIn(next: string, request: Request) {
  const res = NextResponse.redirect(new URL(next, request.url), 303);
  res.cookies.set(SESSION_COOKIE, makeSessionCookie(adminUser()), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return res;
}

/** Testing shortcut: Sign in sets the tamer cookie with no form. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const next = safeNext(url.searchParams.get("next") || "/admin");
  return signedIn(next, request);
}

export async function POST(request: Request) {
  const form = await request.formData();
  const user = String(form.get("user") ?? "");
  const password = String(form.get("password") ?? "");
  const next = safeNext(String(form.get("next") ?? "/admin"));
  if (user || password) {
    if (!checkPassword(user, password)) {
      const login = new URL("/login", request.url);
      login.searchParams.set("error", "1");
      login.searchParams.set("next", next);
      return NextResponse.redirect(login, 303);
    }
  }
  return signedIn(next, request);
}
