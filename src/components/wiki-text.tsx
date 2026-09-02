import Link from "next/link";
import type { ReactNode } from "react";

function inline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[0].startsWith("**")) {
      parts.push(<strong key={k++}>{m[0].slice(2, -2)}</strong>);
    } else {
      const href = m[3];
      const label = m[2];
      if (href.startsWith("/")) {
        parts.push(
          <Link key={k++} href={href}>
            {label}
          </Link>,
        );
      } else {
        parts.push(
          <a key={k++} href={href} target="_blank" rel="noreferrer">
            {label}
          </a>,
        );
      }
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function WikiInline({ text }: { text: string }) {
  return <>{inline(text)}</>;
}

export function WikiText({ text }: { text: string }) {
  const blocks = text.replace(/\r\n/g, "\n").trim().split(/\n{2,}/);
  if (!blocks[0]) return null;
  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        if (lines[0].startsWith("## ")) {
          return (
            <section className="portal" key={i}>
              <h2>{lines[0].slice(3)}</h2>
              <div className="portal-body">
                {lines.slice(1).some((l) => l.startsWith("- ")) ? (
                  <ul>
                    {lines
                      .slice(1)
                      .filter((l) => l.startsWith("- "))
                      .map((l, j) => (
                        <li key={j}>{inline(l.slice(2))}</li>
                      ))}
                  </ul>
                ) : (
                  <p>{inline(lines.slice(1).join(" "))}</p>
                )}
              </div>
            </section>
          );
        }
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i}>
              {lines.map((l, j) => (
                <li key={j}>{inline(l.slice(2))}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i}>
            {lines.map((line, j) => (
              <span key={j}>
                {j > 0 ? <br /> : null}
                {inline(line)}
              </span>
            ))}
          </p>
        );
      })}
    </>
  );
}
