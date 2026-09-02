"use client";

import { useRef, useState } from "react";

export function TicketChip({
  src,
  label,
  uploadName,
  uploadable,
  emptyLabel = "Tk",
  onUploaded,
}: {
  src?: string;
  label: string;
  uploadName?: string;
  uploadable?: boolean;
  emptyLabel?: string;
  onUploaded?: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function upload(file: File) {
    setBusy(true);
    const body = new FormData();
    body.set("file", file);
    body.set("kind", "post");
    body.set("name", uploadName || "ticket");
    const res = await fetch("/api/icons", {
      method: "POST",
      credentials: "include",
      body,
    });
    const data = (await res.json()) as { url?: string; error?: string };
    setBusy(false);
    if (!res.ok || !data.url) return;
    onUploaded?.(data.url);
  }

  const face = src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" width={36} height={36} />
  ) : (
    <span className="evo-fallback">{emptyLabel}</span>
  );

  if (!uploadable) {
    return (
      <span className="ticket-chip evo-icon" title={label}>
        {face}
      </span>
    );
  }

  return (
    <span className="ticket-chip-wrap">
      <button
        type="button"
        className={busy ? "ticket-chip evo-icon is-busy" : "ticket-chip evo-icon is-edit"}
        title={`Upload icon for ${label}`}
        aria-label={`Upload icon for ${label}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          inputRef.current?.click();
        }}
      >
        {face}
      </button>
      <input
        ref={inputRef}
        className="index-chip-file"
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        tabIndex={-1}
        aria-hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void upload(file);
          e.target.value = "";
        }}
      />
    </span>
  );
}
