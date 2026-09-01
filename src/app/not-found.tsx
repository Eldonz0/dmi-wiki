import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="space-y-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Page not in the Codex</h1>
      <p className="text-sm text-muted-foreground">
        That route does not exist. Head back to the overview.
      </p>
      <Button render={<Link href="/" />}>Overview</Button>
    </div>
  );
}
