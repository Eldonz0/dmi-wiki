import type { Metadata } from "next";
import Link from "next/link";
import { Infobox, WikiArticle } from "@/components/wiki-article";

export const metadata: Metadata = { title: "Server rules" };

export default function RulesPage() {
  return (
    <WikiArticle
      title="Server rules"
      category="Server"
      infobox={
        <Infobox
          title="Server rules"
          rows={[
            { label: "Type", value: "Policy" },
            { label: "F2P delay", value: "4–5 months" },
            { label: "Account cap", value: "2 per person" },
            { label: "Macros", value: "Banned (in-game Auto Play OK)" },
            { label: "Source", value: "#server-informations" },
          ]}
        />
      }
    >
      <div className="toc">
        <strong>Contents</strong>
        <ol>
          <li>Free-to-play policy</li>
          <li>Macros</li>
          <li>Account limit</li>
          <li>Hatching difficulty</li>
        </ol>
      </div>

      <p>
        Core policy for <strong>Digimon Master Online — DMI</strong>, posted by
        Game_Master_DMI. Account and macro rules are enforced by IP, not honor
        system.
      </p>

      <h2>Free-to-play policy</h2>
      <p>
        The server is described as free-to-play friendly. Event and dungeon
        evolution items are added on a regular schedule so unpaid players can
        still evolve.
      </p>
      <p>
        The newest Digimon evo items stay with paying players first. That head
        start lasts <strong>4–5 months</strong>, then the same pieces are added
        for everyone else. The delay is meant to protect people who spent money
        without locking F2P out forever.
      </p>

      <h2>Macros</h2>
      <p>
        Third-party macros are forbidden. The client already includes a built-in{" "}
        <strong>Auto Play</strong> (macro auto play) button. Use that for AFK
        combat.
      </p>

      <h2>Account limit</h2>
      <p>
        A tamer may run <strong>two accounts</strong>: one for farming, one for
        regular play. A third client is treated as multi-boxing. Staff tracks
        this by IP and bans extra accounts.
      </p>

      <h2>Hatching difficulty</h2>
      <p>
        Getting a Digimon to hatch is hard on purpose. See{" "}
        <Link href="/hatching">Hatching</Link> for guild-point values on spirit
        Digimon and Raremon.
      </p>
    </WikiArticle>
  );
}
