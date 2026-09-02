import { NextResponse } from "next/server";
import { writeFileSync, mkdirSync } from "fs";
import path from "path";
import { isAdmin } from "@/lib/auth";
import { setUpload } from "@/lib/catalog";
import { slugifyName } from "@/lib/evo-layout";
import { uploadsDir } from "@/lib/paths";

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const form = await request.formData();
  const file = form.get("file");
  const name = String(form.get("name") ?? "").trim();
  const kindRaw = String(form.get("kind") ?? "chip");
  const kind =
    kindRaw === "art" || kindRaw === "rank" || kindRaw === "chip" || kindRaw === "post"
      ? kindRaw
      : "chip";
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }
  if (kind !== "post" && !name) {
    return NextResponse.json({ error: "Missing file or name" }, { status: 400 });
  }
  if (file.size > 4 * 1024 * 1024) {
    return NextResponse.json({ error: "Max 4MB" }, { status: 400 });
  }
  const mime = file.type;
  const ext =
    mime === "image/webp"
      ? "webp"
      : mime === "image/jpeg"
        ? "jpg"
        : mime === "image/gif"
          ? "gif"
          : "png";
  const buf = Buffer.from(await file.arrayBuffer());
  const dir = uploadsDir();
  mkdirSync(dir, { recursive: true });
  const stem =
    kind === "art"
      ? `${slugifyName(name)}-art`
      : kind === "rank"
        ? `rank-${slugifyName(name)}`
        : kind === "post"
          ? `post-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
          : slugifyName(name);
  const filename = `${stem}.${ext}`;
  writeFileSync(path.join(dir, filename), buf);
  const url = `/uploads/${filename}?v=${Date.now()}`;
  if (kind === "chip" || kind === "art" || kind === "rank") {
    setUpload(kind, name, url);
  }
  return NextResponse.json({ url, name, kind });
}
