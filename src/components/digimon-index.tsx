"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CatalogForm } from "@/lib/digimon-types";
import { RANKS, rankSlug } from "@/lib/ranks";
import { RankBadge, RoleBadge } from "@/components/rank-badge";
import { iconFor } from "@/lib/wiki-lore";

export function DigimonIndex({ forms }: { forms: CatalogForm[] }) {
  const [q, setQ] = useState("");
  const [rank, setRank] = useState("all");
  const needle = q.trim().toLowerCase();
  const rows = useMemo(() => {
    return forms.filter((d) => {
      if (rank !== "all" && d.rank !== rank) return false;
      if (!needle) return true;
      return (
        d.name.toLowerCase().includes(needle) ||
        d.role.toLowerCase().includes(needle) ||
        d.lines.join(" ").toLowerCase().includes(needle)
      );
    });
  }, [forms, needle, rank]);

  return (
    <article className="mw-article">
      <div className="mw-pre-title">From DMI Wiki · Digimon List</div>
      <h1 className="mw-firstHeading">Digimon List</h1>
      <p>
        Every form from the assignment sheet has a public page and a starting
        evolution board (sheet-mates on the same egg line, ranked by rank then
        HP).
      </p>
      <p className="digi-filter">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter by name, role, or egg line"
          aria-label="Filter Digimon"
        />
        <select
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          aria-label="Filter by rank"
        >
          <option value="all">All ranks</option>
          {RANKS.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </p>
      <p className="rank-strip">
        {RANKS.map((code) => (
          <RankBadge key={code} rank={code} href={`/rank/${rankSlug(code)}`} />
        ))}
      </p>
      <p className="section-lead">
        Showing {rows.length} form{rows.length === 1 ? "" : "s"}.
      </p>
      <table className="wikitable">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Rank</th>
            <th>Role</th>
            <th>HP</th>
            <th>AT</th>
            <th>DE</th>
            <th>AS</th>
            <th>Line</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((d) => {
            const icon = iconFor(d.name);
            return (
              <tr key={d.slug}>
                <td className="thumb-cell">
                  {icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={icon} alt="" width={40} height={40} />
                  ) : (
                    <span className="evo-fallback">{d.name.slice(0, 2)}</span>
                  )}
                </td>
                <td>
                  <Link href={`/digimon/${d.slug}`}>{d.name}</Link>
                </td>
                <td>
                  <RankBadge rank={d.rank} href={`/rank/${rankSlug(d.rank)}`} />
                </td>
                <td>
                  <RoleBadge role={d.role} />
                </td>
                <td>{d.hp}</td>
                <td>{d.at}</td>
                <td>{d.de}</td>
                <td>{d.as}</td>
                <td>{d.lines.filter((n) => n !== "?").join(", ")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </article>
  );
}
