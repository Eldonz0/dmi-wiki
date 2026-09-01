export const RANKS = [
  "N",
  "A",
  "A+",
  "S",
  "S+",
  "SS",
  "SS+",
  "SSS",
  "SSS+",
  "U",
  "U+",
] as const;

export type RankCode = (typeof RANKS)[number];

export const RANK_META: Record<
  RankCode,
  { name: string; band: string; note: string }
> = {
  N: {
    name: "Normal",
    band: "Starter / filler Megas",
    note: "Unranked rows on the DMI sheet are filed here, plus filler Megas.",
  },
  A: {
    name: "A",
    band: "Early Mega",
    note: "First real mercenary window after you leave Rookie/Champion.",
  },
  "A+": {
    name: "A+",
    band: "Early Mega+",
    note: "A-rank with extra juice. Still farmed off by S-rank lines.",
  },
  S: {
    name: "S",
    band: "Standard Mega",
    note: "Workhorse Megas on official DMO. DMI Apollomon is U+, not S.",
  },
  "S+": {
    name: "S+",
    band: "Standard Mega+",
    note: "S with a bump. Common for Jogress-adjacent Megas that are not X.",
  },
  SS: {
    name: "SS",
    band: "High Mega",
    note: "Burst / Jogress territory on official DMO.",
  },
  "SS+": {
    name: "SS+",
    band: "High Mega+",
    note: "SS with a bump. Typical X-Antibody stepping stone.",
  },
  SSS: {
    name: "SSS",
    band: "Top Mega",
    note: "Late Jogress, X, and named Burst Modes.",
  },
  "SSS+": {
    name: "SSS+",
    band: "Top Mega+",
    note: "One step under Unique. Extreme / Awaken forms often land here.",
  },
  U: {
    name: "Unique",
    band: "Unique",
    note: "Highest commonly listed rank. Omegamon X Extreme is treated as U on this wiki until the PDF overrides it.",
  },
  "U+": {
    name: "Unique+",
    band: "Unique+",
    note: "Ceiling rank on the DMI sheet. Apollomon, Omegamon Extreme, and Quantumon.",
  },
};

export function rankSlug(code: RankCode) {
  return code.toLowerCase().replaceAll("+", "-plus");
}

export function rankFromSlug(slug: string): RankCode | undefined {
  const decoded = decodeURIComponent(slug)
    .toLowerCase()
    .replace(/-plus$/, "+")
    .toUpperCase() as RankCode;
  return RANKS.includes(decoded) ? decoded : undefined;
}
