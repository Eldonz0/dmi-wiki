import { notFound } from "next/navigation";
import { getAccessoryCategory } from "@/lib/accessories";
import { AccessorySlotPage } from "@/components/accessory-slot";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slot: string }> };

export async function generateMetadata({ params }: Props) {
  const cat = getAccessoryCategory((await params).slot);
  return { title: cat?.title ?? "Accessory" };
}

export default async function AccessoryCategoryPage({ params }: Props) {
  const cat = getAccessoryCategory((await params).slot);
  if (!cat) notFound();
  return <AccessorySlotPage category={cat} />;
}
