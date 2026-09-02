import "server-only";
import { existsSync, readFileSync, statSync } from "fs";
import { dataFile, readableDataFile, tryWriteFile } from "@/lib/paths";
import { pushLiveFile } from "@/lib/github-live";
import type { WikiLandPage } from "@/lib/page-types";
import { defaultBlocks } from "@/lib/page-types";

export type { WikiLandPage };

const FILE = dataFile("pages.json");

const DEFAULTS: Record<string, WikiLandPage> = {
  home: {
    slug: "home",
    title: "Main Page",
    category: "",
    infoboxTitle: "",
    infobox: [],
    body: `Encyclopedia for **Digimon Masters Infinite**. Partner pages follow DMO wiki shape — infobox, stats, and digivolution line.

## Digimon List
- [Every listed form](/digimon) — rank, role, and default stats

## Guide
- [Guide board](/guide) — topics posted on the wiki
- [Dungeons](/dungeons) — farms and scan routes

## Tamer
- [Accessory](/accessory)`,
    blocks: [],
  },
  accessory: {
    slug: "accessory",
    title: "Accessory",
    category: "Tamer",
    infoboxTitle: "Accessory",
    infobox: [{ label: "Status", value: "Tables incoming" }],
    body: `Tamer accessory stats, slots, and where they drop. Edit this page in Editor mode to add tables and drop sources.`,
    blocks: [],
  },
  clothing: {
    slug: "clothing",
    title: "Clothing",
    category: "Tamer",
    infoboxTitle: "Clothing",
    infobox: [{ label: "Status", value: "Tables incoming" }],
    body: `Tamer clothing and costumes. Edit this page in Editor mode to add set bonuses and sources.`,
    blocks: [],
  },
  dungeons: {
    slug: "dungeons",
    title: "Dungeons",
    category: "Guide",
    infoboxTitle: "Dungeons",
    infobox: [
      { label: "Guides", value: "[Topic board](/guide)" },
      { label: "Scan farms", value: "Forge, Maze, Infinite Mountain" },
    ],
    body: `Dungeon pages will list maps, bosses, and recommended farms. Written routes can go on the [Guide](/guide) board.

- Forge / Maze / Infinite Mountain — scan boxes
- Infinite Mountain Champion Devimon — Giga Box farm at 19% box rate`,
    blocks: [],
  },
};

type Store = { pages: Record<string, WikiLandPage> };

let mem: { mtime: number; store: Store } | null = null;

function load(): Store {
  const fromDisk = readableDataFile("pages.json");
  if (!existsSync(fromDisk)) {
    return { pages: { ...DEFAULTS } };
  }
  const mtime = statSync(fromDisk).mtimeMs;
  if (mem && mem.mtime === mtime) return mem.store;
  try {
    const raw = JSON.parse(readFileSync(fromDisk, "utf8")) as Store;
    const store = { pages: { ...DEFAULTS, ...(raw.pages ?? {}) } };
    mem = { mtime, store };
    return store;
  } catch {
    return { pages: { ...DEFAULTS } };
  }
}

async function save(store: Store) {
  const json = JSON.stringify(store);
  tryWriteFile(FILE, json);
  mem = { mtime: Date.now(), store };
  await pushLiveFile("data/pages.json", json, "Save wiki pages");
}

export function getLandPage(slug: string): WikiLandPage {
  const pages = load().pages;
  const raw =
    pages[slug] ??
    DEFAULTS[slug] ?? {
      slug,
      title: slug,
      category: "",
      infoboxTitle: "",
      infobox: [],
      body: "",
      blocks: [],
    };
  return {
    ...raw,
    slug,
    infobox: raw.infobox ?? [],
    body: raw.body ?? "",
    blocks: defaultBlocks(raw),
  };
}

export async function saveLandPage(page: WikiLandPage): Promise<WikiLandPage> {
  const store = load();
  const next: WikiLandPage = {
    slug: page.slug,
    title: page.title.trim() || page.slug,
    category: page.category ?? "",
    infoboxTitle: page.infoboxTitle ?? "",
    infobox: Array.isArray(page.infobox) ? page.infobox : [],
    body: page.body ?? "",
    blocks: Array.isArray(page.blocks) ? page.blocks : defaultBlocks(page),
  };
  store.pages[page.slug] = next;
  await save(store);
  return next;
}
