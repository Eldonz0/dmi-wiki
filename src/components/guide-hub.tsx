"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { GuidePost } from "@/lib/guide-types";
import { useEditorMode } from "@/components/editor-mode";
import { BoxTools } from "@/components/box-tools";

export function GuideHub({ posts }: { posts: GuidePost[] }) {
  const { editing } = useEditorMode();
  const router = useRouter();
  const [rows, setRows] = useState(posts);
  const [openId, setOpenId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    setRows(posts);
  }, [posts]);

  useEffect(() => {
    if (!editing) setOpenId(null);
  }, [editing]);

  const mid = Math.ceil(rows.length / 2) || 0;
  const left = rows.slice(0, mid);
  const right = rows.slice(mid);

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

  function Point({ post }: { post: GuidePost }) {
    return (
      <li>
        {editing ? (
          <div className={openId === post.id ? "box-wrap is-open" : "box-wrap"}>
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
                </button>
                {" "}
                <Link href={`/guide/${post.slug}`}>Open landing page</Link>
              </div>
            ) : null}
          </div>
        ) : (
          <Link href={`/guide/${post.slug}`}>{post.title}</Link>
        )}
      </li>
    );
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
          {status ? <span className="editor-status">{status}</span> : null}
        </div>
      ) : null}
      {rows.length === 0 ? (
        <p>No guide points yet.</p>
      ) : (
        <div className="guide-points">
          <ul>
            {left.map((post) => (
              <Point key={post.id} post={post} />
            ))}
          </ul>
          <ul>
            {right.map((post) => (
              <Point key={post.id} post={post} />
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
