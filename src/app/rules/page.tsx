import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SOURCE } from "@/lib/wiki";

export const metadata: Metadata = {
  title: "Server rules",
};

export default function RulesPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <Badge variant="secondary">#server-informations</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">Server rules</h1>
        <p className="text-muted-foreground leading-relaxed">
          Core policy from Game_Master_DMI. Breaking account or macro rules is
          enforced by IP, not just honor system.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Free-to-play friendly</CardTitle>
          <CardDescription>
            Event and dungeon evolution items rotate in regularly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            The server is built so you can play without paying. Event and
            dungeon evo items are added on a schedule.
          </p>
          <p>
            <span className="text-foreground">Latest Digimon evo items</span>{" "}
            stay behind a pay window first. Players who buy those items get a{" "}
            <span className="text-foreground">4–5 month</span> head start
            before the same pieces show up for free. That delay is deliberate:
            it protects people who spent money, without locking F2P out forever.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Macros are forbidden</CardTitle>
          <CardDescription>External bots and key macros are not allowed.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-muted-foreground">
          Do not run third-party macros. The client already has a built-in{" "}
          <span className="text-foreground">Auto Play</span> (macro auto play)
          button. Use that if you want AFK combat.
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two accounts maximum</CardTitle>
          <CardDescription>IP is used to catch extra clients.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            You may run <span className="text-foreground">two accounts</span>{" "}
            per person: one for farming, one for regular play.
          </p>
          <p>
            A third account (or more) is treated as multi-boxing abuse. The
            staff tracks this by IP. Extra accounts are banned.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hatching is hard on purpose</CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-muted-foreground">
          Game_Master_DMI is explicit: getting a Digimon to hatch is hard.
          That is a design choice, not a bug. See the hatching page for guild
          point values on spirit Digimon and Raremon.
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">{SOURCE}</p>
    </div>
  );
}
