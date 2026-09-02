"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { AccessoryCategory } from "@/lib/accessory-types";
import { AccessoryPanel } from "@/components/accessory-slot";
import { TicketChip } from "@/components/ticket-chip";
import { useEditorMode } from "@/components/editor-mode";

const GLYPH: Record<string, string> = {
  rings: "Rg",
  necklaces: "Nk",
  earrings: "Er",
  bracelets: "Br",
};

export function AccessoryHub({ categories }: { categories: AccessoryCategory[] }) {
  const { editing } = useEditorMode();
  const router = useRouter();
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [icons, setIcons] = useState<Record<string, string>>(() =>
    Object.fromEntries(categories.map((c) => [c.slug, c.icon])),
  );

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) setOpen((prev) => ({ ...prev, [hash]: true }));
  }, []);

  useEffect(() => {
    setIcons(Object.fromEntries(categories.map((c) => [c.slug, c.icon])));
  }, [categories]);

  function toggle(slug: string) {
    setOpen((prev) => ({ ...prev, [slug]: !prev[slug] }));
  }

  async function saveIcon(slug: string, url: string) {
    setIcons((prev) => ({ ...prev, [slug]: url }));
    await fetch(`/api/accessories/${slug}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ icon: url }),
    });
    router.refresh();
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
                <TicketChip
                  src={icons[cat.slug] || cat.icon}
                  label={cat.title}
                  uploadName={`acc-slot-${cat.slug}`}
                  uploadable={editing}
                  emptyLabel={GLYPH[cat.slug] ?? "·"}
                  onUploaded={(url) => void saveIcon(cat.slug, url)}
                />
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
