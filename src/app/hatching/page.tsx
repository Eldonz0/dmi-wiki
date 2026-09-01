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
import { HATCH_PLANNED, SOURCE } from "@/lib/wiki";

export const metadata: Metadata = {
  title: "Hatching",
};

export default function HatchingPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <Badge variant="secondary">Hatch rates</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">Hatching</h1>
        <p className="text-muted-foreground leading-relaxed">
          The GM calls hatching hard. Spirit Digimon and Raremon still pay
          guild points when they come out of the egg.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Spirit Digimon and Raremon</CardTitle>
          <CardDescription>Current live value from GM notes.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-muted-foreground">
          Hatching a spirit Digimon or a Raremon currently awards{" "}
          <span className="text-foreground">30 guild points</span>. That
          matches the generic “hatching: 30 points” line on the guild chart.
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-3 text-lg font-medium">Hatch level vs points</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Right now, level 3 hatching is the one that pays 30 points. A later
          change is already sketched: lower Lv3, then pay more for Lv4 and Lv5.
        </p>
        <div className="overflow-hidden rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hatch level</TableHead>
                <TableHead>Current</TableHead>
                <TableHead>Planned</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {HATCH_PLANNED.map((row) => (
                <TableRow key={row.level}>
                  <TableCell className="font-medium">{row.level}</TableCell>
                  <TableCell>{row.current}</TableCell>
                  <TableCell>{row.planned}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">{SOURCE}</p>
    </div>
  );
}
