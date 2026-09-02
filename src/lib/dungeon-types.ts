export type DungeonEntry = {
  id: string;
  slug: string;
  title: string;
  body: string;
  ticketName: string;
  ticketIcon: string;
  order: number;
  updatedAt: string;
};

export type DungeonHubArt = {
  stageHeight: number;
  pins: { id: string; src: string; x: number; y: number; w: number; h: number }[];
};
