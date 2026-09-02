import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import sheet from "@/lib/sheet.json";
import { LORE, TREES, artFor, iconFor } from "@/lib/wiki-lore";
import type { CatalogForm, EvoTree, SheetForm } from "@/lib/digimon-types";
import type { RankCode } from "@/lib/ranks";
import {
  loreOrSheetTree,
  normalizeTree,
  slugifyName,
  type NormalizedTree,
} from "@/lib/evo-layout";

export type { CatalogForm, EvoTree };
export type Catalog = {
  forms: CatalogForm[];
  trees: Record<string, EvoTree>;
  icons: Record<string, string>;
  art: Record<string, string>;
  rankIcons: Record<string, string>;
};

export type DigimonRecord = CatalogForm & {
  art: string;
  icon?: string;
  listed: boolean;
};

const CATALOG_PATH = path.join(process.cwd(), "data/catalog.json");

const ALIASES: Record<string, string> = {
  agumon: "agumon-classic",
  "omegamon-x-extreme": "omegamon-extreme",
};

function seed(): Catalog {
  const forms: CatalogForm[] = (sheet as SheetForm[]).map((row) => {
    const lore = LORE[row.name];
    return {
      ...row,
      listed: true,
      jp: lore?.jp,
      form: lore?.form,
      attribute: lore?.attribute,
      element: lore?.element,
      type: lore?.type,
      family: lore?.family,
    };
  });
  const trees: Record<string, EvoTree> = {};
  for (const [slug, tree] of Object.entries(TREES)) {
    trees[slug] = normalizeTree(tree);
  }
  return { forms, trees, icons: {}, art: {}, rankIcons: {} };
}

function loadFile(): Catalog {
  if (!existsSync(CATALOG_PATH)) {
    const created = seed();
    saveCatalog(created);
    return created;
  }
  const raw = JSON.parse(readFileSync(CATALOG_PATH, "utf8")) as Catalog;
  if (!raw.forms?.length) return seed();
  raw.icons ??= {};
  raw.art ??= {};
  raw.rankIcons ??= {};
  raw.trees ??= {};
  return raw;
}

export function readCatalog(): Catalog {
  return loadFile();
}

export function saveCatalog(catalog: Catalog) {
  mkdirSync(path.dirname(CATALOG_PATH), { recursive: true });
  writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2), "utf8");
}

export function iconMap() {
  return readCatalog().icons ?? {};
}

export function artMap() {
  return readCatalog().art ?? {};
}

export function rankIconMap() {
  return readCatalog().rankIcons ?? {};
}

export function resolveIcon(name: string, icons?: Record<string, string>) {
  const map = icons ?? iconMap();
  return map[name] || iconFor(name);
}

export function hydrate(
  form: CatalogForm,
  catalog?: Catalog,
): DigimonRecord {
  const c = catalog ?? readCatalog();
  const icon = form.icon || c.icons?.[form.name] || iconFor(form.name);
  const art =
    form.art ||
    c.art?.[form.name] ||
    artFor(form.name) ||
    icon ||
    "";
  return {
    ...form,
    listed: form.listed !== false,
    art,
    icon,
  };
}

export function listDigimon(): DigimonRecord[] {
  const catalog = readCatalog();
  return catalog.forms.map((f) => hydrate(f, catalog));
}

export function resolveSlug(slug: string) {
  return ALIASES[slug] ?? slug;
}

export function getForm(slug: string): CatalogForm | undefined {
  const catalog = readCatalog();
  return catalog.forms.find((f) => f.slug === resolveSlug(slug));
}

function nameForSlug(slug: string, catalog: Catalog) {
  const s = resolveSlug(slug);
  const form = catalog.forms.find((f) => f.slug === s);
  if (form) return form.name;
  const hay = [
    ...catalog.forms.flatMap((f) => [f.name, ...f.lines]),
    ...Object.values(catalog.trees).flatMap((t) =>
      normalizeTree(t).nodes.map((n) => n.name),
    ),
    ...Object.values(TREES).flatMap((t) =>
      normalizeTree(t).nodes.map((n) => n.name),
    ),
  ];
  return hay.find((n) => n && slugifyName(n) === s);
}

export function getDigimon(slug: string) {
  const catalog = readCatalog();
  const form = getForm(slug);
  if (form) return hydrate(form, catalog);
  const name = nameForSlug(slug, catalog);
  if (!name) return undefined;
  return hydrate(
    {
      name,
      slug: resolveSlug(slug),
      role: "SK",
      rank: "N",
      lines: [],
      hp: 0,
      at: 0,
      de: 0,
      as: 0,
      listed: false,
    },
    catalog,
  );
}

export function slugForName(name: string, forms?: CatalogForm[]) {
  if (name === "?" || !name) return undefined;
  const list = forms ?? readCatalog().forms;
  const exact = list.find((d) => d.name === name);
  if (exact) return exact.slug;
  const loose = list.find((d) => d.name.replace(/ \[.*/, "") === name);
  if (loose) return loose.slug;
  return slugifyName(name);
}

export function digimonByRank(rank: RankCode) {
  return listDigimon().filter((d) => d.listed !== false && d.rank === rank);
}

export function evoTree(slug: string): NormalizedTree {
  const catalog = readCatalog();
  const s = resolveSlug(slug);
  if (catalog.trees[s]) return normalizeTree(catalog.trees[s]);
  const form = getForm(s);
  if (form) return loreOrSheetTree(s, form, catalog.forms);
  const rec = getDigimon(s);
  if (!rec) return { nodes: [], edges: [] };
  for (const tree of Object.values(catalog.trees)) {
    const n = normalizeTree(tree);
    if (n.nodes.some((node) => node.name === rec.name)) return n;
  }
  for (const tree of Object.values(TREES)) {
    const n = normalizeTree(tree);
    if (n.nodes.some((node) => node.name === rec.name)) return n;
  }
  const host = catalog.forms.find(
    (f) => f.lines.includes(rec.name) || f.name === rec.name,
  );
  if (host) return loreOrSheetTree(host.slug, host, catalog.forms);
  return { nodes: [{ id: "n0", name: rec.name, x: 0, y: 0 }], edges: [] };
}

export function upsertForm(slug: string, next: CatalogForm, tree?: EvoTree) {
  const catalog = readCatalog();
  const i = catalog.forms.findIndex((f) => f.slug === slug);
  if (i < 0) catalog.forms.push(next);
  else catalog.forms[i] = next;
  if (tree !== undefined) {
    const layout = normalizeTree(tree);
    catalog.trees[slug] = layout;
    const names = new Set(layout.nodes.map((n) => n.name));
    for (const form of catalog.forms) {
      if (form.slug === slug || names.has(form.name)) {
        catalog.trees[form.slug] = layout;
      }
    }
  }
  saveCatalog(catalog);
  return hydrate(next, catalog);
}

export function setUpload(
  kind: "chip" | "art" | "rank",
  key: string,
  url: string,
) {
  const catalog = readCatalog();
  if (kind === "chip") {
    catalog.icons[key] = url;
    const form = catalog.forms.find((f) => f.name === key);
    if (form) form.icon = url;
  } else if (kind === "art") {
    catalog.art[key] = url;
    const form = catalog.forms.find((f) => f.name === key);
    if (form) form.art = url;
  } else {
    catalog.rankIcons[key] = url;
  }
  saveCatalog(catalog);
}

export function allNames(): string[] {
  const catalog = readCatalog();
  const set = new Set<string>();
  for (const f of catalog.forms) {
    set.add(f.name);
    for (const line of f.lines) if (line && line !== "?") set.add(line);
  }
  for (const tree of Object.values(catalog.trees)) {
    for (const n of normalizeTree(tree).nodes) set.add(n.name);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}

export { ALIASES };
export type { RoleCode } from "@/lib/digimon-types";
