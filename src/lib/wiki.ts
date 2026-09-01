export type NavItem = {
  href: string;
  label: string;
  description: string;
};

export type SidebarGroup = {
  title: string;
  items: { href: string; label: string }[];
};

export const PAGES: NavItem[] = [
  {
    href: "/",
    label: "Main Page",
    description: "Welcome portal for Digimon Master Online — DMI",
  },
  {
    href: "/rules",
    label: "Server rules",
    description: "F2P policy, macros, two-account cap",
  },
  {
    href: "/party",
    label: "Party system",
    description: "How kill EXP is shared in a party",
  },
  {
    href: "/guild",
    label: "Guild system",
    description: "Member caps, Guild Points, and GSP",
  },
  {
    href: "/hatching",
    label: "Hatching",
    description: "Spirit Digimon, Raremon, hatch GP",
  },
  {
    href: "/events",
    label: "Events",
    description: "Distorted Data Village and Raremon notes",
  },
];

export const SIDEBAR: SidebarGroup[] = [
  {
    title: "Navigation",
    items: [
      { href: "/", label: "Main page" },
      { href: "/search", label: "Search" },
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
    title: "Coming from Discord",
    items: [
      { href: "/search?q=boss", label: "Boss locations" },
      { href: "/search?q=dungeon", label: "Dungeon rewards" },
      { href: "/search?q=guide", label: "New player guide" },
    ],
  },
];

export const SEARCH_INDEX = [
  {
    href: "/rules",
    title: "Server rules",
    text: "free to play f2p evo items 4-5 months macros auto play two accounts IP ban hatching hard",
  },
  {
    href: "/party",
    title: "Party system",
    text: "party exp killer 100% 40% 60% 80% members share base experience",
  },
  {
    href: "/guild",
    title: "Guild system",
    text: "guild level members gp gsp hatching raid quest 10000 skill 14 days",
  },
  {
    href: "/hatching",
    title: "Hatching",
    text: "spirit digimon raremon hatch level 3 4 5 points egg hard",
  },
  {
    href: "/events",
    title: "Events",
    text: "distorted data village raremon silk 17:00 two hours ocs ncs digisoul",
  },
] as const;

export const PARTY_ROWS = [
  { size: 2, killer: "100% base EXP", others: "40% base EXP" },
  { size: 3, killer: "100% base EXP", others: "60% base EXP each" },
  { size: 4, killer: "100% base EXP", others: "80% base EXP each" },
] as const;

export const GUILD_LEVELS = [
  { level: "1", members: 50 },
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
  "Transcribed from Game_Master_DMI posts in Discord #server-informations. Fan wiki for the Digimon Master Online — DMI private server. Not affiliated with Bandai Namco.";
