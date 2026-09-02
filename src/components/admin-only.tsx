"use client";

import type { ReactNode } from "react";
import { useAdmin } from "@/hooks/use-admin";

export function AdminOnly({ children }: { children: ReactNode }) {
  const { admin } = useAdmin();
  if (!admin) return null;
  return children;
}
