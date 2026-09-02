import { PageCanvas } from "@/components/page-canvas";
import { featuredPicks, getHomeFeatured } from "@/lib/catalog";
import { getLandPage } from "@/lib/pages";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const page = getLandPage("home");
  const home = getHomeFeatured().map((d) => ({
    slug: d.slug,
    name: d.name,
    thumb: d.icon || d.art || undefined,
  }));
  const extra = page.blocks.flatMap((b) =>
    b.type === "featured" && b.slugs?.length ? b.slugs : [],
  );
  const seen = new Set(home.map((i) => i.slug));
  const featured = [
    ...home,
    ...featuredPicks(extra).filter((i) => !seen.has(i.slug)),
  ];

  return (
    <article className="mw-article">
      <PageCanvas page={page} featured={featured} />
    </article>
  );
}
