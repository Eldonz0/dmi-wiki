import type { Metadata } from "next";
import { Infobox, WikiArticle } from "@/components/wiki-article";
import { FRUITS } from "@/lib/content";

export const metadata: Metadata = { title: "Size fruits" };

export default function FruitsPage() {
  return (
    <WikiArticle
      title="Size fruits"
      category="Items"
      infobox={
        <Infobox
          title="Size fruits"
          image="/digimon/spirit.png"
          imageAlt="Spirit warrior"
          rows={[
            { label: "Use", value: "Size / hatch grade" },
            { label: "Spirit line", value: "Champion / Overload / Genesis" },
            { label: "Variant line", value: "Hades / Darkness / Chaos" },
            { label: "Transcend", value: "Yggdrasil / Homeostasis / Super Growth" },
          ]}
        />
      }
    >
      <p>
        Size fruits are the DMI version of the DMO size minigame: each fruit
        rolls your Digimon inside a size band, and the average number of eats
        to cap depends on how tight that band is. Class restrictions matter —
        feeding a Miracle Fruit to a Hybrid is a wasted click.
      </p>
      <table className="wikitable">
        <thead>
          <tr>
            <th>Fruit</th>
            <th>Class</th>
            <th>Hatch grade</th>
            <th>Size range</th>
            <th>Avg to max</th>
          </tr>
        </thead>
        <tbody>
          {FRUITS.map((row) => (
            <tr key={row.fruit}>
              <td>{row.fruit}</td>
              <td>{row.restriction}</td>
              <td>{row.grade}</td>
              <td>{row.size}</td>
              <td>{row.avg}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Mysterious Fruit SKUs in the GM sheet are messy (one is a no-op on grade
        3). Prefer named fruits until those IDs are cleaned. Growth Fruit and
        Super Growth Fruit skip the roll and stamp 130% / 140%.
      </p>
    </WikiArticle>
  );
}
