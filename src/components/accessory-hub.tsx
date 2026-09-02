"use client";

import Link from "next/link";
import type { AccessoryCategory } from "@/lib/accessory-types";

const GLYPH: Record<string, string> = {
  rings: "Rg",
  necklaces: "Nk",
  earrings: "Er",
  bracelets: "Br",
};

export function AccessoryHub({ categories }: { categories: AccessoryCategory[] }) {
  return (
    <article className="mw-article">
      <div className="mw-pre-title">From DMI Wiki · Tamer</div>
      <h1 className="mw-firstHeading">Accessory</h1>
      <p>
        Tamer accessory slots. Pick a category for the full list, then roll
        options to match the mercenary&apos;s{" "}
        <Link href="/roles">role</Link> (SK / AA / TA / SUP). Option Change
        Stone rerolls the lines; Number Change Stone pushes them to max.
        Digitary Power goes to 200% on QueenChessmon stones.
      </p>
      <p className="guide-hint">
        DMI rolls can differ from official DMO. Update a category in Editor
        mode when you confirm a drop or a max number.
      </p>
      <div className="acc-cat-grid">
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/accessory/${cat.slug}`} className="acc-cat">
            <span className="ticket-chip evo-icon acc-cat-glyph" aria-hidden>
              <span className="evo-fallback">{GLYPH[cat.slug] ?? "·"}</span>
            </span>
            <span>
              <strong>{cat.title}</strong>
              <em>
                {cat.items.filter((i) => i.recommended).length} recommended ·{" "}
                {cat.items.length} listed
              </em>
            </span>
          </Link>
        ))}
      </div>
    </article>
  );
}
