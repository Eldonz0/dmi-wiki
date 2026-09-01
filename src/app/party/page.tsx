import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PARTY_ROWS, SOURCE } from "@/lib/wiki";

export const metadata: Metadata = {
  title: "Party EXP",
};

export default function PartyPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <Badge variant="secondary">Party system</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">
          Party EXP split
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          The player who lands the kill always receives full base experience.
          Other party members receive a share that grows as the party fills.
          GM caption: party system matters more here.
        </p>
      </header>

      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Party size</TableHead>
              <TableHead>Killer</TableHead>
              <TableHead>Other members</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PARTY_ROWS.map((row) => (
              <TableRow key={row.size}>
                <TableCell className="font-medium">{row.size} members</TableCell>
                <TableCell>{row.killer}</TableCell>
                <TableCell>{row.others}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>
          Solo play is not listed on this table: you are the killer, so you
          take 100% base EXP.
        </li>
        <li>
          Shares are percentages of <span className="text-foreground">base EXP</span>,
          not a split of a single 100% pool. A four-person party pays 100% to
          the killer plus 80% to each of the other three.
        </li>
        <li>Fill the party when you can. Extra members earn a larger cut.</li>
      </ul>

      <p className="text-xs text-muted-foreground">{SOURCE}</p>
    </div>
  );
}
