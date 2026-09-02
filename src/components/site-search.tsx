"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { SearchHit } from "@/lib/search-match";
import { rankHits } from "@/lib/search-match";

let cache: SearchHit[] | null = null;
let inflight: Promise<SearchHit[]> | null = null;

async function loadIndex(): Promise<SearchHit[]> {
  if (cache) return cache;
  if (!inflight) {
    inflight = fetch("/api/search")
      .then((res) => res.json())
      .then((data: { hits?: SearchHit[] }) => {
        cache = data.hits ?? [];
        return cache;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

export function SiteSearch() {
  const router = useRouter();
  const listId = useId();
  const boxRef = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState<SearchHit[]>(cache ?? []);
  const hits = rankHits(index, q, 10);

  useEffect(() => {
    void loadIndex().then(setIndex);
  }, []);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function go(hit?: SearchHit) {
    const target = hit ?? hits[0];
    if (!target) return;
    setOpen(false);
    setQ("");
    router.push(target.href);
  }

  return (
    <div className="site-search" ref={boxRef}>
      <input
        type="search"
        value={q}
        autoComplete="off"
        aria-autocomplete="list"
        aria-expanded={open && hits.length > 0}
        aria-controls={listId}
        placeholder="Search Digimon, guides, dungeons, accessories…"
        aria-label="Search the wiki"
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
          setActive(0);
        }}
        onFocus={() => {
          void loadIndex().then(setIndex);
          if (q.trim()) setOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((i) => Math.min(i + 1, Math.max(hits.length - 1, 0)));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((i) => Math.max(i - 1, 0));
          } else if (e.key === "Enter") {
            e.preventDefault();
            go(hits[active]);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
      />
      {open && q.trim() && hits.length > 0 ? (
        <ul id={listId} className="site-search-list" role="listbox">
          {hits.map((hit, i) => (
            <li key={hit.href + hit.title} role="option" aria-selected={i === active}>
              <button
                type="button"
                className={i === active ? "is-on" : undefined}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(hit)}
              >
                <strong>{hit.title}</strong>
                <span>{hit.kind}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {open && q.trim() && hits.length === 0 && index.length > 0 ? (
        <p className="site-search-empty">No matching pages.</p>
      ) : null}
    </div>
  );
}
