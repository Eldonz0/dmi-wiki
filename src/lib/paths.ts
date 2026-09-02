import path from "path";

/** Live wiki JSON. Point this at a disk volume so deploys do not wipe editor saves. */
export function dataFile(name: string) {
  const root = process.env.DMI_DATA_DIR || path.join(process.cwd(), "data");
  return path.join(root, name);
}

/** Uploaded chips, banners, tickets. Mount a volume here in production. */
export function uploadsDir() {
  return process.env.DMI_UPLOADS_DIR || path.join(process.cwd(), "public", "uploads");
}
