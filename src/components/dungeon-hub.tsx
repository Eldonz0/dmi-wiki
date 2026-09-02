"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { DungeonEntry, DungeonHubArt } from "@/lib/dungeon-types";
import type { GuidePin } from "@/lib/guide-types";
import { useEditorMode } from "@/components/editor-mode";
import { BoxTools } from "@/components/box-tools";
import { GuideStage } from "@/components/guide-stage";
import { TicketChip } from "@/components/ticket-chip";

export function DungeonHub({
  entries,
  hub,
}: {
  entries: DungeonEntry[];
  hub: DungeonHubArt;
}) {
  const { editing } = useEditorMode();
  const router = useRouter();
  const [rows, setRows] = useState(entries);
  const [openId, setOpenId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftTicket, setDraftTicket] = useState("");
  const [status, setStatus] = useState("");
  const [pins, setPins] = useState<GuidePin[]>(hub.pins);
  const [selected, setSelected] = useState<string | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setRows(entries), [entries]);
  useEffect(() => setPins(hub.pins), [hub]);
  useEffect(() => {
    if (!editing) {
      setOpenId(null);
      setSelected(null);
    }
  }, [editing]);

  function persistHub(nextPins: GuidePin[]) {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      void fetch("/api/dungeons", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hub: { stageHeight: hub.stageHeight, pins: nextPins },
        }),
      }).then((res) => {
        setStatus(res.ok ? "Banner saved." : "Could not save banner.");
      });
    }, 400);
  }

  async function persistOrder(next: DungeonEntry[]) {
    setRows(next);
    const res = await fetch("/api/dungeons", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: next.map((e) => e.slug) }),
    });
    setStatus(res.ok ? "Saved." : "Save failed.");
    if (res.ok) router.refresh();
  }

  function move(slug: string, dir: -1 | 1) {
    const i = rows.findIndex((e) => e.slug === slug);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[i], next[j]] = [next[j], next[i]];
    void persistOrder(next);
  }

  async function addDungeon() {
    const res = await fetch("/api/dungeons", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "New dungeon" }),
    });
    const data = (await res.json()) as { entry?: DungeonEntry; error?: string };
    if (!res.ok || !data.entry) {
      setStatus(data.error || "Could not add dungeon.");
      return;
    }
    router.push(`/dungeons/${data.entry.slug}`);
    router.refresh();
  }

  async function saveMeta(entry: DungeonEntry) {
    const res = await fetch(`/api/dungeons/${entry.slug}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: draftTitle || entry.title,
        ticketName: draftTicket || entry.ticketName,
      }),
    });
    setStatus(res.ok ? "Saved." : "Save failed.");
    if (res.ok) {
      setOpenId(null);
      router.refresh();
    }
  }

  async function saveTicket(entry: DungeonEntry, url: string) {
    setRows((prev) =>
      prev.map((e) => (e.slug === entry.slug ? { ...e, ticketIcon: url } : e)),
    );
    await fetch(`/api/dungeons/${entry.slug}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticketIcon: url }),
    });
    router.refresh();
  }

  async function remove(entry: DungeonEntry) {
    if (!confirm(`Remove “${entry.title}”?`)) return;
    const res = await fetch(`/api/dungeons/${entry.slug}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) router.refresh();
  }

  async function addBanner(file: File) {
    const form = new FormData();
    form.set("file", file);
    form.set("kind", "post");
    form.set("name", "dungeon-hub");
    const res = await fetch("/api/icons", {
      method: "POST",
      credentials: "include",
      body: form,
    });
    const data = (await res.json()) as { url?: string };
    if (!res.ok || !data.url) return;
    const pin: GuidePin = {
      id: `h${Date.now().toString(36)}`,
      src: data.url,
      x: 8,
      y: 8,
      w: 84,
      h: 36,
    };
    const next = [...pins, pin];
    setPins(next);
    setSelected(pin.id);
    persistHub(next);
  }

  return (
    <article className="mw-article">
      <div className="mw-pre-title">From DMI Wiki · Dungeons</div>
      <h1 className="mw-firstHeading">Dungeons</h1>
      <p>
        Instance dungeons. Each point is the map name; the chip beside it is the
        entry ticket. Open a name for the landing page (pass, bosses, farms).
      </p>
      {editing ? (
        <div className="add-box-bar">
          <span>Add a dungeon</span>
          <button type="button" onClick={() => void addDungeon()}>
            New dungeon landing page
          </button>
          <label className="guide-file">
            Add banner / picture
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void addBanner(file);
                e.target.value = "";
              }}
            />
          </label>
          {selected ? (
            <button
              type="button"
              className="is-warn"
              onClick={() => {
                const next = pins.filter((p) => p.id !== selected);
                setPins(next);
                setSelected(null);
                persistHub(next);
              }}
            >
              Remove selected banner
            </button>
          ) : null}
          {status ? <span className="editor-status">{status}</span> : null}
        </div>
      ) : null}

      <div className="guide-layout">
        <ul className="guide-points dungeon-points">
          {rows.length === 0 ? (
            <li>No instance dungeons listed yet.</li>
          ) : null}
          {rows.map((entry) => (
            <li key={entry.id}>
              <span className="dungeon-point">
                <TicketChip
                  src={entry.ticketIcon}
                  label={entry.ticketName || entry.title}
                  uploadName={`ticket-${entry.slug}`}
                  uploadable={editing}
                  onUploaded={(url) => void saveTicket(entry, url)}
                />
                {editing ? (
                  <div
                    className={
                      openId === entry.id ? "box-wrap is-open" : "box-wrap"
                    }
                  >
                    <BoxTools
                      onEdit={() => {
                        setOpenId((id) => (id === entry.id ? null : entry.id));
                        setDraftTitle(entry.title);
                        setDraftTicket(entry.ticketName);
                      }}
                      onUp={() => move(entry.slug, -1)}
                      onDown={() => move(entry.slug, 1)}
                      onRemove={() => void remove(entry)}
                      editing={openId === entry.id}
                    />
                    <Link href={`/dungeons/${entry.slug}`}>{entry.title}</Link>
                    {openId === entry.id ? (
                      <div className="box-panel">
                        <label className="guide-field">
                          Dungeon name
                          <input
                            value={draftTitle}
                            onChange={(e) => setDraftTitle(e.target.value)}
                          />
                        </label>
                        <label className="guide-field">
                          Entry ticket name
                          <input
                            value={draftTicket}
                            onChange={(e) => setDraftTicket(e.target.value)}
                          />
                        </label>
                        <button
                          type="button"
                          className="newBar-edit"
                          onClick={() => void saveMeta(entry)}
                        >
                          Save
                        </button>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <Link href={`/dungeons/${entry.slug}`}>{entry.title}</Link>
                )}
              </span>
            </li>
          ))}
        </ul>

        {editing || pins.length ? (
          <div className="guide-hub-art">
            <GuideStage
              height={hub.stageHeight}
              pins={pins}
              selectedId={selected}
              editable={editing}
              onSelect={(id) => setSelected(id || null)}
              onMove={(id, x, y) => {
                setPins((prev) => {
                  const next = prev.map((p) =>
                    p.id === id ? { ...p, x, y } : p,
                  );
                  persistHub(next);
                  return next;
                });
              }}
              onResize={(id, w, h) => {
                setPins((prev) => {
                  const next = prev.map((p) =>
                    p.id === id ? { ...p, w, h } : p,
                  );
                  persistHub(next);
                  return next;
                });
              }}
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}
