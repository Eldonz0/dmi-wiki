import { NextResponse } from "next/server";
import { writeFileSync, mkdirSync } from "fs";
import path from "path";
import { isAdmin } from "@/lib/auth";
import { setIcon } from "@/lib/catalog";
import { slugifyName } from "@/lib/evo-layout";

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const form = await request.formData();
  const file = form.get("file");
  const name = String(form.get("name") ?? "").trim();
  if (!name || !(file instanceof File)) {
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
  const dir = path.join(process.cwd(), "public", "uploads");
  mkdirSync(dir, { recursive: true });
  const filename = `${slugifyName(name)}.${ext}`;
  writeFileSync(path.join(dir, filename), buf);
  const url = `/uploads/${filename}?v=${Date.now()}`;
  setIcon(name, url);
  return NextResponse.json({ url, name });
}
