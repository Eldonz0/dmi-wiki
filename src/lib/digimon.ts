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
  iconMap,
  artMap,
  rankIconMap,
} from "@/lib/catalog";

export const STAT_LABELS = [
  { key: "hp" as const, label: "HP", hint: "Hit Points" },
  { key: "at" as const, label: "AT", hint: "Attack" },
  { key: "de" as const, label: "DE", hint: "Defence" },
  { key: "as" as const, label: "AS", hint: "Attack Speed (sheet integer)" },
];

export function defaultBlurb(d: {
  name: string;
  jp?: string;
  rank: string;
  role: string;
}) {
  const jp = d.jp ? ` (${d.jp})` : "";
  return `${d.name}${jp} is stamped ${d.rank} ${d.role} on the DMI assignment sheet (HP / AT / DE / AS). Those four numbers are copied from digimon_role_assignment_all_forms_new.pdf — not guessed.`;
}
