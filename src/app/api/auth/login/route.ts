import { NextResponse } from "next/server";
import { checkPassword, makeSessionCookie, SESSION_COOKIE } from "@/lib/session";

function safeNext(raw: string) {
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.includes("\\")) {
    return "/admin";
  }
  return raw;
}

export async function POST(request: Request) {
  const form = await request.formData();
  const user = String(form.get("user") ?? "");
  const password = String(form.get("password") ?? "");
  const next = safeNext(String(form.get("next") ?? "/admin"));
  if (!checkPassword(user, password)) {
    const url = new URL("/login", request.url);
    url.searchParams.set("error", "1");
    url.searchParams.set("next", next);
    return NextResponse.redirect(url, 303);
  }
  const res = NextResponse.redirect(new URL(next, request.url), 303);
  res.cookies.set(SESSION_COOKIE, makeSessionCookie(user), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return res;
}
