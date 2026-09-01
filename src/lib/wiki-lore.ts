import iconFiles from "@/lib/icon-files.json";
import type { EvoTree } from "@/lib/digimon-types";

export type Lore = {
  jp?: string;
  form?: string;
  attribute?: string;
  element?: string;
  type?: string;
  family?: string;
};

export type { EvoTree };

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

const t = (
  rows: string[][],
  branches: { from: string; name: string }[] = [],
): EvoTree => ({ rows, branches });

/** DMO wiki lines for the U / U+ forms the tamer listed. */
export const TREES: Record<string, EvoTree> = {
  apollomon: t(
    [
      [
        "Sunmon",
        "Coronamon",
        "Firamon",
        "Flaremon",
        "Apollomon",
        "Apollomon Burst Mode",
      ],
    ],
    [{ from: "Apollomon", name: "Apollomon Whispered" }],
  ),
  "agumon-classic": t([
    [
      "Koromon",
      "Agumon [Classic]",
      "Greymon",
      "MetalGreymon",
      "WarGreymon",
      "Omegamon Extreme",
    ],
  ]),
  agumon: t([
    [
      "Koromon",
      "Agumon [Classic]",
      "Greymon",
      "MetalGreymon",
      "WarGreymon",
      "Omegamon Extreme",
    ],
  ]),
  "omegamon-extreme": t([
    [
      "Agumon X",
      "Greymon X",
      "MetalGreymon X",
      "WarGreymon X",
      "Omegamon X",
      "Omegamon Extreme",
    ],
    [
      "Gabumon X",
      "Garurumon X",
      "WereGarurumon X",
      "MetalGarurumon X",
      "Omegamon X",
      "Omegamon Extreme",
    ],
  ]),
  "omegamon-x-extreme": t([
    [
      "Agumon X",
      "Greymon X",
      "MetalGreymon X",
      "WarGreymon X",
      "Omegamon X",
      "Omegamon Extreme",
    ],
    [
      "Gabumon X",
      "Garurumon X",
      "WereGarurumon X",
      "MetalGarurumon X",
      "Omegamon X",
      "Omegamon Extreme",
    ],
  ]),
  "omegamon-merciful-mode": t([
    [
      "Agumon [Classic]",
      "Greymon",
      "MetalGreymon",
      "WarGreymon",
      "Omegamon",
      "Omegamon [Merciful Mode]",
    ],
    [
      "Gabumon",
      "Garurumon",
      "WereGarurumon",
      "MetalGarurumon",
      "Omegamon",
      "Omegamon [Merciful Mode]",
    ],
  ]),
  "last-evolution-kizuna": t([
    [
      "Agumon [Classic]",
      "Greymon",
      "MetalGreymon",
      "WarGreymon",
      "Agumon [Bond of Bravery]",
      "Last Evolution: Kizuna",
    ],
    [
      "Gabumon",
      "Garurumon",
      "WereGarurumon",
      "MetalGarurumon",
      "Gabumon [Bond of Friendship]",
      "Last Evolution: Kizuna",
    ],
  ]),
  donedevimon: t(
    [["Tsukaimon [Demon]", "Devimon", "SkullSatamon", "DoneDevimon"]],
    [{ from: "Devimon", name: "IceDevimon" }],
  ),
  bloomlordmon: t([
    [
      "Palmon [Original]",
      "Togemon",
      "Lillymon",
      "Rosemon",
      "Bloomlordmon",
    ],
  ]),
  "eosmon-lv6": t([["Eosmon [Lv4]", "Eosmon [Lv5]", "Eosmon [Lv6]"]]),
  "gallantmon-crimson-mode-awaken": t([
    [
      "Guilmon",
      "Growlmon",
      "WarGrowlmon",
      "Gallantmon",
      "Gallantmon [Crimson Mode]",
      "Gallantmon [Crimson Mode-Awaken]",
    ],
  ]),
  goddramon: t([
    ["Patamon", "Angemon", "MagnaAngemon", "Goddramon"],
  ]),
  holydramon: t([
    [
      "Salamon",
      "Gatomon",
      "Angewomon",
      "HolyDramon",
    ],
  ]),
  "imperialdramon-paladin-mode-awaken": t([
    [
      "V-mon [ImperialDramon]",
      "ExV-mon",
      "Paildramon",
      "ImperialDramon",
      "ImperialDramon [Fighter Mode]",
      "Imperialdramon [Paladin Mode]",
      "Imperialdramon [Paladin Mode-Awaken]",
    ],
    [
      "Wormmon [ImperialDramon]",
      "Stingmon",
      "Paildramon",
      "ImperialDramon",
      "ImperialDramon [Fighter Mode]",
      "Imperialdramon [Paladin Mode]",
      "Imperialdramon [Paladin Mode-Awaken]",
    ],
  ]),
  "alphamon-ouryuken-extreme": t([
    [
      "Dorumon [RaptorDramon]",
      "RaptorDramon",
      "Grademon",
      "Alphamon",
      "Alphamon Ouryuken",
      "Alphamon Ouryuken [Awaken]",
      "Alphamon Ouryuken [Extreme]",
    ],
    [
      "Ryudamon",
      "GinRyuumon",
      "HishaRyuumon",
      "OuRyuumon",
      "Alphamon Ouryuken",
      "Alphamon Ouryuken [Awaken]",
      "Alphamon Ouryuken [Extreme]",
    ],
  ]),
  "kuzuhamon-miko-mode": t([
    [
      "Renamon",
      "Kyubimon",
      "Taomon",
      "Kuzuhamon",
      "Kuzuhamon [Miko Mode]",
    ],
  ]),
  "lilithmon-x-awaken": t([
    [
      "Salamon [Lilithmon]",
      "Mikemon",
      "Bastemon",
      "Lilithmon",
      "Lilithmon X",
      "Lilithmon X [Awaken]",
    ],
  ]),
  "lucemon-satan-mode-extreme": t([
    [
      "Lucemon",
      "Lucemon [Falldown Mode]",
      "Lucemon [Satan Mode]",
      "Lucemon [Satan Mode-Awaken]",
      "Lucemon [Satan Mode-Extreme]",
    ],
  ]),
  "shoutmon-x7-superior-mode": t([
    [
      "Shoutmon",
      "Shoutmon [X2]",
      "Shoutmon [X3]",
      "Shoutmon [X4]",
      "Shoutmon [X5]",
      "Shoutmon [X7]",
      "Shoutmon [X7-Superior Mode]",
    ],
    ["Greymon(C)", "MetalGreymon [C]", "ZekeGreymon"],
    ["Mailbirdramon"],
  ]),
  "susanoomon-extreme": t([
    [
      "KaiserGreymon",
      "Susanoomon",
      "Susanoomon [Awaken]",
      "Susanoomon [Extreme]",
    ],
    ["MagnaGarurumon", "Susanoomon", "Susanoomon [Awaken]", "Susanoomon [Extreme]"],
  ]),
  "zeedmillenniummon-awaken": t([
    [
      "Agumon [Black-Millenniumon]",
      "DarkTyranomon",
      "MetalTyrannomon",
      "MoonMillenniumon",
      "ZeedMillenniumon",
      "ZeedMillenniummon [Awaken]",
    ],
    [
      "Gazimon [Millenniumon]",
      "Deltamon",
      "Chimairamon",
      "Millenniumon",
      "ZeedMillenniumon",
      "ZeedMillenniummon [Awaken]",
    ],
  ]),
  abbadomon: t([
    ["Negamon", "Negamon [Evolved Form]", "Abbadomon", "Abbadomon Core"],
  ]),
  "abbadomon-core": t([
    ["Negamon", "Negamon [Evolved Form]", "Abbadomon", "Abbadomon Core"],
  ]),
  negamon: t([
    ["Negamon", "Negamon [Evolved Form]", "Abbadomon", "Abbadomon Core"],
  ]),
  "negamon-evolved-form": t([
    ["Negamon", "Negamon [Evolved Form]", "Abbadomon", "Abbadomon Core"],
  ]),
  quantumon: t([["Quantumon"]]),
};

const ICON_FILES = new Set(iconFiles as string[]);

function fileSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const ICON_ALIAS: Record<string, string> = {
  "Palmon [Original]": "palmon",
  HolyDramon: "holydramon",
  MagnaAngemon: "magnaangemon",
  Gatomon: "gatomon",
  Salamon: "salamon",
  "Salamon [Lilithmon]": "salamon",
  "Salamon [Silphymon]": "salamon",
  Lillymon: "lillymon",
  Growlmon: "growlmon",
  Guilmon: "guilmon",
  Gallantmon: "gallantmon",
  "Gallantmon [Crimson Mode]": "gallantmon",
  "Gallantmon [Crimson Mode-Awaken]": "gallantmon",
  "Dorumon [RaptorDramon]": "dorumon",
  RaptorDramon: "raptordramon",
  "V-mon [ImperialDramon]": "v-mon",
  "ExV-mon": "exv-mon",
  "Wormmon [ImperialDramon]": "wormmon",
  "Tsukaimon [Demon]": "picodevimon",
  "Greymon(C)": "greymon",
  "MetalGreymon [C]": "metalgreymon",
  "Omegamon X": "omegamon",
  "Omegamon [Merciful Mode]": "omegamon",
  "Agumon X": "agumon-x",
  "Gabumon X": "gabumon-x",
  "WarGreymon X": "wargreymon-x",
  "MetalGarurumon X": "metalgarurumon-x",
  "Greymon X": "greymon",
  "MetalGreymon X": "metalgreymon",
  "Garurumon X": "garurumon",
  "WereGarurumon X": "garurumon",
  WereGarurumon: "gabumon",
  "Lucemon [Falldown Mode]": "lucemon",
  "Lucemon [Satan Mode]": "lucemon",
  "Lucemon [Satan Mode-Awaken]": "lucemon",
  "Lucemon [Satan Mode-Extreme]": "lucemon",
  "Shoutmon [X2]": "shoutmon",
  "Shoutmon [X3]": "shoutmon",
  "Shoutmon [X4]": "shoutmon",
  "Shoutmon [X5]": "shoutmon",
  "Shoutmon [X7]": "shoutmon",
  "Shoutmon [X7-Superior Mode]": "shoutmon",
  "KaiserGreymon": "kaisergreymon",
  "MagnaGarurumon": "magnagarurumon",
  "Susanoomon": "susanoomon",
  "Susanoomon [Awaken]": "susanoomon",
  "Susanoomon [Extreme]": "susanoomon",
  "Alphamon Ouryuken": "alphamon",
  "Alphamon Ouryuken [Awaken]": "alphamon",
  "Alphamon Ouryuken [Extreme]": "alphamon",
  "Lilithmon X": "lilithmon",
  "Lilithmon X [Awaken]": "lilithmon",
  "Negamon [Evolved Form]": "negamon",
  "MoonMillenniumon": "millenniumon",
  "ZeedMillenniumon": "millenniumon",
  "ZeedMillenniummon [Awaken]": "millenniumon",
  "ImperialDramon": "paildramon",
  "ImperialDramon [Fighter Mode]": "paildramon",
  "Imperialdramon [Paladin Mode]": "paildramon",
  "Imperialdramon [Paladin Mode-Awaken]": "paildramon",
  "Paildramon": "paildramon",
  "Last Evolution: Kizuna": "agumon",
  "Agumon [Bond of Bravery]": "agumon",
  "Gabumon [Bond of Friendship]": "gabumon",
  "Kyubimon": "kyubimon",
  "Kuzuhamon": "kuzuhamon",
  "Kuzuhamon [Miko Mode]": "kuzuhamon",
  "Abbadomon": "negamon",
  "Abbadomon Core": "negamon",
};

export function iconFor(name: string) {
  if (ICONS[name]) return ICONS[name];
  const alias = ICON_ALIAS[name];
  const tries = [
    alias,
    fileSlug(name),
    fileSlug(name.replace(/ \[.*/, "")),
    fileSlug(name.replace(/[()]/g, " ")),
  ].filter(Boolean) as string[];
  for (const stem of tries) {
    if (ICON_FILES.has(stem)) return `/wiki-icons/${stem}.png`;
  }
  return undefined;
}

export function artFor(name: string) {
  return ART[name] ?? ART[name.replace(/ \[.*/, "")] ?? undefined;
}
