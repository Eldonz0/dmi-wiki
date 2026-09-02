"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/use-admin";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { setAdmin } = useAuth();
  const [error, setError] = useState(
    params.get("error") ? "Wrong username or password." : "",
  );
  const [busy, setBusy] = useState(false);

  return (
    <article className="mw-article">
      <div className="mw-pre-title">Account</div>
      <h1 className="mw-firstHeading">Sign in</h1>
      <p>One tamer account. Visitors browse without signing in.</p>
      <form
        className="login-form"
        action="/api/auth/login"
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          const body = new FormData(e.currentTarget);
          setBusy(true);
          setError("");
          void (async () => {
            const res = await fetch("/api/auth/login", {
              method: "POST",
              credentials: "include",
              headers: { Accept: "application/json" },
              body,
            });
            setBusy(false);
            if (!res.ok) {
              setError("Wrong username or password.");
              return;
            }
            setAdmin(true);
            router.push("/");
            router.refresh();
          })();
        }}
      >
        <label>
          Username
          <input name="user" type="text" autoComplete="username" required />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </label>
        <input type="hidden" name="next" value="/" />
        {error ? <p className="login-error">{error}</p> : null}
        <button type="submit" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </article>
  );
}
