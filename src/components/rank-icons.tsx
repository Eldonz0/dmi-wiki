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

type Ctx = {
  icons: Record<string, string>;
  setRankIcon: (rank: string, url: string) => void;
};

const RankIconsCtx = createContext<Ctx>({
  icons: {},
  setRankIcon: () => {},
});

export function RankIconsProvider({
  initial,
  children,
}: {
  initial: Record<string, string>;
  children: ReactNode;
}) {
  const [icons, setIcons] = useState(initial);

  useEffect(() => {
    setIcons(initial);
  }, [initial]);

  const setRankIcon = useCallback((rank: string, url: string) => {
    setIcons((prev) => ({ ...prev, [rank]: url }));
  }, []);

  const value = useMemo(() => ({ icons, setRankIcon }), [icons, setRankIcon]);
  return <RankIconsCtx.Provider value={value}>{children}</RankIconsCtx.Provider>;
}

export function useRankIcons() {
  return useContext(RankIconsCtx);
}
