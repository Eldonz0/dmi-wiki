import { NextResponse } from "next/server";
import { buildSearchIndex } from "@/lib/search-index";
import { rankHits } from "@/lib/search-match";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q") ?? "";
  const index = buildSearchIndex();
  if (!q.trim()) {
    return NextResponse.json({ hits: index });
  }
  return NextResponse.json({ hits: rankHits(index, q, 20) });
}
