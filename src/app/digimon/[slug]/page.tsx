import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DigimonArticle } from "@/components/digimon-article";
import { getDigimon, listDigimon } from "@/lib/digimon";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [
    ...listDigimon().map((d) => ({ slug: d.slug })),
    { slug: "agumon" },
    { slug: "omegamon-x-extreme" },
  ];
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
