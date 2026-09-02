import { existsSync, readFileSync } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { bundledUploadsDir, uploadsDir } from "@/lib/paths";

const TYPES: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
};

export async function GET(_request: Request, ctx: { params: Promise<{ filename: string }> }) {
  const { filename } = await ctx.params;
  if (!filename || filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const candidates = [path.join(uploadsDir(), filename), path.join(bundledUploadsDir(), filename)];
  const file = candidates.find((p) => existsSync(p));
  if (!file) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const ext = filename.split(".").pop()?.toLowerCase() ?? "png";
  return new NextResponse(Uint8Array.from(readFileSync(file)), {
    headers: {
      "Content-Type": TYPES[ext] ?? "application/octet-stream",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
