import { PortalBox } from "@/components/wiki-article";
import { NewDigimonPack } from "@/components/new-digimon-pack";
import { getHomeFeatured, listDigimon } from "@/lib/catalog";
import { isAdmin } from "@/lib/auth";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = getHomeFeatured();
  const canEdit = await isAdmin();
  const options = canEdit
    ? listDigimon().map((d) => ({
        slug: d.slug,
        name: d.name,
        thumb: d.icon || d.art || undefined,
      }))
    : [];
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
          Encyclopedia for <strong>Digimon Masters Infinite</strong>. Partner
          pages follow DMO wiki shape — infobox, stats, and digivolution line.
        </p>
      </PortalBox>

      <div className="portal-grid">
        <PortalBox title="Digimon List">
          <ul>
            <li>
              <Link href="/digimon">Every listed form</Link> — rank, role, and
              default stats
            </li>
          </ul>
        </PortalBox>

        <PortalBox title="Guide">
          <ul>
            <li>
              <Link href="/guide">Boss fruit boxes</Link> and Verdandi chests
            </li>
            <li>
              <Link href="/dungeons">Dungeons</Link> — farms and scan routes
            </li>
          </ul>
        </PortalBox>

        <PortalBox title="Tamer">
          <ul>
            <li>
              <Link href="/accessory">Accessory</Link>
            </li>
            <li>
              <Link href="/clothing">Clothing</Link>
            </li>
          </ul>
        </PortalBox>
      </div>
    </article>
  );
}
