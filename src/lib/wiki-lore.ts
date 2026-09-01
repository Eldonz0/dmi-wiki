export type Lore = {
  jp?: string;
  form?: string;
  attribute?: string;
  element?: string;
  type?: string;
  family?: string;
};

export type EvoNode = {
  name: string;
  icon: string;
  slug?: string;
};

/** Extra encyclopedia fields + DMO-wiki evo trees. Stats still come from the PDF. */
export const LORE: Record<string, Lore> = {
  Apollomon: {
    jp: "アポロモン",
    form: "Mega",
    attribute: "Vaccine",
    element: "Fire",
    type: "God Beast",
    family: "Nightmare Soldiers / Virus Busters / Unknown",
  },
  "Agumon [Classic]": {
    jp: "アグモン",
    form: "Rookie",
    attribute: "Vaccine",
    element: "Fire",
    type: "Reptile",
    family: "Dragon's Roar / Metal Empire / Virus Busters",
  },
  Greymon: {
    jp: "グレイモン",
    form: "Champion",
    attribute: "Vaccine",
    element: "Fire",
    type: "Dinosaur",
    family: "Nature Spirits / Dragon's Roar",
  },
  MetalGreymon: {
    jp: "メタルグレイモン",
    form: "Ultimate",
    attribute: "Vaccine",
    element: "Fire",
    type: "Cyborg",
    family: "Metal Empire / Dragon's Roar",
  },
  WarGreymon: {
    jp: "ウォーグレイモン",
    form: "Mega",
    attribute: "Vaccine",
    element: "Fire",
    type: "Dragon Man",
    family: "Virus Busters / Metal Empire",
  },
  "Omegamon Extreme": {
    jp: "オメガモン",
    form: "Jogress / Extreme",
    attribute: "Vaccine",
    element: "Light",
    type: "Holy Knight",
    family: "Virus Busters / Metal Empire",
  },
  "Omegamon X": {
    jp: "オメガモンX",
    form: "Jogress / X-Antibody",
    attribute: "Vaccine",
    element: "Light",
    type: "Holy Knight",
    family: "Virus Busters",
  },
  DoneDevimon: {
    jp: "ダンデビモン",
    form: "Mega",
    attribute: "Virus",
    element: "Pitch Black",
    type: "Fallen Angel",
    family: "Nightmare Soldiers / Dark Area",
  },
  Bearmon: {
    jp: "ベアモン",
    form: "Rookie",
    attribute: "Vaccine",
    element: "Earth",
    type: "Beast",
    family: "Nature Spirits",
  },
};

export const ART: Record<string, string> = {
  Apollomon: "/wiki/Apollomon.png",
  "Agumon [Classic]": "/wiki/Agumon.png",
  "Omegamon Extreme": "/wiki/Omegamon.png",
  "Omegamon X": "/wiki/Omegamon.png",
  Omegamon: "/wiki/Omegamon.png",
  Bearmon: "/wiki/Bearmon.png",
  DoneDevimon: "/wiki/DoneDevimon.png",
};

export const ICONS: Record<string, string> = {
  Sunmon: "/wiki-icons/sunmon.png",
  Coronamon: "/wiki-icons/coronamon.png",
  Firamon: "/wiki-icons/firamon.png",
  Flaremon: "/wiki-icons/flaremon.png",
  Apollomon: "/wiki-icons/apollomon.png",
  "Apollomon Burst Mode": "/wiki-icons/apollomon-burst-mode.png",
  Marsmon: "/wiki-icons/marsmon.png",
  "Apollomon Whispered": "/wiki-icons/apollomon-whispered.png",
  Bearmon: "/wiki-icons/bearmon.png",
  "Agumon [Classic]": "/wiki-icons/agumon.png",
  Agumon: "/wiki-icons/agumon.png",
  Koromon: "/wiki-icons/koromon.png",
  Greymon: "/wiki-icons/greymon.png",
  MetalGreymon: "/wiki-icons/metalgreymon.png",
  WarGreymon: "/wiki-icons/wargreymon.png",
  Omegamon: "/wiki-icons/omegamon.png",
  "Omegamon Extreme": "/wiki-icons/omegamon.png",
  "Omegamon X": "/wiki-icons/omegamon.png",
  Gabumon: "/wiki-icons/gabumon.png",
  Garurumon: "/wiki-icons/garurumon.png",
  MetalGarurumon: "/wiki-icons/metalgarurumon.png",
  DoneDevimon: "/wiki-icons/donedevimon.png",
  PicoDevimon: "/wiki-icons/picodevimon.png",
  Devimon: "/wiki-icons/devimon.png",
  SkullSatamon: "/wiki-icons/skullsatamon.png",
};

export const APOLLOMON_TREE = {
  main: [
    "Sunmon",
    "Coronamon",
    "Firamon",
    "Flaremon",
    "Apollomon",
    "Apollomon Burst Mode",
  ],
  branches: [
    { from: "Firamon", name: "Marsmon" },
    { from: "Flaremon", name: "Apollomon Whispered" },
  ],
};

export const AGUMON_TREE = {
  main: [
    "Koromon",
    "Agumon [Classic]",
    "Greymon",
    "MetalGreymon",
    "WarGreymon",
    "Omegamon Extreme",
  ],
  branches: [] as { from: string; name: string }[],
};

export const OMEGAMON_TREE = {
  main: [
    "Agumon [Classic]",
    "Gabumon",
    "WarGreymon",
    "MetalGarurumon",
    "Omegamon Extreme",
  ],
  branches: [] as { from: string; name: string }[],
};

export const DONEDEVIMON_TREE = {
  main: ["PicoDevimon", "Devimon", "SkullSatamon", "DoneDevimon"],
  branches: [] as { from: string; name: string }[],
};

export const TREES: Record<
  string,
  { main: string[]; branches: { from: string; name: string }[] }
> = {
  apollomon: APOLLOMON_TREE,
  "agumon-classic": AGUMON_TREE,
  agumon: AGUMON_TREE,
  "omegamon-extreme": OMEGAMON_TREE,
  "omegamon-x-extreme": OMEGAMON_TREE,
  donedevimon: DONEDEVIMON_TREE,
};

export function iconFor(name: string) {
  return ICONS[name] ?? ICONS[name.replace(/ \[.*/, "")] ?? undefined;
}

export function artFor(name: string) {
  return ART[name] ?? ART[name.replace(/ \[.*/, "")] ?? undefined;
}
