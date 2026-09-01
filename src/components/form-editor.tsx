"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CatalogForm, EvoTree } from "@/lib/digimon-types";
import { EvoCanvas } from "@/components/evo-canvas";
import { RANKS } from "@/lib/ranks";
import { normalizeTree } from "@/lib/evo-layout";

const ROLES = ["AA", "TA", "SK", "SUP"] as const;

export function FormEditor({
  form,
  tree,
  names,
  icons,
}: {
  form: CatalogForm;
  tree: EvoTree;
  names: string[];
  slugs?: { name: string; slug: string }[];
  icons: Record<string, string>;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState(form);
  const [layout, setLayout] = useState<EvoTree>(() => normalizeTree(tree));
  const [iconBag, setIconBag] = useState(icons);
  const [chipName, setChipName] = useState(form.name);
  const [status, setStatus] = useState("");

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Saving…");
    const res = await fetch("/api/catalog", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        form: draft,
        tree: layout,
      }),
    });
    if (!res.ok) {
      setStatus("Save failed — are you signed in?");
      return;
    }
    setStatus(
      "Saved. Public pages and every form on this line now use this layout.",
    );
    router.refresh();
  }

  async function uploadIcon(file: File) {
    const body = new FormData();
    body.set("file", file);
    body.set("name", chipName || draft.name);
    setStatus("Uploading icon…");
    const res = await fetch("/api/icons", { method: "POST", body });
    if (!res.ok) {
      setStatus("Icon upload failed.");
      return;
    }
    const data = (await res.json()) as { url: string; name: string };
    setIconBag((prev) => ({ ...prev, [data.name]: data.url }));
    if (data.name === draft.name) {
      setDraft((d) => ({ ...d, icon: data.url }));
    }
    setStatus(`Icon saved for ${data.name}.`);
  }

  return (
    <form className="editor editor-wide-page" onSubmit={save}>
      <p>
        <Link href="/admin">← Catalog</Link>
        {" · "}
        <Link href={`/digimon/${form.slug}`}>Public page</Link>
      </p>

      <h2>Sheet stats</h2>
      <div className="editor-grid">
        <label>
          Name
          <input
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
          />
        </label>
        <label>
          Rank
          <select
            value={draft.rank}
            onChange={(e) =>
              setDraft({ ...draft, rank: e.target.value as CatalogForm["rank"] })
            }
          >
            {RANKS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
        <label>
          Role
          <select
            value={draft.role}
            onChange={(e) =>
              setDraft({ ...draft, role: e.target.value as CatalogForm["role"] })
            }
          >
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
        {(["hp", "at", "de", "as"] as const).map((key) => (
          <label key={key}>
            {key.toUpperCase()}
            <input
              type="number"
              value={draft[key]}
              onChange={(e) =>
                setDraft({ ...draft, [key]: Number(e.target.value) })
              }
            />
          </label>
        ))}
        <label className="editor-wide">
          Egg / evolution line(s) from the sheet (comma separated)
          <input
            value={draft.lines.join(", ")}
            onChange={(e) =>
              setDraft({
                ...draft,
                lines: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
          />
        </label>
      </div>

      <h2>Chip icon</h2>
      <p className="section-lead">
        Upload a square portrait. It is used on this chip everywhere the name
        appears. Selected chip: <strong>{chipName || draft.name}</strong>
      </p>
      <p>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void uploadIcon(file);
          }}
        />
      </p>

      <h2>Evolution board</h2>
      <p className="section-lead">
        Initials come from the assignment sheet (everyone who shares this egg /
        line, sorted by rank then HP) plus any DMO line we already wired. Drag
        chips onto the grid, draw arrows from one form to the next, then save.
        Public chips stay clickable.
      </p>
      <EvoCanvas
        tree={layout}
        current={draft.name}
        names={names}
        icons={iconBag}
        onChange={setLayout}
        onSelectName={setChipName}
      />

      <p>
        <button type="submit">Save to catalog</button>
        {status ? <span className="editor-status"> {status}</span> : null}
      </p>
    </form>
  );
}
