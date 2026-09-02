import { redirect } from "next/navigation";
import { Suspense } from "react";
import { listDigimon } from "@/lib/catalog";
import { SearchResults } from "@/components/search-results";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function SearchPage() {
  if (!(await isAdmin())) redirect("/");
  const extras = listDigimon().map((d) => ({
    href: `/digimon/${d.slug}`,
    title: d.name,
    text: `${d.role} ${d.rank} ${d.lines.join(" ")} ${d.hp}`,
  }));
  return (
    <Suspense fallback={<p>Loading search…</p>}>
      <SearchResults extras={extras} />
    </Suspense>
  );
}
