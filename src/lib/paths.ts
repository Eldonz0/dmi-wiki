import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";

function repoDataDir() {
  return path.join(process.cwd(), "data");
}

/** Live wiki JSON. On Vercel this is /tmp so Save can write; hydrate copies GitHub here. */
export function dataFile(name: string) {
  if (process.env.DMI_DATA_DIR) return path.join(process.env.DMI_DATA_DIR, name);
  if (process.env.VERCEL) return path.join("/tmp/dmi-data", name);
  return path.join(repoDataDir(), name);
}

export function bundledDataFile(name: string) {
  return path.join(repoDataDir(), name);
}

/** Prefer the writable live copy, else the files shipped in the deploy. */
export function readableDataFile(name: string) {
  const live = dataFile(name);
  if (existsSync(live)) return live;
  const bundled = bundledDataFile(name);
  if (existsSync(bundled)) return bundled;
  return live;
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
