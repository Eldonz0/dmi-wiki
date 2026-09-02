import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE = "dmi_session";

function secret() {
  return process.env.DMI_SESSION_SECRET || "dmi-wiki-local-session";
}

export function adminUser() {
  return process.env.DMI_ADMIN_USER || "admin";
}

export function adminPass() {
  return process.env.DMI_ADMIN_PASS || "";
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function makeSessionCookie(user: string) {
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 14;
  const payload = Buffer.from(JSON.stringify({ user, exp })).toString(
    "base64url",
  );
  return `${payload}.${sign(payload)}`;
}

export function readSession(token: string | undefined) {
  if (!token) return null;
  const [payload, mac] = token.split(".");
  if (!payload || !mac) return null;
  const expected = sign(payload);
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
      user: string;
      exp: number;
    };
    if (data.exp < Date.now()) return null;
    if (data.user !== adminUser()) return null;
    return data;
  } catch {
    return null;
  }
}

export function checkPassword(user: string, password: string) {
  const expectedUser = adminUser();
  const expectedPass = adminPass();
  if (!expectedPass || !user || !password) return false;
  const u = Buffer.from(user);
  const eu = Buffer.from(expectedUser);
  const p = Buffer.from(password);
  const ep = Buffer.from(expectedPass);
  if (u.length !== eu.length || p.length !== ep.length) return false;
  return timingSafeEqual(u, eu) && timingSafeEqual(p, ep);
}
