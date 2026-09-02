"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { AccessoryCategory, AccessoryItem, AccessoryRoleRec } from "@/lib/accessory-types";
import { useEditorMode } from "@/components/editor-mode";
import { BoxTools } from "@/components/box-tools";
import { TicketChip } from "@/components/ticket-chip";

const ROLE_NAME: Record<AccessoryRoleRec["role"], string> = {
  SK: "Skill Attacker",
  AA: "Auto Attacker",
  TA: "Tank",
  SUP: "Support",
};

function numberLabel(value: AccessoryItem["numberChange"]) {
  if (value === "need") return "Yes";
  if (value === "max") return "No (already max)";
  return "—";
}

export function AccessoryPanel({ category }: { category: AccessoryCategory }) {
  const { editing } = useEditorMode();
  const router = useRouter();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [title, setTitle] = useState(category.title);
  const [blurb, setBlurb] = useState(category.blurb);
  const [items, setItems] = useState(category.items);
  const [roles, setRoles] = useState(category.roles);
  const [status, setStatus] = useState("");
  const [draft, setDraft] = useState<AccessoryItem | null>(null);

  useEffect(() => {
    setTitle(category.title);
    setBlurb(category.blurb);
    setItems(category.items);
    setRoles(category.roles);
  }, [category]);

  useEffect(() => {
    if (!editing) {
      setToolsOpen(false);
      setDraft(null);
    }
  }, [editing]);

  async function persist(next: {
    title?: string;
    blurb?: string;
    items?: AccessoryItem[];
    roles?: AccessoryRoleRec[];
  }) {
    setStatus("Saving…");
    const res = await fetch(`/api/accessories/${category.slug}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: next.title ?? title,
        blurb: next.blurb ?? blurb,
        items: next.items ?? items,
        roles: next.roles ?? roles,
      }),
    });
    setStatus(res.ok ? "Saved." : "Save failed.");
    if (res.ok) router.refresh();
    return res.ok;
  }

  async function addRow() {
    const res = await fetch("/api/accessories", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slot: category.slug }),
    });
    if (res.ok) router.refresh();
  }

  async function saveTicket(item: AccessoryItem, url: string) {
    const next = items.map((row) => (row.id === item.id ? { ...row, icon: url } : row));
    setItems(next);
    await persist({ items: next });
  }

  async function saveDraft() {
    if (!draft) return;
    const next = items.map((row) => (row.id === draft.id ? draft : row));
    setItems(next);
    setDraft(null);
    await persist({ items: next });
  }

  async function removeItem(item: AccessoryItem) {
    if (!confirm(`Remove “${item.name}”?`)) return;
    const next = items.filter((row) => row.id !== item.id);
    setItems(next);
    await persist({ items: next });
  }

  const recs = items.filter((i) => i.recommended);
  const others = items.filter((i) => !i.recommended);

  return (
    <div className="acc-panel">
      {editing ? (
        <div className={toolsOpen ? "box-wrap is-open" : "box-wrap"}>
          <BoxTools onEdit={() => setToolsOpen((v) => !v)} editing={toolsOpen} />
          <p className="guide-hint" style={{ margin: 0 }}>
            Tables stay public. Click a chip to upload the item icon.
          </p>
        </div>
      ) : null}
      <p>{toolsOpen ? blurb : category.blurb}</p>

      {toolsOpen ? (
        <div className="box-panel">
          <label className="guide-field">
            Title
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label className="guide-field">
            Intro
            <textarea rows={3} value={blurb} onChange={(e) => setBlurb(e.target.value)} />
          </label>
          {roles.map((row, i) => (
            <div key={row.role} className="acc-role-edit">
              <strong>
                {row.role} — {ROLE_NAME[row.role]}
              </strong>
              <label className="guide-field">
                Highly recommended
                <input
                  value={row.primary}
                  onChange={(e) => {
                    const next = roles.map((r, j) =>
                      j === i ? { ...r, primary: e.target.value } : r,
                    );
                    setRoles(next);
                  }}
                />
              </label>
              <label className="guide-field">
                Other recommended
                <input
                  value={row.secondary}
                  onChange={(e) => {
                    const next = roles.map((r, j) =>
                      j === i ? { ...r, secondary: e.target.value } : r,
                    );
                    setRoles(next);
                  }}
                />
              </label>
            </div>
          ))}
          <p className="guide-actions">
            <button
              type="button"
              onClick={() => void persist({ title, blurb, roles })}
            >
              Save category
            </button>
            <button type="button" onClick={() => void addRow()}>
              Add accessory row
            </button>
            {status ? <span className="editor-status"> {status}</span> : null}
          </p>
        </div>
      ) : null}

      <h3>Recommended stats by role</h3>
      <div className="table-wrap">
        <table className="wikitable">
          <thead>
            <tr>
              <th>Role</th>
              <th>Highly recommended</th>
              <th>Other recommended</th>
            </tr>
          </thead>
          <tbody>
            {(toolsOpen ? roles : category.roles).map((row) => (
              <tr key={row.role}>
                <td>
                  <Link href="/roles">
                    <strong>{row.role}</strong> — {ROLE_NAME[row.role]}
                  </Link>
                </td>
                <td>{row.primary}</td>
                <td>{row.secondary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>Recommended {category.title.toLowerCase()}</h3>
      {recs.length === 0 ? (
        <p>No recommended pieces listed yet.</p>
      ) : (
        <ItemTable
          items={recs}
          slot={category.slug}
          editing={editing}
          draftId={draft?.id ?? null}
          draft={draft}
          setDraft={setDraft}
          onIcon={saveTicket}
          onRemove={removeItem}
          onSaveDraft={() => void saveDraft()}
        />
      )}

      {others.length ? (
        <>
          <h3>Starter / low-max {category.title.toLowerCase()}</h3>
          <p>
            These exist, but the max numbers are too low for endgame. Keep them
            only until a recommended piece drops.
          </p>
          <ItemTable
            items={others}
            slot={category.slug}
            editing={editing}
            draftId={draft?.id ?? null}
            draft={draft}
            setDraft={setDraft}
            onIcon={saveTicket}
            onRemove={removeItem}
            onSaveDraft={() => void saveDraft()}
          />
        </>
      ) : null}
    </div>
  );
}

function ItemTable({
  items,
  slot,
  editing,
  draftId,
  draft,
  setDraft,
  onIcon,
  onRemove,
  onSaveDraft,
}: {
  items: AccessoryItem[];
  slot: string;
  editing: boolean;
  draftId: string | null;
  draft: AccessoryItem | null;
  setDraft: (item: AccessoryItem | null) => void;
  onIcon: (item: AccessoryItem, url: string) => void;
  onRemove: (item: AccessoryItem) => void;
  onSaveDraft: () => void;
}) {
  return (
    <div className="table-wrap">
      <table className="wikitable acc-table">
        <thead>
          <tr>
            <th>Icon</th>
            <th>Name</th>
            <th>Options</th>
            <th>Number Change</th>
            <th>How to obtain</th>
            {editing ? <th /> : null}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const row = draft && draft.id === item.id ? draft : item;
            const isOpen = draftId === item.id;
            return (
              <tr key={item.id}>
                <td>
                  <TicketChip
                    src={row.icon}
                    label={row.name}
                    uploadName={`acc-${slot}-${item.id}`}
                    uploadable={editing}
                    emptyLabel={row.name.slice(0, 2) || "·"}
                    onUploaded={(url) => onIcon(item, url)}
                  />
                </td>
                <td>
                  {isOpen ? (
                    <>
                      <input
                        value={row.name}
                        onChange={(e) => setDraft({ ...row, name: e.target.value })}
                      />
                      <label className="guide-hint" style={{ display: "block", marginTop: "0.35rem" }}>
                        <input
                          type="checkbox"
                          checked={row.recommended}
                          onChange={(e) =>
                            setDraft({ ...row, recommended: e.target.checked })
                          }
                        />{" "}
                        Recommended
                      </label>
                    </>
                  ) : (
                    <strong>{row.name}</strong>
                  )}
                </td>
                <td>
                  {isOpen ? (
                    <input
                      value={row.options}
                      onChange={(e) => setDraft({ ...row, options: e.target.value })}
                    />
                  ) : (
                    row.options
                  )}
                </td>
                <td>
                  {isOpen ? (
                    <select
                      value={row.numberChange}
                      onChange={(e) =>
                        setDraft({
                          ...row,
                          numberChange: e.target.value as AccessoryItem["numberChange"],
                        })
                      }
                    >
                      <option value="need">Yes</option>
                      <option value="max">No (already max)</option>
                      <option value="na">—</option>
                    </select>
                  ) : (
                    numberLabel(row.numberChange)
                  )}
                </td>
                <td>
                  {isOpen ? (
                    <input
                      value={row.obtain}
                      onChange={(e) => setDraft({ ...row, obtain: e.target.value })}
                    />
                  ) : (
                    row.obtain
                  )}
                </td>
                {editing ? (
                  <td>
                    <div className="acc-row-tools">
                      <BoxTools
                        onEdit={() => setDraft(isOpen ? null : { ...item })}
                        onRemove={() => onRemove(item)}
                        editing={isOpen}
                      />
                      {isOpen ? (
                        <button type="button" className="newBar-edit" onClick={onSaveDraft}>
                          Save row
                        </button>
                      ) : null}
                    </div>
                  </td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
