"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import { WikiSearchForm } from "@/components/wiki-search";
import { SIDEBAR } from "@/lib/wiki";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

function Portlets({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="mw-portlets">
      {SIDEBAR.map((group) => (
        <nav key={group.title} className="mw-portlet">
          <h3>{group.title}</h3>
          <ul>
            {group.items.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}?`);
              return (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(active && "is-active")}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ))}
    </div>
  );
}

export function WikiShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const tabLabel = pathname === "/" ? "Main Page" : "Article";

  return (
    <div className="mw-skin">
      <div className="mw-personal">
        <span>DMI Wiki</span>
        <span className="mw-dot">·</span>
        <span>Digimon Master Online — DMI</span>
      </div>

      <div className="mw-frame">
        <aside className="mw-sidebar">
          <Link href="/" className="mw-wordmark">
            <span className="line1">DIGIMON MASTER ONLINE</span>
            <span className="line2">DMI WIKI</span>
          </Link>
          <WikiSearchForm compact />
          <div className="mw-sidebar-desktop">
            <Portlets />
          </div>
        </aside>

        <div className="mw-workspace">
          <div className="mw-mobile-bar">
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
              <SheetContent side="left" className="mw-sheet">
                <SheetHeader>
                  <SheetTitle>DMI Wiki</SheetTitle>
                </SheetHeader>
                <div className="px-3 pb-6">
                  <Portlets onNavigate={() => setOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="mw-mobile-brand">
              DMI Wiki
            </Link>
          </div>

          <div className="mw-tabs" aria-label="Page tabs">
            <span className="is-selected">{tabLabel}</span>
            <span>Discussion</span>
            <span>View source</span>
            <span>History</span>
          </div>

          <div className="mw-content">{children}</div>

          <footer className="mw-footer">
            <p>
              Fan encyclopedia for the <strong>Digimon Master Online — DMI</strong>{" "}
              private server. Layout inspired by classic DMO wikis. Not affiliated
              with Bandai Namco or dmowiki.com.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
