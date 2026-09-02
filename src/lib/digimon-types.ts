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
  icon?: string;
  art?: string;
  blurb?: string;
  listed?: boolean;
};

export type EvoNode = {
  id: string;
  name: string;
  x: number;
  y: number;
};

export type EvoEdge = {
  from: string;
  to: string;
};

export type EvoTree = {
  nodes?: EvoNode[];
  edges?: EvoEdge[];
  rows?: string[][];
  branches?: { from: string; name: string }[];
};
