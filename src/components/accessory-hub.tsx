"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { AccessoryCategory } from "@/lib/accessory-types";
import { AccessoryPanel } from "@/components/accessory-slot";

export function AccessoryHub({ categories }: { categories: AccessoryCategory[] }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) setOpen((prev) => ({ ...prev, [hash]: true }));
  }, []);

  function toggle(slug: string) {
    setOpen((prev) => {
      const next = { ...prev, [slug]: !prev[slug] };
      const url = next[slug] ? `#${slug}` : "/accessory";
      window.history.replaceState(null, "", url);
      return next;
    });
  }

  return (
    <article className="mw-article">
      <div className="mw-pre-title">From DMI Wiki · Tamer</div>
      <h1 className="mw-firstHeading">Accessory</h1>
      <p>
        Tamer accessory slots. Open a category to list every piece, then roll
        options to match the mercenary&apos;s{" "}
        <Link href="/roles">role</Link> (SK / AA / TA / SUP). Option Change
        Stone rerolls the lines; Number Change Stone pushes them to max.
        Digitary Power goes to 200% on QueenChessmon stones.
      </p>
      <p className="guide-hint">
        DMI rolls can differ from official DMO. Update a category in Editor
        mode when you confirm a drop or a max number.
      </p>
      <ul className="guide-points acc-points">
        {categories.map((cat) => {
          const shown = Boolean(open[cat.slug]);
          return (
            <li key={cat.slug} id={cat.slug}>
              <span className="acc-line">
                {cat.title}{" "}
                <button
                  type="button"
                  className="acc-toggle"
                  aria-expanded={shown}
                  onClick={() => toggle(cat.slug)}
                >
                  ({shown ? "Hide" : "Show"})
                </button>
              </span>
              {shown ? <AccessoryPanel category={cat} /> : null}
            </li>
          );
        })}
      </ul>
    </article>
  );
}
