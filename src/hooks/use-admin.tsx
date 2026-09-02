"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Auth = {
  admin: boolean;
  ready: boolean;
  setAdmin: (value: boolean) => void;
  refresh: () => Promise<void>;
};

const AuthCtx = createContext<Auth | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState(false);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      const data = (await res.json()) as { admin?: boolean };
      setAdmin(Boolean(data.admin));
    } catch {
      setAdmin(false);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({ admin, ready, setAdmin, refresh }),
    [admin, ready, refresh],
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}

export function useAdmin() {
  const { admin, ready } = useAuth();
  return { admin, ready };
}
