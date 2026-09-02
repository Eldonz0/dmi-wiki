import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const metadata = { title: "New guide" };

export default async function NewGuidePage() {
  if (!(await isAdmin())) redirect("/guide");
  redirect("/guide");
}
