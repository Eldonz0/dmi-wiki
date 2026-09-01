import type { Metadata } from "next";
import Link from "next/link";
import { Infobox, WikiArticle } from "@/components/wiki-article";
import { ROLES } from "@/lib/content";
import { listDigimon } from "@/lib/digimon";

export const metadata: Metadata = { title: "Roles" };
export const dynamic = "force-dynamic";

export default function RolesPage() {
  return (
    <WikiArticle
      title="Roles"
      category="Tamer"
      infobox={
        <Infobox
          title="Roles"
          rows={[
            { label: "AA", value: "Auto Attacker" },
            { label: "TA", value: "Tank" },
            { label: "SK", value: "Skill Attacker" },
            { label: "SUP", value: "Support" },
            {
              label: "Gear",
              value: <Link href="/sets">Carries sets</Link>,
            },
          ]}
        />
      }
    >
      <p>
        Every mercenary on DMI is stamped with one combat role. The stamp
        decides passive stats, which recovery skills exist, and whether a{" "}
        <Link href="/sets">Carries set</Link> pays full value. Official DMO
        still talks in QA / SA / DA / DE attacker types; DMI collapsed that
        into four tamer-facing jobs.
      </p>
      <table className="wikitable">
        <thead>
          <tr>
            <th>Role</th>
            <th>What it gained</th>
            <th>What it is for</th>
          </tr>
        </thead>
        <tbody>
          {ROLES.map((row) => (
            <tr key={row.code}>
              <td>
                <strong>
                  {row.code} — {row.name}
                </strong>
              </td>
              <td>{row.gained}</td>
              <td>{row.for}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        The form-by-form assignment PDF is loaded from{" "}
        <code>data/digimon_role_assignment_all_forms_new.pdf</code> (
        {listDigimon().length} forms). Partner pages show those HP / AT / DE / AS
        numbers and the SK / AA / TA / SUP stamp.
      </p>
    </WikiArticle>
  );
}
