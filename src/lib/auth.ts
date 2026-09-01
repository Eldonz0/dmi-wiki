import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  adminPass,
  adminUser,
  checkPassword,
  makeSessionCookie,
  readSession,
} from "@/lib/session";

export {
  SESSION_COOKIE,
  adminPass,
  adminUser,
  checkPassword,
  makeSessionCookie,
  readSession,
};

export async function isAdmin() {
  const jar = await cookies();
  return Boolean(readSession(jar.get(SESSION_COOKIE)?.value));
}
