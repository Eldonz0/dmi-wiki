import Link from "next/link";
import { PortalBox } from "@/components/wiki-article";

export default function HomePage() {
  return (
    <article className="mw-article">
      <h1 className="mw-firstHeading">Main Page</h1>

      <PortalBox title="Welcome!">
        <p>
          Welcome to the <strong>Digimon Master Online — DMI Wiki</strong>, the
          player encyclopedia for the DMI private server. This wiki is a work in
          progress. The first articles come from Game Master posts in Discord{" "}
          <strong>#server-informations</strong>.
        </p>
        <p>
          Need something that is not here yet? Check{" "}
          <Link href="/search">pages still on Discord</Link> or paste a
          screenshot of another channel.
        </p>
      </PortalBox>

      <div className="portal-grid">
        <PortalBox title="Game system">
          <ul>
            <li>
              <Link href="/party">Party system</Link>
            </li>
            <li>
              <Link href="/guild">Guild system</Link>
            </li>
            <li>
              <Link href="/hatching">Hatching</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
          </ul>
        </PortalBox>

        <PortalBox title="Tamer">
          <ul>
            <li>
              <Link href="/rules">Server rules</Link>
            </li>
            <li>
              <Link href="/rules">Account limit</Link> (2 per person)
            </li>
            <li>
              <Link href="/rules">Macros / Auto Play</Link>
            </li>
            <li>
              <Link href="/rules">Free-to-play delay</Link>
            </li>
          </ul>
        </PortalBox>

        <PortalBox title="Digimon">
          <ul>
            <li>
              <Link href="/hatching">Spirit Digimon hatching</Link>
            </li>
            <li>
              <Link href="/events">Raremon</Link>
            </li>
            <li>
              <Link href="/hatching">Hatch levels &amp; guild points</Link>
            </li>
          </ul>
        </PortalBox>

        <PortalBox title="Updates">
          <ul>
            <li>
              <Link href="/events">Distorted Data Village</Link> — 17:00, 2-hour respawn
            </li>
            <li>
              <Link href="/events">Bounded silk Raremon</Link> maintenance fix
            </li>
            <li>
              <Link href="/events">OCS/NCS ↔ Digisoul</Link> rate
            </li>
          </ul>
        </PortalBox>
      </div>

      <PortalBox title="Guides">
        <ul>
          <li>
            <Link href="/rules">New tamer rules</Link>
          </li>
          <li>
            <Link href="/party">How party EXP works on DMI</Link>
          </li>
          <li>
            <Link href="/guild">Guild points and skills</Link>
          </li>
        </ul>
      </PortalBox>

      <PortalBox title="Extra information">
        <p>
          Still only on Discord: <strong>#boss-locations</strong>,{" "}
          <strong>#new-players-guide</strong>, <strong>#dungeon-reward-rules</strong>,{" "}
          <strong>#download-link</strong>, <strong>#digimon-roles</strong>.
        </p>
      </PortalBox>
    </article>
  );
}
