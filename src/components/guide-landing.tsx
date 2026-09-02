"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { GuidePost } from "@/lib/guide-types";
import { GuideBody } from "@/components/wiki-text";
import { useEditorMode } from "@/components/editor-mode";
import { BoxTools } from "@/components/box-tools";

export function GuideLanding({ post }: { post: GuidePost }) {
  const { editing } = useEditorMode();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setTitle(post.title);
    setBody(post.body);
  }, [post]);

  useEffect(() => {
    if (!editing) setOpen(false);
  }, [editing]);

  async function save() {
    setStatus("Saving…");
    const res = await fetch(`/api/guides/${post.slug}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });
    if (!res.ok) {
      setStatus("Save failed.");
      return;
    }
    setStatus("Saved.");
    router.refresh();
  }

  async function addPicture(file: File) {
    setStatus("Uploading…");
    const form = new FormData();
    form.set("file", file);
    form.set("kind", "post");
    form.set("name", post.slug);
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
        <Link href="/guide">Guide</Link>
        {" · landing page"}
      </div>
      {editing ? (
        <div className={open ? "box-wrap is-open" : "box-wrap"}>
          <BoxTools
            onEdit={() => setOpen((v) => !v)}
            editing={open}
          />
          <p className="guide-hint" style={{ margin: 0 }}>
            Public page stays below. Edit to change text, notes, tables, and pictures.
          </p>
        </div>
      ) : null}
      <h1 className="mw-firstHeading">{open ? title : post.title}</h1>
      {open ? (
        <div className="box-panel">
          <label className="guide-field">
            Title
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label className="guide-field">
            Landing page
            <textarea
              rows={16}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
          <p className="guide-hint">
            Start a line with <code>NOTE:</code> for a red callout. Use{" "}
            <code>## Heading</code>, <code>- lists</code>,{" "}
            <code>| tables |</code>, <code>**bold**</code>, and{" "}
            <code>[links](/digimon)</code>.
          </p>
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
      <GuideBody text={open ? body : post.body} />
      {post.pins.map((pin) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={pin.id} className="guide-pic" src={pin.src} alt="" />
      ))}
    </article>
  );
}
