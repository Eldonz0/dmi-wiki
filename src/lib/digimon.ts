import sheet from "@/lib/sheet.json";
import type { RankCode } from "@/lib/ranks";
import { rankSlug } from "@/lib/ranks";
import { LORE, TREES, artFor, iconFor } from "@/lib/wiki-lore";

export type RoleCode = "AA" | "TA" | "SK" | "SUP";

export type SheetForm = {
  name: string;
  slug: string;
  role: RoleCode;
  rank: RankCode;
  lines: string[];
  hp: number;
  at: number;
  de: number;
  as: number;
};

export type DigimonRecord = SheetForm & {
  jp?: string;
  form?: string;
  attribute?: string;
  element?: string;
  type?: string;
  family?: string;
  art: string;
  icon?: string;
};

const ALIASES: Record<string, string> = {
  agumon: "agumon-classic",
  "omegamon-x-extreme": "omegamon-extreme",
};

export const DIGIMON: DigimonRecord[] = (sheet as SheetForm[]).map((row) => {
  const lore = LORE[row.name];
  return {
    ...row,
    rank: row.rank as RankCode,
    role: row.role as RoleCode,
    jp: lore?.jp,
    form: lore?.form,
    attribute: lore?.attribute,
    element: lore?.element,
    type: lore?.type,
    family: lore?.family,
    art: artFor(row.name) ?? iconFor(row.name) ?? "",
    icon: iconFor(row.name),
  };
});

const BY_SLUG = new Map(DIGIMON.map((d) => [d.slug, d]));

export function resolveSlug(slug: string) {
  return ALIASES[slug] ?? slug;
}

export function getDigimon(slug: string) {
  return BY_SLUG.get(resolveSlug(slug));
}

export function slugForName(name: string) {
  if (name === "?" || !name) return undefined;
  const exact = DIGIMON.find((d) => d.name === name);
  if (exact) return exact.slug;
  const stripped = DIGIMON.find((d) => d.name.replace(/ \[.*/, "") === name);
  return stripped?.slug;
}

export function digimonByRank(rank: RankCode) {
  return DIGIMON.filter((d) => d.rank === rank);
}

export function evoTree(slug: string) {
  return TREES[resolveSlug(slug)];
}

export const STAT_LABELS = [
  { key: "hp" as const, label: "HP", hint: "Hit Points" },
  { key: "at" as const, label: "AT", hint: "Attack" },
  { key: "de" as const, label: "DE", hint: "Defence" },
  { key: "as" as const, label: "AS", hint: "Attack Speed (sheet integer)" },
];

export function rankCategoryHref(rank: RankCode) {
  return `/rank/${rankSlug(rank)}`;
}
