import Link from "next/link";
import type { GuidePost } from "@/lib/guide-types";
import { GuideStage } from "@/components/guide-stage";
import { EditorOnly } from "@/components/editor-switch";

function when(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function GuideTopicList({ posts }: { posts: GuidePost[] }) {
  return (
    <article className="mw-article">
      <div className="mw-pre-title">From DMI Wiki · Board</div>
      <div className="guide-head">
        <h1 className="mw-firstHeading">Guide</h1>
        <EditorOnly>
          <Link className="guide-new" href="/guide/new">
            New topic
          </Link>
        </EditorOnly>
      </div>
      <p>
        Topics posted from the wiki. Open a thread to read the full guide.
      </p>
      {posts.length === 0 ? (
        <div className="forum-empty">
          <p>No topics yet.</p>
          <EditorOnly>
            <p>
              <Link href="/guide/new">Start the first topic</Link>
            </p>
          </EditorOnly>
        </div>
      ) : (
        <table className="forum-board">
          <thead>
            <tr>
              <th>Topic</th>
              <th>Author</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>
                  <Link href={`/guide/${post.slug}`}>{post.title}</Link>
                </td>
                <td>{post.author}</td>
                <td>{when(post.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </article>
  );
}

export function GuideThread({ post }: { post: GuidePost }) {
  return (
    <article className="mw-article">
      <div className="mw-pre-title">
        <Link href="/guide">Guide</Link>
        {" · thread"}
      </div>
      <div className="guide-head">
        <h1 className="mw-firstHeading">{post.title}</h1>
        <EditorOnly>
          <Link className="guide-new" href={`/guide/${post.slug}/edit`}>
            Edit topic
          </Link>
        </EditorOnly>
      </div>
      <section className="forum-post">
        <aside className="forum-meta">
          <strong>{post.author}</strong>
          <span>Posted {when(post.createdAt)}</span>
          {post.updatedAt !== post.createdAt ? (
            <span>Edited {when(post.updatedAt)}</span>
          ) : null}
        </aside>
        <div className="forum-body">
          {post.body.trim() ? (
            post.body.split(/\n{2,}/).map((block, i) => (
              <p key={i}>
                {block.split("\n").map((line, j) => (
                  <span key={j}>
                    {j > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </p>
            ))
          ) : (
            <p className="forum-empty-body">No text in this post.</p>
          )}
          {post.pins.length ? (
            <GuideStage height={post.stageHeight} pins={post.pins} />
          ) : null}
        </div>
      </section>
    </article>
  );
}
