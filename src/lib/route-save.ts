import { NextResponse } from "next/server";

export function saveErrorMessage(err: unknown) {
  return err instanceof Error ? err.message : "Save failed.";
}

export async function withSave<T>(run: () => Promise<T>) {
  try {
    return await run();
  } catch (err) {
    return NextResponse.json({ error: saveErrorMessage(err) }, { status: 500 });
  }
}
