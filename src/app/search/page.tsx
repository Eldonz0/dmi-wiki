import { Suspense } from "react";
import { SearchResults } from "@/components/search-results";
import { buildSearchIndex } from "@/lib/search-index";

export const dynamic = "force-dynamic";
export const metadata = { title: "Search" };

export default function SearchPage() {
  const extras = buildSearchIndex();
  return (
    <Suspense fallback={<p>Loading search…</p>}>
      <SearchResults extras={extras} />
    </Suspense>
  );
}
