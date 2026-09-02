import Link from "next/link";
import type { ReactNode } from "react";

function inline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re =
    /(\*\*[^*]+\*\*|!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[0].startsWith("**")) {
      parts.push(<strong key={k++}>{m[0].slice(2, -2)}</strong>);
    } else if (m[0].startsWith("![")) {
      const alt = m[2] || "";
      const src = m[3];
      parts.push(
        // eslint-disable-next-line @next/next/no-img-element
        <img key={k++} className="guide-pic" src={src} alt={alt} />,
      );
    } else {
      const href = m[5] ?? "/";
      const label = m[4] ?? href;
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

function parseRow(line: string) {
  return line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

export function GuideBody({ text }: { text: string }) {
  const raw = text.replace(/\r\n/g, "\n").trim();
  if (!raw) return <p className="forum-empty-body">This landing page is empty.</p>;
  const lines = raw.split("\n");
  const out: ReactNode[] = [];
  let i = 0;
  let k = 0;
  while (i < lines.length) {
    if (!lines[i].trim()) {
      i += 1;
      continue;
    }
    const note = lines[i].match(/^(?:NOTE:|!!!)\s*(.*)$/i);
    if (note) {
      const bits = [note[1]];
      i += 1;
      while (i < lines.length && lines[i].trim() && !/^(NOTE:|!!!|#{1,3} |\|)/i.test(lines[i])) {
        bits.push(lines[i]);
        i += 1;
      }
      out.push(
        <aside className="guide-note" key={k++}>
          <strong>Note:</strong> {inline(bits.join(" "))}
        </aside>,
      );
      continue;
    }
    if (lines[i].trim().startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes("|")) {
        const row = parseRow(lines[i]);
        i += 1;
        if (row.every((c) => /^[-:]+$/.test(c))) continue;
        rows.push(row);
      }
      if (rows[0]) {
        out.push(
          <table className="wikitable guide-table" key={k++}>
            <thead>
              <tr>
                {rows[0].map((c, j) => (
                  <th key={j}>{inline(c)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, r) => (
                <tr key={r}>
                  {row.map((c, j) => (
                    <td key={j}>{inline(c)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>,
        );
      }
      continue;
    }
    const heading = lines[i].match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      const title = heading[2];
      i += 1;
      if (heading[1].length === 1) {
        out.push(
          <h1 className="mw-firstHeading" key={k++}>
            {title}
          </h1>,
        );
      } else if (heading[1].length === 2) {
        out.push(<h2 key={k++}>{title}</h2>);
      } else {
        out.push(<h3 key={k++}>{title}</h3>);
      }
      continue;
    }
    if (lines[i].startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i += 1;
      }
      out.push(
        <ul key={k++}>
          {items.map((item, j) => (
            <li key={j}>{inline(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith("- ") &&
      !lines[i].trim().startsWith("|") &&
      !/^(NOTE:|!!!|#{1,3} )/i.test(lines[i])
    ) {
      para.push(lines[i]);
      i += 1;
    }
    out.push(
      <p key={k++}>
        {para.map((line, j) => (
          <span key={j}>
            {j > 0 ? <br /> : null}
            {inline(line)}
          </span>
        ))}
      </p>,
    );
  }
  return <>{out}</>;
}
