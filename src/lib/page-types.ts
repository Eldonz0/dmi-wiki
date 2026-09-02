export type PageInfoboxRow = { label: string; value: string };

export type FeaturedBlock = {
  id: string;
  type: "featured";
  title: string;
  slugs?: string[];
};

export type TextBlock = {
  id: string;
  type: "text";
  title: string;
  body: string;
};

export type BannerBlock = {
  id: string;
  type: "banner";
  src: string;
  href: string;
  alt: string;
};

export type AnnounceBlock = {
  id: string;
  type: "announce";
  style: "cyan" | "orange" | "violet";
  title: string;
  body: string;
};

export type LinksBlock = {
  id: string;
  type: "links";
  title: string;
  items: { label: string; href: string; note: string }[];
};

export type PageBlock =
  | FeaturedBlock
  | TextBlock
  | BannerBlock
  | AnnounceBlock
  | LinksBlock;

export type WikiLandPage = {
  slug: string;
  title: string;
  category: string;
  infoboxTitle: string;
  infobox: PageInfoboxRow[];
  body: string;
  blocks: PageBlock[];
};

export function newBlockId() {
  return `b${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

export function defaultBlocks(page: Omit<WikiLandPage, "blocks"> & { blocks?: PageBlock[] }): PageBlock[] {
  if (page.blocks?.length) return page.blocks;
  const blocks: PageBlock[] = [];
  if (page.slug === "home") {
    blocks.push({
      id: "b-featured",
      type: "featured",
      title: "New Digimon",
    });
  }
  if (page.body?.trim()) {
    blocks.push({
      id: "b-body",
      type: "text",
      title: "",
      body: page.body,
    });
  } else if (page.slug !== "home") {
    blocks.push({
      id: "b-body",
      type: "text",
      title: "",
      body: "",
    });
  }
  return blocks;
}
