import Link from "next/link";
import { PortalBox } from "@/components/wiki-article";
import { NEW_DIGIMON } from "@/lib/wiki";

export default function HomePage() {
  const left = NEW_DIGIMON.filter((_, i) => i % 2 === 0);
  const right = NEW_DIGIMON.filter((_, i) => i % 2 === 1);

  return (
    <article className="mw-article">
      <div className="notice">
        <span aria-hidden>⚠</span>
        <p>
          New update is live. Combat, fruits, Verdandi, and the first partner
          pages are on this wiki now.
        </p>
      </div>

      <section className="newPack">
        <div className="newBar">New Digimon</div>
        <div className="newGrid">
          <div>
            {left.map((item) => (
              <NewRow key={item.name} item={item} />
            ))}
          </div>
          <div>
            {right.map((item) => (
              <NewRow key={item.name} item={item} />
            ))}
          </div>
        </div>
        <div className="newBar" />
      </section>

      <h1 className="mw-firstHeading">Main Page</h1>

      <PortalBox title="Welcome">
        <p>
          Encyclopedia for <strong>Digimon Masters Infinite</strong>. Mechanics
          come from Game Master posts. Partner pages follow DMO wiki shape —
          infobox, line, and what actually changes on DMI.
        </p>
      </PortalBox>

      <div className="portal-grid">
        <PortalBox title="Game system">
          <ul>
            <li>
              <Link href="/combat">Combat</Link> — level gap, hit, block, defence
            </li>
            <li>
              <Link href="/roles">Roles</Link> — AA · TA · SK · SUP
            </li>
            <li>
              <Link href="/exp">EXP boosters</Link>
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
              <Link href="/sets">Carries sets</Link>
            </li>
            <li>
              <Link href="/fruits">Size fruits</Link>
            </li>
          </ul>
        </PortalBox>

        <PortalBox title="World">
          <ul>
            <li>
              <Link href="/verdandi">Verdandi</Link>
            </li>
            <li>
              <Link href="/drops">Boss fruit boxes</Link>
            </li>
            <li>
              <Link href="/events">Distorted Data Village</Link>
            </li>
          </ul>
        </PortalBox>

        <PortalBox title="Did you know">
          <ul>
            <li>
              A 31-level gap gives the mob <Link href="/combat">+40% attack</Link>.
            </li>
            <li>
              Chat EXP is <code>total(+bonus)</code>.
            </li>
            <li>
              Guild level 1 holds <Link href="/guild">60 members</Link>.
            </li>
          </ul>
        </PortalBox>
      </div>
    </article>
  );
}

function NewRow({
  item,
}: {
  item: { name: string; href: string; thumb?: string };
}) {
  return (
    <Link href={item.href} className="newItem">
      {item.thumb ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.thumb} alt="" width={36} height={36} />
      ) : (
        <span className="newMark">{item.name.slice(0, 2)}</span>
      )}
      <span>{item.name}</span>
    </Link>
  );
}
