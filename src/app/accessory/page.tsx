import { PageCanvas } from "@/components/page-canvas";
import { getLandPage } from "@/lib/pages";

export const dynamic = "force-dynamic";
export const metadata = { title: "Accessory" };

export default function AccessoryPage() {
  const page = getLandPage("accessory");
  return (
    <article className="mw-article">
      <div className="mw-pre-title">From DMI Wiki · {page.category}</div>
      <PageCanvas page={page} />
    </article>
  );
}
