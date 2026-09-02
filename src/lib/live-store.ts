import "server-only";
import { existsSync, readFileSync } from "fs";
import { githubLiveEnabled, justWroteLive, pullLiveFile } from "@/lib/github-live";
import { bundledDataFile, dataFile, tryWriteFile } from "@/lib/paths";

const LIVE_JSON = [
  "catalog.json",
  "pages.json",
  "guides.json",
  "dungeons.json",
  "accessories.json",
] as const;

let lastHydrate = 0;

/** Copy GitHub wiki JSON onto the writable disk Vercel actually reads. */
export async function hydrateLiveData() {
  if (justWroteLive()) return;
  if (lastHydrate && Date.now() - lastHydrate < 15_000) return;
  lastHydrate = Date.now();

  await Promise.all(
    LIVE_JSON.map(async (name) => {
      const dest = dataFile(name);
      let body: Buffer | null = null;
      if (githubLiveEnabled()) {
        body = await pullLiveFile(`data/${name}`);
      }
      if (!body && existsSync(bundledDataFile(name))) {
        body = readFileSync(bundledDataFile(name));
      }
      if (body) tryWriteFile(dest, body);
    }),
  );
}
