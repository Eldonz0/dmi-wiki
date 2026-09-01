import type { Metadata } from "next";
import Link from "next/link";
import { listDigimon } from "@/lib/catalog";
import { AdminTable } from "@/components/admin-table";

export const metadata: Metadata = { title: "Catalog" };
export const dynamic = "force-dynamic";

export default function AdminPage() {
  const forms = listDigimon();
  return (
    <article className="mw-article">
      <div className="mw-pre-title">Tamer · database</div>
      <h1 className="mw-firstHeading">Digimon catalog</h1>
      <p>
        {forms.length} forms loaded from <code>data/catalog.json</code> (seeded
        from the assignment PDF). Edit a row to change HP / AT / DE / AS, rank,
        role, and to wire evolution lines. Public wiki pages read this file, not
        hardcoded stats.
      </p>
      <p>
        <Link href="/digimon">Public index</Link>
        {" · "}
        <form action="/api/auth/logout" method="post" className="inline-form">
          <button type="submit">Sign out</button>
        </form>
      </p>
      <AdminTable forms={forms} />
    </article>
  );
}
