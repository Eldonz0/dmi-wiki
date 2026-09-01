import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DigimonArticle } from "@/components/digimon-article";
import { DIGIMON, getDigimon } from "@/lib/digimon";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return DIGIMON.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const digimon = getDigimon(slug);
  return { title: digimon?.name ?? "Digimon" };
}

export default async function DigimonPage({ params }: Props) {
  const { slug } = await params;
  const digimon = getDigimon(slug);
  if (!digimon) notFound();
  return <DigimonArticle digimon={digimon} />;
}
