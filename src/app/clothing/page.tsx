import type { Metadata } from "next";
import { Infobox, WikiArticle } from "@/components/wiki-article";

export const metadata: Metadata = { title: "Clothing" };

export default function ClothingPage() {
  return (
    <WikiArticle
      title="Clothing"
      category="Tamer"
      infobox={
        <Infobox
          title="Clothing"
          rows={[{ label: "Status", value: "Tables incoming" }]}
        />
      }
    >
      <p>
        Tamer clothing and costumes. This page is a placeholder until set
        bonuses and sources are entered from the catalog editor.
      </p>
    </WikiArticle>
  );
}
