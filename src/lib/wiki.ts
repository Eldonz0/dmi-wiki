export type NavItem = {
  href: string;
  label: string;
  description: string;
};

export const NAV: NavItem[] = [
  {
    href: "/",
    label: "Overview",
    description: "What this private server is about",
  },
  {
    href: "/rules",
    label: "Server rules",
    description: "F2P policy, accounts, macros",
  },
  {
    href: "/party",
    label: "Party EXP",
    description: "How kill credit is shared",
  },
  {
    href: "/guild",
    label: "Guild system",
    description: "Caps, GP, and guild skills",
  },
  {
    href: "/hatching",
    label: "Hatching",
    description: "Spirit Digimon, Raremon, hatch GP",
  },
  {
    href: "/events",
    label: "Events & drops",
    description: "Distorted Data Village and Raremon notes",
  },
];

export const PARTY_ROWS = [
  {
    size: 2,
    killer: "100% base EXP",
    others: "40% base EXP",
    othersNote: "the other member",
  },
  {
    size: 3,
    killer: "100% base EXP",
    others: "60% base EXP each",
    othersNote: "each other member",
  },
  {
    size: 4,
    killer: "100% base EXP",
    others: "80% base EXP each",
    othersNote: "each other member",
  },
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
  "Posted by Game_Master_DMI in #server-informations on Digimon Masters Infinite. This wiki is a fan transcription, not an official Bandai Namco page.";
