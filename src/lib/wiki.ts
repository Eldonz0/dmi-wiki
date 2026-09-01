export type NavItem = {
  href: string;
  label: string;
  description: string;
};

export type SidebarGroup = {
  title: string;
  items: { href: string; label: string }[];
};

export const NEW_DIGIMON: { name: string; href: string; thumb?: string }[] = [
  { name: "Apollomon", href: "/digimon/apollomon", thumb: "/wiki/Apollomon.png" },
  { name: "Abbadomon Core", href: "/digimon/abbadomon-core" },
  { name: "Negamon", href: "/digimon/negamon" },
  { name: "Negamon (Evolved Form)", href: "/digimon/negamon-evolved-form" },
  { name: "Abbadomon", href: "/digimon/abbadomon" },
  { name: "DoneDevimon", href: "/digimon/donedevimon", thumb: "/wiki/DoneDevimon.png" },
  { name: "Lilithmon (X-Antibody) (Awaken)", href: "/digimon/lilithmon-x-awaken" },
  { name: "Goddramon", href: "/digimon/goddramon" },
  { name: "Holydramon (Awaken)", href: "/digimon/holydramon" },
  { name: "Susanoomon (Extreme)", href: "/digimon/susanoomon-extreme" },
  { name: "Last Evolution: Kizuna", href: "/digimon/last-evolution-kizuna" },
  { name: "Lucemon (Satan Mode) (Extreme)", href: "/digimon/lucemon-satan-mode-extreme" },
  { name: "Alphamon Ouryuken (Extreme)", href: "/digimon/alphamon-ouryuken-extreme" },
  { name: "Imperialdramon Paladin Mode (Awaken)", href: "/digimon/imperialdramon-paladin-mode-awaken" },
  { name: "Omegamon Extreme", href: "/digimon/omegamon-extreme", thumb: "/wiki/Omegamon.png" },
  { name: "Quantumon", href: "/digimon/quantumon" },
];

export const PAGES: NavItem[] = [
  { href: "/", label: "Main Page", description: "Welcome portal" },
  { href: "/rules", label: "Server rules", description: "F2P, macros, accounts" },
  { href: "/party", label: "Party system", description: "Kill EXP share" },
  { href: "/guild", label: "Guild system", description: "Caps, GP, GSP" },
  { href: "/hatching", label: "Hatching", description: "Hatch GP" },
  { href: "/events", label: "Events", description: "Village and Raremon" },
  { href: "/combat", label: "Combat", description: "Level gap, hit, block, defence" },
  { href: "/roles", label: "Roles", description: "AA, TA, SK, SUP" },
  { href: "/exp", label: "EXP boosters", description: "Membership and boosters" },
  { href: "/fruits", label: "Size fruits", description: "Hatch grade size items" },
  { href: "/sets", label: "Carries sets", description: "Role set bonuses" },
  { href: "/drops", label: "Boss fruit boxes", description: "Dungeon and Verdandi boxes" },
  { href: "/verdandi", label: "Verdandi", description: "Map rules and chests" },
  { href: "/digimon", label: "Digimon", description: "Partner index" },
  { href: "/rank-system", label: "Rank System", description: "N through U+" },
  { href: "/rank/u", label: "Digimon Rank U", description: "Unique rank category" },
  { href: "/digimon/apollomon", label: "Apollomon", description: "U+ TA, Bearmon line" },
  { href: "/digimon/omegamon-extreme", label: "Omegamon Extreme", description: "U+ SK" },
  { href: "/digimon/donedevimon", label: "DoneDevimon", description: "U AA" },
  { href: "/digimon/agumon", label: "Agumon", description: "Classic Rookie SK" },
];

export const SIDEBAR: SidebarGroup[] = [
  {
    title: "Navigation",
    items: [
      { href: "/", label: "Main page" },
      { href: "/digimon", label: "Digimon" },
      { href: "/rank-system", label: "Rank System" },
      { href: "/rank/u-plus", label: "Rank U+" },
      { href: "/rank/u", label: "Rank U" },
      { href: "/random", label: "Random page" },
    ],
  },
  {
    title: "Server",
    items: [
      { href: "/rules", label: "Server rules" },
      { href: "/party", label: "Party system" },
      { href: "/guild", label: "Guild system" },
      { href: "/hatching", label: "Hatching" },
      { href: "/events", label: "Events" },
    ],
  },
  {
    title: "Mechanics",
    items: [
      { href: "/combat", label: "Combat" },
      { href: "/roles", label: "Roles" },
      { href: "/exp", label: "EXP boosters" },
      { href: "/fruits", label: "Size fruits" },
      { href: "/sets", label: "Carries sets" },
    ],
  },
  {
    title: "World",
    items: [
      { href: "/verdandi", label: "Verdandi" },
      { href: "/drops", label: "Boss fruit boxes" },
    ],
  },
  {
    title: "Tools",
    items: [
      { href: "/search", label: "Search" },
      { href: "/random", label: "Random page" },
    ],
  },
];

export const SEARCH_INDEX = [
  { href: "/rules", title: "Server rules", text: "f2p macros two accounts auto play" },
  { href: "/party", title: "Party system", text: "party exp killer 40 60 80" },
  { href: "/guild", title: "Guild system", text: "guild 60 members gp gsp 10000" },
  { href: "/hatching", title: "Hatching", text: "spirit raremon hatch points" },
  { href: "/events", title: "Events", text: "distorted data village raremon silk" },
  { href: "/combat", title: "Combat", text: "level gap hit chance block defence boss skills" },
  { href: "/roles", title: "Roles", text: "AA TA SK SUP auto attacker tank skill support" },
  { href: "/exp", title: "EXP boosters", text: "masters membership amplification expbooster 200 500 1000" },
  { href: "/fruits", title: "Size fruits", text: "champion overload genesis hades yggdrasil miracle growth" },
  { href: "/sets", title: "Carries sets", text: "carries AA TA SK mismatched set half stats" },
  { href: "/drops", title: "Boss fruit boxes", text: "fanglongmon yin yang verdandi kaisergreymon giga box" },
  { href: "/verdandi", title: "Verdandi", text: "rookie x-digimon 500 hp susanoomon" },
  { href: "/rank-system", title: "Rank System", text: "rank n a s ss sss u unique infobox" },
  { href: "/rank/u", title: "Digimon Rank U", text: "unique omegamon x extreme" },
  { href: "/digimon/apollomon", title: "Apollomon", text: "u+ ta bearmon 22318 9102 1058 2200 solblaster" },
  { href: "/digimon/omegamon-extreme", title: "Omegamon Extreme", text: "u+ sk 18511 10107 omegamon x extreme" },
  { href: "/digimon/donedevimon", title: "DoneDevimon", text: "u aa 18446 tsukaimon demon" },
  { href: "/digimon/agumon", title: "Agumon", text: "agumon classic sk 520 75 16 1000" },
];

export const PARTY_ROWS = [
  { size: 2, killer: "100% base EXP", others: "40% base EXP" },
  { size: 3, killer: "100% base EXP", others: "60% base EXP each" },
  { size: 4, killer: "100% base EXP", others: "80% base EXP each" },
] as const;

export const GUILD_LEVELS = [
  { level: "1", members: 60 },
  { level: "2", members: 80 },
  { level: "3", members: 100 },
  { level: "4", members: 130 },
  { level: "5+", members: 150 },
] as const;

export const GUILD_POINTS = [
  { action: "Hatching a Digimon", points: 30 },
  { action: "Killing a raid monster", points: 5 },
  { action: "Finishing a quest", points: 2 },
  { action: "Killing 100 enemy Digimon", points: 1 },
] as const;

export const HATCH_PLANNED = [
  { level: "Lv3", current: "30 pts", planned: "20 pts" },
  { level: "Lv4", current: "—", planned: "30 pts" },
  { level: "Lv5", current: "—", planned: "40 pts" },
] as const;

export const SOURCE =
  "HP / AT / DE / AS, rank, and SK·AA·TA·SUP from digimon_role_assignment_all_forms_new.pdf. Infobox portraits and line chips follow DMO wiki layout. Fan site, not affiliated with Bandai Namco.";
