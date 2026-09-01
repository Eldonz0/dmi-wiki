import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WikiShell } from "@/components/wiki-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DMI Codex — Digimon Masters Infinite wiki",
    template: "%s — DMI Codex",
  },
  description:
    "Player wiki for Digimon Masters Infinite: server rules, party EXP, guild ranks, hatching, and events from #server-informations.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <WikiShell>{children}</WikiShell>
      </body>
    </html>
  );
}
