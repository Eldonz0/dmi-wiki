import type { Metadata } from "next";
import Link from "next/link";
import { Infobox, WikiArticle } from "@/components/wiki-article";
import { RankBadge } from "@/components/rank-badge";
import { RANK_META, RANKS, rankSlug } from "@/lib/ranks";
import { DIGIMON } from "@/lib/digimon";

export const metadata: Metadata = { title: "Rank System" };

export default function RankSystemPage() {
  return (
    <WikiArticle
      title="Rank System"
      category="Game system"
      infobox={
        <Infobox
          title="Rank System"
          rows={[
            { label: "Shown on", value: "Digimon Info Window (upper-left)" },
            { label: "Lowest", value: "N" },
            { label: "Highest", value: "U+" },
            {
              label: "DMI role",
              value: (
                <Link href="/roles">SK / AA / TA / SUP (separate stamp)</Link>
              ),
            },
          ]}
        />
      }
    >
      <p>
        Mega+ Digimon on DMO (and DMI) carry a <strong>Rank</strong> in the
        Digimon Info Window. It is a power band, not a combat role. Role (SK,
        AA, TA, SUP) is a DMI stamp on top of rank — a Rank U tank is still TA.
        Layout follows{" "}
        <a href="https://dmowiki.com/Rank_System">dmowiki.com/Rank_System</a>.
      </p>
      <div className="toc">
        <strong>Contents</strong>
        <ol>
          <li>
            <a href="#ladder">Rank ladder</a>
          </li>
          <li>
            <a href="#categories">Category pages</a>
          </li>
          <li>
            <a href="#sheet">Assignment sheet</a>
          </li>
        </ol>
      </div>
      <h2 id="ladder">Rank ladder</h2>
      <p>
        Lowest to highest: N, A, A+, S, S+, SS, SS+, SSS, SSS+, U, U+.
      </p>
      <table className="wikitable">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Band</th>
            <th>On this wiki</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {RANKS.map((code) => {
            const meta = RANK_META[code];
            const count = DIGIMON.filter((d) => d.rank === code).length;
            return (
              <tr key={code}>
                <td>
                  <RankBadge
                    rank={code}
                    href={`/rank/${rankSlug(code)}`}
                  />
                </td>
                <td>{meta.band}</td>
                <td>{count} listed</td>
                <td>{meta.note}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h2 id="categories">Category pages</h2>
      <p>
        Each rank has a category in the same spirit as{" "}
        <a href="https://dmowiki.com/Category:Digimon_Rank_U">
          Category:Digimon Rank U
        </a>
        . Start at{" "}
        <Link href="/rank/u">Digimon Rank U</Link> for the ceiling kits
        (Omegamon X Extreme).
      </p>
      <p className="rank-strip">
        {RANKS.map((code) => (
          <RankBadge
            key={code}
            rank={code}
            href={`/rank/${rankSlug(code)}`}
          />
        ))}
      </p>
      <h2 id="sheet">Assignment sheet</h2>
      <p>
        Official DMI ranks and roles live in{" "}
        <code>digimon_role_assignment_all_forms_new.pdf</code>. That file is
        on the tamer’s Windows machine and is not in this repo yet. Until it is
        dropped into <code>/data</code>, every article marks rank/role as
        pending.
      </p>
    </WikiArticle>
  );
}
