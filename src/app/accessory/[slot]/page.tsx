import { redirect } from "next/navigation";
import { isAccessorySlot } from "@/lib/accessory-types";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slot: string }> };

export default async function AccessorySlotRedirect({ params }: Props) {
  const { slot } = await params;
  if (!isAccessorySlot(slot)) redirect("/accessory");
  redirect(`/accessory#${slot}`);
}
