import type { Metadata } from "next";
import Link from "next/link";
import { Infobox, WikiArticle } from "@/components/wiki-article";

export const metadata: Metadata = { title: "Dungeons" };

export default function DungeonsPage() {
  return (
    <WikiArticle
      title="Dungeons"
      category="Guide"
      infobox={
        <Infobox
          title="Dungeons"
          rows={[
            { label: "Fruit boxes", value: <Link href="/guide">Guide</Link> },
            { label: "Scan farms", value: "Forge, Maze, Infinite Mountain" },
          ]}
        />
      }
    >
      <p>
        Dungeon pages will list maps, bosses, and recommended farms. Box rates
        and scan fruit already sit on the <Link href="/guide">Guide</Link>.
      </p>
      <ul>
        <li>Forge / Maze / Infinite Mountain — scan boxes (see Guide).</li>
        <li>
          Infinite Mountain Champion Devimon — Giga Box farm at 19% box rate.
        </li>
      </ul>
    </WikiArticle>
  );
}
