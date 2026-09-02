"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export type FeaturedPick = {
  slug: string;
  name: string;
  thumb?: string;
};

export function NewDigimonPack({
  items,
  options,
  canEdit,
}: {
  items: FeaturedPick[];
  options: FeaturedPick[];
  canEdit: boolean;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [count, setCount] = useState(Math.max(items.length, 1));
  const [slugs, setSlugs] = useState(items.map((i) => i.slug));
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  const bySlug = useMemo(() => {
    const map = new Map(options.map((o) => [o.slug, o]));
    return map;
  }, [options]);

  const visible = editing
    ? slugs
        .slice(0, count)
        .map((slug) => bySlug.get(slug))
        .filter((d): d is FeaturedPick => Boolean(d))
    : items;

  const left = visible.filter((_, i) => i % 2 === 0);
  const right = visible.filter((_, i) => i % 2 === 1);

  const needle = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!needle) return options.slice(0, 40);
    return options
      .filter(
        (o) =>
          o.name.toLowerCase().includes(needle) || o.slug.includes(needle),
      )
      .slice(0, 40);
  }, [needle, options]);

  function setSlot(index: number, slug: string) {
    setSlugs((prev) => {
      const next = [...prev];
      next[index] = slug;
      return next;
    });
  }

  function addSlug(slug: string) {
    setSlugs((prev) => {
      if (prev.slice(0, count).includes(slug)) return prev;
      const next = [...prev];
      const empty = next.findIndex((s, i) => i < count && !s);
      if (empty >= 0) {
        next[empty] = slug;
        return next;
      }
      if (next.length < count) return [...next, slug];
      return next;
    });
  }

  async function save() {
    setStatus("Saving…");
    const n = Math.max(0, Math.min(40, count));
    const res = await fetch("/api/home", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count: n, slugs: slugs.slice(0, n) }),
    });
    if (!res.ok) {
      setStatus("Save failed — sign in first.");
      return;
    }
    setStatus("Saved.");
    setEditing(false);
    router.refresh();
  }

  return (
    <section className="newPack">
      <div className="newBar">
        New Digimon
        {canEdit ? (
          <button
            type="button"
            className="newBar-edit"
            onClick={() => setEditing((v) => !v)}
          >
            {editing ? "Close" : "Edit box"}
          </button>
        ) : null}
      </div>

      {editing ? (
        <div className="newEdit">
          <label>
            How many to show
            <input
              type="number"
              min={1}
              max={40}
              value={count}
              onChange={(e) => setCount(Number(e.target.value) || 1)}
            />
          </label>
          <p className="section-lead">
            Pick from the catalog. Slot order is left column, then right.
          </p>
          <ol className="newSlots">
            {Array.from({ length: count }, (_, i) => {
              const slug = slugs[i] ?? "";
              const pick = bySlug.get(slug);
              return (
                <li key={i}>
                  <span>{i + 1}.</span>
                  <input
                    list="home-digimon"
                    value={pick?.name ?? slug}
                    placeholder="Type a Digimon name"
                    onChange={(e) => {
                      const name = e.target.value;
                      const hit =
                        options.find((o) => o.name === name) ??
                        options.find(
                          (o) => o.name.toLowerCase() === name.toLowerCase(),
                        );
                      if (hit) setSlot(i, hit.slug);
                    }}
                  />
                </li>
              );
            })}
          </ol>
          <datalist id="home-digimon">
            {options.map((o) => (
              <option key={o.slug} value={o.name} />
            ))}
          </datalist>
          <label>
            Search catalog
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter the list, then click to fill the next slot"
            />
          </label>
          <ul className="newHits">
            {matches.map((o) => (
              <li key={o.slug}>
                <button type="button" onClick={() => addSlug(o.slug)}>
                  {o.thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={o.thumb} alt="" width={24} height={24} />
                  ) : (
                    <span className="newMark">{o.name.slice(0, 2)}</span>
                  )}
                  {o.name}
                </button>
              </li>
            ))}
          </ul>
          <p>
            <button type="button" onClick={() => void save()}>
              Save New Digimon box
            </button>
            {status ? <span className="editor-status"> {status}</span> : null}
          </p>
        </div>
      ) : null}

      <div className="newGrid">
        <div>
          {left.map((item) => (
            <NewRow key={item.slug} item={item} />
          ))}
        </div>
        <div>
          {right.map((item) => (
            <NewRow key={item.slug} item={item} />
          ))}
        </div>
      </div>
      <div className="newBar" />
    </section>
  );
}

function NewRow({ item }: { item: FeaturedPick }) {
  return (
    <Link href={`/digimon/${item.slug}`} className="newItem">
      {item.thumb ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.thumb} alt="" width={36} height={36} />
      ) : (
        <span className="newMark">{item.name.slice(0, 2)}</span>
      )}
      <span>{item.name}</span>
    </Link>
  );
}
