import Link from "next/link";
import { PortalBox } from "@/components/wiki-article";

export default function HomePage() {
  return (
    <div>
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-kicker">Digimon Master Online — DMI</div>
          <h1>Welcome to the DMI Wiki</h1>
          <p>
            The player encyclopedia for <strong>Digimon Master Online — DMI</strong>,
            a Digimon Masters Online private server. Anyone in the community can
            help fill it in; this first slice is transcribed from Game Master
            posts in <strong>#server-informations</strong>.
          </p>
        </div>
      </div>

      <div className="portal-grid">
        <PortalBox title="Getting started">
          <p>
            DMI is built to stay free-to-play friendly. Newest Digimon evo items
            sit behind a short pay window, then rotate in for everyone else.
          </p>
          <ul>
            <li>
              <Link href="/rules">Server rules</Link> — F2P delay, macros, account cap
            </li>
            <li>
              <Link href="/rules">Two accounts</Link> maximum per person (IP checked)
            </li>
            <li>Use the in-game Auto Play button. Third-party macros are banned.</li>
          </ul>
        </PortalBox>

        <PortalBox title="Tamer systems">
          <p>How parties and guilds actually pay out on this server.</p>
          <ul>
            <li>
              <Link href="/party">Party system</Link> — killer 100% base EXP; allies scale with party size
            </li>
            <li>
              <Link href="/guild">Guild system</Link> — member caps, GP, 14-day skills
            </li>
          </ul>
        </PortalBox>

        <PortalBox title="Digimon">
          <p>Hatching is intentionally hard. Spirit partners and Raremon still feed the guild.</p>
          <ul>
            <li>
              <Link href="/hatching">Hatching</Link> — current 30 GP, planned Lv3–Lv5 split
            </li>
            <li>
              <Link href="/events">Raremon</Link> — silk fixes, Lv3 eggs, drop questions
            </li>
          </ul>
        </PortalBox>

        <PortalBox title="Events & maps">
          <p>Timed content called out by the GM, plus currency notes.</p>
          <ul>
            <li>
              <Link href="/events">Distorted Data Village</Link> — 17:00 start, 2-hour respawn
            </li>
            <li>
              <Link href="/events">OCS / NCS</Link> trade rate vs Digisoul
            </li>
          </ul>
        </PortalBox>
      </div>

      <PortalBox title="Did you know…">
        <ul>
          <li>
            A four-person party does not split one 100% pool. The killer still
            receives <Link href="/party">100% base EXP</Link>, and each other
            member receives 80%.
          </li>
          <li>
            Guilds convert <Link href="/guild">10,000 GP into 1 GSP</Link>, then
            burn that GSP to keep a skill running for 14 days.
          </li>
          <li>
            Latest cash-shop evo items stay exclusive for{" "}
            <Link href="/rules">4–5 months</Link> before F2P catch-up.
          </li>
        </ul>
      </PortalBox>

      <PortalBox title="Still on Discord">
        <p>
          These channels exist on the DMI server but are not transcribed yet:
          <strong> #boss-locations</strong>, <strong>#new-players-guide</strong>,{" "}
          <strong>#dungeon-reward-rules</strong>, <strong>#download-link</strong>,{" "}
          <strong>#digimon-roles</strong>. Screenshot or paste them and they
          become wiki pages.
        </p>
      </PortalBox>
    </div>
  );
}
