import type { CSSProperties } from "react";
import Link from "next/link";
import type { EvoTree } from "@/lib/digimon-types";
import {
  EVO_CHIP,
  EVO_COL,
  EVO_ICON,
  EVO_ROW,
  boardSize,
  edgePath,
  normalizeTree,
} from "@/lib/evo-layout";
import { iconFor } from "@/lib/wiki-lore";

export { EVO_CHIP, EVO_ARROW, EVO_COL, EVO_ROW } from "@/lib/evo-layout";

export function EvoBoard({
  tree,
  current,
  hrefFor,
  icons,
}: {
  tree: EvoTree;
  current: string;
  hrefFor: (name: string) => string;
  icons?: Record<string, string>;
}) {
  const layout = normalizeTree(tree);
  const { width, height } = boardSize(layout.nodes);
  const byId = Object.fromEntries(layout.nodes.map((n) => [n.id, n]));

  return (
    <div
      className="evo-board"
      style={
        {
          "--evo-chip": `${EVO_CHIP}px`,
          "--evo-arrow": "36px",
          "--evo-col": `${EVO_COL}px`,
          "--evo-icon": `${EVO_ICON}px`,
          "--evo-row": `${EVO_ROW}px`,
        } as CSSProperties
      }
    >
      <div className="evo-plane" style={{ width, height }}>
        <svg
          className="evo-wires"
          width={width}
          height={height}
          aria-hidden
        >
          <defs>
            <marker
              id="evo-head"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path d="M 0 0 L 8 4 L 0 8 z" fill="#b7c9e0" />
            </marker>
          </defs>
          {layout.edges.map((e) => {
            const from = byId[e.from];
            const to = byId[e.to];
            if (!from || !to) return null;
            return (
              <path
                key={`${e.from}-${e.to}`}
                d={edgePath(from, to)}
                fill="none"
                stroke="#b7c9e0"
                strokeWidth="1.25"
                markerEnd="url(#evo-head)"
              />
            );
          })}
        </svg>
        {layout.nodes.map((node) => (
          <div
            key={node.id}
            className="evo-abs"
            style={{ left: node.x * EVO_COL, top: node.y * EVO_ROW }}
          >
            <EvoIcon
              name={node.name}
              current={current}
              href={hrefFor(node.name)}
              src={icons?.[node.name] || iconFor(node.name)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function EvoIcon({
  name,
  current,
  href,
  src,
}: {
  name: string;
  current: string;
  href?: string;
  src?: string;
}) {
  const on =
    name === current ||
    name.replace(/ \[.*/, "") === current.replace(/ \[.*/, "");
  const inner = (
    <span className="evo-chip">
      <span className={on ? "evo-icon is-current" : "evo-icon"} title={name}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" width={52} height={52} />
        ) : (
          <span className="evo-fallback">{name.slice(0, 2)}</span>
        )}
      </span>
      <em>{name}</em>
    </span>
  );
  if (!href) return inner;
  return (
    <Link href={href} className="evo-icon-link">
      {inner}
    </Link>
  );
}
