import { PageCanvas } from "@/components/page-canvas";
import { getLandPage } from "@/lib/pages";

export const dynamic = "force-dynamic";
export const metadata = { title: "Clothing" };

export default function ClothingPage() {
  const page = getLandPage("clothing");
  return (
    <article className="mw-article">
      <div className="mw-pre-title">From DMI Wiki · {page.category}</div>
      <PageCanvas page={page} />
    </article>
  );
}
