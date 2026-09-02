"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-admin";

export function SignInButton({
  next = "/",
  className = "mw-signin",
}: {
  next?: string;
  className?: string;
}) {
  const router = useRouter();
  const { setAdmin } = useAuth();

  return (
    <form
      action="/api/auth/login"
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        const body = new FormData(e.currentTarget);
        void (async () => {
          await fetch("/api/auth/login", {
            method: "POST",
            credentials: "include",
            headers: { Accept: "application/json" },
            body,
          });
          setAdmin(true);
          router.refresh();
        })();
      }}
    >
      <input type="hidden" name="next" value={next} />
      <button type="submit" className={className}>
        Sign in
      </button>
    </form>
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
