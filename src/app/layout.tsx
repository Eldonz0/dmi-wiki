import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import { WikiShell } from "@/components/wiki-shell";
import { isAdmin } from "@/lib/auth";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Main Page — DMI Wiki",
    template: "%s — DMI Wiki",
  },
  description:
    "Wiki for Digimon Masters Infinite — DMI. Digimon list, guide, dungeons, accessory, and clothing.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const admin = await isAdmin();
  return (
    <html
      lang="en"
      className={`dark ${rajdhani.variable} ${orbitron.variable} h-full`}
    >
      <head>
        <link rel="stylesheet" href="/dmi-skin.css" />
      </head>
      <body className="min-h-full flex flex-col">
        <WikiShell isAdmin={admin}>{children}</WikiShell>
      </body>
    </html>
  );
}
