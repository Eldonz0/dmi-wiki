export type SearchKind = "Digimon" | "Guide" | "Dungeon" | "Accessory" | "Page";

export type SearchHit = {
  href: string;
  title: string;
  kind: SearchKind;
  text: string;
};

export function rankHits(hits: SearchHit[], q: string, limit = 12): SearchHit[] {
  const needle = q.trim().toLowerCase();
  if (!needle) return [];
  const scored = hits
    .map((hit) => {
      const title = hit.title.toLowerCase();
      const blob = `${title} ${hit.text.toLowerCase()} ${hit.href.toLowerCase()}`;
      let score = 0;
      if (title === needle) score = 100;
      else if (title.startsWith(needle)) score = 85;
      else if (title.includes(needle)) score = 60;
      else if (blob.includes(needle)) score = 25;
      return { hit, score };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.hit.title.localeCompare(b.hit.title));
  const seen = new Set<string>();
  const out: SearchHit[] = [];
  for (const row of scored) {
    const key = row.hit.href + row.hit.title;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(row.hit);
    if (out.length >= limit) break;
  }
  return out;
}
