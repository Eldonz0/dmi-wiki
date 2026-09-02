import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getLandPage, saveLandPage } from "@/lib/pages";
import type { WikiLandPage } from "@/lib/page-types";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug") || "home";
  return NextResponse.json({ page: getLandPage(slug) });
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const body = (await request.json()) as Partial<WikiLandPage> & { slug?: string };
  if (!body.slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }
  const current = getLandPage(body.slug);
  const saved = await saveLandPage({
    ...current,
    ...body,
    slug: body.slug,
  });
  return NextResponse.json({ page: saved });
}
