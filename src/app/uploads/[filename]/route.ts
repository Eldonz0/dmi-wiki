import { existsSync, readFileSync } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { pullLiveFile } from "@/lib/github-live";
import { bundledUploadsDir, tryWriteFile, uploadsDir } from "@/lib/paths";

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
  const local = [path.join(uploadsDir(), filename), path.join(bundledUploadsDir(), filename)].find(
    (p) => existsSync(p),
  );
  let buf: Buffer | null = local ? readFileSync(local) : null;
  if (!buf) {
    buf = await pullLiveFile(`public/uploads/${filename}`);
    if (buf) tryWriteFile(path.join(uploadsDir(), filename), buf);
  }
  if (!buf) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const ext = filename.split(".").pop()?.toLowerCase() ?? "png";
  return new NextResponse(Uint8Array.from(buf), {
    headers: {
      "Content-Type": TYPES[ext] ?? "application/octet-stream",
      "Cache-Control": "public, max-age=60",
    },
  });
}
