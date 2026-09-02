"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Infobox } from "@/components/wiki-article";
import { WikiInline, WikiText } from "@/components/wiki-text";
import { useEditorMode } from "@/components/editor-mode";
import type { WikiLandPage } from "@/lib/page-types";

export function PageCanvas({
  page,
  heading = true,
}: {
  page: WikiLandPage;
  heading?: boolean;
}) {
  const { editing } = useEditorMode();
  const router = useRouter();
  const [draft, setDraft] = useState(page);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setDraft(page);
  }, [page]);

  async function save() {
    setStatus("Saving…");
    const res = await fetch("/api/pages", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setStatus(data.error || "Save failed.");
      return;
    }
    setStatus("Saved.");
    router.refresh();
  }

  if (!editing) {
    return (
      <>
        {heading ? <h1 className="mw-firstHeading">{page.title}</h1> : null}
        {page.infoboxTitle ? (
          <Infobox
            title={page.infoboxTitle}
            rows={page.infobox.map((row) => ({
              label: row.label,
              value: <WikiInline text={row.value} />,
            }))}
          />
        ) : null}
        <WikiText text={page.body} />
      </>
    );
  }

  const boxText = draft.infobox
    .map((row) => `${row.label} | ${row.value}`)
    .join("\n");

  return (
    <div className="page-edit">
      {heading ? <h1 className="mw-firstHeading">{draft.title}</h1> : null}
      <label className="guide-field">
        Title
        <input
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        />
      </label>
      <label className="guide-field">
        Category
        <input
          value={draft.category}
          onChange={(e) => setDraft({ ...draft, category: e.target.value })}
        />
      </label>
      <label className="guide-field">
        Infobox title (blank = no infobox)
        <input
          value={draft.infoboxTitle}
          onChange={(e) => setDraft({ ...draft, infoboxTitle: e.target.value })}
        />
      </label>
      <label className="guide-field">
        Infobox rows (one per line: Label | Value)
        <textarea
          rows={4}
          value={boxText}
          onChange={(e) =>
            setDraft({
              ...draft,
              infobox: e.target.value.split("\n").flatMap((line) => {
                const [label, ...rest] = line.split("|");
                if (!label?.trim()) return [];
                return [
                  {
                    label: label.trim(),
                    value: rest.join("|").trim(),
                  },
                ];
              }),
            })
          }
        />
      </label>
      <label className="guide-field">
        Page text
        <textarea
          rows={14}
          value={draft.body}
          onChange={(e) => setDraft({ ...draft, body: e.target.value })}
        />
      </label>
      <p className="guide-hint">
        Use **bold**, [links](/digimon), ## headings, and - bullet lists.
      </p>
      <p>
        <button type="button" className="mw-signin" onClick={() => void save()}>
          Save page
        </button>
        {status ? <span className="editor-status"> {status}</span> : null}
      </p>
    </div>
  );
}
