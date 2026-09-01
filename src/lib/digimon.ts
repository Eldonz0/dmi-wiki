import type { RankCode } from "@/lib/ranks";

export type RoleCode = "AA" | "TA" | "SK" | "SUP";

export type EvoChip = {
  name: string;
  slug?: string;
  image?: string;
  form: string;
};

export type SkillRow = {
  slot: string;
  name: string;
  ds: string;
  cd: string;
  desc: string;
};

export type DefaultStats = {
  hp: string;
  ds: string;
  de: string;
  at: string;
  as: string;
  ct: string;
  ht: string;
  ev: string;
  bl: string;
};

export type DigimonRecord = {
  slug: string;
  name: string;
  image: string;
  form: string;
  attribute: string;
  element: string;
  type: string;
  family: string;
  riding?: string;
  hatchable?: string;
  location?: string;
  rank: RankCode;
  role: RoleCode;
  pendingSheet: boolean;
  evolvesFrom?: { name: string; slug?: string };
  evolvesTo?: { name: string; slug?: string }[];
  intro: string;
  stats: DefaultStats;
  skills: SkillRow[];
  line: EvoChip[];
  drops?: string[];
  notes: string[];
  categories: { href: string; label: string }[];
};

const PENDING =
  "Role and rank on this page are DMO-informed placeholders. Drop `digimon_role_assignment_all_forms_new.pdf` into `/data` to stamp every form from the sheet.";

export const DIGIMON: DigimonRecord[] = [
  {
    slug: "agumon",
    name: "Agumon",
    image: "/digimon/agumon.jpg",
    form: "Rookie",
    attribute: "Vaccine",
    element: "Fire",
    type: "Reptile",
    family: "Dragon's Roar / Metal Empire / Virus Busters",
    hatchable: "Yes — classic starter egg",
    location: "Tamer start / Village of the Beginning",
    rank: "N",
    role: "AA",
    pendingSheet: true,
    evolvesFrom: { name: "Koromon" },
    evolvesTo: [{ name: "Greymon", slug: "greymon" }],
    intro:
      "Agumon is the fire reptile Rookie that opens the WarGreymon / Omegamon line. On DMI a Rookie is not nostalgia — Verdandi only spares Rookies and X-Antibody partners from the 500 HP tick. Keep a hatched Agumon as a shuttle even after you live on Megas.",
    stats: {
      hp: "910",
      ds: "287",
      de: "22",
      at: "176",
      as: "2.323",
      ct: "8.10%",
      ht: "485",
      ev: "22.30%",
      bl: "0%",
    },
    skills: [
      {
        slot: "F1",
        name: "Pepper Breath",
        ds: "8",
        cd: "4s",
        desc: "Spits a fireball. Short CD filler while you are still on Rookie maps.",
      },
      {
        slot: "F2",
        name: "Spitfire Blast",
        ds: "18",
        cd: "8s",
        desc: "Heavier fire shot. DMI skill damage % from SK does not apply — this line is stamped AA until the PDF says otherwise.",
      },
    ],
    line: [
      { name: "Koromon", image: "/digimon/koromon.jpg", form: "In-Training" },
      { name: "Agumon", slug: "agumon", image: "/digimon/agumon.jpg", form: "Rookie" },
      { name: "Greymon", slug: "greymon", image: "/digimon/greymon.jpg", form: "Champion" },
      {
        name: "MetalGreymon",
        slug: "metalgreymon",
        image: "/digimon/metalgreymon.jpg",
        form: "Ultimate",
      },
      {
        name: "WarGreymon",
        slug: "wargreymon",
        image: "/digimon/wargreymon.jpg",
        form: "Mega",
      },
      {
        name: "Omegamon X Extreme",
        slug: "omegamon-x-extreme",
        image: "/digimon/omegamon.jpg",
        form: "Jogress / Extreme",
      },
    ],
    notes: [
      PENDING,
      "AA on the Greymon line means Attack Speed +20% and basic-attack Carries. Do not slap SK skill-damage seals on this Rookie.",
      "Miracle / Goddess / Growth fruits, not Hybrid-only Champion fruits.",
    ],
    categories: [
      { href: "/digimon", label: "Digimon" },
      { href: "/rank/n", label: "Digimon Rank N" },
      { href: "/roles", label: "AA" },
    ],
  },
  {
    slug: "greymon",
    name: "Greymon",
    image: "/digimon/greymon.jpg",
    form: "Champion",
    attribute: "Vaccine",
    element: "Fire",
    type: "Dinosaur",
    family: "Nature Spirits / Dragon's Roar / Virus Busters",
    rank: "N",
    role: "AA",
    pendingSheet: true,
    evolvesFrom: { name: "Agumon", slug: "agumon" },
    evolvesTo: [{ name: "MetalGreymon", slug: "metalgreymon" }],
    intro:
      "Greymon is Agumon’s Champion. Same AA stamp as the rest of the WarGreymon line until the assignment PDF overrides it. Use him as a story-map form, not as a Verdandi walker — Champions take the 500 HP tick.",
    stats: {
      hp: "1 540",
      ds: "486",
      de: "41",
      at: "312",
      as: "2.400",
      ct: "10.50%",
      ht: "490",
      ev: "22.80%",
      bl: "0%",
    },
    skills: [
      {
        slot: "F1",
        name: "Mega Flame",
        ds: "22",
        cd: "6s",
        desc: "Fire breath cone. AA still wants this as a weave, not as a skill-DPS rotation.",
      },
      {
        slot: "F2",
        name: "Great Horns Attack",
        ds: "38",
        cd: "11s",
        desc: "Horn rush. Short-range; keep AS seals on the Carries AA set.",
      },
    ],
    line: [
      { name: "Agumon", slug: "agumon", image: "/digimon/agumon.jpg", form: "Rookie" },
      { name: "Greymon", slug: "greymon", image: "/digimon/greymon.jpg", form: "Champion" },
      {
        name: "MetalGreymon",
        slug: "metalgreymon",
        image: "/digimon/metalgreymon.jpg",
        form: "Ultimate",
      },
      {
        name: "WarGreymon",
        slug: "wargreymon",
        image: "/digimon/wargreymon.jpg",
        form: "Mega",
      },
    ],
    notes: [PENDING],
    categories: [
      { href: "/digimon", label: "Digimon" },
      { href: "/rank/n", label: "Digimon Rank N" },
      { href: "/roles", label: "AA" },
    ],
  },
  {
    slug: "metalgreymon",
    name: "MetalGreymon",
    image: "/digimon/metalgreymon.jpg",
    form: "Ultimate",
    attribute: "Vaccine",
    element: "Fire",
    type: "Cyborg",
    family: "Metal Empire / Dragon's Roar / Virus Busters",
    rank: "A",
    role: "AA",
    pendingSheet: true,
    evolvesFrom: { name: "Greymon", slug: "greymon" },
    evolvesTo: [{ name: "WarGreymon", slug: "wargreymon" }],
    intro:
      "MetalGreymon is the cyborg Ultimate on the Agumon line. Rank A placeholder. Still AA — Giga Destroyer is a weave, not an SK rotation.",
    stats: {
      hp: "2 410",
      ds: "812",
      de: "72",
      at: "588",
      as: "2.400",
      ct: "14.20%",
      ht: "495",
      ev: "23.10%",
      bl: "0%",
    },
    skills: [
      {
        slot: "F1",
        name: "Giga Destroyer",
        ds: "44",
        cd: "8s",
        desc: "Chest-mounted missiles. Fire attribute.",
      },
      {
        slot: "F2",
        name: "Trident Arm",
        ds: "62",
        cd: "12s",
        desc: "Mechanical claw slam. Close range.",
      },
    ],
    line: [
      { name: "Greymon", slug: "greymon", image: "/digimon/greymon.jpg", form: "Champion" },
      {
        name: "MetalGreymon",
        slug: "metalgreymon",
        image: "/digimon/metalgreymon.jpg",
        form: "Ultimate",
      },
      {
        name: "WarGreymon",
        slug: "wargreymon",
        image: "/digimon/wargreymon.jpg",
        form: "Mega",
      },
    ],
    notes: [PENDING],
    categories: [
      { href: "/digimon", label: "Digimon" },
      { href: "/rank/a", label: "Digimon Rank A" },
      { href: "/roles", label: "AA" },
    ],
  },
  {
    slug: "wargreymon",
    name: "WarGreymon",
    image: "/digimon/wargreymon.jpg",
    form: "Mega",
    attribute: "Vaccine",
    element: "Fire",
    type: "Dragon Man",
    family: "Metal Empire / Virus Busters / Dragon's Roar",
    riding: "No",
    rank: "S",
    role: "AA",
    pendingSheet: true,
    evolvesFrom: { name: "MetalGreymon", slug: "metalgreymon" },
    evolvesTo: [
      { name: "Omegamon X Extreme", slug: "omegamon-x-extreme" },
    ],
    intro:
      "WarGreymon is the Dramon-Destroyer Mega of the Agumon line. Rank S placeholder. On DMI he is the AA half of the Omegamon X Extreme jogress — keep Attack Speed and basic-attack Carries on him, not SK skill-damage seals.",
    stats: {
      hp: "3 640",
      ds: "1 240",
      de: "108",
      at: "1 086",
      as: "2.200",
      ct: "19.40%",
      ht: "500",
      ev: "24.50%",
      bl: "0%",
    },
    skills: [
      {
        slot: "F1",
        name: "Gaia Force",
        ds: "72",
        cd: "8s",
        desc: "Compressed fire sphere. Weave between autos.",
      },
      {
        slot: "F2",
        name: "Great Tornado",
        ds: "96",
        cd: "14s",
        desc: "Dramon Destroyer spin. Close-range burst.",
      },
      {
        slot: "F3",
        name: "Brave Shield",
        ds: "110",
        cd: "30s",
        desc: "Guard skill. Not a TA kit — block is still 30% for non-tanks.",
      },
    ],
    line: [
      { name: "Agumon", slug: "agumon", image: "/digimon/agumon.jpg", form: "Rookie" },
      { name: "Greymon", slug: "greymon", image: "/digimon/greymon.jpg", form: "Champion" },
      {
        name: "MetalGreymon",
        slug: "metalgreymon",
        image: "/digimon/metalgreymon.jpg",
        form: "Ultimate",
      },
      {
        name: "WarGreymon",
        slug: "wargreymon",
        image: "/digimon/wargreymon.jpg",
        form: "Mega",
      },
      {
        name: "Omegamon X Extreme",
        slug: "omegamon-x-extreme",
        image: "/digimon/omegamon.jpg",
        form: "Jogress / Extreme",
      },
    ],
    notes: [PENDING],
    categories: [
      { href: "/digimon", label: "Digimon" },
      { href: "/rank/s", label: "Digimon Rank S" },
      { href: "/roles", label: "AA" },
    ],
  },
  {
    slug: "apollomon",
    name: "Apollomon",
    image: "/digimon/apollomon.jpg",
    form: "Mega",
    attribute: "Vaccine",
    element: "Fire",
    type: "God Beast",
    family: "Nightmare Soldiers / Virus Busters / Unknown",
    riding: "No",
    hatchable: "Sun-Moon / Apollomon line egg",
    location: "Partner mercenary (not a field spawn on DMI)",
    rank: "S",
    role: "SK",
    pendingSheet: true,
    evolvesFrom: { name: "Flaremon", slug: "flaremon" },
    intro:
      "Apollomon is a God Beast Digimon whose lion body is a living sun. Vaccine / Fire Mega of the Coronamon line. On DMI Wiki the page follows the DMO encyclopedia layout: infobox, default stats, skills, and digivolution chips. Role SK (Skill Attacker) until the assignment PDF is imported — ATK +15% and Skill Damage % on the SK Carries set.",
    stats: {
      hp: "3 920",
      ds: "1 510",
      de: "118",
      at: "1 244",
      as: "2.400",
      ct: "20.11%",
      ht: "500",
      ev: "23.70%",
      bl: "0%",
    },
    skills: [
      {
        slot: "F1",
        name: "Solblaster",
        ds: "80",
        cd: "7s",
        desc: "Fires a miniature sun. Main SK weave — this is the skill you seal for damage %.",
      },
      {
        slot: "F2",
        name: "Phoebus Blow",
        ds: "110",
        cd: "14s",
        desc: "Holy fist packed with purifying fire. DEF-down style nuke on classic kits.",
      },
      {
        slot: "F3",
        name: "Arrow of Apollo",
        ds: "145",
        cd: "22s",
        desc: "Sun-arrow finisher. Long CD; dump after Solblaster on bosses.",
      },
    ],
    line: [
      {
        name: "Coronamon",
        slug: "coronamon",
        image: "/digimon/coronamon.jpg",
        form: "Rookie",
      },
      {
        name: "Firamon",
        slug: "firamon",
        image: "/digimon/firamon.jpg",
        form: "Champion",
      },
      {
        name: "Flaremon",
        slug: "flaremon",
        image: "/digimon/flaremon.jpg",
        form: "Ultimate",
      },
      {
        name: "Apollomon",
        slug: "apollomon",
        image: "/digimon/apollomon.jpg",
        form: "Mega",
      },
    ],
    drops: [
      "No wild drop table on DMI yet — treat as hatch / cash-shop mercenary until a GM post lists a box.",
    ],
    notes: [
      PENDING,
      "Do not walk Verdandi on this Mega. Park him, hop a Rookie or X shuttle, then swap for named bosses.",
      "Mismatching the SK Carries set halves the set stats — see Carries sets.",
    ],
    categories: [
      { href: "/digimon", label: "Digimon" },
      { href: "/rank/s", label: "Digimon Rank S" },
      { href: "/roles", label: "SK" },
    ],
  },
  {
    slug: "coronamon",
    name: "Coronamon",
    image: "/digimon/coronamon.jpg",
    form: "Rookie",
    attribute: "Vaccine",
    element: "Fire",
    type: "Beast",
    family: "Nightmare Soldiers / Virus Busters",
    rank: "N",
    role: "SK",
    pendingSheet: true,
    evolvesFrom: { name: "Sun-Moon In-Training" },
    evolvesTo: [{ name: "Firamon", slug: "firamon" }],
    intro:
      "Coronamon is the sun-lion Rookie that climbs to Apollomon. Same SK stamp as the Mega until the PDF overrides it. Legal Verdandi shuttle (Rookie).",
    stats: {
      hp: "880",
      ds: "302",
      de: "20",
      at: "168",
      as: "2.400",
      ct: "8.40%",
      ht: "485",
      ev: "22.10%",
      bl: "0%",
    },
    skills: [
      {
        slot: "F1",
        name: "Corona Breath",
        ds: "9",
        cd: "4s",
        desc: "Small sun breath. Skill-damage seals still wait for Champion+.",
      },
    ],
    line: [
      {
        name: "Coronamon",
        slug: "coronamon",
        image: "/digimon/coronamon.jpg",
        form: "Rookie",
      },
      {
        name: "Firamon",
        slug: "firamon",
        image: "/digimon/firamon.jpg",
        form: "Champion",
      },
      {
        name: "Flaremon",
        slug: "flaremon",
        image: "/digimon/flaremon.jpg",
        form: "Ultimate",
      },
      {
        name: "Apollomon",
        slug: "apollomon",
        image: "/digimon/apollomon.jpg",
        form: "Mega",
      },
    ],
    notes: [PENDING, "Rookie — Verdandi does not tick 500 HP."],
    categories: [
      { href: "/digimon", label: "Digimon" },
      { href: "/rank/n", label: "Digimon Rank N" },
      { href: "/roles", label: "SK" },
    ],
  },
  {
    slug: "firamon",
    name: "Firamon",
    image: "/digimon/firamon.jpg",
    form: "Champion",
    attribute: "Vaccine",
    element: "Fire",
    type: "Beast",
    family: "Nightmare Soldiers / Virus Busters",
    rank: "N",
    role: "SK",
    pendingSheet: true,
    evolvesFrom: { name: "Coronamon", slug: "coronamon" },
    evolvesTo: [{ name: "Flaremon", slug: "flaremon" }],
    intro:
      "Firamon is Coronamon’s Champion — winged sun lion. SK placeholder on the Apollomon line.",
    stats: {
      hp: "1 480",
      ds: "510",
      de: "38",
      at: "298",
      as: "2.323",
      ct: "11.20%",
      ht: "490",
      ev: "23.00%",
      bl: "0%",
    },
    skills: [
      {
        slot: "F1",
        name: "Fira Claw",
        ds: "24",
        cd: "6s",
        desc: "Fire claw swipe.",
      },
      {
        slot: "F2",
        name: "Flame Lion",
        ds: "40",
        cd: "11s",
        desc: "Lion rush wrapped in solar fire.",
      },
    ],
    line: [
      {
        name: "Coronamon",
        slug: "coronamon",
        image: "/digimon/coronamon.jpg",
        form: "Rookie",
      },
      {
        name: "Firamon",
        slug: "firamon",
        image: "/digimon/firamon.jpg",
        form: "Champion",
      },
      {
        name: "Flaremon",
        slug: "flaremon",
        image: "/digimon/flaremon.jpg",
        form: "Ultimate",
      },
      {
        name: "Apollomon",
        slug: "apollomon",
        image: "/digimon/apollomon.jpg",
        form: "Mega",
      },
    ],
    notes: [PENDING],
    categories: [
      { href: "/digimon", label: "Digimon" },
      { href: "/rank/n", label: "Digimon Rank N" },
      { href: "/roles", label: "SK" },
    ],
  },
  {
    slug: "flaremon",
    name: "Flaremon",
    image: "/digimon/flaremon.jpg",
    form: "Ultimate",
    attribute: "Vaccine",
    element: "Fire",
    type: "Beast Man",
    family: "Nightmare Soldiers / Virus Busters",
    rank: "A",
    role: "SK",
    pendingSheet: true,
    evolvesFrom: { name: "Firamon", slug: "firamon" },
    evolvesTo: [{ name: "Apollomon", slug: "apollomon" }],
    intro:
      "Flaremon is the Ultimate before Apollomon — beast-man wrapped in solar flare. Rank A / SK placeholders.",
    stats: {
      hp: "2 280",
      ds: "860",
      de: "68",
      at: "560",
      as: "2.323",
      ct: "15.10%",
      ht: "495",
      ev: "23.40%",
      bl: "0%",
    },
    skills: [
      {
        slot: "F1",
        name: "Flamenco Shot",
        ds: "48",
        cd: "8s",
        desc: "Solar burst from the mane.",
      },
      {
        slot: "F2",
        name: "Starlight Explosion",
        ds: "70",
        cd: "13s",
        desc: "Wide fire explosion. SK weave.",
      },
    ],
    line: [
      {
        name: "Firamon",
        slug: "firamon",
        image: "/digimon/firamon.jpg",
        form: "Champion",
      },
      {
        name: "Flaremon",
        slug: "flaremon",
        image: "/digimon/flaremon.jpg",
        form: "Ultimate",
      },
      {
        name: "Apollomon",
        slug: "apollomon",
        image: "/digimon/apollomon.jpg",
        form: "Mega",
      },
    ],
    notes: [PENDING],
    categories: [
      { href: "/digimon", label: "Digimon" },
      { href: "/rank/a", label: "Digimon Rank A" },
      { href: "/roles", label: "SK" },
    ],
  },
  {
    slug: "omegamon-x-extreme",
    name: "Omegamon X Extreme",
    image: "/digimon/omegamon.jpg",
    form: "Jogress / Extreme / X-Antibody",
    attribute: "Vaccine",
    element: "Light",
    type: "Holy Knight",
    family: "Virus Busters / Metal Empire / Dragon's Roar",
    riding: "Yes (typical Jogress mount flag — confirm in-client)",
    hatchable: "Jogress of WarGreymon + MetalGarurumon lines, then Extreme / X path",
    location: "Not a field spawn — evolution item / Extreme quest",
    rank: "U",
    role: "SK",
    pendingSheet: true,
    evolvesFrom: { name: "WarGreymon + MetalGarurumon" },
    intro:
      "Omegamon X Extreme is DMI’s top Omegamon stamp — X-Antibody armour over the classic Grey Sword / Garuru Cannon jogress, then the Extreme overlay private servers use for the ceiling kit. This page is built like the DMO wiki Omegamon X Extreme article: Rank U infobox, default stats, Grey Sword / Garuru Cannon skills, and the fused line. Role SK until the assignment PDF is imported.",
    stats: {
      hp: "8 240",
      ds: "2 480",
      de: "198",
      at: "1 920",
      as: "2.000",
      ct: "22.50%",
      ht: "525",
      ev: "26.40%",
      bl: "0%",
    },
    skills: [
      {
        slot: "F1",
        name: "Grey Sword",
        ds: "120",
        cd: "6s",
        desc: "WarGreymon-side slash. Fast SK weave. Fire-leaning on the Grey half.",
      },
      {
        slot: "F2",
        name: "Garuru Cannon",
        ds: "145",
        cd: "9s",
        desc: "MetalGarurumon-side beam. Ice-leaning. Alternate with Grey Sword.",
      },
      {
        slot: "F3",
        name: "All Delete / Extreme",
        ds: "220",
        cd: "28s",
        desc: "X / Extreme finisher. Dump on raid windows. Skill Damage % from SK Carries applies.",
      },
    ],
    line: [
      { name: "Agumon", slug: "agumon", image: "/digimon/agumon.jpg", form: "Rookie" },
      { name: "Gabumon", image: "/digimon/gabumon.jpg", form: "Rookie" },
      {
        name: "WarGreymon",
        slug: "wargreymon",
        image: "/digimon/wargreymon.jpg",
        form: "Mega",
      },
      {
        name: "MetalGarurumon",
        image: "/digimon/metalgarurumon.jpg",
        form: "Mega",
      },
      {
        name: "Omegamon X Extreme",
        slug: "omegamon-x-extreme",
        image: "/digimon/omegamon.jpg",
        form: "Jogress / Extreme",
      },
    ],
    notes: [
      PENDING,
      "Rank U — listed on Category: Digimon Rank U. U+ is unused on this form until the sheet says otherwise.",
      "X-Antibody flag means Verdandi does not apply the 500 HP tick (Rookie or X only). Confirm the client still tags Extreme as X.",
      "SK Carries set only. AA speed seals are a mismatch and halve the set.",
    ],
    categories: [
      { href: "/digimon", label: "Digimon" },
      { href: "/rank/u", label: "Digimon Rank U" },
      { href: "/roles", label: "SK" },
    ],
  },
  {
    slug: "donedevimon",
    name: "DoneDevimon",
    image: "/digimon/donedevimon.png",
    form: "Mega",
    attribute: "Virus",
    element: "Pitch Black",
    type: "Fallen Angel",
    family: "Nightmare Soldiers / Dark Area / Unknown",
    riding: "No",
    location: "Partner mercenary — Champion Devimon is the Infinite Mountain Giga Box farm",
    rank: "S",
    role: "SK",
    pendingSheet: true,
    evolvesFrom: { name: "SkullSatamon" },
    intro:
      "DoneDevimon is the Mega of the Devimon line — the same fallen-angel Mega DMO Wiki files under DoneDevimon. Virus / Pitch Black. On DMI he is the end of the Nightmare Soldiers virus line that starts as PicoDevimon and climbs through Champion Devimon (the Infinite Mountain Giga Box farm).",
    stats: {
      hp: "3 780",
      ds: "1 460",
      de: "112",
      at: "1 210",
      as: "2.323",
      ct: "19.80%",
      ht: "500",
      ev: "24.10%",
      bl: "0%",
    },
    skills: [
      {
        slot: "F1",
        name: "Done Impact",
        ds: "78",
        cd: "7s",
        desc: "Dark fist. SK weave.",
      },
      {
        slot: "F2",
        name: "Hell's Invitation",
        ds: "108",
        cd: "13s",
        desc: "Fallen-angel bind / dark burst. Pitch Black element.",
      },
      {
        slot: "F3",
        name: "End of the World",
        ds: "150",
        cd: "24s",
        desc: "Mega finisher. Skill Damage % from SK Carries.",
      },
    ],
    line: [
      {
        name: "PicoDevimon",
        image: "/digimon/picodevimon.jpg",
        form: "Rookie",
      },
      { name: "Devimon", image: "/digimon/devimon.jpg", form: "Champion" },
      {
        name: "SkullSatamon",
        image: "/digimon/skullsatamon.jpg",
        form: "Ultimate",
      },
      {
        name: "DoneDevimon",
        slug: "donedevimon",
        image: "/digimon/donedevimon.png",
        form: "Mega",
      },
    ],
    drops: [
      "Champion Devimon: Infinite Mountain Giga Box (50–100% then scan) — see Boss fruit boxes.",
    ],
    notes: [
      PENDING,
      "IceDevimon sometimes sits as an alternate Ultimate in DMO data. SkullSatamon is the DMI default until a hatch table says otherwise.",
      "Do not walk Verdandi on this Mega.",
    ],
    categories: [
      { href: "/digimon", label: "Digimon" },
      { href: "/rank/s", label: "Digimon Rank S" },
      { href: "/roles", label: "SK" },
    ],
  },
];

export function getDigimon(slug: string) {
  return DIGIMON.find((d) => d.slug === slug);
}

export function digimonByRank(rank: RankCode) {
  return DIGIMON.filter((d) => d.rank === rank);
}

export const STAT_LABELS: { key: keyof DefaultStats; label: string; hint: string }[] =
  [
    { key: "hp", label: "HP", hint: "Hit Points" },
    { key: "ds", label: "DS", hint: "DigiSoul" },
    { key: "de", label: "DE", hint: "Defence" },
    { key: "at", label: "AT", hint: "Attack" },
    { key: "as", label: "AS", hint: "Attack Speed (lower is faster)" },
    { key: "ct", label: "CT", hint: "Critical" },
    { key: "ht", label: "HT", hint: "Hit Rate" },
    { key: "ev", label: "EV", hint: "Evasion" },
    { key: "bl", label: "BL", hint: "Block" },
  ];
