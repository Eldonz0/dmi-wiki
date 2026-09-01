import type { Metadata } from "next";
import Link from "next/link";
import { Infobox, WikiArticle } from "@/components/wiki-article";

export const metadata: Metadata = { title: "Agumon" };

export default function AgumonPage() {
  return (
    <WikiArticle
      title="Agumon"
      category="Digimon"
      infobox={
        <Infobox
          title="Agumon"
          image="/digimon/agumon.png"
          imageAlt="Agumon"
          rows={[
            { label: "Form", value: "Rookie" },
            { label: "Attribute", value: "Vaccine" },
            { label: "Element", value: "Fire" },
            { label: "Type", value: "Reptile" },
            { label: "Family", value: "Dragon's Roar / Metal Empire" },
            { label: "Likely role", value: "AA on the Greymon line (pending PDF)" },
            { label: "Starter", value: "Yes — classic DMO tamer pick" },
          ]}
        />
      }
    >
      <p>
        <strong>Agumon</strong> is the fire reptile starter. On DMI a Rookie is
        not just nostalgia — <Link href="/verdandi">Verdandi</Link> lets Rookies
        (and X-Antibody Digimon) walk without the 500 HP tick. Keep one hatched
        as a shuttle even after you live on Megas.
      </p>

      <h2>Digivolution</h2>
      <div className="evo">
        <span className="evo-step">Koromon</span>
        <span className="evo-arrow">→</span>
        <span className="evo-step">Agumon</span>
        <span className="evo-arrow">→</span>
        <span className="evo-step">Greymon</span>
        <span className="evo-arrow">→</span>
        <span className="evo-step">MetalGreymon</span>
        <span className="evo-arrow">→</span>
        <span className="evo-step">WarGreymon</span>
      </div>
      <p>
        DMO also ships GeoGreymon / ShineGreymon as a parallel vaccine line.
        Same Rookie shuttle, different Mega. Hatch grade still follows{" "}
        <Link href="/hatching">Hatching</Link> and size still follows{" "}
        <Link href="/fruits">fruits</Link> — Miracle / Goddess / Growth, not
        the Hybrid-only Champion fruits.
      </p>
    </WikiArticle>
  );
}
