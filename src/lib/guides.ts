import "server-only";
import { existsSync, readFileSync, statSync } from "fs";
import { dataFile, tryWriteFile } from "@/lib/paths";
import { pushLiveFile } from "@/lib/github-live";
import { slugifyName } from "@/lib/evo-layout";
import type { GuideHubArt, GuidePin, GuidePost } from "@/lib/guide-types";

export type { GuideHubArt, GuidePin, GuidePost };

const FILE = dataFile("guides.json");

const LEVEL_UP = `This page is how you raise a partner’s **main level** and **skill level** on Digimon Masters Infinite.

NOTE: If you already clear hard maps, run a short farm loop and change maps when the spawn dries up.

NOTE: Use this section after you have finished the main quest.

- Skill / Attribute EXP does not follow the same curve as main EXP.
- Most EXP boosters do not multiply quest EXP.

## Experience by level gap

| Lv Diff | Acquired EXP |
| --- | --- |
| -170 ~ -30 | 0% |
| -29 ~ -20 | 20% |
| -19 ~ -10 | 40% |
| -9 ~ -1 | 70% |
| 0 | 100% |
| 1 ~ 4 | 120% |
| 5 ~ 9 | 140% |
| 10 ~ 14 | 160% |
| 15 ~ 19 | 180% |
| 20 ~ 24 | 190% |
| 25 ~ 29 | 200% |
`;

const SEEDS: { slug: string; title: string; body: string }[] = [
  {
    slug: "level-up-guide",
    title: "Level Up Guide",
    body: LEVEL_UP,
  },
  {
    slug: "partner-digimon-burst-mode-quests",
    title: "Partner Digimon Burst Mode Quests",
    body: `Quest steps and item checks for partner **Burst Mode**.

NOTE: Finish the matching Jogress or Burst unlock NPC before you farm the last item.

Write the route here. Upload maps and screenshots with Editor mode.`,
  },
  {
    slug: "jogress-quests",
    title: "Jogress Quests",
    body: `Jogress unlock quests, NPC order, and what to bring.

- List each Jogress here as you confirm it on DMI.
- Link related partners from the [Digimon List](/digimon).`,
  },
  {
    slug: "true-digivice",
    title: "True Digivice",
    body: `How to get **True Digivice**, where it is used, and what it costs.

Add pictures of the NPC and the item window in Editor mode.`,
  },
  {
    slug: "d-ark-limited-edition",
    title: "D-Ark Limited Edition",
    body: `**D-Ark Limited Edition** source, stats, and who it is worth on.`,
  },
  {
    slug: "xros-loader-fusion-loader",
    title: "Xros Loader / Fusion Loader",
    body: `**Xros Loader** / Fusion Loader — how you obtain it and what fusion lines need it.`,
  },
  {
    slug: "adventure-goggles",
    title: "Adventure Goggles",
    body: `**Adventure Goggles** — drop or quest source, and why tamers farm them.`,
  },
];

type Store = { posts: GuidePost[]; hub: GuideHubArt };

function defaultHub(): GuideHubArt {
  return { stageHeight: 420, pins: [] };
}

function empty(): Store {
  return { posts: [], hub: defaultHub() };
}

let mem: { mtime: number; store: Store } | null = null;

function normalize(post: GuidePost, index: number): GuidePost {
  return {
    ...post,
    order: typeof post.order === "number" ? post.order : index,
    pins: post.pins ?? [],
    stageHeight: post.stageHeight || 420,
    body: post.body ?? "",
  };
}

function load(): Store {
  if (!existsSync(FILE)) {
    const created = empty();
    tryWriteFile(FILE, JSON.stringify(created));
    void pushLiveFile("data/guides.json", JSON.stringify(created), "Seed guides");
    mem = { mtime: Date.now(), store: created };
    return created;
  }
  const mtime = statSync(FILE).mtimeMs;
  if (mem && mem.mtime === mtime) return mem.store;
  try {
    const raw = JSON.parse(readFileSync(FILE, "utf8")) as {
      posts?: GuidePost[];
      hub?: GuideHubArt;
    };
    const store = {
      posts: (Array.isArray(raw.posts) ? raw.posts : []).map(normalize),
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

async function save(store: Store) {
  const json = JSON.stringify(store);
  tryWriteFile(FILE, json);
  mem = { mtime: Date.now(), store };
  await pushLiveFile("data/guides.json", json, "Save guides");
}

function uniqueSlug(title: string, used: Set<string>) {
  const base = slugifyName(title) || `topic-${Date.now()}`;
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
  const used = new Set(store.posts.map((p) => p.slug));
  const now = new Date().toISOString();
  let order = store.posts.reduce((m, p) => Math.max(m, p.order ?? 0), -1);
  SEEDS.forEach((seed, i) => {
    if (used.has(seed.slug)) return;
    order += 1;
    store.posts.push({
      id: `g-seed-${seed.slug}`,
      slug: seed.slug,
      title: seed.title,
      body: seed.body,
      author: "Admin",
      createdAt: now,
      updatedAt: now,
      order: seed.slug === "level-up-guide" ? i : order,
      stageHeight: 420,
      pins: [],
    });
    used.add(seed.slug);
    changed = true;
  });
  if (changed) {
    store.posts.forEach((p, i) => {
      if (typeof p.order !== "number") p.order = i;
    });
    const want = SEEDS.map((s) => s.slug);
    const seeded = store.posts.filter((p) => want.includes(p.slug));
    const extra = store.posts.filter((p) => !want.includes(p.slug));
    seeded.sort(
      (a, b) => want.indexOf(a.slug) - want.indexOf(b.slug),
    );
    seeded.forEach((p, i) => {
      p.order = i;
    });
    extra.forEach((p, i) => {
      p.order = seeded.length + i;
    });
    store.posts = [...seeded, ...extra];
    void save(store);
  }
  return store;
}

export function listGuides(): GuidePost[] {
  const store = ensureSeeds(load());
  return [...store.posts].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getGuide(slug: string): GuidePost | undefined {
  return ensureSeeds(load()).posts.find((p) => p.slug === slug);
}

export async function createGuide(input: {
  title: string;
  body: string;
  stageHeight?: number;
  pins?: GuidePin[];
  author?: string;
}): Promise<GuidePost> {
  const store = ensureSeeds(load());
  const used = new Set(store.posts.map((p) => p.slug));
  const now = new Date().toISOString();
  const order = store.posts.reduce((m, p) => Math.max(m, p.order ?? 0), -1) + 1;
  const post: GuidePost = {
    id: `g${Date.now()}`,
    slug: uniqueSlug(input.title, used),
    title: input.title.trim() || "New guide",
    body: input.body ?? "",
    author: input.author || "Admin",
    createdAt: now,
    updatedAt: now,
    order,
    stageHeight: Math.max(240, Math.min(1600, input.stageHeight || 420)),
    pins: input.pins ?? [],
  };
  store.posts.push(post);
  await save(store);
  return post;
}

export async function updateGuide(
  slug: string,
  patch: Partial<Pick<GuidePost, "title" | "body" | "stageHeight" | "pins" | "order">>,
): Promise<GuidePost | undefined> {
  const store = ensureSeeds(load());
  const post = store.posts.find((p) => p.slug === slug);
  if (!post) return undefined;
  if (typeof patch.title === "string" && patch.title.trim()) {
    post.title = patch.title.trim();
  }
  if (typeof patch.body === "string") post.body = patch.body;
  if (typeof patch.stageHeight === "number") {
    post.stageHeight = Math.max(240, Math.min(1600, patch.stageHeight));
  }
  if (Array.isArray(patch.pins)) post.pins = patch.pins;
  if (typeof patch.order === "number") post.order = patch.order;
  post.updatedAt = new Date().toISOString();
  await save(store);
  return post;
}

export async function reorderGuides(slugs: string[]): Promise<GuidePost[]> {
  const store = ensureSeeds(load());
  const bySlug = new Map(store.posts.map((p) => [p.slug, p]));
  const next: GuidePost[] = [];
  slugs.forEach((slug, i) => {
    const post = bySlug.get(slug);
    if (!post) return;
    post.order = i;
    next.push(post);
    bySlug.delete(slug);
  });
  for (const post of bySlug.values()) {
    post.order = next.length;
    next.push(post);
  }
  store.posts = next;
  await save(store);
  return listGuides();
}

export function getGuideHub(): GuideHubArt {
  return ensureSeeds(load()).hub ?? defaultHub();
}

export async function saveGuideHub(hub: Partial<GuideHubArt>): Promise<GuideHubArt> {
  const store = ensureSeeds(load());
  const current = store.hub ?? defaultHub();
  store.hub = {
    stageHeight: Math.max(
      240,
      Math.min(1600, Number(hub.stageHeight ?? current.stageHeight) || 420),
    ),
    pins: Array.isArray(hub.pins) ? hub.pins : current.pins,
  };
  await save(store);
  return store.hub;
}

export async function deleteGuide(slug: string): Promise<boolean> {
  const store = load();
  const next = store.posts.filter((p) => p.slug !== slug);
  if (next.length === store.posts.length) return false;
  store.posts = next.map((p, i) => ({ ...p, order: i }));
  await save(store);
  return true;
}
