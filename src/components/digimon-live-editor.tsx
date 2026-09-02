"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useEditorMode } from "@/components/editor-mode";
import type { CatalogForm, EvoTree } from "@/lib/digimon-types";

const FormEditor = dynamic(
  () => import("@/components/form-editor").then((m) => m.FormEditor),
  { ssr: false, loading: () => <p className="editor-banner">Loading editor…</p> },
);

type Payload = {
  form: CatalogForm;
  tree: EvoTree;
  names: string[];
  slugs: { name: string; slug: string }[];
  icons: Record<string, string>;
  art: Record<string, string>;
  rankIcons: Record<string, string>;
};

export function DigimonLiveEditor({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const { editing } = useEditorMode();
  const [data, setData] = useState<Payload | null>(null);

  useEffect(() => {
    if (!editing) {
      setData(null);
      return;
    }
    let cancelled = false;
    fetch(`/api/catalog/edit/${slug}`, { credentials: "include" })
      .then((res) => res.json())
      .then((json: Payload & { error?: string }) => {
        if (!cancelled && json.form) setData(json);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });
    return () => {
      cancelled = true;
    };
  }, [editing, slug]);

  if (!editing) return children;
  if (!data) return <p className="editor-banner">Loading editor…</p>;
  return (
    <FormEditor
      form={data.form}
      tree={data.tree}
      names={data.names}
      slugs={data.slugs}
      icons={data.icons}
      art={data.art}
      rankIcons={data.rankIcons}
    />
  );
}
