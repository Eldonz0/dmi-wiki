"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CatalogForm } from "@/lib/digimon-types";
import { RANKS, rankSlug } from "@/lib/ranks";
import { RankBadge, RoleBadge } from "@/components/rank-badge";
import { AddDigimonButton } from "@/components/add-digimon";
import { IndexChip } from "@/components/index-chip";
import { useAdmin } from "@/hooks/use-admin";
import { useEditorMode } from "@/components/editor-mode";

export function DigimonIndex({ forms }: { forms: (CatalogForm & { icon?: string })[] }) {
  const { admin } = useAdmin();
  const { editing } = useEditorMode();
  const uploadable = admin && editing;
  const [q, setQ] = useState("");
  const [rank, setRank] = useState("all");
  const [icons, setIcons] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    for (const d of forms) if (d.icon) map[d.name] = d.icon;
    return map;
  });
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
      <div className="guide-head">
        <h1 className="mw-firstHeading">Digimon List</h1>
        <AddDigimonButton />
      </div>
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
        {rows.map((d) => (
            <tr key={d.slug}>
              <td className="thumb-cell">
                <IndexChip
                  name={d.name}
                  src={icons[d.name]}
                  uploadable={uploadable}
                  onUploaded={(name, url) =>
                    setIcons((prev) => ({ ...prev, [name]: url }))
                  }
                />
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
          ))}
        </tbody>
      </table>
    </article>
  );
}
