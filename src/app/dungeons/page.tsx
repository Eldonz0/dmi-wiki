import { PageCanvas } from "@/components/page-canvas";
import { getLandPage } from "@/lib/pages";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dungeons" };

export default function DungeonsPage() {
  const page = getLandPage("dungeons");
  return (
    <article className="mw-article">
      <div className="mw-pre-title">From DMI Wiki · {page.category}</div>
      <PageCanvas page={page} />
    </article>
  );
}
