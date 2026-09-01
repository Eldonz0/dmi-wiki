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
  title: "Events & drops",
};

export default function EventsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <Badge variant="secondary">GM notes</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">
          Events and Raremon
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Extra lines from Game_Master_DMI posts about Raremon, maintenance
          rewards, and the Distorted Data Village map.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Distorted Data Village</CardTitle>
          <CardDescription>Timed event map.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          <p>
            Server start time cited by GM:{" "}
            <span className="text-foreground">17:00</span>.
          </p>
          <p>
            Spawns refresh every{" "}
            <span className="text-foreground">2 hours</span>.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Raremon eggs and silk</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Maintenance notes mention fixes for{" "}
            <span className="text-foreground">bounded silk Raremons</span> and
            related fruits.
          </p>
          <p>
            Some maintenance reward packages include{" "}
            <span className="text-foreground">Raremon Lv3 ×2 eggs</span>.
          </p>
          <p>
            Players have asked whether official-game maps also drop Raremon
            eggs. Treat that as unconfirmed until a GM answers in Discord.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Currency trade rate</CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-muted-foreground">
          A GM post changed an exchange to{" "}
          <span className="text-foreground">2 OCS/NCS for 3 Digisoul</span>.
          Confirm the current shop before you dump currency.
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">{SOURCE}</p>
    </div>
  );
}
