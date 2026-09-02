"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import { WikiSearchForm } from "@/components/wiki-search";
import { SiteSearch } from "@/components/site-search";
import { SIDEBAR_NAV, SIDEBAR_TOOLS, DISCORD_INVITE } from "@/lib/wiki";
import { Button } from "@/components/ui/button";
import { AuthProvider, useAdmin } from "@/hooks/use-admin";
import { SignInButton, SignOutButton } from "@/components/sign-in-button";
import {
  EditorModeProvider,
  useEditorMode,
} from "@/components/editor-mode";
import { RankIconsProvider } from "@/components/rank-icons";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

function DiscordInvite({ className }: { className?: string }) {
  return (
    <a
      className={cn("dmi-discord", className)}
      href={DISCORD_INVITE}
      target="_blank"
      rel="noreferrer"
      title="Join the DMI Discord"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" width="22" height="22">
        <path
          fill="currentColor"
          d="M20.32 4.37A19.8 19.8 0 0 0 15.89 3l-.2.37a18.3 18.3 0 0 1 4.54 1.72 16.2 16.2 0 0 0-14.46 0A18.3 18.3 0 0 1 8.3 3.37L8.1 3A19.8 19.8 0 0 0 3.67 4.38C.5 9.15-.3 13.8.1 18.38A19.9 19.9 0 0 0 6 21l.7-1.16a13 13 0 0 1-2.1-1.02l.42-.33a14.3 14.3 0 0 0 12 0l.4.33a13 13 0 0 1-2.08 1.03L18 21a19.9 19.9 0 0 0 5.92-2.62c.5-5.3-.7-9.9-3.6-14.01ZM8.02 15.33c-1.18 0-2.15-1.08-2.15-2.4 0-1.33.95-2.41 2.15-2.41s2.18 1.1 2.16 2.4c0 1.33-.95 2.41-2.16 2.41Zm7.96 0c-1.18 0-2.15-1.08-2.15-2.4 0-1.33.95-2.41 2.15-2.41s2.18 1.1 2.16 2.4c0 1.33-.95 2.41-2.16 2.41Z"
        />
      </svg>
      <span>Discord</span>
    </a>
  );
}

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

function IndexEditorLink({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const here = pathname === "/admin" || pathname.startsWith("/admin/");
  return (
    <Link
      href="/admin"
      className={here ? "mw-editor-on" : "mw-signin"}
      onClick={onNavigate}
    >
      {here ? "Digimon index editor: ON" : "Digimon index editor"}
    </Link>
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
              <IndexEditorLink onNavigate={onNavigate} />
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
      <nav className="mw-portlet">
        <h3>Community</h3>
        <ul>
          <li>
            <DiscordInvite />
          </li>
        </ul>
      </nav>
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
  rankIcons = {},
  githubSaves = true,
}: {
  children: React.ReactNode;
  rankIcons?: Record<string, string>;
  githubSaves?: boolean;
}) {
  return (
    <AuthProvider>
      <EditorModeProvider>
        <RankIconsProvider initial={rankIcons}>
          <WikiChrome githubSaves={githubSaves}>{children}</WikiChrome>
        </RankIconsProvider>
      </EditorModeProvider>
    </AuthProvider>
  );
}

function WikiChrome({
  children,
  githubSaves,
}: {
  children: React.ReactNode;
  githubSaves: boolean;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { admin } = useAdmin();
  const { editing } = useEditorMode();

  return (
    <div className="mw-skin">
      <header className="dmi-top">
        <Link href="/" className="dmi-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/dmi-logo.png"
            alt="Digimon Masters Infinite"
            width={192}
            height={102}
          />
        </Link>
        <div className="dmi-top-tools">
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
            {admin ? <IndexEditorLink /> : (
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
          <DiscordInvite />
        </div>
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/dmi-logo.png"
                alt="Digimon Masters Infinite"
                width={192}
                height={102}
              />
            </Link>
            {admin ? (
              <SignOutButton />
            ) : (
              <SignInButton next={pathname || "/"} />
            )}
          </div>

          <div className="mw-content">
            <SiteSearch />
            {editing ? (
              <p className="editor-banner">
                Editor mode is on. The page stays as visitors see it — use the
                small Edit / Duplicate buttons on a box.
                {!githubSaves ? (
                  <>
                    {" "}
                    Saves will fail until Vercel has <code>GITHUB_REPO=Eldonz0/dmi-wiki</code> and{" "}
                    <code>GITHUB_DATA_TOKEN</code> (GitHub token with repo access), then Redeploy.
                    The deploy key is not enough.
                  </>
                ) : null}
              </p>
            ) : null}
            {children}
          </div>

          <footer className="mw-footer">
            <p>
              Fan wiki for <strong>Digimon Masters Infinite</strong>.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
