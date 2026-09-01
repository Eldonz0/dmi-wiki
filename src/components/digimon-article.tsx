import type { ReactNode } from "react";
import Link from "next/link";
import { RankBadge, RoleBadge } from "@/components/rank-badge";
import { rankSlug } from "@/lib/ranks";
import { SOURCE } from "@/lib/wiki";
import {
  STAT_LABELS,
  type DigimonRecord,
} from "@/lib/digimon";

export function DigimonArticle({ digimon }: { digimon: DigimonRecord }) {
  const from = digimon.evolvesFrom;
  const to = digimon.evolvesTo;

  return (
    <article className="mw-article dmo-page">
      <div className="mw-pre-title">From DMI Wiki · Digimon</div>
      <h1 className="mw-firstHeading">{digimon.name}</h1>

      <table className="infobox infobox-digimon">
        <thead>
          <tr>
            <th colSpan={2}>{digimon.name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2} className="box-art">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={digimon.image} alt={digimon.name} />
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="box-form">
              {digimon.form}
            </td>
          </tr>
          <Row label="Attribute" value={digimon.attribute} />
          <Row label="Elemental Attribute" value={digimon.element} />
          <Row label="Type" value={digimon.type} />
          <Row label="Family" value={digimon.family} />
          {digimon.riding ? <Row label="Riding" value={digimon.riding} /> : null}
          {digimon.hatchable ? (
            <Row label="Hatchable" value={digimon.hatchable} />
          ) : null}
          <tr>
            <th>Rank</th>
            <td>
              <RankBadge rank={digimon.rank} href={`/rank/${rankSlug(digimon.rank)}`} />
              {digimon.pendingSheet ? (
                <span className="pending-tag"> pending PDF</span>
              ) : null}
            </td>
          </tr>
          <tr>
            <th>Role</th>
            <td>
              <RoleBadge role={digimon.role} />
              {digimon.pendingSheet ? (
                <span className="pending-tag"> pending PDF</span>
              ) : null}
            </td>
          </tr>
          {from ? (
            <Row
              label="Digivolves from"
              value={
                from.slug ? (
                  <Link href={`/digimon/${from.slug}`}>{from.name}</Link>
                ) : (
                  from.name
                )
              }
            />
          ) : null}
          {to && to.length > 0 ? (
            <Row
              label="Digivolves to"
              value={to.map((item, i) => (
                <span key={item.name}>
                  {i > 0 ? ", " : null}
                  {item.slug ? (
                    <Link href={`/digimon/${item.slug}`}>{item.name}</Link>
                  ) : (
                    item.name
                  )}
                </span>
              ))}
            />
          ) : null}
          {digimon.location ? (
            <Row label="Location" value={digimon.location} />
          ) : null}
        </tbody>
      </table>

      <div className="toc">
        <strong>Contents</strong>
        <ol>
          <li>
            <a href="#default-stats">Default Stats</a>
          </li>
          <li>
            <a href="#attacks">Attacks</a>
          </li>
          <li>
            <a href="#digivolution">Digivolution Line</a>
          </li>
          {digimon.drops ? (
            <li>
              <a href="#drops">Drop Item</a>
            </li>
          ) : null}
          <li>
            <a href="#notes">Notes</a>
          </li>
        </ol>
      </div>

      {digimon.pendingSheet ? (
        <p className="sheet-note">
          Rank and role are placeholders until{" "}
          <code>digimon_role_assignment_all_forms_new.pdf</code> is in{" "}
          <code>/data</code>. Stats are DMO-typical defaults (size 100%), not
          a live DMI dump.
        </p>
      ) : null}

      <p>{digimon.intro}</p>

      <h2 id="default-stats">Default Stats</h2>
      <p className="section-lead">
        The values shown are the encyclopedia defaults DMO-style pages list
        (HP, DS, DE, AT, AS, CT, HT, EV, BL). Size fruits, hatch grade, and
        Carries sets stack on top.
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
              <td>{digimon.stats[row.key]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 id="attacks">Attacks</h2>
      <table className="wikitable skill-table">
        <thead>
          <tr>
            <th>Slot</th>
            <th>Attack</th>
            <th>DS</th>
            <th>Cooldown</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {digimon.skills.map((skill) => (
            <tr key={skill.slot + skill.name}>
              <td>
                <strong>{skill.slot}</strong>
              </td>
              <td>{skill.name}</td>
              <td>{skill.ds}</td>
              <td>{skill.cd}</td>
              <td>{skill.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 id="digivolution">Digivolution Line</h2>
      <div className="evo-gallery">
        {digimon.line.map((chip, i) => (
          <div key={chip.name + i} className="evo-wrap">
            {i > 0 ? <span className="evo-arrow">→</span> : null}
            {chip.slug ? (
              <Link href={`/digimon/${chip.slug}`} className="evo-card">
                <EvoFace chip={chip} />
              </Link>
            ) : (
              <div className="evo-card">
                <EvoFace chip={chip} />
              </div>
            )}
          </div>
        ))}
      </div>

      {digimon.drops ? (
        <>
          <h2 id="drops">Drop Item</h2>
          <ul>
            {digimon.drops.map((drop) => (
              <li key={drop}>{drop}</li>
            ))}
          </ul>
        </>
      ) : null}

      <h2 id="notes">Notes</h2>
      <ul>
        {digimon.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>

      <div className="catlinks">
        <strong>Categories:</strong>{" "}
        {digimon.categories.map((cat, i) => (
          <span key={cat.href}>
            {i > 0 ? " | " : null}
            <Link href={cat.href}>{cat.label}</Link>
          </span>
        ))}
      </div>
      <p className="mw-source">{SOURCE}</p>
    </article>
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

function EvoFace({
  chip,
}: {
  chip: { name: string; image?: string; form: string };
}) {
  return (
    <>
      {chip.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={chip.image} alt="" />
      ) : (
        <span className="evo-empty">{chip.name.slice(0, 2)}</span>
      )}
      <strong>{chip.name}</strong>
      <em>{chip.form}</em>
    </>
  );
}
