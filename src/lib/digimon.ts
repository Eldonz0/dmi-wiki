import "server-only";
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
export { STAT_LABELS, defaultBlurb } from "@/lib/digimon-client";
