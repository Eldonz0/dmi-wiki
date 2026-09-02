import { mkdirSync, writeFileSync } from "fs";
import path from "path";

/** Live wiki JSON. Point this at a disk volume so deploys do not wipe editor saves. */
export function dataFile(name: string) {
  const root = process.env.DMI_DATA_DIR || path.join(process.cwd(), "data");
  return path.join(root, name);
}

/** Uploaded chips, banners, tickets. Mount a volume here in production. */
export function uploadsDir() {
  if (process.env.DMI_UPLOADS_DIR) return process.env.DMI_UPLOADS_DIR;
  if (process.env.VERCEL) return "/tmp/dmi-uploads";
  return path.join(process.cwd(), "public", "uploads");
}

/** Repo `public/uploads` from the last deploy (Vercel). */
export function bundledUploadsDir() {
  return path.join(process.cwd(), "public", "uploads");
}

/** Write JSON/uploads. On Vercel the checkout is read-only — GitHub is the real persist. */
export function tryWriteFile(file: string, content: string | Buffer) {
  try {
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, content);
    return true;
  } catch (err) {
    console.error(`Could not write ${file}:`, err);
    return false;
  }
}
