"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { WikiSearchForm } from "@/components/wiki-search";
import { SEARCH_INDEX } from "@/lib/wiki";

function Results() {
  const params = useSearchParams();
  const q = (params.get("q") ?? "").trim();
  const needle = q.toLowerCase();

  const hits = needle
    ? SEARCH_INDEX.filter(
        (page) =>
          page.title.toLowerCase().includes(needle) ||
          page.text.toLowerCase().includes(needle),
      )
    : SEARCH_INDEX;

  return (
    <article className="mw-article">
      <div className="mw-pre-title">Special page</div>
      <h1 className="mw-firstHeading">Search</h1>
      <WikiSearchForm initial={q} />
      <p style={{ marginTop: "0.8rem" }}>
        {q
          ? `${hits.length} page${hits.length === 1 ? "" : "s"} matching “${q}”.`
          : "Type a term, or browse every article below."}
      </p>
      {hits.length === 0 ? (
        <p>No matching pages yet. Boss maps and dungeon tables are still on Discord.</p>
      ) : (
        <ul>
          {hits.map((hit) => (
            <li key={hit.href}>
              <Link href={hit.href}>{hit.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<p>Loading search…</p>}>
      <Results />
    </Suspense>
  );
}
