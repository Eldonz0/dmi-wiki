"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useEditorMode } from "@/components/editor-mode";
import { BoxTools } from "@/components/box-tools";
import type { CatalogForm, EvoTree } from "@/lib/digimon-types";

const FormEditor = dynamic(
  () => import("@/components/form-editor").then((m) => m.FormEditor),
  { ssr: false, loading: () => <p className="box-panel">Loading editor…</p> },
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
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Payload | null>(null);

  useEffect(() => {
    if (!editing || !open) return;
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
  }, [editing, open, slug]);

  useEffect(() => {
    if (!editing) setOpen(false);
  }, [editing]);

  return (
    <>
      {editing ? (
        <div className="box-wrap is-open" style={{ marginBottom: "0.8rem" }}>
          <BoxTools
            onEdit={() => setOpen((v) => !v)}
            editing={open}
          />
          <p className="guide-hint" style={{ margin: 0 }}>
            Public article stays below. Edit opens tools under it.
          </p>
        </div>
      ) : null}
      {children}
      {editing && open ? (
        <div className="box-panel">
          {data ? (
            <FormEditor
              form={data.form}
              tree={data.tree}
              names={data.names}
              slugs={data.slugs}
              icons={data.icons}
              art={data.art}
              rankIcons={data.rankIcons}
            />
          ) : (
            <p>Loading editor…</p>
          )}
        </div>
      ) : null}
    </>
  );
}
