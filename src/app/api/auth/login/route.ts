import { NextResponse } from "next/server";
import {
  adminUser,
  makeSessionCookie,
  SESSION_COOKIE,
  checkPassword,
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
  });
  return res;
}

function signedIn(next: string, request: Request) {
  return attachSession(
    NextResponse.redirect(new URL(next, request.url), 303),
  );
}

/** GET must not set a session — browsers prefetch Sign in links. */
export async function GET(request: Request) {
  return NextResponse.redirect(new URL("/", request.url), 303);
}

/** Testing: a Sign in click (empty POST) logs in as admin with no password. */
export async function POST(request: Request) {
  const form = await request.formData();
  const user = String(form.get("user") ?? "");
  const password = String(form.get("password") ?? "");
  const next = safeNext(String(form.get("next") ?? "/"));
  if (user || password) {
    if (!checkPassword(user, password)) {
      if (request.headers.get("accept")?.includes("application/json")) {
        return NextResponse.json({ ok: false }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/", request.url), 303);
    }
  }
  if (request.headers.get("accept")?.includes("application/json")) {
    return attachSession(NextResponse.json({ ok: true, admin: true }));
  }
  return signedIn(next, request);
}
