import { PortalBox } from "@/components/wiki-article";
import { NewDigimonPack } from "@/components/new-digimon-pack";
import { getHomeFeatured, listDigimon } from "@/lib/catalog";
import { isAdmin } from "@/lib/auth";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = getHomeFeatured();
  const canEdit = await isAdmin();
  const options = listDigimon().map((d) => ({
    slug: d.slug,
    name: d.name,
    thumb: d.icon || d.art || undefined,
  }));
  const items = featured.map((d) => ({
    slug: d.slug,
    name: d.name,
    thumb: d.icon || d.art || undefined,
  }));

  return (
    <article className="mw-article">
      <NewDigimonPack items={items} options={options} canEdit={canEdit} />

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
              <Link href="/rank-system">Rank System</Link> — N through U+
            </li>
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
