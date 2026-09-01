import type { Metadata } from "next";
import Link from "next/link";
import { Infobox, WikiArticle } from "@/components/wiki-article";
import { VERDANDI_CHESTS } from "@/lib/content";

export const metadata: Metadata = { title: "Verdandi" };

export default function VerdandiPage() {
  return (
    <WikiArticle
      title="Verdandi"
      category="Maps"
      infobox={
        <Infobox
          title="Verdandi"
          rows={[
            { label: "Type", value: "Field / spirit frontier" },
            { label: "Safe partners", value: "Rookie or X-Antibody" },
            { label: "Penalty", value: "500 HP every 5 seconds" },
            { label: "Chests", value: "100% on listed bosses" },
          ]}
        />
      }
    >
      <p>
        Verdandi is DMI’s spirit-war map in the same family as DMO’s Frontier
        fields. You may walk it freely on a <strong>Rookie</strong> or an{" "}
        <strong>X-Antibody</strong> Digimon. Any other partner takes{" "}
        <strong>500 HP every 5 seconds</strong> until you swap or leave.
      </p>
      <p>
        Bring a Rookie shuttle, then fight the named bosses for event fruit
        chests — full table on <Link href="/drops">Boss fruit boxes</Link>.
      </p>
      <ul>
        {VERDANDI_CHESTS.map((row) => (
          <li key={row.boss}>
            {row.boss} — {row.box} ({row.fruit})
          </li>
        ))}
      </ul>
    </WikiArticle>
  );
}
