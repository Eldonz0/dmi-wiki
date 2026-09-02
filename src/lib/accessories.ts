import "server-only";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "fs";
import path from "path";
import { ACCESSORY_SEEDS } from "@/lib/accessory-seeds";
import { dataFile } from "@/lib/paths";
import {
  ACCESSORY_SLOTS,
  isAccessorySlot,
  type AccessoryCategory,
  type AccessoryItem,
  type AccessoryRoleRec,
  type AccessorySlot,
} from "@/lib/accessory-types";

export type { AccessoryCategory, AccessoryItem, AccessoryRoleRec, AccessorySlot };
export { ACCESSORY_SLOTS, isAccessorySlot };

const FILE = dataFile("accessories.json");

type Store = { categories: AccessoryCategory[] };

let mem: { mtime: number; store: Store } | null = null;

function cloneSeeds(): AccessoryCategory[] {
  return structuredClone(ACCESSORY_SEEDS);
}

function empty(): Store {
  return { categories: cloneSeeds() };
}

function normalizeItem(item: AccessoryItem, index: number): AccessoryItem {
  return {
    id: item.id || `a${index}-${Date.now()}`,
    name: item.name ?? "",
    icon: item.icon ?? "",
    options: item.options ?? "",
    numberChange:
      item.numberChange === "max" || item.numberChange === "na" ? item.numberChange : "need",
    obtain: item.obtain ?? "",
    recommended: Boolean(item.recommended),
  };
}

function normalizeCat(cat: AccessoryCategory): AccessoryCategory {
  const seed = ACCESSORY_SEEDS.find((s) => s.slug === cat.slug);
  return {
    slug: cat.slug,
    title: cat.title || seed?.title || cat.slug,
    blurb: cat.blurb || seed?.blurb || "",
    icon: cat.icon ?? seed?.icon ?? "",
    items: (cat.items ?? []).map(normalizeItem),
    roles: (cat.roles?.length ? cat.roles : seed?.roles ?? []).map((r) => ({
      role: r.role,
      primary: r.primary ?? "",
      secondary: r.secondary ?? "",
    })),
  };
}

function load(): Store {
  if (!existsSync(FILE)) {
    const created = empty();
    save(created);
    return created;
  }
  const mtime = statSync(FILE).mtimeMs;
  if (mem && mem.mtime === mtime) return mem.store;
  try {
    const raw = JSON.parse(readFileSync(FILE, "utf8")) as Partial<Store>;
    const bySlug = new Map(
      (raw.categories ?? []).filter((c) => isAccessorySlot(c.slug)).map((c) => [c.slug, c]),
    );
    const categories = ACCESSORY_SLOTS.map((slug) => {
      const existing = bySlug.get(slug);
      return existing ? normalizeCat(existing) : cloneSeeds().find((s) => s.slug === slug)!;
    });
    const store = { categories };
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

export function listAccessoryCategories(): AccessoryCategory[] {
  return load().categories;
}

export function getAccessoryCategory(slot: string): AccessoryCategory | undefined {
  if (!isAccessorySlot(slot)) return undefined;
  return load().categories.find((c) => c.slug === slot);
}

export function saveAccessoryCategory(
  slot: string,
  patch: Partial<Pick<AccessoryCategory, "title" | "blurb" | "icon" | "items" | "roles">>,
): AccessoryCategory | undefined {
  if (!isAccessorySlot(slot)) return undefined;
  const store = load();
  const cat = store.categories.find((c) => c.slug === slot);
  if (!cat) return undefined;
  if (typeof patch.title === "string" && patch.title.trim()) cat.title = patch.title.trim();
  if (typeof patch.blurb === "string") cat.blurb = patch.blurb;
  if (typeof patch.icon === "string") cat.icon = patch.icon;
  if (Array.isArray(patch.items)) cat.items = patch.items.map(normalizeItem);
  if (Array.isArray(patch.roles)) {
    cat.roles = patch.roles.map((r) => ({
      role: r.role,
      primary: String(r.primary ?? ""),
      secondary: String(r.secondary ?? ""),
    }));
  }
  save(store);
  return cat;
}

export function addAccessoryItem(slot: string): AccessoryItem | undefined {
  const cat = getAccessoryCategory(slot);
  if (!cat) return undefined;
  const item: AccessoryItem = {
    id: `a${Date.now()}`,
    name: "New accessory",
    icon: "",
    options: "4",
    numberChange: "need",
    obtain: "",
    recommended: true,
  };
  saveAccessoryCategory(slot, { items: [...cat.items, item] });
  return item;
}
