import type { Metadata } from "next";
import { Infobox, WikiArticle } from "@/components/wiki-article";
import { GUILD_LEVELS, GUILD_POINTS } from "@/lib/wiki";

export const metadata: Metadata = { title: "Guild system" };

export default function GuildPage() {
  return (
    <WikiArticle
      title="Guild system"
      category="Mechanics"
      infobox={
        <Infobox
          title="Guild system"
          rows={[
            { label: "Type", value: "Social / progression" },
            { label: "Max size", value: "150 (level 5+)" },
            { label: "GSP rate", value: "1 per 10,000 GP" },
            { label: "Skill duration", value: "14 days" },
          ]}
        />
      }
    >
      <p>
        Guild capacity scales with level. Members feed <strong>Guild Points (GP)</strong>{" "}
        through hatching, raids, quests, and grinding. Skill points unlock timed
        guild skills.
      </p>

      <h2>Member cap</h2>
      <table className="wikitable">
        <thead>
          <tr>
            <th>Guild level</th>
            <th>Max members</th>
          </tr>
        </thead>
        <tbody>
          {GUILD_LEVELS.map((row) => (
            <tr key={row.level}>
              <td>Level {row.level}</td>
              <td>{row.members}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Earning Guild Points</h2>
      <table className="wikitable">
        <thead>
          <tr>
            <th>Action</th>
            <th>GP</th>
          </tr>
        </thead>
        <tbody>
          {GUILD_POINTS.map((row) => (
            <tr key={row.action}>
              <td>{row.action}</td>
              <td>{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Guild Skill Points</h2>
      <p>
        Every <strong>10,000 Guild Points</strong> grants <strong>1 GSP</strong>.
        Spend GSP to activate guild skills. Each activation lasts{" "}
        <strong>14 days</strong>.
      </p>
    </WikiArticle>
  );
}
