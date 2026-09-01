import type { Metadata } from "next";
import Link from "next/link";
import { Infobox, WikiArticle } from "@/components/wiki-article";
import { CARRIES } from "@/lib/content";

export const metadata: Metadata = { title: "Carries sets" };

export default function SetsPage() {
  return (
    <WikiArticle
      title="Carries sets"
      category="Items"
      infobox={
        <Infobox
          title="Carries"
          rows={[
            { label: "Type", value: "Role accessory set" },
            { label: "Match", value: "Full stats" },
            { label: "Mismatch", value: "Half of every stat" },
            { label: "Warning", value: "Mismatched Set icon on the buff bar" },
          ]}
        />
      }
    >
      <p>
        Wear the Carries set that matches your <Link href="/roles">role</Link>{" "}
        or every accessory on it pays half. You can still mix looks — the icon
        just tells you the tax is on.
      </p>
      <table className="wikitable">
        <thead>
          <tr>
            <th>Set</th>
            <th>Carries (full value)</th>
          </tr>
        </thead>
        <tbody>
          {CARRIES.map((row) => (
            <tr key={row.role}>
              <td>
                <strong>{row.role}</strong>
              </td>
              <td>{row.stats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </WikiArticle>
  );
}
