"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { RankCode } from "@/lib/ranks";
import type { RoleCode } from "@/lib/digimon-types";
import { useAdmin } from "@/hooks/use-admin";
import { useEditorMode } from "@/components/editor-mode";
import { useRankIcons } from "@/components/rank-icons";

export function RankBadge({
  rank,
  href,
  src,
}: {
  rank: RankCode;
  href?: string;
  src?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { admin } = useAdmin();
  const { editing } = useEditorMode();
  const { icons, setRankIcon } = useRankIcons();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const picture = src || icons[rank];
  const onIndex = pathname === "/admin" || pathname.startsWith("/admin/");
  const uploadable = admin && (editing || onIndex);

  async function upload(file: File) {
    setBusy(true);
    const body = new FormData();
    body.set("file", file);
    body.set("name", rank);
    body.set("kind", "rank");
    const res = await fetch("/api/icons", {
      method: "POST",
      credentials: "include",
      body,
    });
    const data = (await res.json()) as { url?: string; error?: string };
    setBusy(false);
    if (!res.ok || !data.url) return;
    setRankIcon(rank, data.url);
    router.refresh();
  }

  const inner = (
    <span
      className={
        uploadable
          ? busy
            ? "rank-badge-wrap is-edit is-busy"
            : "rank-badge-wrap is-edit"
          : "rank-badge-wrap"
      }
      title={uploadable ? `Change Rank ${rank} icon (all ${rank} badges)` : `Rank ${rank}`}
    >
      {picture ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="rank-badge-face" src={picture} alt="" />
      ) : (
        <span className={`rank-badge rank-${rank.replace("+", "p")}`}>{rank}</span>
      )}
    </span>
  );

  if (uploadable) {
    return (
      <span className="rank-upload">
        <button
          type="button"
          className="rank-upload-hit"
          aria-label={`Upload Rank ${rank} icon`}
          onClick={() => inputRef.current?.click()}
        >
          {inner}
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

  if (href) {
    return (
      <Link href={href} className="rank-link">
        {inner}
      </Link>
    );
  }
  return inner;
}

export function RoleBadge({ role }: { role: RoleCode }) {
  const names: Record<RoleCode, string> = {
    AA: "Auto Attacker",
    TA: "Tank",
    SK: "Skill Attacker",
    SUP: "Support",
  };
  return (
    <Link href="/roles" className={`role-badge role-${role}`}>
      {role} — {names[role]}
    </Link>
  );
}
