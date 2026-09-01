"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Crest } from "@/components/crest";
import { NAV } from "@/lib/wiki";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "rounded-lg px-3 py-2 text-sm transition-colors",
              active
                ? "bg-sidebar-accent text-primary"
                : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
            )}
          >
            <span className="block font-medium">{item.label}</span>
            <span className="mt-0.5 block text-xs opacity-80">
              {item.description}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export function WikiShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-full flex-1">
      <aside className="sticky top-0 hidden h-svh w-64 shrink-0 border-r border-sidebar-border bg-sidebar p-4 md:flex md:flex-col">
        <Link href="/" className="mb-6 flex items-center gap-2 px-1">
          <Crest className="size-9" />
          <div>
            <p className="text-sm font-semibold tracking-tight">DMI Codex</p>
            <p className="text-[11px] text-muted-foreground">
              Digimon Masters Infinite
            </p>
          </div>
        </Link>
        <NavLinks />
        <p className="mt-auto px-2 pt-8 text-[11px] leading-relaxed text-muted-foreground">
          Unofficial player wiki. Numbers come from GM posts in{" "}
          <span className="text-foreground/80">#server-informations</span>.
        </p>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border/80 bg-background/80 px-4 py-3 backdrop-blur md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Open wiki menu"
                />
              }
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-sidebar">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Crest className="size-8" />
                  DMI Codex
                </SheetTitle>
              </SheetHeader>
              <div className="px-2">
                <NavLinks onNavigate={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <Crest className="size-8" />
            <span className="font-semibold">DMI Codex</span>
          </Link>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
