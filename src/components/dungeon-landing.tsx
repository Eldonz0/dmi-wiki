"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { DungeonEntry } from "@/lib/dungeon-types";
import { GuideBody } from "@/components/wiki-text";
import { useEditorMode } from "@/components/editor-mode";
import { BoxTools } from "@/components/box-tools";
import { TicketChip } from "@/components/ticket-chip";

export function DungeonLanding({ entry }: { entry: DungeonEntry }) {
  const { editing } = useEditorMode();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(entry.title);
  const [ticketName, setTicketName] = useState(entry.ticketName);
  const [body, setBody] = useState(entry.body);
  const [ticketIcon, setTicketIcon] = useState(entry.ticketIcon);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setTitle(entry.title);
    setTicketName(entry.ticketName);
    setBody(entry.body);
    setTicketIcon(entry.ticketIcon);
  }, [entry]);

  useEffect(() => {
    if (!editing) setOpen(false);
  }, [editing]);

  async function save() {
    setStatus("Saving…");
    const res = await fetch(`/api/dungeons/${entry.slug}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, ticketName, ticketIcon }),
    });
    setStatus(res.ok ? "Saved." : "Save failed.");
    if (res.ok) router.refresh();
  }

  async function addPicture(file: File) {
    const form = new FormData();
    form.set("file", file);
    form.set("kind", "post");
    form.set("name", entry.slug);
    const res = await fetch("/api/icons", {
      method: "POST",
      credentials: "include",
      body: form,
    });
    const data = (await res.json()) as { url?: string; error?: string };
    if (!res.ok || !data.url) {
      setStatus(data.error || "Upload failed.");
      return;
    }
    setBody((prev) => `${prev.trim()}\n\n![${file.name}](${data.url})\n`);
    setStatus("Picture added. Save the page.");
  }

  return (
    <article className="mw-article">
      <div className="mw-pre-title">
        <Link href="/dungeons">Dungeons</Link>
        {" · instance"}
      </div>
      {editing ? (
        <div className={open ? "box-wrap is-open" : "box-wrap"}>
          <BoxTools onEdit={() => setOpen((v) => !v)} editing={open} />
          <p className="guide-hint" style={{ margin: 0 }}>
            Public page stays below. Click the ticket chip to change its icon.
          </p>
        </div>
      ) : null}
      <h1 className="mw-firstHeading">{open ? title : entry.title}</h1>
      <p className="dungeon-need">
        <TicketChip
          src={ticketIcon}
          label={ticketName}
          uploadName={`ticket-${entry.slug}`}
          uploadable={editing}
          onUploaded={(url) => {
            setTicketIcon(url);
            void fetch(`/api/dungeons/${entry.slug}`, {
              method: "PUT",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ticketIcon: url }),
            }).then(() => router.refresh());
          }}
        />
        <span>
          Requires 1x <strong>{open ? ticketName : entry.ticketName}</strong> to
          enter.
        </span>
      </p>
      {open ? (
        <div className="box-panel">
          <label className="guide-field">
            Title
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label className="guide-field">
            Entry ticket name
            <input
              value={ticketName}
              onChange={(e) => setTicketName(e.target.value)}
            />
          </label>
          <label className="guide-field">
            Landing page
            <textarea
              rows={14}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
          <label className="guide-file">
            Add picture
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void addPicture(file);
                e.target.value = "";
              }}
            />
          </label>
          <p className="guide-actions">
            <button type="button" onClick={() => void save()}>
              Save landing page
            </button>
            {status ? <span className="editor-status"> {status}</span> : null}
          </p>
        </div>
      ) : null}
      <GuideBody text={open ? body : entry.body} />
    </article>
  );
}
