import type { Metadata } from "next";
import { Inter, Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import { WikiShell } from "@/components/wiki-shell";
import { rankIconMap } from "@/lib/catalog";
import { githubLiveEnabled } from "@/lib/github-live";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Main Page — DMI Wiki",
    template: "%s — DMI Wiki",
  },
  description:
    "Wiki for Digimon Masters Infinite — DMI. Digimon list, guide, dungeons, and accessory.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${rajdhani.variable} ${orbitron.variable} ${inter.variable} h-full`}
    >
      <head>
        <link rel="stylesheet" href="/dmi-skin.css" />
      </head>
      <body className="min-h-full flex flex-col">
        <WikiShell githubSaves={githubLiveEnabled()} rankIcons={rankIconMap()}>
          {children}
        </WikiShell>
      </body>
    </html>
  );
}
