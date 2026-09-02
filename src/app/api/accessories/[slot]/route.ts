import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getAccessoryCategory, saveAccessoryCategory } from "@/lib/accessories";
import type { AccessoryCategory } from "@/lib/accessory-types";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slot: string }> };

export async function GET(_request: Request, ctx: Ctx) {
  const { slot } = await ctx.params;
  const category = getAccessoryCategory(slot);
  if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ category });
}

export async function PUT(request: Request, ctx: Ctx) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const { slot } = await ctx.params;
  const body = (await request.json()) as Partial<
    Pick<AccessoryCategory, "title" | "blurb" | "icon" | "items" | "roles">
  >;
  const category = await saveAccessoryCategory(slot, body);
  if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ category });
}
