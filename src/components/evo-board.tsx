import type { CSSProperties } from "react";
import Link from "next/link";
import { iconFor } from "@/lib/wiki-lore";

/** Chip column 88px + arrow gutter 36px. Branch pads use fromIndex * EVO_COL. */
export const EVO_CHIP = 88;
export const EVO_ARROW = 36;
export const EVO_COL = EVO_CHIP + EVO_ARROW;

export type EvoTreeView = {
  rows: string[][];
  branches?: { from: string; name: string }[];
};

export function EvoBoard({
  rows,
  branches,
  current,
  hrefFor,
}: {
  rows: string[][];
  branches?: { from: string; name: string }[];
  current: string;
  hrefFor?: (name: string) => string | undefined;
}) {
  const primary = rows[0] ?? [];
  return (
    <div
      className="evo-board"
      style={
        {
          "--evo-chip": `${EVO_CHIP}px`,
          "--evo-arrow": `${EVO_ARROW}px`,
          "--evo-col": `${EVO_COL}px`,
          "--evo-icon": "52px",
        } as CSSProperties
      }
    >
      {rows.map((row, r) => (
        <div key={r} className="evo-row">
          {row.map((name, i) => (
            <span key={`${r}-${name}-${i}`} className="evo-step">
              {i > 0 ? <EvoArrow /> : null}
              <EvoIcon name={name} current={current} href={hrefFor?.(name)} />
            </span>
          ))}
        </div>
      ))}
      {(branches ?? []).map((b) => {
        const idx = primary.indexOf(b.from);
        const col = idx < 0 ? 0 : idx;
        return (
          <div key={b.name} className="evo-row evo-branch">
            <span
              className="evo-branch-pad"
              style={{ width: col * EVO_COL, flex: `0 0 ${col * EVO_COL}px` }}
            />
            <span className="evo-step">
              <span className="evo-chip evo-chip-ghost" aria-hidden />
              <EvoElbow />
              <EvoIcon name={b.name} current={current} href={hrefFor?.(b.name)} />
            </span>
          </div>
        );
      })}
    </div>
  );
}

function EvoArrow() {
  return (
    <span className="evo-arrow-slot" aria-hidden>
      <svg viewBox="0 0 36 52" width="36" height="52">
        <line x1="2" y1="26" x2="24" y2="26" />
        <polyline points="20,20 28,26 20,32" />
      </svg>
    </span>
  );
}

function EvoElbow() {
  return (
    <span className="evo-arrow-slot evo-elbow" aria-hidden>
      <svg viewBox="0 0 36 64" width="36" height="64">
        <polyline points="0,0 0,38 24,38" />
        <polyline points="18,32 26,38 18,44" />
      </svg>
    </span>
  );
}

function EvoIcon({
  name,
  current,
  href,
}: {
  name: string;
  current: string;
  href?: string;
}) {
  const src = iconFor(name);
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
