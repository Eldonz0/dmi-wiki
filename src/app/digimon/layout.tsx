import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: "Digimon" };

export default function DigimonLayout({ children }: { children: ReactNode }) {
  return children;
}
