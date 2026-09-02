export type PageInfoboxRow = { label: string; value: string };

export type WikiLandPage = {
  slug: string;
  title: string;
  category: string;
  infoboxTitle: string;
  infobox: PageInfoboxRow[];
  body: string;
};
