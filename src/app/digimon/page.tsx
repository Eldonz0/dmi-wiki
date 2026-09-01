import type { Metadata } from "next";
import Link from "next/link";
import { DIGIMON } from "@/lib/digimon";
import { RANKS, rankSlug } from "@/lib/ranks";
import { RankBadge, RoleBadge } from "@/components/rank-badge";

export const metadata: Metadata = { title: "Digimon" };

export default function DigimonIndexPage() {
  return (
    <article className="mw-article">
      <div className="mw-pre-title">From DMI Wiki · Digimon</div>
      <h1 className="mw-firstHeading">Digimon</h1>
      <p>
        Partner pages match the DMO wiki shape: right-hand infobox (form,
        attribute, element, type, family, rank badge, DMI role), default stats
        (HP / DS / DE / AT / AS / CT / HT / EV / BL), attacks, and a
        chip digivolution line.{" "}
        <Link href="/rank-system">Rank System</Link> uses the same ladder as{" "}
        <a href="https://dmowiki.com/Rank_System">dmowiki Rank System</a> (N
        through U+).
      </p>
      <p className="sheet-note">
        Put <code>digimon_role_assignment_all_forms_new.pdf</code> in{" "}
        <code>/data</code> and every form can pick up SK / AA / TA / SUP and
        rank from the sheet instead of the placeholders below.
      </p>
      <table className="wikitable">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Form</th>
            <th>Attribute</th>
            <th>Rank</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {DIGIMON.map((d) => (
            <tr key={d.slug}>
              <td className="thumb-cell">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.image} alt="" width={40} height={40} />
              </td>
              <td>
                <Link href={`/digimon/${d.slug}`}>{d.name}</Link>
              </td>
              <td>{d.form}</td>
              <td>
                {d.attribute} / {d.element}
              </td>
              <td>
                <RankBadge
                  rank={d.rank}
                  href={`/rank/${rankSlug(d.rank)}`}
                />
              </td>
              <td>
                <RoleBadge role={d.role} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Browse by rank</h2>
      <p className="rank-strip">
        {RANKS.map((code) => (
          <RankBadge
            key={code}
            rank={code}
            href={`/rank/${rankSlug(code)}`}
          />
        ))}
      </p>
    </article>
  );
}
