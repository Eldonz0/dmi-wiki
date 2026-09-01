import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NAV, SOURCE } from "@/lib/wiki";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <Badge variant="secondary">Unofficial wiki</Badge>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Digimon Masters Infinite
        </h1>
        <p className="max-w-2xl text-muted-foreground leading-relaxed">
          This Codex collects what Game Master posts in{" "}
          <span className="text-foreground">#server-informations</span>: how
          the private server treats free-to-play players, how party EXP is
          split, how guilds grow, and what hatching currently pays in guild
          points.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2">
        {NAV.filter((item) => item.href !== "/").map((item) => (
          <Link key={item.href} href={item.href} className="group">
            <Card className="h-full transition-colors group-hover:border-primary/40">
              <CardHeader>
                <CardTitle className="text-base">{item.label}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>

      <section className="rounded-xl border border-border bg-card/50 p-5">
        <h2 className="text-sm font-medium text-primary">At a glance</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>Free-to-play friendly, with paid Digimon evo items delayed 4–5 months.</li>
          <li>Macros are banned. Use the in-game Auto Play button instead.</li>
          <li>Two accounts per person. A third account is an auto-ban.</li>
          <li>Hatching Digimon is intentionally hard.</li>
        </ul>
      </section>

      <section className="rounded-xl border border-dashed border-border p-5">
        <h2 className="text-sm font-medium">Still in Discord, not in this wiki yet</h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          The server also keeps #boss-locations, #new-players-guide,
          #dungeon-reward-rules, #download-link, and #digimon-roles. Those
          channels were not in the screenshot used for this first pass. Paste
          or screenshot them and they can be added as pages.
        </p>
      </section>

      <p className="text-xs text-muted-foreground">{SOURCE}</p>
    </div>
  );
}
