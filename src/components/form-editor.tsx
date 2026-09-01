"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { CatalogForm } from "@/lib/digimon-types";
import type { EvoTree } from "@/lib/digimon-types";
import { EvoBoard } from "@/components/evo-board";
import { RANKS } from "@/lib/ranks";

const ROLES = ["AA", "TA", "SK", "SUP"] as const;

export function FormEditor({
  form,
  tree,
  names,
  slugs,
}: {
  form: CatalogForm;
  tree: EvoTree;
  names: string[];
  slugs: { name: string; slug: string }[];
}) {
  const router = useRouter();
  const [draft, setDraft] = useState(form);
  const [rows, setRows] = useState<string[][]>(
    tree.rows.length ? tree.rows : [[form.name]],
  );
  const [branches, setBranches] = useState(tree.branches ?? []);
  const [status, setStatus] = useState("");

  const hrefFor = useMemo(() => {
    return (name: string) => {
      const hit =
        slugs.find((s) => s.name === name) ??
        slugs.find((s) => s.name.replace(/ \[.*/, "") === name);
      return hit ? `/digimon/${hit.slug}` : undefined;
    };
  }, [slugs]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Saving…");
    const res = await fetch("/api/catalog", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        form: draft,
        tree: { rows: rows.filter((r) => r.length), branches },
      }),
    });
    if (!res.ok) {
      setStatus("Save failed — are you signed in?");
      return;
    }
    setStatus("Saved. Wiki pages now read these numbers.");
    router.refresh();
  }

  function setNode(r: number, c: number, name: string) {
    setRows((prev) =>
      prev.map((row, i) =>
        i === r ? row.map((n, j) => (j === c ? name : n)) : row,
      ),
    );
  }

  return (
    <form className="editor" onSubmit={save}>
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

      <h2>Evolution connections</h2>
      <p className="section-lead">
        Each row is a line (jogress uses two). Pick who sits in each box, then
        add a branch under a form. Preview uses the same chip layout as the
        wiki.
      </p>
      {rows.map((row, r) => (
        <div key={r} className="editor-line">
          <strong>Line {r + 1}</strong>
          <div className="editor-nodes">
            {row.map((name, c) => (
              <span key={`${r}-${c}`} className="editor-node">
                {c > 0 ? <span className="evo-arrow-slot">→</span> : null}
                <span>
                  <input
                    list="dmi-names"
                    value={name}
                    onChange={(e) => setNode(r, c, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setRows((prev) =>
                        prev.map((line, i) =>
                          i === r ? line.filter((_, j) => j !== c) : line,
                        ),
                      )
                    }
                  >
                    ×
                  </button>
                </span>
              </span>
            ))}
            <button
              type="button"
              onClick={() =>
                setRows((prev) =>
                  prev.map((line, i) => (i === r ? [...line, ""] : line)),
                )
              }
            >
              Add form
            </button>
            {rows.length > 1 ? (
              <button
                type="button"
                onClick={() => setRows((prev) => prev.filter((_, i) => i !== r))}
              >
                Remove line
              </button>
            ) : null}
          </div>
        </div>
      ))}
      <p>
        <button type="button" onClick={() => setRows((prev) => [...prev, [""]])}>
          Add jogress / extra line
        </button>
      </p>

      <h3>Branches</h3>
      {branches.map((b, i) => (
        <p key={i} className="editor-branch">
          From{" "}
          <input
            list="dmi-names"
            value={b.from}
            onChange={(e) =>
              setBranches((prev) =>
                prev.map((x, j) => (j === i ? { ...x, from: e.target.value } : x)),
              )
            }
          />{" "}
          to{" "}
          <input
            list="dmi-names"
            value={b.name}
            onChange={(e) =>
              setBranches((prev) =>
                prev.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)),
              )
            }
          />
          <button
            type="button"
            onClick={() => setBranches((prev) => prev.filter((_, j) => j !== i))}
          >
            ×
          </button>
        </p>
      ))}
      <p>
        <button
          type="button"
          onClick={() =>
            setBranches((prev) => [...prev, { from: draft.name, name: "" }])
          }
        >
          Add branch
        </button>
      </p>
      <datalist id="dmi-names">
        {names.map((n) => (
          <option key={n} value={n} />
        ))}
      </datalist>

      <h3>Preview</h3>
      <EvoBoard
        rows={rows.map((row) => row.filter(Boolean))}
        branches={branches.filter((b) => b.from && b.name)}
        current={draft.name}
        hrefFor={hrefFor}
      />

      <p>
        <button type="submit">Save to catalog</button>
        {status ? <span className="editor-status"> {status}</span> : null}
      </p>
    </form>
  );
}
