"use client";

import { useEffect, useState } from "react";

export function useAdmin() {
  const [admin, setAdmin] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me", { credentials: "same-origin" })
      .then((res) => res.json())
      .then((data: { admin?: boolean }) => {
        if (!cancelled) setAdmin(Boolean(data.admin));
      })
      .catch(() => {
        if (!cancelled) setAdmin(false);
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { admin, ready };
}
