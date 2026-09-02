import "server-only";

function repo() {
  return (process.env.GITHUB_REPO ?? "").trim();
}

function token() {
  return (process.env.GITHUB_DATA_TOKEN || process.env.GITHUB_TOKEN || "").trim();
}

function branch() {
  return (process.env.GITHUB_BRANCH || "main").trim();
}

export function githubLiveEnabled() {
  return Boolean(repo().includes("/") && token());
}

async function github(pathname: string, init?: RequestInit) {
  const [owner, name] = repo().split("/");
  return fetch(`https://api.github.com/repos/${owner}/${name}${pathname}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token()}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
}

/** Save a wiki file into GitHub so Vercel/git publishes keep editor changes. */
export async function pushLiveFile(
  relPath: string,
  content: string | Buffer,
  message: string,
) {
  if (!githubLiveEnabled()) {
    if (process.env.VERCEL) {
      throw new Error(
        "Set GITHUB_REPO and GITHUB_DATA_TOKEN on Vercel so editor saves are committed and stay live.",
      );
    }
    return;
  }
  const buf = Buffer.isBuffer(content) ? content : Buffer.from(content, "utf8");
  const encoded = relPath
    .split("/")
    .filter(Boolean)
    .map(encodeURIComponent)
    .join("/");
  const existing = await github(`/contents/${encoded}?ref=${encodeURIComponent(branch())}`);
  let sha: string | undefined;
  if (existing.ok) {
    const data = (await existing.json()) as { sha?: string; type?: string };
    if (data.type === "file" && data.sha) sha = data.sha;
  }
  const res = await github(`/contents/${encoded}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: buf.toString("base64"),
      branch: branch(),
      ...(sha ? { sha } : {}),
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub live save failed (${relPath}): ${res.status} ${text}`);
  }
}
