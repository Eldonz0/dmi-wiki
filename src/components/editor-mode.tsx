"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useAdmin } from "@/hooks/use-admin";

const KEY = "dmi-editor";

type Ctx = {
  admin: boolean;
  editing: boolean;
  toggle: () => void;
};

const EditorCtx = createContext<Ctx>({
  admin: false,
  editing: false,
  toggle: () => {},
});

export function EditorModeProvider({ children }: { children: ReactNode }) {
  const { admin } = useAdmin();
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(admin && window.localStorage.getItem(KEY) === "1");
  }, [admin]);

  const toggle = useCallback(() => {
    setOn((prev) => {
      const next = admin && !prev;
      window.localStorage.setItem(KEY, next ? "1" : "0");
      return next;
    });
  }, [admin]);

  return (
    <EditorCtx.Provider value={{ admin, editing: Boolean(admin && on), toggle }}>
      {children}
    </EditorCtx.Provider>
  );
}

export function useEditorMode() {
  return useContext(EditorCtx);
}
