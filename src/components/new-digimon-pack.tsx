"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useEditorMode } from "@/components/editor-mode";

export type FeaturedPick = {
  slug: string;
  name: string;
  thumb?: string;
};

export function NewDigimonPack({
  items,
  title = "New Digimon",
  panelOpen = false,
  onToggle,
  onPersist,
  chromeEdit = true,
}: {
  items: FeaturedPick[];
  title?: string;
  panelOpen?: boolean;
  onToggle?: () => void;
  onPersist?: (count: number, slugs: string[]) => Promise<void>;
  chromeEdit?: boolean;
}) {
  const router = useRouter();
  const { editing } = useEditorMode();
  const [count, setCount] = useState(Math.max(items.length, 1));
  const [slugs, setSlugs] = useState(items.map((i) => i.slug));
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const panel = Boolean(editing && (onToggle ? panelOpen : open));
  function toggle() {
    if (!editing) return;
    if (onToggle) onToggle();
    else setOpen((v) => !v);
  }
  const [status, setStatus] = useState("");
  const [options, setOptions] = useState<FeaturedPick[]>(items);

  const itemKey = items.map((i) => i.slug).join("|");
  useEffect(() => {
    setSlugs(items.map((i) => i.slug));
    setCount(Math.max(items.length, 1));
  }, [itemKey]);

  useEffect(() => {
    if (!editing) setOpen(false);
  }, [editing]);

  useEffect(() => {
    if (!panel) return;
    let cancelled = false;
    fetch("/api/catalog", { credentials: "include" })
      .then((res) => res.json())
      .then((data: { forms?: { slug: string; name: string; icon?: string; art?: string }[] }) => {
        if (cancelled) return;
        const next = (data.forms ?? []).map((d) => ({
          slug: d.slug,
          name: d.name,
          thumb: d.icon || d.art || undefined,
        }));
        setOptions(next.length ? next : items);
      })
      .catch(() => {
        if (!cancelled) setOptions(items);
      });
    return () => {
      cancelled = true;
    };
  }, [panel, items]);

  const bySlug = useMemo(() => {
    const map = new Map(options.map((o) => [o.slug, o]));
    for (const item of items) map.set(item.slug, item);
    return map;
  }, [options, items]);

  const visible = slugs
    .slice(0, count)
    .map((slug) => bySlug.get(slug) ?? items.find((i) => i.slug === slug))
    .filter((d): d is FeaturedPick => Boolean(d));

  const left = visible.filter((_, i) => i % 2 === 0);
  const right = visible.filter((_, i) => i % 2 === 1);

  const needle = query.trim().toLowerCase();
  const matches = useMemo(() => {
    const pool = options;
    if (!needle) return pool.slice(0, 50);
    return pool
      .filter(
        (o) =>
          o.name.toLowerCase().includes(needle) || o.slug.includes(needle),
      )
      .slice(0, 50);
  }, [needle, options]);

  function setSlot(index: number, slug: string) {
    setSlugs((prev) => {
      const next = [...prev];
      while (next.length <= index) next.push("");
      next[index] = slug;
      return next;
    });
  }

  function addSlug(slug: string) {
    setSlugs((prev) => {
      const next = [...prev];
      while (next.length < count) next.push("");
      const empty = next.findIndex((s, i) => i < count && !s);
      if (empty >= 0) {
        next[empty] = slug;
        return next;
      }
      setCount((c) => Math.min(40, c + 1));
      return [...next, slug];
    });
  }

  async function save() {
    setStatus("Saving…");
    const n = Math.max(1, Math.min(40, count));
    const payload = { count: n, slugs: slugs.slice(0, n).filter(Boolean) };
    if (onPersist) {
      try {
        await onPersist(n, payload.slugs);
        setStatus("Saved.");
        router.refresh();
      } catch (err) {
        setStatus(err instanceof Error ? err.message : "Save failed.");
      }
      return;
    }
    const res = await fetch("/api/home", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as {
      error?: string;
      home?: { slugs: string[] };
    };
    if (!res.ok) {
      setStatus(data.error || "Save failed — Sign in and turn on Editor mode.");
      return;
    }
    setStatus("Saved.");
    router.refresh();
  }

  return (
    <section className="newPack">
      <div className="newBar">
        {title}
        {editing && chromeEdit ? (
          <button type="button" className="newBar-edit" onClick={toggle}>
            {panel ? "Close" : "Edit"}
          </button>
        ) : null}
      </div>

      {panel ? (
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
            Pick a Digimon for each slot, then Save. Slot order is left column,
            then right.
          </p>
          <ol className="newSlots">
            {Array.from({ length: count }, (_, i) => {
              const slug = slugs[i] ?? "";
              return (
                <li key={i}>
                  <span>{i + 1}.</span>
                  <select
                    value={slug}
                    onChange={(e) => setSlot(i, e.target.value)}
                  >
                    <option value="">Choose…</option>
                    {options.map((o) => (
                      <option key={o.slug} value={o.slug}>
                        {o.name}
                      </option>
                    ))}
                    {slug && !options.some((o) => o.slug === slug) ? (
                      <option value={slug}>{slug}</option>
                    ) : null}
                  </select>
                </li>
              );
            })}
          </ol>
          <label>
            Search catalog
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter, then click a name to fill the next empty slot"
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
            <button type="button" className="mw-signin" onClick={() => void save()}>
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
        <img src={item.thumb} alt="" width={52} height={52} />
      ) : (
        <span className="newMark">{item.name.slice(0, 2)}</span>
      )}
      <span>{item.name}</span>
    </Link>
  );
}
