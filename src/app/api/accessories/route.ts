import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { addAccessoryItem, listAccessoryCategories } from "@/lib/accessories";
import { isAccessorySlot } from "@/lib/accessory-types";
import { withSave } from "@/lib/route-save";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET() {
  return NextResponse.json({ categories: listAccessoryCategories() });
}

export async function POST(request: Request) {
  return withSave(async () => {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Sign in required" }, { status: 401 });
    }
    const body = (await request.json()) as { slot?: string };
    const slot = String(body.slot ?? "");
    if (!isAccessorySlot(slot)) {
      return NextResponse.json({ error: "Unknown slot" }, { status: 400 });
    }
    const item = await addAccessoryItem(slot);
    return NextResponse.json({ item });
  });
}
