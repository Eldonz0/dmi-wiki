import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DigimonArticle } from "@/components/digimon-article";
import { DigimonLiveEditor } from "@/components/digimon-live-editor";
import { getDigimon } from "@/lib/catalog";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const digimon = getDigimon(slug);
  return { title: digimon?.name ?? "Digimon" };
}

export default async function DigimonPage({ params }: Props) {
  const { slug } = await params;
  const digimon = getDigimon(slug);
  if (!digimon) notFound();
  return (
    <DigimonLiveEditor slug={slug}>
      <DigimonArticle digimon={digimon} />
    </DigimonLiveEditor>
  );
}
