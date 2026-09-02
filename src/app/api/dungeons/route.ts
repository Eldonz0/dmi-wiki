import { NextResponse } from "next/server";
import type { DungeonHubArt } from "@/lib/dungeon-types";
import { isAdmin } from "@/lib/auth";
import {
  createDungeon,
  getDungeonHub,
  listDungeons,
  reorderDungeons,
  saveDungeonHub,
} from "@/lib/dungeons";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    entries: listDungeons(),
    hub: getDungeonHub(),
  });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const body = (await request.json()) as { title?: string; body?: string; ticketName?: string };
  const entry = await createDungeon({
    title: String(body.title ?? ""),
    body: body.body,
    ticketName: body.ticketName,
  });
  return NextResponse.json({ entry });
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const body = (await request.json()) as {
    order?: string[];
    hub?: DungeonHubArt;
  };
  if (body.hub) {
    return NextResponse.json({ hub: await saveDungeonHub(body.hub) });
  }
  if (!Array.isArray(body.order)) {
    return NextResponse.json({ error: "Missing order" }, { status: 400 });
  }
  return NextResponse.json({ entries: await reorderDungeons(body.order.map(String)) });
}
