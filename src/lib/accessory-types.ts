export const ACCESSORY_SLOTS = [
  "rings",
  "necklaces",
  "earrings",
  "bracelets",
] as const;

export type AccessorySlot = (typeof ACCESSORY_SLOTS)[number];

export type AccessoryItem = {
  id: string;
  name: string;
  icon: string;
  options: string;
  numberChange: "need" | "max" | "na";
  obtain: string;
  recommended: boolean;
};

export type AccessoryRoleRec = {
  role: "SK" | "AA" | "TA" | "SUP";
  primary: string;
  secondary: string;
};

export type AccessoryCategory = {
  slug: AccessorySlot;
  title: string;
  blurb: string;
  items: AccessoryItem[];
  roles: AccessoryRoleRec[];
};

export function isAccessorySlot(value: string): value is AccessorySlot {
  return (ACCESSORY_SLOTS as readonly string[]).includes(value);
}
