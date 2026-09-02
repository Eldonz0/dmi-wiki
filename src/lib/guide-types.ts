export type GuidePin = {
  id: string;
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type GuidePost = {
  id: string;
  slug: string;
  title: string;
  body: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  stageHeight: number;
  pins: GuidePin[];
};
