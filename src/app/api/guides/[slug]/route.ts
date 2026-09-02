import { NextResponse } from "next/server";
import type { GuidePin } from "@/lib/guide-types";
import { isAdmin } from "@/lib/auth";
import { deleteGuide, getGuide, updateGuide } from "@/lib/guides";
import { withSave } from "@/lib/route-save";

type Ctx = { params: Promise<{ slug: string }> };

export const maxDuration = 60;

export async function GET(_request: Request, ctx: Ctx) {
  const { slug } = await ctx.params;
  const post = getGuide(slug);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PUT(request: Request, ctx: Ctx) {
  return withSave(async () => {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Sign in required" }, { status: 401 });
    }
    const { slug } = await ctx.params;
    const body = (await request.json()) as {
      title?: string;
      body?: string;
      stageHeight?: number;
      pins?: GuidePin[];
    };
    const post = await updateGuide(slug, {
      title: body.title,
      body: body.body,
      stageHeight: body.stageHeight,
      pins: Array.isArray(body.pins) ? body.pins : undefined,
    });
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ post });
  });
}

export async function DELETE(_request: Request, ctx: Ctx) {
  return withSave(async () => {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Sign in required" }, { status: 401 });
    }
    const { slug } = await ctx.params;
    if (!(await deleteGuide(slug))) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  });
}
