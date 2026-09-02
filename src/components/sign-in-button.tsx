"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-admin";

export function SignInButton({
  className = "mw-signin",
}: {
  next?: string;
  className?: string;
}) {
  return (
    <Link href="/login" className={className}>
      Sign in
    </Link>
  );
}

export function SignOutButton({ className = "mw-signin" }: { className?: string }) {
  const router = useRouter();
  const { setAdmin } = useAuth();

  return (
    <form
      action="/api/auth/logout"
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        void (async () => {
          await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
            headers: { Accept: "application/json" },
          });
          setAdmin(false);
          try {
            window.localStorage.setItem("dmi-editor", "0");
          } catch {
            /* ignore */
          }
          router.refresh();
        })();
      }}
    >
      <button type="submit" className={className}>
        Sign out
      </button>
    </form>
  );
}
