import "server-only";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { slugifyName } from "@/lib/evo-layout";
import type { GuidePin, GuidePost } from "@/lib/guide-types";

export type { GuidePin, GuidePost };

const FILE = path.join(process.cwd(), "data/guides.json");

type Store = { posts: GuidePost[] };

function empty(): Store {
  return { posts: [] };
}

function load(): Store {
  if (!existsSync(FILE)) {
    mkdirSync(path.dirname(FILE), { recursive: true });
    writeFileSync(FILE, JSON.stringify(empty(), null, 2));
    return empty();
  }
  try {
    const raw = JSON.parse(readFileSync(FILE, "utf8")) as Store;
    return { posts: Array.isArray(raw.posts) ? raw.posts : [] };
  } catch {
    return empty();
  }
}

function save(store: Store) {
  mkdirSync(path.dirname(FILE), { recursive: true });
  writeFileSync(FILE, JSON.stringify(store, null, 2));
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

export function listGuides(): GuidePost[] {
  return [...load().posts].sort(
    (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
  );
}

export function getGuide(slug: string): GuidePost | undefined {
  return load().posts.find((p) => p.slug === slug);
}

export function createGuide(input: {
  title: string;
  body: string;
  stageHeight?: number;
  pins?: GuidePin[];
  author?: string;
}): GuidePost {
  const store = load();
  const used = new Set(store.posts.map((p) => p.slug));
  const now = new Date().toISOString();
  const post: GuidePost = {
    id: `g${Date.now()}`,
    slug: uniqueSlug(input.title, used),
    title: input.title.trim() || "Untitled topic",
    body: input.body ?? "",
    author: input.author || "Admin",
    createdAt: now,
    updatedAt: now,
    stageHeight: Math.max(240, Math.min(1600, input.stageHeight || 420)),
    pins: input.pins ?? [],
  };
  store.posts.unshift(post);
  save(store);
  return post;
}

export function updateGuide(
  slug: string,
  patch: Partial<
    Pick<GuidePost, "title" | "body" | "stageHeight" | "pins">
  >,
): GuidePost | undefined {
  const store = load();
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
  post.updatedAt = new Date().toISOString();
  save(store);
  return post;
}

export function deleteGuide(slug: string): boolean {
  const store = load();
  const next = store.posts.filter((p) => p.slug !== slug);
  if (next.length === store.posts.length) return false;
  store.posts = next;
  save(store);
  return true;
}
