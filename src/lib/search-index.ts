import "server-only";
import { listAccessoryCategories } from "@/lib/accessories";
import { listDigimon } from "@/lib/catalog";
import { listDungeons } from "@/lib/dungeons";
import { listGuides } from "@/lib/guides";
import { SEARCH_INDEX } from "@/lib/wiki";
import type { SearchHit } from "@/lib/search-match";

export type { SearchHit };

export function buildSearchIndex(): SearchHit[] {
  const hits: SearchHit[] = [];

  for (const d of listDigimon()) {
    hits.push({
      href: `/digimon/${d.slug}`,
      title: d.name,
      kind: "Digimon",
      text: `${d.jp ?? ""} ${d.role} ${d.rank} ${d.lines.join(" ")}`,
    });
  }

  for (const g of listGuides()) {
    hits.push({
      href: `/guide/${g.slug}`,
      title: g.title,
      kind: "Guide",
      text: g.body.slice(0, 240),
    });
  }

  for (const d of listDungeons()) {
    hits.push({
      href: `/dungeons/${d.slug}`,
      title: d.title,
      kind: "Dungeon",
      text: `${d.ticketName} ${d.body.slice(0, 200)}`,
    });
  }

  for (const cat of listAccessoryCategories()) {
    hits.push({
      href: `/accessory#${cat.slug}`,
      title: cat.title,
      kind: "Accessory",
      text: cat.blurb,
    });
    for (const item of cat.items) {
      hits.push({
        href: `/accessory#${cat.slug}`,
        title: item.name,
        kind: "Accessory",
        text: `${cat.title} ${item.obtain} ${item.options}`,
      });
    }
  }

  for (const page of SEARCH_INDEX) {
    if (page.href.startsWith("/digimon/")) continue;
    hits.push({
      href: page.href,
      title: page.title,
      kind: "Page",
      text: page.text,
    });
  }

  return hits;
}
