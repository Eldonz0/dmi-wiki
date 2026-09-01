import type { Metadata } from "next";
import Link from "next/link";
import { Infobox, WikiArticle } from "@/components/wiki-article";
import {
  BOSS_DEFENCE,
  HIT_CHANCE,
  LEVEL_GAP_ATTACK,
} from "@/lib/content";

export const metadata: Metadata = { title: "Combat" };

export default function CombatPage() {
  return (
    <WikiArticle
      title="Combat"
      category="Mechanics"
      infobox={
        <Infobox
          title="Combat"
          rows={[
            { label: "Type", value: "PvE rules" },
            { label: "Level gap", value: "Enemy attack scales up" },
            { label: "Block (TA)", value: "50% chance, half damage" },
            { label: "Block (others)", value: "30%" },
            { label: "Boss DEF cap", value: "60% at 9,000+" },
          ]}
        />
      }
    >
      <p>
        DMI keeps the usual DMO loop — basic hits, skills, block, avoid — but
        Game Master posts lock down a few numbers that official wikis leave
        vague. Fight too far under a mob and it hits back harder. Hit chance
        still cares about your level versus theirs when your Hit Rate is not
        crushing their Evasion.
      </p>

      <h2>Partner versus enemy Digimon (level gap)</h2>
      <p>
        If the enemy is higher level than your partner, its attacks get a
        power bonus:
      </p>
      <table className="wikitable">
        <thead>
          <tr>
            <th>Level gap</th>
            <th>Enemy attack</th>
          </tr>
        </thead>
        <tbody>
          {LEVEL_GAP_ATTACK.map((row) => (
            <tr key={row.gap}>
              <td>{row.gap}</td>
              <td>{row.boost}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Example from the GM: your Digimon is level 20, the enemy is 51 (gap
        31, the 30–39 band). Enemy attack is <strong>+40%</strong>.
      </p>

      <h2>Hit chance</h2>
      <p>
        When your Hit Rate is not already beating the mob’s Evasion, level
        difference decides how often you connect:
      </p>
      <table className="wikitable">
        <thead>
          <tr>
            <th>Player vs mob</th>
            <th>Hit chance (HT ≤ mob EV)</th>
          </tr>
        </thead>
        <tbody>
          {HIT_CHANCE.map((row) => (
            <tr key={row.gap}>
              <td>{row.gap}</td>
              <td>{row.hit}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Boss skills and Defence</h2>
      <p>
        Boss skills used to ignore Defence, Block, and Avoid. They now respect
        all three. Defence cuts that damage on a curve:
      </p>
      <table className="wikitable">
        <thead>
          <tr>
            <th>Your Defence</th>
            <th>Damage reduced</th>
          </tr>
        </thead>
        <tbody>
          {BOSS_DEFENCE.map((row) => (
            <tr key={row.def}>
              <td>{row.def}</td>
              <td>{row.reduced}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Block</h2>
      <p>
        Most Digimon used to sit above 100% Block, so it fired on every hit
        and the Tank set’s Block bonus was worthless. Block is a chance again:
      </p>
      <ul>
        <li>
          <Link href="/roles">TA — Tank</Link>: 50% block chance
        </li>
        <li>Everyone else: 30%</li>
        <li>A successful block halves the hit.</li>
      </ul>
    </WikiArticle>
  );
}
