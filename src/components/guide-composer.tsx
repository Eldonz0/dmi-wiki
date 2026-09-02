"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { GuidePin, GuidePost } from "@/lib/guide-types";
import { GuideStage } from "@/components/guide-stage";

function nid() {
  return `p${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function GuideComposer({ post }: { post?: GuidePost }) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [stageHeight, setStageHeight] = useState(post?.stageHeight ?? 420);
  const [pins, setPins] = useState<GuidePin[]>(post?.pins ?? []);
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  function patchPin(id: string, next: Partial<GuidePin>) {
    setPins((prev) => prev.map((p) => (p.id === id ? { ...p, ...next } : p)));
  }

  async function addFile(file: File) {
    setStatus("Uploading picture…");
    const form = new FormData();
    form.set("file", file);
    form.set("kind", "post");
    form.set("name", "post");
    const res = await fetch("/api/icons", { method: "POST", body: form });
    const data = (await res.json()) as { url?: string; error?: string };
    if (!res.ok || !data.url) {
      setStatus(data.error || "Upload failed — sign in first.");
      return;
    }
    const pin: GuidePin = {
      id: nid(),
      src: data.url,
      x: 8 + (pins.length % 4) * 6,
      y: 8 + (pins.length % 3) * 6,
      w: 28,
      h: 32,
    };
    setPins((prev) => [...prev, pin]);
    setSelected(pin.id);
    setStatus("Drag the picture where you want it. Use the corner to resize.");
  }

  async function save() {
    setStatus("Saving…");
    const payload = { title, body, stageHeight, pins };
    const res = post
      ? await fetch(`/api/guides/${post.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/guides", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
    const data = (await res.json()) as { post?: GuidePost; error?: string };
    if (!res.ok || !data.post) {
      setStatus(data.error || "Save failed.");
      return;
    }
    router.push(`/guide/${data.post.slug}`);
    router.refresh();
  }

  async function remove() {
    if (!post) return;
    if (!confirm("Delete this topic?")) return;
    const res = await fetch(`/api/guides/${post.slug}`, { method: "DELETE" });
    if (!res.ok) {
      setStatus("Could not delete.");
      return;
    }
    router.push("/guide");
    router.refresh();
  }

  return (
    <article className="mw-article">
      <div className="mw-pre-title">Guides · compose</div>
      <h1 className="mw-firstHeading">
        {post ? "Edit topic" : "New topic"}
      </h1>
      <label className="guide-field">
        Topic title
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Infinite Mountain Giga Box farm"
        />
      </label>
      <label className="guide-field">
        Post
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={8}
          placeholder="Write the guide. Pictures go on the board below — drag them into place."
        />
      </label>
      <div className="guide-toolbar">
        <label className="guide-file">
          Add picture
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void addFile(file);
              e.target.value = "";
            }}
          />
        </label>
        <label>
          Board height
          <input
            type="number"
            min={240}
            max={1600}
            value={stageHeight}
            onChange={(e) => setStageHeight(Number(e.target.value) || 420)}
          />
        </label>
        {selected ? (
          <button
            type="button"
            onClick={() => {
              setPins((prev) => prev.filter((p) => p.id !== selected));
              setSelected(null);
            }}
          >
            Remove selected picture
          </button>
        ) : null}
      </div>
      <GuideStage
        height={stageHeight}
        pins={pins}
        selectedId={selected}
        editable
        onSelect={(id) => setSelected(id || null)}
        onMove={(id, x, y) => patchPin(id, { x, y })}
        onResize={(id, w, h) => patchPin(id, { w, h })}
      />
      <p className="guide-actions">
        <button type="button" onClick={() => void save()}>
          Publish topic
        </button>
        {post ? (
          <button type="button" className="guide-danger" onClick={() => void remove()}>
            Delete
          </button>
        ) : null}
        {status ? <span className="editor-status"> {status}</span> : null}
      </p>
    </article>
  );
}
