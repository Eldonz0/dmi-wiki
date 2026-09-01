import Link from "next/link";
import { PortalBox } from "@/components/wiki-article";

export default function HomePage() {
  return (
    <article className="mw-article">
      <div className="wiki-banner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/banner.png"
          alt="Digital World islands and partner Digimon over a data ocean"
        />
        <div className="wiki-banner-caption">
          <strong>Digimon Master Online — DMI</strong>
          <span>Private-server encyclopedia. Same bones as classic DMO wikis.</span>
        </div>
      </div>

      <h1 className="mw-firstHeading">Main Page</h1>

      <PortalBox title="Welcome!">
        <p>
          Welcome to the <strong>DMI Wiki</strong>. Combat, hatching, guilds, and
          fruit tables below come from Game Master posts. Partner pages use the
          same infobox-and-line layout you know from DMO wikis.
        </p>
      </PortalBox>

      <PortalBox title="Featured Digimon">
        <div className="partner-grid">
          <Link href="/digimon/agumon" className="partner-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/digimon/agumon.png" alt="Agumon" />
            <span>Agumon</span>
          </Link>
          <Link href="/digimon/donedevimon" className="partner-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/digimon/donedevimon.png" alt="DoneDevimon" />
            <span>DoneDevimon</span>
          </Link>
          <Link href="/fruits" className="partner-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/digimon/spirit.png" alt="Spirit warrior" />
            <span>Spirit / Hybrid fruits</span>
          </Link>
        </div>
      </PortalBox>

      <div className="portal-grid">
        <PortalBox title="Game system">
          <ul>
            <li>
              <Link href="/combat">Combat</Link> — level-gap punch-back, hit chance, block, boss defence
            </li>
            <li>
              <Link href="/roles">Roles</Link> — AA · TA · SK · SUP
            </li>
            <li>
              <Link href="/exp">EXP boosters</Link> — membership + system buffs stack additively
            </li>
            <li>
              <Link href="/party">Party EXP</Link> · <Link href="/guild">Guilds</Link>
            </li>
          </ul>
        </PortalBox>

        <PortalBox title="Tamer">
          <ul>
            <li>
              <Link href="/rules">Server rules</Link>
            </li>
            <li>
              <Link href="/sets">Carries sets</Link> — full stats if the set matches your role
            </li>
            <li>
              <Link href="/fruits">Size fruits</Link> — Champion through Super Growth
            </li>
          </ul>
        </PortalBox>

        <PortalBox title="World">
          <ul>
            <li>
              <Link href="/verdandi">Verdandi</Link> — Rookie / X-Antibody only, or 500 HP every 5s
            </li>
            <li>
              <Link href="/drops">Boss fruit boxes</Link>
            </li>
            <li>
              <Link href="/events">Distorted Data Village</Link>
            </li>
          </ul>
        </PortalBox>

        <PortalBox title="Did you know…">
          <ul>
            <li>
              Fighting 31 levels up gives the mob <Link href="/combat">+40% attack</Link>.
            </li>
            <li>
              Chat EXP is <code>total(+bonus)</code>. Base is total minus bonus.
            </li>
            <li>
              Guild level 1 holds <Link href="/guild">60 members</Link>, not 50.
            </li>
          </ul>
        </PortalBox>
      </div>
    </article>
  );
}
