import type { RankCode } from "@/lib/ranks";

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

export type CatalogForm = SheetForm & {
  jp?: string;
  form?: string;
  attribute?: string;
  element?: string;
  type?: string;
  family?: string;
};

export type EvoTree = {
  rows: string[][];
  branches?: { from: string; name: string }[];
};
