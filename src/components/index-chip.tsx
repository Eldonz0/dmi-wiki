"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export function IndexChip({
  name,
  src,
  uploadable,
  onUploaded,
}: {
  name: string;
  src?: string;
  uploadable?: boolean;
  onUploaded?: (name: string, url: string) => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function upload(file: File) {
    setBusy(true);
    const body = new FormData();
    body.set("file", file);
    body.set("name", name);
    body.set("kind", "chip");
    const res = await fetch("/api/icons", {
      method: "POST",
      credentials: "include",
      body,
    });
    const data = (await res.json()) as { url?: string; error?: string };
    setBusy(false);
    if (!res.ok || !data.url) return;
    onUploaded?.(name, data.url);
    router.refresh();
  }

  const face = src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" width={52} height={52} />
  ) : (
    <span className="evo-fallback">{name.slice(0, 2)}</span>
  );

  if (!uploadable) {
    return (
      <span className="index-chip evo-icon" title={name}>
        {face}
      </span>
    );
  }

  return (
    <span className="index-chip-wrap">
      <button
        type="button"
        className={busy ? "index-chip evo-icon is-busy" : "index-chip evo-icon is-edit"}
        title={`Upload chip for ${name} (all evolution lines)`}
        aria-label={`Upload icon for ${name}`}
        onClick={() => inputRef.current?.click()}
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
