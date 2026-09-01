import type { DigimonRecord } from "@/lib/catalog";
export type { DigimonRecord, RoleCode } from "@/lib/catalog";
export type { CatalogForm, SheetForm, EvoTree } from "@/lib/digimon-types";
export {
  listDigimon,
  getDigimon,
  slugForName,
  digimonByRank,
  evoTree,
  resolveSlug,
} from "@/lib/catalog";

export const STAT_LABELS = [
  { key: "hp" as const, label: "HP", hint: "Hit Points" },
  { key: "at" as const, label: "AT", hint: "Attack" },
  { key: "de" as const, label: "DE", hint: "Defence" },
  { key: "as" as const, label: "AS", hint: "Attack Speed (sheet integer)" },
];
