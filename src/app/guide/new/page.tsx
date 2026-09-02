import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { GuideComposer } from "@/components/guide-composer";

export const dynamic = "force-dynamic";
export const metadata = { title: "New topic" };

export default async function NewGuidePage() {
  if (!(await isAdmin())) redirect("/api/auth/login?next=/guide/new");
  return <GuideComposer />;
}
