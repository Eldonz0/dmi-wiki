import type { Metadata } from "next";
import { Infobox, WikiArticle } from "@/components/wiki-article";

export const metadata: Metadata = { title: "Accessory" };

export default function AccessoryPage() {
  return (
    <WikiArticle
      title="Accessory"
      category="Tamer"
      infobox={
        <Infobox
          title="Accessory"
          rows={[{ label: "Status", value: "Tables incoming" }]}
        />
      }
    >
      <p>
        Tamer accessory stats, slots, and where they drop. This page is a
        placeholder until those tables are entered from the catalog editor.
      </p>
    </WikiArticle>
  );
}
