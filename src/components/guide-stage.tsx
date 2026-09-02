"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import type { GuidePin } from "@/lib/guide-types";

export function GuideStage({
  height,
  pins,
  selectedId,
  onSelect,
  onMove,
  onResize,
  editable,
}: {
  height: number;
  pins: GuidePin[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  onMove?: (id: string, x: number, y: number) => void;
  onResize?: (id: string, w: number, h: number) => void;
  editable?: boolean;
}) {
  function clamp(n: number, min: number, max: number) {
    return Math.min(max, Math.max(min, n));
  }

  function pointerPct(
    el: HTMLElement,
    e: ReactPointerEvent,
  ): { x: number; y: number } {
    const box = el.getBoundingClientRect();
    return {
      x: ((e.clientX - box.left) / box.width) * 100,
      y: ((e.clientY - box.top) / box.height) * 100,
    };
  }

  return (
    <div
      className="guide-stage"
      style={{ height }}
      onPointerDown={() => onSelect?.("")}
    >
      {pins.map((pin) => (
        <div
          key={pin.id}
          className={
            editable && selectedId === pin.id
              ? "guide-pin is-on"
              : "guide-pin"
          }
          style={{
            left: `${pin.x}%`,
            top: `${pin.y}%`,
            width: `${pin.w}%`,
            height: `${pin.h}%`,
          }}
          onPointerDown={(e) => {
            if (!editable) return;
            e.stopPropagation();
            onSelect?.(pin.id);
            const stage = (e.currentTarget.parentElement as HTMLElement) ?? null;
            if (!stage || !onMove) return;
            const movePin = onMove;
            const start = pointerPct(stage, e);
            const ox = start.x - pin.x;
            const oy = start.y - pin.y;
            const target = e.currentTarget;
            target.setPointerCapture(e.pointerId);
            function move(ev: PointerEvent) {
              const box = stage.getBoundingClientRect();
              const x = ((ev.clientX - box.left) / box.width) * 100 - ox;
              const y = ((ev.clientY - box.top) / box.height) * 100 - oy;
              movePin(pin.id, clamp(x, 0, 100 - pin.w), clamp(y, 0, 100 - pin.h));
            }
            function up() {
              target.releasePointerCapture(e.pointerId);
              window.removeEventListener("pointermove", move);
              window.removeEventListener("pointerup", up);
            }
            window.addEventListener("pointermove", move);
            window.addEventListener("pointerup", up);
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pin.src} alt="" draggable={false} />
          {editable && selectedId === pin.id ? (
            <button
              type="button"
              className="guide-resize"
              aria-label="Resize picture"
              onPointerDown={(e) => {
                e.stopPropagation();
                const stage = e.currentTarget.closest(
                  ".guide-stage",
                ) as HTMLElement | null;
                if (!stage || !onResize) return;
                const resizePin = onResize;
                const board = stage;
                const handle = e.currentTarget;
                handle.setPointerCapture(e.pointerId);
                function move(ev: PointerEvent) {
                  const box = board.getBoundingClientRect();
                  const w = clamp(
                    ((ev.clientX - box.left) / box.width) * 100 - pin.x,
                    8,
                    100 - pin.x,
                  );
                  const h = clamp(
                    ((ev.clientY - box.top) / box.height) * 100 - pin.y,
                    8,
                    100 - pin.y,
                  );
                  resizePin(pin.id, w, h);
                }
                function up() {
                  handle.releasePointerCapture(e.pointerId);
                  window.removeEventListener("pointermove", move);
                  window.removeEventListener("pointerup", up);
                }
                window.addEventListener("pointermove", move);
                window.addEventListener("pointerup", up);
              }}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
