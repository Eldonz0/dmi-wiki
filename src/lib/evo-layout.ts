import { RANKS, type RankCode } from "@/lib/ranks";
import type { CatalogForm, EvoEdge, EvoNode, EvoTree } from "@/lib/digimon-types";
import { TREES } from "@/lib/wiki-lore";

export const EVO_CHIP = 88;
export const EVO_ARROW = 36;
export const EVO_COL = EVO_CHIP + EVO_ARROW;
export const EVO_ROW = 100;
export const EVO_ICON = 52;

const RANK_I = Object.fromEntries(RANKS.map((r, i) => [r, i])) as Record<
  RankCode,
  number
>;

export function slugifyName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[:]/g, "")
    .replace(/[[\]()]/g, " ")
    .replace(/\+/g, " plus ")
    .replace(/\//g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export type NormalizedTree = {
  nodes: EvoNode[];
  edges: EvoEdge[];
};

export function normalizeTree(tree: EvoTree | undefined | null): NormalizedTree {
  if (!tree) return { nodes: [], edges: [] };
  if (tree.nodes?.length) {
    return {
      nodes: tree.nodes.map((n) => ({ ...n })),
      edges: (tree.edges ?? []).map((e) => ({ ...e })),
    };
  }
  return rowsToLayout(tree.rows ?? [], tree.branches ?? []);
}

export function rowsToLayout(
  rows: string[][],
  branches: { from: string; name: string }[] = [],
): NormalizedTree {
  const nodes: EvoNode[] = [];
  const edges: EvoEdge[] = [];
  const byName = new Map<string, EvoNode>();
  let seq = 0;

  const take = (name: string, x: number, y: number) => {
    const hit = byName.get(name);
    if (hit) return hit;
    const n: EvoNode = { id: `n${seq++}`, name, x, y };
    byName.set(name, n);
    nodes.push(n);
    return n;
  };

  for (let y = 0; y < rows.length; y++) {
    const row = rows[y].filter(Boolean);
    for (let x = 0; x < row.length; x++) {
      const n = take(row[x], x, y);
      if (x === 0) continue;
      const prev = byName.get(row[x - 1]);
      if (
        prev &&
        !edges.some((e) => e.from === prev.id && e.to === n.id)
      ) {
        edges.push({ from: prev.id, to: n.id });
      }
    }
  }

  for (const b of branches) {
    const from = byName.get(b.from);
    if (!from || !b.name) continue;
    const child = take(b.name, from.x + 1, from.y + 1);
    if (!edges.some((e) => e.from === from.id && e.to === child.id)) {
      edges.push({ from: from.id, to: child.id });
    }
  }

  return { nodes, edges };
}

function chain(egg: string, forms: CatalogForm[], ensure?: string) {
  const members = forms.filter(
    (f) => f.lines.includes(egg) || f.name === egg,
  );
  members.sort(
    (a, b) =>
      RANK_I[a.rank] - RANK_I[b.rank] ||
      a.hp - b.hp ||
      a.name.localeCompare(b.name),
  );
  const names: string[] = [];
  if (egg && egg !== "?" && !members.some((m) => m.name === egg)) {
    names.push(egg);
  }
  for (const m of members) {
    if (!names.includes(m.name)) names.push(m.name);
  }
  if (ensure && !names.includes(ensure)) names.push(ensure);
  return names;
}

export function generateSheetTree(
  form: CatalogForm,
  forms: CatalogForm[],
): NormalizedTree {
  const eggs = form.lines.filter((l) => l && l !== "?");
  if (eggs.length >= 2) {
    return rowsToLayout(
      eggs.map((egg) => chain(egg, forms, form.name)),
    );
  }
  if (eggs.length === 1) return rowsToLayout([chain(eggs[0], forms)]);
  return rowsToLayout([[form.name]]);
}

export function loreOrSheetTree(
  slug: string,
  form: CatalogForm,
  forms: CatalogForm[],
): NormalizedTree {
  const lore = TREES[slug];
  if (lore) return normalizeTree(lore);
  return generateSheetTree(form, forms);
}

export function nodeCenter(node: EvoNode) {
  return {
    x: node.x * EVO_COL + EVO_CHIP / 2,
    y: node.y * EVO_ROW + EVO_ICON / 2,
  };
}

export function iconBox(node: EvoNode) {
  const pad = (EVO_CHIP - EVO_ICON) / 2;
  return {
    left: node.x * EVO_COL + pad,
    top: node.y * EVO_ROW,
    right: node.x * EVO_COL + pad + EVO_ICON,
    bottom: node.y * EVO_ROW + EVO_ICON,
    cx: node.x * EVO_COL + EVO_CHIP / 2,
    cy: node.y * EVO_ROW + EVO_ICON / 2,
  };
}

export function edgePath(from: EvoNode, to: EvoNode) {
  const a = iconBox(from);
  const b = iconBox(to);
  const x1 = a.right;
  const y1 = a.cy;
  const x2 = b.left;
  const y2 = b.cy;
  if (Math.abs(y2 - y1) < 6 && x2 >= x1) {
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }
  if (to.y > from.y && to.x >= from.x) {
    const drop = a.bottom;
    return `M ${a.cx} ${a.bottom} L ${a.cx} ${b.cy} L ${x2} ${y2}`;
  }
  const midX = x1 + Math.max(16, (x2 - x1) / 2);
  return `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`;
}

export function boardSize(nodes: EvoNode[]) {
  const maxX = nodes.reduce((m, n) => Math.max(m, n.x), 0);
  const maxY = nodes.reduce((m, n) => Math.max(m, n.y), 0);
  return {
    width: Math.max(EVO_COL * 2, (maxX + 1) * EVO_COL + 8),
    height: Math.max(EVO_ROW + 24, (maxY + 1) * EVO_ROW + 12),
  };
}
