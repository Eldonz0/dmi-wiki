import type { Metadata } from "next";
import Link from "next/link";
import { Infobox, WikiArticle } from "@/components/wiki-article";
import { HATCH_PLANNED } from "@/lib/wiki";

export const metadata: Metadata = { title: "Hatching" };

export default function HatchingPage() {
  return (
    <WikiArticle
      title="Hatching"
      category="Digimon"
      infobox={
        <Infobox
          title="Hatching"
          rows={[
            { label: "Type", value: "Progression" },
            { label: "Difficulty", value: "Hard (by design)" },
            { label: "Current GP", value: "30 (Lv3 / spirit / Raremon)" },
            { label: "See also", value: <Link href="/guild">Guild system</Link> },
          ]}
        />
      }
    >
      <p>
        Game_Master_DMI calls hatching hard. Spirit Digimon and Raremon still
        pay guild points when they come out of the egg.
      </p>

      <h2>Spirit Digimon and Raremon</h2>
      <p>
        Hatching a spirit Digimon or a Raremon currently awards{" "}
        <strong>30 guild points</strong>. That matches the generic “hatching: 30
        points” line on the <Link href="/guild">guild chart</Link>.
      </p>

      <h2>Hatch level vs points</h2>
      <p>
        Right now, level 3 hatching is the tier that pays 30 points. A later
        change is already sketched: lower Lv3, then pay more for Lv4 and Lv5.
      </p>
      <table className="wikitable">
        <thead>
          <tr>
            <th>Hatch level</th>
            <th>Current</th>
            <th>Planned</th>
          </tr>
        </thead>
        <tbody>
          {HATCH_PLANNED.map((row) => (
            <tr key={row.level}>
              <td>{row.level}</td>
              <td>{row.current}</td>
              <td>{row.planned}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </WikiArticle>
  );
}
