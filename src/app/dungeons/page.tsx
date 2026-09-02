import { getDungeonHub, listDungeons } from "@/lib/dungeons";
import { DungeonHub } from "@/components/dungeon-hub";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dungeons" };

export default function DungeonsPage() {
  return <DungeonHub entries={listDungeons()} hub={getDungeonHub()} />;
}
