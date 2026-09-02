"use client";

export function BoxTools({
  onEdit,
  onDuplicate,
  onUp,
  onDown,
  onRemove,
  editing,
}: {
  onEdit?: () => void;
  onDuplicate?: () => void;
  onUp?: () => void;
  onDown?: () => void;
  onRemove?: () => void;
  editing?: boolean;
}) {
  return (
    <div className="box-tools">
      {onEdit ? (
        <button type="button" onClick={onEdit}>
          {editing ? "Close" : "Edit"}
        </button>
      ) : null}
      {onDuplicate ? (
        <button type="button" onClick={onDuplicate}>
          Duplicate
        </button>
      ) : null}
      {onUp ? (
        <button type="button" onClick={onUp}>
          Up
        </button>
      ) : null}
      {onDown ? (
        <button type="button" onClick={onDown}>
          Down
        </button>
      ) : null}
      {onRemove ? (
        <button type="button" className="is-warn" onClick={onRemove}>
          Remove
        </button>
      ) : null}
    </div>
  );
}
