import type { Metadata } from "next";
import { Infobox, WikiArticle } from "@/components/wiki-article";
import { PARTY_ROWS } from "@/lib/wiki";

export const metadata: Metadata = { title: "Party system" };

export default function PartyPage() {
  return (
    <WikiArticle
      title="Party system"
      category="Mechanics"
      infobox={
        <Infobox
          title="Party system"
          rows={[
            { label: "Type", value: "Combat EXP" },
            { label: "Killer share", value: "Always 100% base" },
            { label: "Max party", value: "4 (table as posted)" },
            { label: "Source", value: "GM: “more important here”" },
          ]}
        />
      }
    >
      <p>
        The player who lands the kill always receives full <strong>base EXP</strong>.
        Other members receive a share that grows as the party fills. Game Master
        caption on the original table: the party system matters more on DMI.
      </p>

      <h2>EXP table</h2>
      <table className="wikitable">
        <thead>
          <tr>
            <th>Party size</th>
            <th>Killer</th>
            <th>Other members</th>
          </tr>
        </thead>
        <tbody>
          {PARTY_ROWS.map((row) => (
            <tr key={row.size}>
              <td>{row.size} members</td>
              <td>{row.killer}</td>
              <td>{row.others}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Notes</h2>
      <ul>
        <li>
          Solo play is not listed: you are the killer, so you take 100% base EXP.
        </li>
        <li>
          These are percentages of base EXP, not slices of a single 100% pool. A
          four-person party pays 100% to the killer plus 80% to each of the other
          three.
        </li>
        <li>Fill the party when you can. Extra members earn a larger cut.</li>
      </ul>
    </WikiArticle>
  );
}
