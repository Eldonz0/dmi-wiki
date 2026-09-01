import type { ReactNode } from "react";
import { SOURCE } from "@/lib/wiki";

export function WikiArticle({
  title,
  category,
  infobox,
  children,
}: {
  title: string;
  category?: string;
  infobox?: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="mw-article">
      <div className="mw-pre-title">
        From DMI Wiki
        {category ? <> · {category}</> : null}
      </div>
      <h1 className="mw-firstHeading">{title}</h1>
      <div className="mw-body-content">
        {infobox}
        {children}
        <p className="mw-source">{SOURCE}</p>
      </div>
    </article>
  );
}

export function Infobox({
  title,
  image,
  imageAlt,
  rows,
}: {
  title: string;
  image?: string;
  imageAlt?: string;
  rows: { label: string; value: ReactNode }[];
}) {
  return (
    <table className="infobox">
      <thead>
        <tr>
          <th colSpan={2}>{title}</th>
        </tr>
      </thead>
      <tbody>
        {image ? (
          <tr>
            <td colSpan={2} className="infobox-art">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={imageAlt ?? title} />
            </td>
          </tr>
        ) : null}
        {rows.map((row) => (
          <tr key={row.label}>
            <th>{row.label}</th>
            <td>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function PortalBox({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="portal">
      <h2>{title}</h2>
      <div className="portal-body">{children}</div>
    </section>
  );
}
