"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import { WikiSearchForm } from "@/components/wiki-search";
import { SIDEBAR_NAV, SIDEBAR_TOOLS } from "@/lib/wiki";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/hooks/use-admin";
import { SignInButton, SignOutButton } from "@/components/sign-in-button";
import {
  EditorModeProvider,
  useEditorMode,
} from "@/components/editor-mode";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

function EditorToggle() {
  const { editing, toggle } = useEditorMode();
  return (
    <button
      type="button"
      className={editing ? "mw-editor-on" : "mw-signin"}
      onClick={toggle}
    >
      {editing ? "Editor mode: ON" : "Editor mode"}
    </button>
  );
}

function AccountPortlet({
  admin,
  onNavigate,
}: {
  admin: boolean;
  onNavigate?: () => void;
}) {
  return (
    <nav className="mw-portlet mw-account">
      <h3>Account</h3>
      <ul>
        {admin ? (
          <>
            <li>
              <EditorToggle />
            </li>
            <li>
              <Link href="/admin" onClick={onNavigate}>
                Catalog
              </Link>
            </li>
            <li>
              <SignOutButton className="mw-text-out" />
            </li>
          </>
        ) : (
          <li>
            <SignInButton next="/" />
          </li>
        )}
      </ul>
    </nav>
  );
}

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
      <AccountPortlet admin={isAdmin} onNavigate={onNavigate} />
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

export function WikiShell({ children }: { children: React.ReactNode }) {
  return (
    <EditorModeProvider>
      <WikiChrome>{children}</WikiChrome>
    </EditorModeProvider>
  );
}

function WikiChrome({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { admin } = useAdmin();
  const { editing } = useEditorMode();

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
          {admin ? <EditorToggle /> : null}
          {admin ? (
            <Link
              href="/admin"
              className={cn(pathname.startsWith("/admin") && "is-on")}
            >
              Catalog
            </Link>
          ) : (
            <SignInButton next={pathname || "/"} />
          )}
          {admin ? <SignOutButton className="mw-text-out" /> : null}
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
          {admin ? <WikiSearchForm compact /> : null}
          <div className="mw-sidebar-desktop">
            <Portlets isAdmin={admin} />
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
                    isAdmin={admin}
                    onNavigate={() => setOpen(false)}
                  />
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="mw-mobile-brand">
              DMI WIKI
            </Link>
            {admin ? (
              <SignOutButton />
            ) : (
              <SignInButton next={pathname || "/"} />
            )}
          </div>

          <div className="mw-content">
            {editing ? (
              <p className="editor-banner">
                Editor mode is on. Change this page and hit Save — it writes to
                the wiki.
              </p>
            ) : null}
            {children}
          </div>

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
