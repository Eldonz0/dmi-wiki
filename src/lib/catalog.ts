import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import sheet from "@/lib/sheet.json";
import { LORE, TREES, artFor, iconFor } from "@/lib/wiki-lore";
import type { CatalogForm, EvoTree, SheetForm } from "@/lib/digimon-types";
import type { RankCode } from "@/lib/ranks";

export type { CatalogForm, EvoTree };
export type Catalog = {
  forms: CatalogForm[];
  trees: Record<string, EvoTree>;
};

export type DigimonRecord = CatalogForm & {
  art: string;
  icon?: string;
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
      jp: lore?.jp,
      form: lore?.form,
      attribute: lore?.attribute,
      element: lore?.element,
      type: lore?.type,
      family: lore?.family,
    };
  });
  const trees: Record<string, EvoTree> = structuredClone(TREES);
  if (trees.apollomon) {
    trees.apollomon.branches = [
      { from: "Apollomon", name: "Apollomon Whispered" },
    ];
  }
  return { forms, trees };
}

function loadFile(): Catalog {
  if (!existsSync(CATALOG_PATH)) {
    const created = seed();
    saveCatalog(created);
    return created;
  }
  const raw = JSON.parse(readFileSync(CATALOG_PATH, "utf8")) as Catalog;
  if (!raw.forms?.length) return seed();
  return raw;
}

export function readCatalog(): Catalog {
  return loadFile();
}

export function saveCatalog(catalog: Catalog) {
  mkdirSync(path.dirname(CATALOG_PATH), { recursive: true });
  writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2), "utf8");
}

export function hydrate(form: CatalogForm): DigimonRecord {
  return {
    ...form,
    art: artFor(form.name) ?? iconFor(form.name) ?? "",
    icon: iconFor(form.name),
  };
}

export function listDigimon(): DigimonRecord[] {
  return readCatalog().forms.map(hydrate);
}

export function resolveSlug(slug: string) {
  return ALIASES[slug] ?? slug;
}

export function getForm(slug: string): CatalogForm | undefined {
  const catalog = readCatalog();
  return catalog.forms.find((f) => f.slug === resolveSlug(slug));
}

export function getDigimon(slug: string) {
  const form = getForm(slug);
  return form ? hydrate(form) : undefined;
}

export function slugForName(name: string, forms?: CatalogForm[]) {
  if (name === "?" || !name) return undefined;
  const list = forms ?? readCatalog().forms;
  const exact = list.find((d) => d.name === name);
  if (exact) return exact.slug;
  return list.find((d) => d.name.replace(/ \[.*/, "") === name)?.slug;
}

export function digimonByRank(rank: RankCode) {
  return listDigimon().filter((d) => d.rank === rank);
}

export function evoTree(slug: string): EvoTree | undefined {
  const catalog = readCatalog();
  return catalog.trees[resolveSlug(slug)];
}

export function upsertForm(slug: string, next: CatalogForm, tree?: EvoTree) {
  const catalog = readCatalog();
  const i = catalog.forms.findIndex((f) => f.slug === slug);
  if (i < 0) catalog.forms.push(next);
  else catalog.forms[i] = next;
  if (tree !== undefined) catalog.trees[slug] = tree;
  saveCatalog(catalog);
  return hydrate(next);
}

export function setTree(slug: string, tree: EvoTree) {
  const catalog = readCatalog();
  catalog.trees[slug] = tree;
  saveCatalog(catalog);
}

export function allNames(): string[] {
  const catalog = readCatalog();
  const set = new Set<string>();
  for (const f of catalog.forms) set.add(f.name);
  for (const tree of Object.values(catalog.trees)) {
    for (const row of tree.rows) for (const n of row) set.add(n);
    for (const b of tree.branches ?? []) {
      set.add(b.from);
      set.add(b.name);
    }
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}

export { ALIASES };
export type { RoleCode } from "@/lib/digimon-types";
