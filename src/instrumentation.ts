export async function register() {
  if (process.env.NEXT_RUNTIME === "edge") return;
  const { hydrateLiveData } = await import("@/lib/live-store");
  await hydrateLiveData();
}
