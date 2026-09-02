"use client";

import type { ReactNode } from "react";
import { useEditorMode } from "@/components/editor-mode";

export function EditorSwitch({
  editor,
  children,
}: {
  editor: ReactNode;
  children: ReactNode;
}) {
  const { editing } = useEditorMode();
  return editing ? editor : children;
}

export function EditorOnly({ children }: { children: ReactNode }) {
  const { editing } = useEditorMode();
  if (!editing) return null;
  return children;
}
