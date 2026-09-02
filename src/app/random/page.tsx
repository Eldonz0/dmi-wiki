import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { SIDEBAR_NAV } from "@/lib/wiki";
import { listDigimon } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function RandomPage() {
  if (!(await isAdmin())) redirect("/");
  const pages = [
    ...SIDEBAR_NAV.flatMap((g) => g.items.map((i) => i.href)),
    ...listDigimon().map((d) => `/digimon/${d.slug}`),
  ];
  const pick = pages[Math.floor(Math.random() * pages.length)];
  redirect(pick ?? "/");
}
