"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RANKS } from "@/lib/ranks";
import { useEditorMode } from "@/components/editor-mode";

const ROLES = ["SK", "AA", "TA", "SUP"] as const;

export function AddDigimonButton() {
  const { editing } = useEditorMode();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [rank, setRank] = useState("N");
  const [role, setRole] = useState<(typeof ROLES)[number]>("SK");
  const [hp, setHp] = useState("0");
  const [at, setAt] = useState("0");
  const [de, setDe] = useState("0");
  const [as, setAs] = useState("1000");
  const [status, setStatus] = useState("");

  if (!editing) return null;

  async function create() {
    setStatus("Saving…");
    const res = await fetch("/api/catalog", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        create: {
          name,
          rank,
          role,
          hp: Number(hp) || 0,
          at: Number(at) || 0,
          de: Number(de) || 0,
          as: Number(as) || 0,
        },
      }),
    });
    const data = (await res.json()) as { form?: { slug: string }; error?: string };
    if (!res.ok || !data.form) {
      setStatus(data.error || "Could not add Digimon.");
      return;
    }
    setStatus("Added.");
    setOpen(false);
    setName("");
    router.push(`/digimon/${data.form.slug}`);
    router.refresh();
  }

  return (
    <div className="add-digimon">
      <button type="button" className="mw-signin" onClick={() => setOpen((v) => !v)}>
        {open ? "Close" : "Add Digimon"}
      </button>
      {open ? (
        <div className="add-digimon-form">
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Rank
            <select value={rank} onChange={(e) => setRank(e.target.value)}>
              {RANKS.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </label>
          <label>
            Role
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as (typeof ROLES)[number])}
            >
              {ROLES.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </label>
          <label>
            HP
            <input value={hp} onChange={(e) => setHp(e.target.value)} />
          </label>
          <label>
            AT
            <input value={at} onChange={(e) => setAt(e.target.value)} />
          </label>
          <label>
            DE
            <input value={de} onChange={(e) => setDe(e.target.value)} />
          </label>
          <label>
            AS
            <input value={as} onChange={(e) => setAs(e.target.value)} />
          </label>
          <p>
            <button type="button" className="mw-signin" onClick={() => void create()}>
              Save new Digimon
            </button>
            {status ? <span className="editor-status"> {status}</span> : null}
          </p>
        </div>
      ) : null}
    </div>
  );
}
