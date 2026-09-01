import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RankBadge, RoleBadge } from "@/components/rank-badge";
import { DIGIMON, digimonByRank } from "@/lib/digimon";
import { RANK_META, RANKS, rankFromSlug, rankSlug } from "@/lib/ranks";

type Props = { params: Promise<{ code: string }> };

export function generateStaticParams() {
  return RANKS.map((code) => ({ code: rankSlug(code) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const rank = rankFromSlug(code);
  return { title: rank ? `Digimon Rank ${rank}` : "Rank" };
}

export default async function RankCategoryPage({ params }: Props) {
  const { code } = await params;
  const rank = rankFromSlug(code);
  if (!rank) notFound();
  const list = digimonByRank(rank);
  const meta = RANK_META[rank];

  return (
    <article className="mw-article">
      <div className="mw-pre-title">From DMI Wiki · Category</div>
      <h1 className="mw-firstHeading">Category: Digimon Rank {rank}</h1>
      <p>
        <RankBadge rank={rank} /> {meta.band}. {meta.note} See the{" "}
        <Link href="/rank-system">Rank System</Link> for the full ladder.
        Modelled on{" "}
        <a href="https://dmowiki.com/Category:Digimon_Rank_U">
          Category:Digimon Rank U
        </a>
        .
      </p>
      {list.length === 0 ? (
        <p className="sheet-note">
          No partner on this wiki is stamped Rank {rank} yet. Import the
          assignment PDF to fill the category.
        </p>
      ) : (
        <table className="wikitable">
          <thead>
            <tr>
              <th></th>
              <th>Digimon</th>
              <th>Form</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {list.map((d) => (
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
                  <RoleBadge role={d.role} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h2>All ranks</h2>
      <p className="rank-strip">
        {RANKS.map((c) => (
          <RankBadge
            key={c}
            rank={c}
            href={`/rank/${rankSlug(c)}`}
          />
        ))}
      </p>
      <p>
        {DIGIMON.length} Digimon currently have articles. Rank stamps are
        pending PDF.
      </p>
    </article>
  );
}
