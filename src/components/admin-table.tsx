"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CatalogForm } from "@/lib/digimon-types";
import { RANKS, rankSlug } from "@/lib/ranks";
import { RankBadge, RoleBadge } from "@/components/rank-badge";

export function AdminTable({ forms }: { forms: CatalogForm[] }) {
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
        d.slug.includes(needle)
      );
    });
  }, [forms, needle, rank]);

  return (
    <>
      <p className="digi-filter">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter catalog"
        />
        <select value={rank} onChange={(e) => setRank(e.target.value)}>
          <option value="all">All ranks</option>
          {RANKS.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </p>
      <p className="section-lead">
        {rows.length} shown. Open a form to edit stats and connect evolutions.
      </p>
      <table className="wikitable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rank</th>
            <th>Role</th>
            <th>HP</th>
            <th>AT</th>
            <th>DE</th>
            <th>AS</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((d) => (
            <tr key={d.slug}>
              <td>
                <Link href={`/admin/${d.slug}`}>{d.name}</Link>
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
              <td>
                <Link href={`/digimon/${d.slug}`}>view</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
