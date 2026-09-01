export const LEVEL_GAP_ATTACK = [
  { gap: "10–19", boost: "+20% enemy attack" },
  { gap: "20–29", boost: "+30% enemy attack" },
  { gap: "30–39", boost: "+40% enemy attack" },
  { gap: "40–49", boost: "+50% enemy attack" },
  { gap: "50–59", boost: "+60% enemy attack" },
  { gap: "60+", boost: "+80% enemy attack" },
] as const;

export const HIT_CHANCE = [
  { gap: "Player +15 or more", hit: "100% (always-hit rule)" },
  { gap: "Player +10", hit: "~86%" },
  { gap: "Player +5", hit: "~84%" },
  { gap: "Equal level", hit: "~75% (was 50%)" },
  { gap: "Player −5", hit: "~64%" },
  { gap: "Player −10", hit: "~50%" },
  { gap: "Player −15", hit: "~37% (possible forced-miss floor)" },
] as const;

export const BOSS_DEFENCE = [
  { def: "1,000", reduced: "14%" },
  { def: "1,500", reduced: "20%" },
  { def: "2,500", reduced: "29%" },
  { def: "4,000", reduced: "40%" },
  { def: "9,000+", reduced: "60% (cap)" },
] as const;

export const ROLES = [
  {
    code: "AA",
    name: "Auto Attacker",
    gained: "Attack Speed 20% faster",
    for: "Constant basic-attack damage. Scales with Attack, Critical, and Final Damage. Does not need expensive Skill Damage gear.",
  },
  {
    code: "TA",
    name: "Tank",
    gained: "Defence ×2, HP +15%",
    for: "Holds bosses. Survives what other roles cannot.",
  },
  {
    code: "SK",
    name: "Skill Attacker",
    gained: "Attack +15%",
    for: "Highest damage ceiling. Scales with Skill Damage %.",
  },
  {
    code: "SUP",
    name: "Support",
    gained: "Party healing access",
    for: "Keeps the party alive. Only role that can use party recovery skills.",
  },
] as const;

export const CARRIES = [
  {
    role: "AA",
    stats:
      "Attack +2,000 · Basic Attribute +72% · Attack Speed +32% · Critical Damage +168%",
  },
  {
    role: "TA",
    stats:
      "Max HP +16,800 · Defence +800 · Attack Speed +32% · Block +20% · Avoid +4%",
  },
  {
    role: "SK",
    stats: "Skill Damage +128% · Basic Attribute +96% · Attack Speed +32%",
  },
] as const;

export const FRUITS = [
  {
    fruit: "Fruit of Champion",
    restriction: "Hybrid / Spirit only",
    grade: "5 (Perfect)",
    size: "85–130%",
    avg: "~250",
  },
  {
    fruit: "Fruit of Overload",
    restriction: "Hybrid / Spirit only",
    grade: "5 (Perfect)",
    size: "115–130%",
    avg: "~150",
  },
  {
    fruit: "Fruit of Genesis",
    restriction: "Hybrid / Spirit only",
    grade: "5 (Perfect)",
    size: "121–130%",
    avg: "~40",
  },
  {
    fruit: "Fruit of Hades",
    restriction: "Variant only",
    grade: "5 (Perfect)",
    size: "85–130%",
    avg: "~250",
  },
  {
    fruit: "Fruit of Darkness",
    restriction: "Variant only",
    grade: "5 (Perfect)",
    size: "115–130%",
    avg: "~150",
  },
  {
    fruit: "Fruit of Chaos",
    restriction: "Variant only",
    grade: "5 (Perfect)",
    size: "121–130%",
    avg: "~40",
  },
  {
    fruit: "Fruit of Yggdrasil",
    restriction: "Anyone",
    grade: "6 (Transcend)",
    size: "125–140%",
    avg: "~136",
  },
  {
    fruit: "Fruit of Homeostasis",
    restriction: "Anyone",
    grade: "6 (Transcend)",
    size: "128–140%",
    avg: "~91",
  },
  {
    fruit: "Miracle Fruit",
    restriction: "Blocked for Variant / Hybrid",
    grade: "3, 4, 5 (not 6)",
    size: "100–130%",
    avg: "~250",
  },
  {
    fruit: "Fruit of the Goddess",
    restriction: "Blocked for Variant / Hybrid",
    grade: "3, 4, 5 (not 6)",
    size: "110–130%",
    avg: "~120",
  },
  {
    fruit: "Growth Fruit",
    restriction: "Blocked for Variant / Hybrid",
    grade: "Any 3–6",
    size: "Fixed 130%",
    avg: "1 (guaranteed)",
  },
  {
    fruit: "Super Growth Fruit",
    restriction: "Anyone",
    grade: "6 (Transcend) only",
    size: "Fixed 140%",
    avg: "1 (guaranteed)",
  },
] as const;

export const BOX_DROPS = [
  {
    dungeon: "Fanglongmon Dungeon Underground",
    boss: "Fanglongmon The Ruler of the East (Lv120)",
    box: "Yin and Yang Box",
    rate: "100%",
    fruit: "8 fruits, 5% chance (inside box)",
    scan: false,
  },
  {
    dungeon: "Fanglongmon Underground Easy",
    boss: "Fanglongmon (Lv99)",
    box: "Yin and Yang Box",
    rate: "50–70%",
    fruit: "8 fruits, 5% chance (inside box)",
    scan: false,
  },
  {
    dungeon: "Forge Underworks",
    boss: "Alphamon Ouryuken Awaken (Lv130)",
    box: "Forge Underworks Rare Box",
    rate: "100%",
    fruit: "Scan: 5–10 event fruits, 50%",
    scan: true,
  },
  {
    dungeon: "Datamon Maze Hard",
    boss: "Etemon, Nanomon",
    box: "Treasure Box of Nanomon Hero",
    rate: "50–100%",
    fruit: "Scan: 2 fruits, 12%",
    scan: true,
  },
  {
    dungeon: "Infinite Mountain",
    boss: "Kuwagamon, Leomon, Meramon, Monochromon, Ogremon",
    box: "Mega Box",
    rate: "50–100%",
    fruit: "Random Fruit Box 9%, then 3–5 fruits at 1%",
    scan: true,
  },
  {
    dungeon: "Infinite Mountain",
    boss: "Devimon",
    box: "Giga Box",
    rate: "50–100%",
    fruit: "Random Fruit Box 19%, then 3–5 fruits at 1%",
    scan: true,
  },
] as const;

export const VERDANDI_CHESTS = [
  {
    boss: "KaiserGreymon (Lv99)",
    box: "KaiserGreymon Chest",
    fruit: "1–2 event fruits, 20%",
  },
  {
    boss: "MagnaGarurumon (Lv99)",
    box: "MagnaGarurumon Chest",
    fruit: "1–2 event fruits, 20%",
  },
  {
    boss: "Susanoomon (Lv100)",
    box: "Susanoomon Chest",
    fruit: "1–2 event fruits, 30%",
  },
  {
    boss: "Susanoomon Shin (Lv110)",
    box: "Susanoomon Awaken Chest",
    fruit: "1–2 event fruits, 30%",
  },
  {
    boss: "Susanoomon Extreme (Lv120)",
    box: "Susanoomon Extreme Chest",
    fruit: "1–2 event fruits, 30%",
  },
] as const;

export const EXP_BUFFS = [
  { name: "Masters Membership [EXP]", type: "Buff", pct: "200%", duration: "Long (months)" },
  { name: "ExpBooster", type: "System Buff", pct: "500%", duration: "About 30 days" },
  { name: "Amplification Booster", type: "System Buff", pct: "1000%", duration: "About 1–2 hours" },
] as const;
