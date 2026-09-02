"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { CatalogForm, EvoTree } from "@/lib/digimon-types";
import type { RankCode } from "@/lib/ranks";
import { EvoCanvas } from "@/components/evo-canvas";
import { RankBadge, RoleBadge } from "@/components/rank-badge";
import { RANKS, rankSlug } from "@/lib/ranks";
import { normalizeTree } from "@/lib/evo-layout";
import { STAT_LABELS, defaultBlurb } from "@/lib/digimon-client";
import { SOURCE } from "@/lib/wiki";

const ROLES = ["AA", "TA", "SK", "SUP"] as const;

export function FormEditor({
  form,
  tree,
  names,
  icons,
  art,
  rankIcons: rankIconStart,
}: {
  form: CatalogForm;
  tree: EvoTree;
  names: string[];
  slugs?: { name: string; slug: string }[];
  icons: Record<string, string>;
  art: Record<string, string>;
  rankIcons: Record<string, string>;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState(form);
  const [layout, setLayout] = useState<EvoTree>(() => normalizeTree(tree));
  const [iconBag, setIconBag] = useState(icons);
  const [artBag, setArtBag] = useState(art);
  const [rankBag, setRankBag] = useState(rankIconStart);
  const [chipName, setChipName] = useState(form.name);
  const [status, setStatus] = useState("");

  const thumb =
    draft.art || artBag[draft.name] || iconBag[draft.name] || "";
  const blurb = draft.blurb ?? defaultBlurb(draft);

  const lineNames = useMemo(
    () => draft.lines.filter((n) => n && n !== "?"),
    [draft.lines],
  );

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Saving…");
    const res = await fetch("/api/catalog", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        form: { ...draft, blurb },
        tree: layout,
      }),
    });
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setStatus(data.error || "Save failed — turn on Editor mode and Sign in.");
      return;
    }
    setStatus("Saved. The public page matches this layout.");
    router.refresh();
  }

  async function upload(kind: "chip" | "art" | "rank", key: string, file: File) {
    const body = new FormData();
    body.set("file", file);
    body.set("name", key);
    body.set("kind", kind);
    setStatus("Uploading…");
    const res = await fetch("/api/icons", { method: "POST", credentials: "include", body });
    if (!res.ok) {
      setStatus("Upload failed.");
      return;
    }
    const data = (await res.json()) as {
      url: string;
      name: string;
      kind: string;
    };
    if (data.kind === "chip") {
      setIconBag((prev) => ({ ...prev, [data.name]: data.url }));
      if (data.name === draft.name) {
        setDraft((d) => ({ ...d, icon: data.url }));
      }
    } else if (data.kind === "art") {
      setArtBag((prev) => ({ ...prev, [data.name]: data.url }));
      setDraft((d) => ({ ...d, art: data.url }));
    } else {
      setRankBag((prev) => ({ ...prev, [data.name]: data.url }));
    }
    setStatus("Image saved.");
  }

  function FileBtn({
    label,
    kind,
    name,
  }: {
    label: string;
    kind: "chip" | "art" | "rank";
    name: string;
  }) {
    return (
      <label className="live-file">
        {label}
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void upload(kind, name, file);
            e.target.value = "";
          }}
        />
      </label>
    );
  }

  return (
    <form className="editor editor-wide-page dmo-page" onSubmit={save}>
      <div className="live-bar">
        <Link href="/admin">← Catalog</Link>
        {" · "}
        <Link href={`/digimon/${form.slug}`}>View public page</Link>
        <button type="submit">Save page</button>
        {status ? <span className="editor-status">{status}</span> : null}
      </div>

      <div className="mw-pre-title">From DMI Wiki · Digimon · editing</div>
      <input
        className="live-title"
        value={draft.name}
        onChange={(e) => setDraft({ ...draft, name: e.target.value })}
        aria-label="Name"
      />

      <table className="dmo-ibox">
        <thead>
          <tr>
            <th colSpan={2}>
              <input
                className="live-ibox-en"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
              <input
                className="live-ibox-jp"
                placeholder="Japanese name"
                value={draft.jp ?? ""}
                onChange={(e) => setDraft({ ...draft, jp: e.target.value })}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2} className="dmo-ibox-art">
              {thumb ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={thumb} alt={draft.name} width={250} />
              ) : (
                <span className="dmo-ibox-placeholder">{draft.name}</span>
              )}
              <div className="live-art-actions">
                <FileBtn label="Upload thumbnail" kind="art" name={draft.name} />
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="box-form">
              <input
                className="live-plain"
                placeholder="Form (Rookie, Mega…)"
                value={draft.form ?? ""}
                onChange={(e) => setDraft({ ...draft, form: e.target.value })}
              />
            </td>
          </tr>
          <IboxField
            label="Attribute"
            value={draft.attribute ?? ""}
            onChange={(v) => setDraft({ ...draft, attribute: v })}
          />
          <IboxField
            label="Elemental Attribute"
            value={draft.element ?? ""}
            onChange={(v) => setDraft({ ...draft, element: v })}
          />
          <IboxField
            label="Type"
            value={draft.type ?? ""}
            onChange={(v) => setDraft({ ...draft, type: v })}
          />
          <IboxField
            label="Family"
            value={draft.family ?? ""}
            onChange={(v) => setDraft({ ...draft, family: v })}
          />
          <tr>
            <th>Rank</th>
            <td>
              <div className="live-rank-row">
                <RankBadge
                  rank={draft.rank}
                  src={rankBag[draft.rank]}
                />
                <select
                  value={draft.rank}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      rank: e.target.value as RankCode,
                    })
                  }
                >
                  {RANKS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <th>Role</th>
            <td>
              <select
                value={draft.role}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    role: e.target.value as CatalogForm["role"],
                  })
                }
              >
                {ROLES.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>{" "}
              <RoleBadge role={draft.role} />
            </td>
          </tr>
          <tr>
            <th>Evolution line(s)</th>
            <td>
              <input
                className="live-plain"
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
            </td>
          </tr>
        </tbody>
      </table>

      <div className="toc">
        <strong>Contents</strong>
        <ol>
          <li>
            <a href="#default-stats">Default Stats</a>
          </li>
          <li>
            <a href="#digivolution">Digivolution Line</a>
          </li>
        </ol>
      </div>

      <textarea
        className="live-blurb"
        rows={5}
        value={blurb}
        onChange={(e) => setDraft({ ...draft, blurb: e.target.value })}
      />
      {lineNames.length ? (
        <p className="section-lead">
          Egg / line: {lineNames.join(", ")}
        </p>
      ) : null}

      <h2 id="default-stats">Default Stats</h2>
      <p className="section-lead">
        Sheet values. Click a number to change it.
      </p>
      <table className="wikitable stats-table">
        <thead>
          <tr>
            <th>Stat</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {STAT_LABELS.map((row) => (
            <tr key={row.key}>
              <th title={row.hint}>
                {row.label} <span className="stat-hint">{row.hint}</span>
              </th>
              <td>
                <input
                  className="live-stat"
                  type="number"
                  value={draft[row.key]}
                  onChange={(e) =>
                    setDraft({ ...draft, [row.key]: Number(e.target.value) })
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <section className="evo-section" id="digivolution">
        <h2>Digivolution Line</h2>
        <EvoCanvas
          tree={layout}
          current={draft.name}
          names={names}
          icons={iconBag}
          onChange={setLayout}
          onSelectName={setChipName}
          onUploadChip={(file) =>
            void upload("chip", chipName || draft.name, file)
          }
          chipLabel={chipName || draft.name}
        />
      </section>

      <div className="catlinks">
        <strong>Categories:</strong>{" "}
        <Link href="/digimon">Digimon</Link>
        {" | "}
        <Link href={`/rank/${rankSlug(draft.rank)}`}>
          Digimon Rank {draft.rank}
        </Link>
        {" | "}
        <Link href="/roles">{draft.role}</Link>
      </div>
      <p className="mw-source">{SOURCE}</p>
    </form>
  );
}

function IboxField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <tr>
      <th>{label}</th>
      <td>
        <input
          className="live-plain"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </td>
    </tr>
  );
}
