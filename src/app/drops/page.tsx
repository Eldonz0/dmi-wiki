import type { Metadata } from "next";
import Link from "next/link";
import { Infobox, WikiArticle } from "@/components/wiki-article";
import { BOX_DROPS, VERDANDI_CHESTS } from "@/lib/content";

export const metadata: Metadata = { title: "Boss fruit boxes" };

export default function DropsPage() {
  return (
    <WikiArticle
      title="Boss fruit boxes"
      category="Drops"
      infobox={
        <Infobox
          title="Fruit boxes"
          rows={[
            { label: "Inside box", value: "Fanglongmon Yin and Yang" },
            { label: "Must scan", value: "Forge, Maze, Infinite Mountain" },
            { label: "Field chests", value: <Link href="/verdandi">Verdandi</Link> },
          ]}
        />
      }
    >
      <h2>Dungeon bosses that drop a box with fruit inside</h2>
      <table className="wikitable">
        <thead>
          <tr>
            <th>Dungeon</th>
            <th>Boss</th>
            <th>Box</th>
            <th>Drop rate</th>
            <th>Fruit</th>
          </tr>
        </thead>
        <tbody>
          {BOX_DROPS.filter((row) => !row.scan).map((row) => (
            <tr key={row.boss}>
              <td>{row.dungeon}</td>
              <td>{row.boss}</td>
              <td>{row.box}</td>
              <td>{row.rate}</td>
              <td>{row.fruit}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Dungeon bosses that drop a box you scan</h2>
      <table className="wikitable">
        <thead>
          <tr>
            <th>Dungeon</th>
            <th>Boss</th>
            <th>Box</th>
            <th>Drop rate</th>
            <th>From scan</th>
          </tr>
        </thead>
        <tbody>
          {BOX_DROPS.filter((row) => row.scan).map((row) => (
            <tr key={row.boss}>
              <td>{row.dungeon}</td>
              <td>{row.boss}</td>
              <td>{row.box}</td>
              <td>{row.rate}</td>
              <td>{row.fruit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Infinite Mountain’s Champion <Link href="/digimon/donedevimon">Devimon</Link>{" "}
        is the Giga Box farm. Same scan ladder as Mega Box, better fruit-box rate
        (19% vs 9%).
      </p>

      <h2>Verdandi chests</h2>
      <p>Every listed Verdandi boss drops its chest at 100%.</p>
      <table className="wikitable">
        <thead>
          <tr>
            <th>Boss</th>
            <th>Box</th>
            <th>Fruit inside</th>
          </tr>
        </thead>
        <tbody>
          {VERDANDI_CHESTS.map((row) => (
            <tr key={row.boss}>
              <td>{row.boss}</td>
              <td>{row.box}</td>
              <td>{row.fruit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </WikiArticle>
  );
}
