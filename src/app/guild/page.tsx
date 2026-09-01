import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GUILD_LEVELS, GUILD_POINTS, SOURCE } from "@/lib/wiki";

export const metadata: Metadata = {
  title: "Guild system",
};

export default function GuildPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <Badge variant="secondary">Guild system</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">Guilds</h1>
        <p className="text-muted-foreground leading-relaxed">
          Capacity scales with guild level. Members feed Guild Points (GP)
          through hatching, raids, quests, and grinding. Skill points unlock
          timed guild skills.
        </p>
      </header>

      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Guild level</TableHead>
              <TableHead>Max members</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {GUILD_LEVELS.map((row) => (
              <TableRow key={row.level}>
                <TableCell className="font-medium">Level {row.level}</TableCell>
                <TableCell>{row.members}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>How to earn GP</TableHead>
              <TableHead>Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {GUILD_POINTS.map((row) => (
              <TableRow key={row.action}>
                <TableCell className="font-medium">{row.action}</TableCell>
                <TableCell>{row.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Guild Skill Points (GSP)</CardTitle>
          <CardDescription>Converted from Guild Points.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          <p>
            Every <span className="text-foreground">10,000 Guild Points</span>{" "}
            grants <span className="text-foreground">1 GSP</span>.
          </p>
          <p>
            Spend GSP to activate guild skills. Each activation lasts{" "}
            <span className="text-foreground">14 days</span>.
          </p>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">{SOURCE}</p>
    </div>
  );
}
