import { NewDigimonPack } from "@/components/new-digimon-pack";
import { PageCanvas } from "@/components/page-canvas";
import { getHomeFeatured } from "@/lib/catalog";
import { getLandPage } from "@/lib/pages";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = getHomeFeatured();
  const items = featured.map((d) => ({
    slug: d.slug,
    name: d.name,
    thumb: d.icon || d.art || undefined,
  }));
  const page = getLandPage("home");

  return (
    <article className="mw-article">
      <NewDigimonPack items={items} />
      <PageCanvas page={page} />
    </article>
  );
}
