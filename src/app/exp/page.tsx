import type { Metadata } from "next";
import { Infobox, WikiArticle } from "@/components/wiki-article";
import { EXP_BUFFS } from "@/lib/content";

export const metadata: Metadata = { title: "EXP boosters" };

export default function ExpPage() {
  return (
    <WikiArticle
      title="EXP boosters"
      category="Mechanics"
      infobox={
        <Infobox
          title="EXP"
          rows={[
            { label: "Chat format", value: "total(+bonus)" },
            { label: "Base", value: "total − bonus" },
            { label: "Stacking", value: "Additive percents" },
            { label: "MM", value: "+200% (long buff)" },
          ]}
        />
      }
    >
      <p>
        Combat log lines look like{" "}
        <code>Tamer obtained EXP 9(+6). Digimon obtained EXP 195(+130)</code>.
        The number in parentheses is the bonus. Subtract it to recover base EXP,
        then you can reverse the percent.
      </p>

      <h2>Known buffs</h2>
      <table className="wikitable">
        <thead>
          <tr>
            <th>Buff</th>
            <th>Type</th>
            <th>EXP</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {EXP_BUFFS.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td>{row.type}</td>
              <td>{row.pct}</td>
              <td>{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>How the math actually runs</h2>
      <p>
        Percents add, then multiply base. Masters Membership’s +200% on a base
        of 3 is +6. An Amplification Booster’s +1000% on the same 3 is +30. Both
        together are +1200% → +36, total 39. Same pattern on Digimon EXP: a 65
        base with MM + booster is 65 + 780 = 845.
      </p>
      <p>
        A later GM post stacked even harder: 200% MM + 1000% premium
        amplification + 1000% crystal EXP + 500% ExpBooster ={" "}
        <strong>2700%</strong>. On a tamer base of 3 that is 84(+81).
      </p>
    </WikiArticle>
  );
}
