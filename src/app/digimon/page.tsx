import type { Metadata } from "next";
import { listForms } from "@/lib/catalog";
import { DigimonIndex } from "@/components/digimon-index";

export const metadata: Metadata = { title: "Digimon List" };
export const dynamic = "force-dynamic";

export default function DigimonIndexPage() {
  const forms = listForms();
  return <DigimonIndex forms={forms} />;
}
