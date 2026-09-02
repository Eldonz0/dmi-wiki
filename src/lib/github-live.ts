import "server-only";

function repo() {
  return (process.env.GITHUB_REPO ?? "")
    .trim()
    .replace(/^https?:\/\/github\.com\//i, "")
    .replace(/^git@github\.com:/i, "")
    .replace(/\.git$/i, "")
    .replace(/^\/+|\/+$/g, "");
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

function ghMessage(text: string) {
  try {
    const data = JSON.parse(text) as { message?: string };
    return data.message || text.slice(0, 400);
  } catch {
    return text.slice(0, 400);
  }
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

async function fileSha(encoded: string) {
  const existing = await github(`/contents/${encoded}?ref=${encodeURIComponent(branch())}`);
  if (!existing.ok) return undefined;
  const data = (await existing.json()) as { sha?: string; type?: string };
  if (data.type === "file" && data.sha) return data.sha;
  return undefined;
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
        "Set GITHUB_REPO=Eldonz0/dmi-wiki and GITHUB_DATA_TOKEN (a GitHub token with repo access) on Vercel, then Redeploy. The deploy key is not enough for Save.",
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

  const put = async (sha?: string) =>
    github(`/contents/${encoded}`, {
      method: "PUT",
      body: JSON.stringify({
        message,
        content: buf.toString("base64"),
        branch: branch(),
        ...(sha ? { sha } : {}),
      }),
    });

  let sha = await fileSha(encoded);
  let res = await put(sha);
  if (res.status === 409) {
    sha = await fileSha(encoded);
    res = await put(sha);
  }
  if (!res.ok) {
    const text = await res.text();
    const hint =
      res.status === 401 || res.status === 403
        ? " Create a classic token with repo scope, paste it as GITHUB_DATA_TOKEN on Vercel, Redeploy."
        : "";
    throw new Error(`GitHub could not save ${relPath} (${res.status}): ${ghMessage(text)}.${hint}`);
  }
}
