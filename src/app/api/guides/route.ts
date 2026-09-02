import { NextResponse } from "next/server";
import type { GuideHubArt, GuidePin } from "@/lib/guide-types";
import { isAdmin } from "@/lib/auth";
import {
  createGuide,
  getGuideHub,
  listGuides,
  reorderGuides,
  saveGuideHub,
} from "@/lib/guides";
import { adminUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ posts: listGuides(), hub: getGuideHub() });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const body = (await request.json()) as {
    title?: string;
    body?: string;
    stageHeight?: number;
    pins?: GuidePin[];
  };
  const post = await createGuide({
    title: String(body.title ?? ""),
    body: String(body.body ?? ""),
    stageHeight: body.stageHeight,
    pins: Array.isArray(body.pins) ? body.pins : [],
    author: adminUser(),
  });
  return NextResponse.json({ post });
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const body = (await request.json()) as {
    order?: string[];
    hub?: GuideHubArt;
  };
  if (body.hub) {
    return NextResponse.json({ hub: await saveGuideHub(body.hub) });
  }
  if (!Array.isArray(body.order)) {
    return NextResponse.json({ error: "Missing order" }, { status: 400 });
  }
  return NextResponse.json({
    posts: await reorderGuides(body.order.map(String)),
  });
}
