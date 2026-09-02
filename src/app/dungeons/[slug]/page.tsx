import { notFound } from "next/navigation";
import { getDungeon } from "@/lib/dungeons";
import { DungeonLanding } from "@/components/dungeon-landing";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const entry = getDungeon((await params).slug);
  return { title: entry?.title ?? "Dungeon" };
}

export default async function DungeonPage({ params }: Props) {
  const entry = getDungeon((await params).slug);
  if (!entry) notFound();
  return <DungeonLanding entry={entry} />;
}
