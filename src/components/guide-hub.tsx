"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { GuideHubArt, GuidePin, GuidePost } from "@/lib/guide-types";
import { useEditorMode } from "@/components/editor-mode";
import { BoxTools } from "@/components/box-tools";
import { GuideStage } from "@/components/guide-stage";

export function GuideHub({
  posts,
  hub,
}: {
  posts: GuidePost[];
  hub: GuideHubArt;
}) {
  const { editing } = useEditorMode();
  const router = useRouter();
  const [rows, setRows] = useState(posts);
  const [openId, setOpenId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [status, setStatus] = useState("");
  const [pins, setPins] = useState<GuidePin[]>(hub.pins);
  const [selected, setSelected] = useState<string | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setRows(posts);
  }, [posts]);

  useEffect(() => {
    setPins(hub.pins);
  }, [hub]);

  useEffect(() => {
    if (!editing) {
      setOpenId(null);
      setSelected(null);
    }
  }, [editing]);

  function persistHub(nextPins: GuidePin[]) {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      void fetch("/api/guides", {
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

  async function persistOrder(next: GuidePost[]) {
    setRows(next);
    setStatus("Saving…");
    const res = await fetch("/api/guides", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: next.map((p) => p.slug) }),
    });
    if (!res.ok) {
      setStatus("Save failed.");
      return;
    }
    setStatus("Saved.");
    router.refresh();
  }

  function move(slug: string, dir: -1 | 1) {
    const i = rows.findIndex((p) => p.slug === slug);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[i], next[j]] = [next[j], next[i]];
    void persistOrder(next);
  }

  async function addPoint() {
    setStatus("Adding…");
    const res = await fetch("/api/guides", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "New guide",
        body: "Write this landing page. Add NOTE: lines, pictures, and tables.",
      }),
    });
    const data = (await res.json()) as { post?: GuidePost; error?: string };
    if (!res.ok || !data.post) {
      setStatus(data.error || "Could not add a point.");
      return;
    }
    router.push(`/guide/${data.post.slug}`);
    router.refresh();
  }

  async function saveTitle(post: GuidePost) {
    setStatus("Saving…");
    const res = await fetch(`/api/guides/${post.slug}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: draftTitle || post.title }),
    });
    if (!res.ok) {
      setStatus("Save failed.");
      return;
    }
    setOpenId(null);
    setStatus("Saved.");
    router.refresh();
  }

  async function duplicate(post: GuidePost) {
    const res = await fetch("/api/guides", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: `${post.title} (copy)`,
        body: post.body,
      }),
    });
    if (!res.ok) {
      setStatus("Could not duplicate.");
      return;
    }
    router.refresh();
  }

  async function remove(post: GuidePost) {
    if (!confirm(`Remove “${post.title}” from Guide?`)) return;
    const res = await fetch(`/api/guides/${post.slug}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      setStatus("Could not remove.");
      return;
    }
    router.refresh();
  }

  async function addBanner(file: File) {
    setStatus("Uploading…");
    const form = new FormData();
    form.set("file", file);
    form.set("kind", "post");
    form.set("name", "guide-hub");
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
    const pin: GuidePin = {
      id: `h${Date.now().toString(36)}`,
      src: data.url,
      x: 8 + (pins.length % 3) * 6,
      y: 8 + (pins.length % 2) * 8,
      w: 84,
      h: 36,
    };
    const next = [...pins, pin];
    setPins(next);
    setSelected(pin.id);
    persistHub(next);
    setStatus("Drag the banner where you want it. Corner to resize.");
  }

  function patchPin(id: string, patch: Partial<GuidePin>) {
    setPins((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, ...patch } : p));
      persistHub(next);
      return next;
    });
  }

  return (
    <article className="mw-article">
      <div className="mw-pre-title">From DMI Wiki · Guide</div>
      <h1 className="mw-firstHeading">Guide</h1>
      <p>
        Pick a point. Each one opens its own landing page — quests, items, and
        farms with notes, tables, and pictures.
      </p>
      {editing ? (
        <div className="add-box-bar">
          <span>Add a point</span>
          <button type="button" onClick={() => void addPoint()}>
            New guide landing page
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
        {rows.length === 0 ? (
          <p>No guide points yet.</p>
        ) : (
          <ul className="guide-points">
            {rows.map((post) => (
              <li key={post.id}>
                {editing ? (
                  <div
                    className={
                      openId === post.id ? "box-wrap is-open" : "box-wrap"
                    }
                  >
                    <BoxTools
                      onEdit={() => {
                        setOpenId((id) => (id === post.id ? null : post.id));
                        setDraftTitle(post.title);
                      }}
                      onDuplicate={() => void duplicate(post)}
                      onUp={() => move(post.slug, -1)}
                      onDown={() => move(post.slug, 1)}
                      onRemove={() => void remove(post)}
                      editing={openId === post.id}
                    />
                    <Link href={`/guide/${post.slug}`}>{post.title}</Link>
                    {openId === post.id ? (
                      <div className="box-panel">
                        <label className="guide-field">
                          Point title (the link visitors click)
                          <input
                            value={draftTitle}
                            onChange={(e) => setDraftTitle(e.target.value)}
                          />
                        </label>
                        <button
                          type="button"
                          className="newBar-edit"
                          onClick={() => void saveTitle(post)}
                        >
                          Save title
                        </button>{" "}
                        <Link href={`/guide/${post.slug}`}>
                          Open landing page
                        </Link>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <Link href={`/guide/${post.slug}`}>{post.title}</Link>
                )}
              </li>
            ))}
          </ul>
        )}

        {editing || pins.length ? (
          <div className="guide-hub-art">
            <GuideStage
              height={hub.stageHeight}
              pins={pins}
              selectedId={selected}
              editable={editing}
              onSelect={(id) => setSelected(id || null)}
              onMove={(id, x, y) => patchPin(id, { x, y })}
              onResize={(id, w, h) => patchPin(id, { w, h })}
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}
