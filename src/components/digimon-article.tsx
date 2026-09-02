import type { ReactNode } from "react";
import Link from "next/link";
import { EvoBoard } from "@/components/evo-board";
import { RankBadge, RoleBadge } from "@/components/rank-badge";
import { rankSlug } from "@/lib/ranks";
import { SOURCE } from "@/lib/wiki";
import { AdminOnly } from "@/components/admin-only";
import {
  STAT_LABELS,
  evoTree,
  iconMap,
  rankIconMap,
  slugForName,
  type DigimonRecord,
} from "@/lib/digimon";

export function DigimonArticle({ digimon }: { digimon: DigimonRecord }) {
  const tree = evoTree(digimon.slug);
  const lineNames = digimon.lines.filter((n) => n && n !== "?");
  const icons = iconMap();
  const rankIcons = rankIconMap();
  const hrefFor = (name: string) => {
    const s = slugForName(name);
    return s ? `/digimon/${s}` : "/digimon";
  };

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
                src={rankIcons[digimon.rank]}
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
        {digimon.blurb?.trim() ? (
          digimon.blurb
        ) : (
          <>
            <strong>{digimon.name}</strong>
            {digimon.jp ? <> ({digimon.jp})</> : null} is stamped{" "}
            <RankBadge
              rank={digimon.rank}
              href={`/rank/${rankSlug(digimon.rank)}`}
              src={rankIcons[digimon.rank]}
            />{" "}
            <RoleBadge role={digimon.role} /> on the DMI assignment sheet
            (HP / AT / DE / AS). Those four numbers are copied from{" "}
            <code>digimon_role_assignment_all_forms_new.pdf</code> — not guessed.
            {digimon.listed === false ? (
              <>
                {" "}
                This name is on an evolution line but not a numbered row in the
                assignment PDF — sign in to add stats and an icon.
              </>
            ) : null}
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
          </>
        )}
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

      <section className="evo-section" id="digivolution">
        <h2>Digivolution Line</h2>
        <EvoBoard
          tree={tree}
          current={digimon.name}
          hrefFor={hrefFor}
          icons={icons}
        />
      </section>

      <div className="catlinks">
        <strong>Categories:</strong>{" "}
        <Link href="/digimon">Digimon</Link>
        {" | "}
        <Link href={`/rank/${rankSlug(digimon.rank)}`}>
          Digimon Rank {digimon.rank}
        </Link>
        {" | "}
        <Link href="/roles">{digimon.role}</Link>
        <AdminOnly>
          {" | "}
          <Link href={`/admin/${digimon.slug}`}>Edit in catalog</Link>
        </AdminOnly>
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
