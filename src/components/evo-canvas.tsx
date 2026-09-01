"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as PE,
} from "react";
import type { EvoEdge, EvoNode, EvoTree } from "@/lib/digimon-types";
import {
  EVO_COL,
  EVO_ROW,
  boardSize,
  edgePath,
  normalizeTree,
} from "@/lib/evo-layout";
import { EvoIcon } from "@/components/evo-board";
import { iconFor } from "@/lib/wiki-lore";

type Mode = "move" | "arrow";

export function EvoCanvas({
  tree,
  current,
  names,
  icons,
  onChange,
  onSelectName,
}: {
  tree: EvoTree;
  current: string;
  names: string[];
  icons?: Record<string, string>;
  onChange: (tree: EvoTree) => void;
  onSelectName?: (name: string) => void;
}) {
  const layout = useMemo(() => normalizeTree(tree), [tree]);
  const [mode, setMode] = useState<Mode>("move");
  const [selected, setSelected] = useState<string | null>(null);
  const [fromId, setFromId] = useState<string | null>(null);
  const [edgeId, setEdgeId] = useState<string | null>(null);
  const drag = useRef<{
    id: string;
    ox: number;
    oy: number;
    sx: number;
    sy: number;
  } | null>(null);
  const plane = useRef<HTMLDivElement>(null);

  const byId = useMemo(
    () => Object.fromEntries(layout.nodes.map((n) => [n.id, n])),
    [layout.nodes],
  );
  const { width, height } = boardSize(layout.nodes);

  function commit(nodes: EvoNode[], edges: EvoEdge[]) {
    onChange({ nodes, edges });
  }

  function onChipPointerDown(e: PE<HTMLDivElement>, node: EvoNode) {
    if (mode === "arrow") {
      e.preventDefault();
      if (!fromId) {
        setFromId(node.id);
        setSelected(node.id);
        return;
      }
      if (fromId !== node.id) {
        const exists = layout.edges.some(
          (ed) => ed.from === fromId && ed.to === node.id,
        );
        if (!exists) {
          commit(layout.nodes, [...layout.edges, { from: fromId, to: node.id }]);
        }
      }
      setFromId(null);
      return;
    }
    e.preventDefault();
    setSelected(node.id);
    setEdgeId(null);
    onSelectName?.(node.name);
    const rect = plane.current?.getBoundingClientRect();
    drag.current = {
      id: node.id,
      ox: e.clientX,
      oy: e.clientY,
      sx: node.x,
      sy: node.y,
    };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  }

  function onChipPointerMove(e: PE<HTMLDivElement>) {
    const d = drag.current;
    if (!d || mode !== "move") return;
    const dx = Math.round((e.clientX - d.ox) / EVO_COL);
    const dy = Math.round((e.clientY - d.oy) / EVO_ROW);
    const x = Math.max(0, d.sx + dx);
    const y = Math.max(0, d.sy + dy);
    commit(
      layout.nodes.map((n) => (n.id === d.id ? { ...n, x, y } : n)),
      layout.edges,
    );
  }

  function onChipPointerUp() {
    drag.current = null;
  }

  function addChip() {
    const used = new Set(layout.nodes.map((n) => `${n.x},${n.y}`));
    let x = 0;
    let y = 0;
    while (used.has(`${x},${y}`)) {
      x += 1;
      if (x > 8) {
        x = 0;
        y += 1;
      }
    }
    const id = `n${Date.now()}`;
    commit(
      [...layout.nodes, { id, name: "", x, y }],
      layout.edges,
    );
    setSelected(id);
  }

  function removeSelected() {
    if (edgeId) {
      const [from, to] = edgeId.split(">");
      commit(
        layout.nodes,
        layout.edges.filter((e) => !(e.from === from && e.to === to)),
      );
      setEdgeId(null);
      return;
    }
    if (!selected) return;
    commit(
      layout.nodes.filter((n) => n.id !== selected),
      layout.edges.filter((e) => e.from !== selected && e.to !== selected),
    );
    setSelected(null);
  }

  function rename(id: string, name: string) {
    commit(
      layout.nodes.map((n) => (n.id === id ? { ...n, name } : n)),
      layout.edges,
    );
    onSelectName?.(name);
  }

  const selectedNode = layout.nodes.find((n) => n.id === selected);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Delete" || e.key === "Backspace") {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
        removeSelected();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, edgeId, layout.edges, layout.nodes]);

  return (
    <div className="evo-editor">
      <div className="evo-toolbar">
        <button
          type="button"
          className={mode === "move" ? "is-on" : undefined}
          onClick={() => {
            setMode("move");
            setFromId(null);
          }}
        >
          Drag chips
        </button>
        <button
          type="button"
          className={mode === "arrow" ? "is-on" : undefined}
          onClick={() => setMode("arrow")}
        >
          Draw arrow
        </button>
        <button type="button" onClick={addChip}>
          Add chip
        </button>
        <button type="button" onClick={removeSelected} disabled={!selected && !edgeId}>
          Delete selected
        </button>
        {mode === "arrow" ? (
          <span className="section-lead">
            {fromId
              ? "Click the Digimon the arrow should point to."
              : "Click a start chip, then the target."}
          </span>
        ) : (
          <span className="section-lead">
            Drag to place. Click an arrow to select it.
          </span>
        )}
      </div>

      <div
        ref={plane}
        className="evo-board evo-board-edit"
        style={{
          ["--evo-chip" as string]: "88px",
          ["--evo-col" as string]: `${EVO_COL}px`,
          ["--evo-icon" as string]: "52px",
          ["--evo-row" as string]: `${EVO_ROW}px`,
        }}
      >
        <div className="evo-plane" style={{ width: width + EVO_COL, height: height + EVO_ROW }}>
          <svg
            className="evo-wires evo-wires-edit"
            width={width + EVO_COL}
            height={height + EVO_ROW}
            aria-hidden
          >
            <defs>
              <marker
                id="evo-head-edit"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
              >
                <path d="M 0 0 L 8 4 L 0 8 z" fill="#b7c9e0" />
              </marker>
            </defs>
            {layout.edges.map((e) => {
              const from = byId[e.from];
              const to = byId[e.to];
              if (!from || !to) return null;
              const key = `${e.from}>${e.to}`;
              const on = edgeId === key;
              return (
                <g key={key}>
                  <path
                    d={edgePath(from, to)}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="14"
                    className="evo-hit"
                    onClick={() => {
                      setEdgeId(key);
                      setSelected(null);
                    }}
                  />
                  <path
                    d={edgePath(from, to)}
                    fill="none"
                    stroke={on ? "#ff5a4a" : "#b7c9e0"}
                    strokeWidth={on ? 2.2 : 1.25}
                    markerEnd="url(#evo-head-edit)"
                  />
                </g>
              );
            })}
          </svg>
          {layout.nodes.map((node) => (
            <div
              key={node.id}
              className={
                "evo-abs evo-abs-edit" +
                (selected === node.id ? " is-selected" : "") +
                (fromId === node.id ? " is-from" : "")
              }
              style={{ left: node.x * EVO_COL, top: node.y * EVO_ROW }}
              onPointerDown={(e) => onChipPointerDown(e, node)}
              onPointerMove={onChipPointerMove}
              onPointerUp={onChipPointerUp}
            >
              <EvoIcon
                name={node.name || "?"}
                current={current}
                src={icons?.[node.name] || iconFor(node.name)}
              />
            </div>
          ))}
        </div>
      </div>

      {selectedNode ? (
        <p className="editor-branch">
          Chip name{" "}
          <input
            list="dmi-names"
            value={selectedNode.name}
            onChange={(e) => rename(selectedNode.id, e.target.value)}
          />
        </p>
      ) : null}
      <datalist id="dmi-names">
        {names.map((n) => (
          <option key={n} value={n} />
        ))}
      </datalist>
    </div>
  );
}
