"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import { WikiSearchForm } from "@/components/wiki-search";
import { SIDEBAR_NAV, SIDEBAR_TOOLS } from "@/lib/wiki";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

function Portlets({
  onNavigate,
  isAdmin,
}: {
  onNavigate?: () => void;
  isAdmin: boolean;
}) {
  const pathname = usePathname();
  const groups = isAdmin ? [...SIDEBAR_NAV, ...SIDEBAR_TOOLS] : SIDEBAR_NAV;

  return (
    <div className="mw-portlets">
      {groups.map((group) => (
        <nav key={group.title} className="mw-portlet">
          <h3>{group.title}</h3>
          <ul>
            {group.items.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
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

export function WikiShell({
  children,
  isAdmin = false,
}: {
  children: React.ReactNode;
  isAdmin?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="mw-skin">
      <header className="dmi-top">
        <Link href="/" className="dmi-brand">
          <strong>DIGIMON MASTERS</strong>
          <em>INFINITE</em>
        </Link>
        <nav className="dmi-top-nav">
          <Link href="/" className={cn(pathname === "/" && "is-on")}>
            Main page
          </Link>
          <Link
            href="/digimon"
            className={cn(pathname.startsWith("/digimon") && "is-on")}
          >
            Digimon List
          </Link>
          <Link
            href="/guide"
            className={cn(pathname.startsWith("/guide") && "is-on")}
          >
            Guide
          </Link>
          {isAdmin ? (
            <Link
              href="/admin"
              className={cn(pathname.startsWith("/admin") && "is-on")}
            >
              Catalog
            </Link>
          ) : (
            <Link href="/api/auth/login?next=/">Sign in</Link>
          )}
          <a
            href="https://www.digimonmastersinfinite.com/index.html"
            target="_blank"
            rel="noreferrer"
          >
            Official site
          </a>
        </nav>
      </header>

      <div className="mw-frame">
        <aside className="mw-sidebar">
          {isAdmin ? <WikiSearchForm compact /> : null}
          <div className="mw-sidebar-desktop">
            <Portlets isAdmin={isAdmin} />
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
                  <Portlets
                    isAdmin={isAdmin}
                    onNavigate={() => setOpen(false)}
                  />
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="mw-mobile-brand">
              DMI WIKI
            </Link>
          </div>

          <div className="mw-content">{children}</div>

          <footer className="mw-footer">
            <p>
              Fan wiki for <strong>Digimon Masters Infinite</strong>. Same
              article structure as a DMO wiki, skinned like the official DMI
              site. Not affiliated with Bandai Namco.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
