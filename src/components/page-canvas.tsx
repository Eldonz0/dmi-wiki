"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ComponentProps } from "react";
import { useRouter } from "next/navigation";
import { Infobox } from "@/components/wiki-article";
import { WikiInline, WikiText } from "@/components/wiki-text";
import { useEditorMode } from "@/components/editor-mode";
import { BoxTools } from "@/components/box-tools";
import {
  NewDigimonPack,
  type FeaturedPick,
} from "@/components/new-digimon-pack";
import {
  defaultBlocks,
  newBlockId,
  type AnnounceBlock,
  type BannerBlock,
  type FeaturedBlock,
  type LinksBlock,
  type PageBlock,
  type TextBlock,
  type WikiLandPage,
} from "@/lib/page-types";

function emptyBlock(kind: PageBlock["type"]): PageBlock {
  const id = newBlockId();
  if (kind === "featured") return { id, type: "featured", title: "New Digimon", slugs: [] };
  if (kind === "banner") return { id, type: "banner", src: "", href: "", alt: "Banner" };
  if (kind === "announce") {
    return {
      id,
      type: "announce",
      style: "orange",
      title: "Announcement",
      body: "Write the news here.",
    };
  }
  if (kind === "links") {
    return {
      id,
      type: "links",
      title: "Links",
      items: [{ label: "Digimon List", href: "/digimon", note: "" }],
    };
  }
  return { id, type: "text", title: "", body: "Write something." };
}

function cloneBlock(block: PageBlock): PageBlock {
  return { ...structuredClone(block), id: newBlockId() };
}

export function PageCanvas({
  page,
  featured = [],
}: {
  page: WikiLandPage;
  featured?: FeaturedPick[];
}) {
  const { editing } = useEditorMode();
  const router = useRouter();
  const [draft, setDraft] = useState<WikiLandPage>(() => ({
    ...page,
    blocks: defaultBlocks(page),
  }));
  const [openId, setOpenId] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setDraft({ ...page, blocks: defaultBlocks(page) });
  }, [page]);

  useEffect(() => {
    if (!editing) {
      setOpenId(null);
      setStatus("");
    }
  }, [editing]);

  const picks = useMemo(() => {
    const map = new Map(featured.map((i) => [i.slug, i]));
    return map;
  }, [featured]);

  function itemsFor(block: FeaturedBlock): FeaturedPick[] {
    const first = draft.blocks.find((b) => b.type === "featured");
    const slugs = block.slugs?.length
      ? block.slugs
      : first?.id === block.id
        ? featured.map((i) => i.slug)
        : [];
    return slugs
      .map((slug) => picks.get(slug) ?? featured.find((i) => i.slug === slug))
      .filter((d): d is FeaturedPick => Boolean(d));
  }

  async function persist(next: WikiLandPage) {
    const text = next.blocks.find((b): b is TextBlock => b.type === "text");
    const payload = { ...next, body: text?.body ?? next.body };
    setDraft(payload);
    setStatus("Saving…");
    const res = await fetch("/api/pages", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setStatus(data.error || "Save failed.");
      return false;
    }
    setStatus("Saved.");
    router.refresh();
    return true;
  }

  function patchBlocks(blocks: PageBlock[]) {
    void persist({ ...draft, blocks });
  }

  function move(id: string, dir: -1 | 1) {
    const blocks = [...draft.blocks];
    const i = blocks.findIndex((b) => b.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= blocks.length) return;
    [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
    patchBlocks(blocks);
  }

  function insert(index: number, kind: PageBlock["type"]) {
    const next = emptyBlock(kind);
    const blocks = [...draft.blocks];
    blocks.splice(index, 0, next);
    patchBlocks(blocks);
    setOpenId(next.id);
  }

  function add(kind: PageBlock["type"]) {
    insert(draft.blocks.length, kind);
  }

  return (
    <>
      <BoxShell
        editing={editing}
        open={openId === "header"}
        tools={{
          onEdit: () => setOpenId((id) => (id === "header" ? null : "header")),
        }}
      >
        <h1 className="mw-firstHeading">{draft.title}</h1>
        {draft.infoboxTitle ? (
          <Infobox
            title={draft.infoboxTitle}
            rows={draft.infobox.map((row) => ({
              label: row.label,
              value: <WikiInline text={row.value} />,
            }))}
          />
        ) : null}
        {editing && openId === "header" ? (
          <HeaderEditor
            draft={draft}
            setDraft={setDraft}
            status={status}
            onSave={() => void persist(draft)}
          />
        ) : null}
      </BoxShell>

      {editing ? <AddBoxBar label="Add box at top" onPick={(kind) => insert(0, kind)} /> : null}

      {draft.blocks.map((block, index) => (
        <div key={block.id}>
          <BoxShell
            editing={editing}
            open={openId === block.id}
            tools={{
              onEdit: () =>
                setOpenId((id) => (id === block.id ? null : block.id)),
              onDuplicate: () => {
                const copy = cloneBlock(block);
                if (copy.type === "featured") {
                  copy.slugs = itemsFor(block as FeaturedBlock).map((i) => i.slug);
                }
                const blocks = [...draft.blocks];
                blocks.splice(index + 1, 0, copy);
                patchBlocks(blocks);
                setOpenId(copy.id);
              },
              onUp: () => move(block.id, -1),
              onDown: () => move(block.id, 1),
              onRemove: () =>
                patchBlocks(draft.blocks.filter((b) => b.id !== block.id)),
              editing: openId === block.id,
            }}
          >
            <BlockView
              block={block}
              featuredItems={block.type === "featured" ? itemsFor(block) : []}
              panelOpen={editing && openId === block.id}
              onToggle={() =>
                setOpenId((id) => (id === block.id ? null : block.id))
              }
              onChange={(next) =>
                setDraft((d) => ({
                  ...d,
                  blocks: d.blocks.map((b) => (b.id === next.id ? next : b)),
                }))
              }
              onCommit={(next) => {
                const nextPage = {
                  ...draft,
                  blocks: draft.blocks.map((b) => (b.id === next.id ? next : b)),
                };
                void persist(nextPage);
              }}
              onPersistFeatured={async (count, slugs) => {
                const nextBlock: FeaturedBlock = {
                  ...(block as FeaturedBlock),
                  slugs,
                };
                const nextPage = {
                  ...draft,
                  blocks: draft.blocks.map((b) =>
                    b.id === block.id ? nextBlock : b,
                  ),
                };
                await persist(nextPage);
                const first = nextPage.blocks.find((b) => b.type === "featured");
                if (first?.id === block.id) {
                  await fetch("/api/home", {
                    method: "PUT",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ count, slugs }),
                  });
                }
              }}
            />
          </BoxShell>
          {editing ? (
            <AddBoxBar
              label="Add below"
              onPick={(kind) => insert(index + 1, kind)}
            />
          ) : null}
        </div>
      ))}
      {editing && !draft.blocks.length ? (
        <AddBoxBar label="Add box" onPick={add} />
      ) : null}
      {editing && status ? <p className="editor-status">{status}</p> : null}
    </>
  );
}

function BoxShell({
  editing,
  open,
  tools,
  children,
}: {
  editing: boolean;
  open?: boolean;
  tools: ComponentProps<typeof BoxTools>;
  children: React.ReactNode;
}) {
  if (!editing) return <>{children}</>;
  return (
    <div className={open ? "box-wrap is-open" : "box-wrap"}>
      <BoxTools {...tools} />
      {children}
    </div>
  );
}

function HeaderEditor({
  draft,
  setDraft,
  status,
  onSave,
}: {
  draft: WikiLandPage;
  setDraft: (page: WikiLandPage) => void;
  status: string;
  onSave: () => void;
}) {
  const boxText = draft.infobox
    .map((row) => `${row.label} | ${row.value}`)
    .join("\n");
  return (
    <div className="box-panel">
      <label className="guide-field">
        Title
        <input
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        />
      </label>
      <label className="guide-field">
        Infobox title (blank = hide)
        <input
          value={draft.infoboxTitle}
          onChange={(e) => setDraft({ ...draft, infoboxTitle: e.target.value })}
        />
      </label>
      <label className="guide-field">
        Infobox rows (Label | Value)
        <textarea
          rows={3}
          value={boxText}
          onChange={(e) =>
            setDraft({
              ...draft,
              infobox: e.target.value.split("\n").flatMap((line) => {
                const [label, ...rest] = line.split("|");
                if (!label?.trim()) return [];
                return [{ label: label.trim(), value: rest.join("|").trim() }];
              }),
            })
          }
        />
      </label>
      <button type="button" className="newBar-edit" onClick={onSave}>
        Save header
      </button>
      {status ? <span className="editor-status"> {status}</span> : null}
    </div>
  );
}

function BlockView({
  block,
  featuredItems,
  panelOpen,
  onToggle,
  onChange,
  onCommit,
  onPersistFeatured,
}: {
  block: PageBlock;
  featuredItems: FeaturedPick[];
  panelOpen: boolean;
  onToggle: () => void;
  onChange: (block: PageBlock) => void;
  onCommit: (block: PageBlock) => void;
  onPersistFeatured: (count: number, slugs: string[]) => Promise<void>;
}) {
  if (block.type === "featured") {
    return (
      <>
        <NewDigimonPack
          title={block.title}
          items={featuredItems}
          panelOpen={panelOpen}
          onToggle={onToggle}
          onPersist={onPersistFeatured}
          chromeEdit={false}
        />
        {panelOpen ? (
          <div className="box-panel">
            <label className="guide-field">
              Box title
              <input
                value={block.title}
                onChange={(e) => onChange({ ...block, title: e.target.value })}
              />
            </label>
            <button type="button" className="newBar-edit" onClick={() => onCommit(block)}>
              Save title
            </button>
          </div>
        ) : null}
      </>
    );
  }
  if (block.type === "banner") {
    return (
      <>
        <BannerView block={block} />
        {panelOpen ? (
          <BannerEditor block={block} onChange={onChange} onCommit={onCommit} />
        ) : null}
      </>
    );
  }
  if (block.type === "announce") {
    return (
      <>
        <aside className={`announce announce-${block.style}`}>
          <strong>{block.title}</strong>
          <p>{block.body}</p>
        </aside>
        {panelOpen ? (
          <div className="box-panel">
            <label className="guide-field">
              Style
              <select
                value={block.style}
                onChange={(e) =>
                  onChange({
                    ...block,
                    style: e.target.value as AnnounceBlock["style"],
                  })
                }
              >
                <option value="orange">Orange alert</option>
                <option value="cyan">Cyan news</option>
                <option value="violet">Violet event</option>
              </select>
            </label>
            <label className="guide-field">
              Title
              <input
                value={block.title}
                onChange={(e) => onChange({ ...block, title: e.target.value })}
              />
            </label>
            <label className="guide-field">
              Text
              <textarea
                rows={3}
                value={block.body}
                onChange={(e) => onChange({ ...block, body: e.target.value })}
              />
            </label>
            <button type="button" className="newBar-edit" onClick={() => onCommit(block)}>
              Save announcement
            </button>
          </div>
        ) : null}
      </>
    );
  }
  if (block.type === "links") {
    return (
      <>
        <section className="portal">
          <h2>{block.title}</h2>
          <div className="portal-body">
            <ul>
              {block.items.map((item, i) => (
                <li key={i}>
                  <Link href={item.href}>{item.label}</Link>
                  {item.note ? ` — ${item.note}` : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
        {panelOpen ? (
          <div className="box-panel">
            <label className="guide-field">
              Title
              <input
                value={block.title}
                onChange={(e) => onChange({ ...block, title: e.target.value })}
              />
            </label>
            <label className="guide-field">
              Links (Label | /path | note)
              <textarea
                rows={5}
                value={block.items
                  .map((i) => `${i.label} | ${i.href} | ${i.note}`)
                  .join("\n")}
                onChange={(e) =>
                  onChange({
                    ...block,
                    items: e.target.value.split("\n").flatMap((line) => {
                      const [label, href, ...rest] = line.split("|");
                      if (!label?.trim()) return [];
                      return [
                        {
                          label: label.trim(),
                          href: (href ?? "/").trim() || "/",
                          note: rest.join("|").trim(),
                        },
                      ];
                    }),
                  })
                }
              />
            </label>
            <button type="button" className="newBar-edit" onClick={() => onCommit(block)}>
              Save links
            </button>
          </div>
        ) : null}
      </>
    );
  }

  const text = block as TextBlock;
  return (
    <>
      {text.title ? <h2>{text.title}</h2> : null}
      <WikiText text={text.body} />
      {panelOpen ? (
        <div className="box-panel">
          <label className="guide-field">
            Heading (optional)
            <input
              value={text.title}
              onChange={(e) => onChange({ ...text, title: e.target.value })}
            />
          </label>
          <label className="guide-field">
            Text
            <textarea
              rows={8}
              value={text.body}
              onChange={(e) => onChange({ ...text, body: e.target.value })}
            />
          </label>
          <p className="guide-hint">
            **bold**, [links](/digimon), ## headings, - lists
          </p>
          <button type="button" className="newBar-edit" onClick={() => onCommit(text)}>
            Save text
          </button>
        </div>
      ) : null}
    </>
  );
}

function AddBoxBar({
  label,
  onPick,
}: {
  label: string;
  onPick: (kind: PageBlock["type"]) => void;
}) {
  return (
    <div className="add-box-bar">
      <span>{label}</span>
      <button type="button" onClick={() => onPick("announce")}>
        Announcement
      </button>
      <button type="button" onClick={() => onPick("banner")}>
        Banner
      </button>
      <button type="button" onClick={() => onPick("text")}>
        Text
      </button>
      <button type="button" onClick={() => onPick("featured")}>
        Digimon list
      </button>
      <button type="button" onClick={() => onPick("links")}>
        Links
      </button>
    </div>
  );
}

function BannerView({ block }: { block: BannerBlock }) {
  if (!block.src) {
    return <div className="banner-empty">Banner — upload a picture in Edit.</div>;
  }
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="page-banner" src={block.src} alt={block.alt || "Banner"} />
  );
  if (block.href) {
    return block.href.startsWith("/") ? (
      <Link href={block.href}>{img}</Link>
    ) : (
      <a href={block.href} target="_blank" rel="noreferrer">
        {img}
      </a>
    );
  }
  return img;
}

function BannerEditor({
  block,
  onChange,
  onCommit,
}: {
  block: BannerBlock;
  onChange: (block: PageBlock) => void;
  onCommit: (block: PageBlock) => void;
}) {
  const [busy, setBusy] = useState("");
  async function upload(file: File) {
    setBusy("Uploading…");
    const form = new FormData();
    form.set("file", file);
    form.set("kind", "post");
    form.set("name", "banner");
    const res = await fetch("/api/icons", { method: "POST", credentials: "include", body: form });
    const data = (await res.json()) as { url?: string; error?: string };
    if (!res.ok || !data.url) {
      setBusy(data.error || "Upload failed.");
      return;
    }
    const next = { ...block, src: data.url };
    onCommit(next);
    setBusy("Banner saved.");
  }
  return (
    <div className="box-panel">
      <label className="guide-file">
        Upload banner
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void upload(file);
            e.target.value = "";
          }}
        />
      </label>
      <label className="guide-field">
        Link (optional)
        <input
          value={block.href}
          onChange={(e) => onChange({ ...block, href: e.target.value })}
        />
      </label>
      <label className="guide-field">
        Alt text
        <input
          value={block.alt}
          onChange={(e) => onChange({ ...block, alt: e.target.value })}
        />
      </label>
      {busy ? <p className="editor-status">{busy}</p> : null}
      <p>
        <button type="button" className="newBar-edit" onClick={() => onCommit(block)}>
          Save banner
        </button>
      </p>
    </div>
  );
}
