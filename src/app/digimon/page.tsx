import type { Metadata } from "next";
import { listDigimon } from "@/lib/catalog";
import { DigimonIndex } from "@/components/digimon-index";

export const metadata: Metadata = { title: "Digimon" };
export const dynamic = "force-dynamic";

export default function DigimonIndexPage() {
  const forms = listDigimon();
  return <DigimonIndex forms={forms} />;
}
