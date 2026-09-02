import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { setHomeFeatured } from "@/lib/catalog";

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const body = (await request.json()) as {
    count?: number;
    slugs?: string[];
  };
  const home = await setHomeFeatured(
    Number(body.count) || 0,
    Array.isArray(body.slugs) ? body.slugs : [],
  );
  return NextResponse.json({ home });
}
