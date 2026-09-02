import "server-only";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "fs";
import path from "path";
import { slugifyName } from "@/lib/evo-layout";
import type { DungeonEntry, DungeonHubArt } from "@/lib/dungeon-types";

export type { DungeonEntry, DungeonHubArt };

const FILE = path.join(process.cwd(), "data/dungeons.json");

function page(title: string, ticket: string, extra: string) {
  return `Instance dungeon. Entry is at D-Terminal (and the matching map warp).

Requires 1x **${ticket}** to enter.

${extra}

NOTE: Ticket sources and drop rates on DMI can differ from official DMO. Update this page in Editor mode when you confirm them.

## Farm notes
- Add bosses, box rates, and scan routes here.
- Related: [Guide](/guide)`;
}

const SEEDS: Omit<DungeonEntry, "id" | "order" | "updatedAt">[] = [
  {
    slug: "infinite-mountain",
    title: "Infinite Mountain",
    ticketName: "Pass [Infinite Mountain]",
    ticketIcon: "",
    body: page(
      "Infinite Mountain",
      "Pass [Infinite Mountain]",
      "Champion Devimon’s Giga Box is the usual fruit-scan farm. Mega Box packs sit on the other Champion spawns.",
    ),
  },
  {
    slug: "datamon-maze",
    title: "Datamon Maze",
    ticketName: "Datamon Card",
    ticketIcon: "",
    body: page(
      "Datamon Maze",
      "Datamon Card",
      "Normal / Hard share the Maze layout. Hard is the Nanomon Hero box scan route.",
    ),
  },
  {
    slug: "forge-underworks",
    title: "Forge Underworks",
    ticketName: "Pass [Forge Underworks]",
    ticketIcon: "",
    body: page(
      "Forge Underworks",
      "Pass [Forge Underworks]",
      "Alphamon Ouryuken Awaken. Rare Box scan for event fruits.",
    ),
  },
  {
    slug: "fanglongmon-dungeon",
    title: "Fanglongmon Dungeon Underground",
    ticketName: "Pass [Fanglongmon Dungeon]",
    ticketIcon: "",
    body: page(
      "Fanglongmon Dungeon Underground",
      "Pass [Fanglongmon Dungeon]",
      "Yin and Yang Box from Fanglongmon The Ruler of the East. Easy mode uses a cheaper ticket.",
    ),
  },
  {
    slug: "distorted-data-village",
    title: "Distorted Data Village",
    ticketName: "Pass [Distorted Data Village]",
    ticketIcon: "",
    body: page(
      "Distorted Data Village",
      "Pass [Distorted Data Village]",
      "Event / village instance. Confirm NPC and ticket on DMI before you farm.",
    ),
  },
  {
    slug: "scar-of-water-crystal",
    title: "Scar of Water Crystal",
    ticketName: "Pass [Scar of Water Crystal]",
    ticketIcon: "",
    body: page(
      "Scar of Water Crystal",
      "Pass [Scar of Water Crystal]",
      "Xuanwumon line instance. Easy / Hard use their own pass of the same chip family.",
    ),
  },
  {
    slug: "uprising-flame",
    title: "Uprising Flame",
    ticketName: "Pass [Uprising Flame]",
    ticketIcon: "",
    body: page(
      "Uprising Flame",
      "Pass [Uprising Flame]",
      "Zhuqiaomon line instance.",
    ),
  },
  {
    slug: "trace-of-black-steel",
    title: "Trace of Black Steel",
    ticketName: "Pass [Trace of Black Steel]",
    ticketIcon: "",
    body: page(
      "Trace of Black Steel",
      "Pass [Trace of Black Steel]",
      "Daily Guilmon tickets in D-Terminal on official DMO. Confirm the DMI vendor.",
    ),
  },
  {
    slug: "descending-thunder-god",
    title: "Descending Thunder God",
    ticketName: "Pass [Descending Thunder God]",
    ticketIcon: "",
    body: page(
      "Descending Thunder God",
      "Pass [Descending Thunder God]",
      "Paired with Trace of Black Steel as a daily instance.",
    ),
  },
];

type Store = { entries: DungeonEntry[]; hub: DungeonHubArt };

function defaultHub(): DungeonHubArt {
  return { stageHeight: 420, pins: [] };
}

function empty(): Store {
  return { entries: [], hub: defaultHub() };
}

let mem: { mtime: number; store: Store } | null = null;

function normalize(d: DungeonEntry, index: number): DungeonEntry {
  return {
    ...d,
    ticketName: d.ticketName ?? "",
    ticketIcon: d.ticketIcon ?? "",
    body: d.body ?? "",
    order: typeof d.order === "number" ? d.order : index,
  };
}

function load(): Store {
  if (!existsSync(FILE)) {
    mkdirSync(path.dirname(FILE), { recursive: true });
    const created = empty();
    writeFileSync(FILE, JSON.stringify(created));
    mem = { mtime: Date.now(), store: created };
    return created;
  }
  const mtime = statSync(FILE).mtimeMs;
  if (mem && mem.mtime === mtime) return mem.store;
  try {
    const raw = JSON.parse(readFileSync(FILE, "utf8")) as Partial<Store>;
    const store: Store = {
      entries: (raw.entries ?? []).map(normalize),
      hub: {
        stageHeight: Math.max(240, Math.min(1600, Number(raw.hub?.stageHeight) || 420)),
        pins: Array.isArray(raw.hub?.pins) ? raw.hub.pins : [],
      },
    };
    mem = { mtime, store };
    return store;
  } catch {
    return empty();
  }
}

function save(store: Store) {
  mkdirSync(path.dirname(FILE), { recursive: true });
  writeFileSync(FILE, JSON.stringify(store));
  mem = { mtime: Date.now(), store };
}

function uniqueSlug(title: string, used: Set<string>) {
  const base = slugifyName(title) || `dungeon-${Date.now()}`;
  let slug = base;
  let n = 2;
  while (used.has(slug)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}

function ensureSeeds(store: Store) {
  let changed = false;
  const used = new Set(store.entries.map((e) => e.slug));
  const now = new Date().toISOString();
  SEEDS.forEach((seed, i) => {
    if (used.has(seed.slug)) return;
    store.entries.push({
      ...seed,
      id: `d-seed-${seed.slug}`,
      order: i,
      updatedAt: now,
    });
    used.add(seed.slug);
    changed = true;
  });
  if (changed) {
    const want = SEEDS.map((s) => s.slug);
    const seeded = store.entries.filter((e) => want.includes(e.slug));
    const extra = store.entries.filter((e) => !want.includes(e.slug));
    seeded.sort((a, b) => want.indexOf(a.slug) - want.indexOf(b.slug));
    seeded.forEach((e, i) => {
      e.order = i;
    });
    extra.forEach((e, i) => {
      e.order = seeded.length + i;
    });
    store.entries = [...seeded, ...extra];
    save(store);
  }
  return store;
}

export function listDungeons(): DungeonEntry[] {
  return [...ensureSeeds(load()).entries].sort(
    (a, b) => a.order - b.order || a.title.localeCompare(b.title),
  );
}

export function getDungeon(slug: string): DungeonEntry | undefined {
  return ensureSeeds(load()).entries.find((e) => e.slug === slug);
}

export function getDungeonHub(): DungeonHubArt {
  return ensureSeeds(load()).hub ?? defaultHub();
}

export function saveDungeonHub(hub: Partial<DungeonHubArt>): DungeonHubArt {
  const store = ensureSeeds(load());
  const current = store.hub ?? defaultHub();
  store.hub = {
    stageHeight: Math.max(
      240,
      Math.min(1600, Number(hub.stageHeight ?? current.stageHeight) || 420),
    ),
    pins: Array.isArray(hub.pins) ? hub.pins : current.pins,
  };
  save(store);
  return store.hub;
}

export function createDungeon(input: {
  title: string;
  body?: string;
  ticketName?: string;
}): DungeonEntry {
  const store = ensureSeeds(load());
  const used = new Set(store.entries.map((e) => e.slug));
  const title = input.title.trim() || "New dungeon";
  const ticketName = input.ticketName?.trim() || `Pass [${title}]`;
  const entry: DungeonEntry = {
    id: `d${Date.now()}`,
    slug: uniqueSlug(title, used),
    title,
    body: input.body ?? page(title, ticketName, "Write bosses, tickets, and farms here."),
    ticketName,
    ticketIcon: "",
    order: store.entries.reduce((m, e) => Math.max(m, e.order), -1) + 1,
    updatedAt: new Date().toISOString(),
  };
  store.entries.push(entry);
  save(store);
  return entry;
}

export function updateDungeon(
  slug: string,
  patch: Partial<
    Pick<DungeonEntry, "title" | "body" | "ticketName" | "ticketIcon" | "order">
  >,
): DungeonEntry | undefined {
  const store = ensureSeeds(load());
  const entry = store.entries.find((e) => e.slug === slug);
  if (!entry) return undefined;
  if (typeof patch.title === "string" && patch.title.trim()) entry.title = patch.title.trim();
  if (typeof patch.body === "string") entry.body = patch.body;
  if (typeof patch.ticketName === "string") entry.ticketName = patch.ticketName;
  if (typeof patch.ticketIcon === "string") entry.ticketIcon = patch.ticketIcon;
  if (typeof patch.order === "number") entry.order = patch.order;
  entry.updatedAt = new Date().toISOString();
  save(store);
  return entry;
}

export function reorderDungeons(slugs: string[]): DungeonEntry[] {
  const store = ensureSeeds(load());
  const bySlug = new Map(store.entries.map((e) => [e.slug, e]));
  const next: DungeonEntry[] = [];
  slugs.forEach((slug, i) => {
    const e = bySlug.get(slug);
    if (!e) return;
    e.order = i;
    next.push(e);
    bySlug.delete(slug);
  });
  for (const e of bySlug.values()) {
    e.order = next.length;
    next.push(e);
  }
  store.entries = next;
  save(store);
  return listDungeons();
}

export function deleteDungeon(slug: string): boolean {
  const store = load();
  const next = store.entries.filter((e) => e.slug !== slug);
  if (next.length === store.entries.length) return false;
  store.entries = next.map((e, i) => ({ ...e, order: i }));
  save(store);
  return true;
}
