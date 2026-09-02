import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { deleteDungeon, getDungeon, updateDungeon } from "@/lib/dungeons";
import type { DungeonEntry } from "@/lib/dungeon-types";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, ctx: Ctx) {
  const { slug } = await ctx.params;
  const entry = getDungeon(slug);
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ entry });
}

export async function PUT(request: Request, ctx: Ctx) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const { slug } = await ctx.params;
  const body = (await request.json()) as Partial<
    Pick<DungeonEntry, "title" | "body" | "ticketName" | "ticketIcon" | "order">
  >;
  const entry = updateDungeon(slug, body);
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ entry });
}

export async function DELETE(_request: Request, ctx: Ctx) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const { slug } = await ctx.params;
  if (!deleteDungeon(slug)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
