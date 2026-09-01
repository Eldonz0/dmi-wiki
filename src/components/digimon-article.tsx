import type { ReactNode } from "react";
import Link from "next/link";
import { RankBadge, RoleBadge } from "@/components/rank-badge";
import { rankSlug } from "@/lib/ranks";
import { SOURCE } from "@/lib/wiki";
import {
  STAT_LABELS,
  evoTree,
  slugForName,
  type DigimonRecord,
} from "@/lib/digimon";
import { iconFor } from "@/lib/wiki-lore";

export function DigimonArticle({ digimon }: { digimon: DigimonRecord }) {
  const tree = evoTree(digimon.slug);
  const lineNames = digimon.lines.filter((n) => n && n !== "?");

  return (
    <article className="mw-article dmo-page">
      <div className="mw-pre-title">From DMI Wiki · Digimon</div>
      <h1 className="mw-firstHeading">{digimon.name}</h1>

      <table className="dmo-ibox">
        <thead>
          <tr>
            <th colSpan={2}>
              <span className="dmo-ibox-en">{digimon.name}</span>
              {digimon.jp ? (
                <span className="dmo-ibox-jp">({digimon.jp})</span>
              ) : null}
              <span className="dmo-ibox-arrow" aria-hidden>
                ▸
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2} className="dmo-ibox-art">
              {digimon.art ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={digimon.art} alt={digimon.name} width={250} />
              ) : (
                <span className="dmo-ibox-placeholder">{digimon.name}</span>
              )}
            </td>
          </tr>
          {digimon.form ? (
            <tr>
              <td colSpan={2} className="box-form">
                {digimon.form}
              </td>
            </tr>
          ) : null}
          {digimon.attribute ? (
            <Row label="Attribute" value={digimon.attribute} />
          ) : null}
          {digimon.element ? (
            <Row label="Elemental Attribute" value={digimon.element} />
          ) : null}
          {digimon.type ? <Row label="Type" value={digimon.type} /> : null}
          {digimon.family ? <Row label="Family" value={digimon.family} /> : null}
          <tr>
            <th>Rank</th>
            <td>
              <RankBadge
                rank={digimon.rank}
                href={`/rank/${rankSlug(digimon.rank)}`}
              />
            </td>
          </tr>
          <tr>
            <th>Role</th>
            <td>
              <RoleBadge role={digimon.role} />
            </td>
          </tr>
          <Row
            label="Evolution line(s)"
            value={
              lineNames.length ? (
                lineNames.map((name, i) => (
                  <span key={name}>
                    {i > 0 ? ", " : null}
                    <NameLink name={name} />
                  </span>
                ))
              ) : (
                "—"
              )
            }
          />
        </tbody>
      </table>

      <div className="toc">
        <strong>Contents</strong>
        <ol>
          <li>
            <a href="#default-stats">Default Stats</a>
          </li>
          <li>
            <a href="#digivolution">Digivolution Line</a>
          </li>
        </ol>
      </div>

      <p>
        <strong>{digimon.name}</strong>
        {digimon.jp ? <> ({digimon.jp})</> : null} is stamped{" "}
        <RankBadge rank={digimon.rank} href={`/rank/${rankSlug(digimon.rank)}`} />{" "}
        <RoleBadge role={digimon.role} /> on the DMI assignment sheet
        (HP / AT / DE / AS). Those four numbers are copied from{" "}
        <code>digimon_role_assignment_all_forms_new.pdf</code> — not guessed.
        {lineNames.length ? (
          <>
            {" "}
            Egg / line end{lineNames.length > 1 ? "s" : ""}:{" "}
            {lineNames.map((n, i) => (
              <span key={n}>
                {i > 0 ? ", " : null}
                <NameLink name={n} />
              </span>
            ))}
            .
          </>
        ) : null}
      </p>

      <h2 id="default-stats">Default Stats</h2>
      <p className="section-lead">
        Sheet values only. DMI does not list DS / CT / HT / EV / BL on this
        workbook.
      </p>
      <table className="wikitable stats-table">
        <thead>
          <tr>
            <th>Stat</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {STAT_LABELS.map((row) => (
            <tr key={row.key}>
              <th title={row.hint}>
                {row.label}{" "}
                <span className="stat-hint">{row.hint}</span>
              </th>
              <td>{digimon[row.key]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 id="digivolution">Digivolution Line</h2>
      {tree ? (
        <EvoBoard
          rows={tree.rows}
          branches={tree.branches}
          current={digimon.name}
        />
      ) : (
        <EvoBoard
          rows={[[...lineNames, digimon.name]]}
          current={digimon.name}
        />
      )}

      <div className="catlinks">
        <strong>Categories:</strong>{" "}
        <Link href="/digimon">Digimon</Link>
        {" | "}
        <Link href={`/rank/${rankSlug(digimon.rank)}`}>
          Digimon Rank {digimon.rank}
        </Link>
        {" | "}
        <Link href="/roles">{digimon.role}</Link>
      </div>
      <p className="mw-source">{SOURCE}</p>
    </article>
  );
}

function NameLink({ name }: { name: string }) {
  const slug = slugForName(name);
  if (!slug) return <>{name}</>;
  return <Link href={`/digimon/${slug}`}>{name}</Link>;
}

function EvoBoard({
  rows,
  branches,
  current,
}: {
  rows: string[][];
  branches?: { from: string; name: string }[];
  current: string;
}) {
  const primary = rows[0] ?? [];
  return (
    <div className="evo-board">
      {rows.map((row, r) => (
        <div key={r} className="evo-row">
          {row.map((name, i) => (
            <span key={`${r}-${name}-${i}`} className="evo-cell">
              {i > 0 ? <span className="evo-arrow">→</span> : null}
              <EvoIcon name={name} current={current} />
            </span>
          ))}
        </div>
      ))}
      {(branches ?? []).map((b) => {
        const idx = primary.indexOf(b.from);
        return (
          <div key={b.name} className="evo-row evo-branch">
            {primary.map((name, i) => (
              <span key={name + b.name} className="evo-cell">
                {i === idx + 1 ? (
                  <>
                    <span className="evo-elbow">↳</span>
                    <EvoIcon name={b.name} current={current} />
                  </>
                ) : (
                  <span className="evo-spacer" />
                )}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function EvoIcon({ name, current }: { name: string; current: string }) {
  const slug = slugForName(name);
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
  if (!slug) return inner;
  return (
    <Link href={`/digimon/${slug}`} className="evo-icon-link">
      {inner}
    </Link>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <tr>
      <th>{label}</th>
      <td>{value}</td>
    </tr>
  );
}
