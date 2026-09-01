"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function WikiSearchForm({
  initial = "",
  compact = false,
}: {
  initial?: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const [q, setQ] = useState(initial);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "mw-search compact" : "mw-search"}>
      <input
        type="search"
        name="q"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search DMI Wiki"
        aria-label="Search DMI Wiki"
      />
      <button type="submit">Search</button>
    </form>
  );
}
