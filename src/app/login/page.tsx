import { redirect } from "next/navigation";

/** Old /login used to auto-set a session. Send people home to click Sign in. */
export default function LoginPage() {
  redirect("/");
}
