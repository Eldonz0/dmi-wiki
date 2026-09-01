import type { Metadata } from "next";
import Link from "next/link";
import { Infobox, WikiArticle } from "@/components/wiki-article";

export const metadata: Metadata = { title: "DoneDevimon" };

export default function DoneDevimonPage() {
  return (
    <WikiArticle
      title="DoneDevimon"
      category="Digimon"
      infobox={
        <Infobox
          title="DoneDevimon"
          image="/digimon/donedevimon.png"
          imageAlt="DoneDevimon"
          rows={[
            { label: "Form", value: "Mega" },
            { label: "Attribute", value: "Virus" },
            { label: "Element", value: "Pitch Black" },
            { label: "Type", value: "Fallen Angel" },
            { label: "Family", value: "Nightmare Soldiers / Dark Area" },
            { label: "Likely role", value: "SK — Skill Attacker (pending PDF)" },
            { label: "From", value: "SkullSatamon" },
          ]}
        />
      }
    >
      <p>
        <strong>DoneDevimon</strong> is the Mega of the Devimon line in Digimon
        Masters Online — the same fallen-angel Mega dmowiki files under{" "}
        <em>DoneDevimon</em>. On DMI he is the end of the Nightmare Soldiers
        virus line that starts as a Rookie bat and climbs through Champion
        Devimon.
      </p>

      <h2>Digivolution</h2>
      <div className="digiRow">
        <span className="digiChip">Tsukaimon / PicoDevimon</span>
        <span className="digiArrow">→</span>
        <span className="digiChip">Devimon</span>
        <span className="digiArrow">→</span>
        <span className="digiChip">SkullSatamon</span>
        <span className="digiArrow">→</span>
        <span className="digiChip">DoneDevimon</span>
      </div>
      <p>
        IceDevimon sometimes sits as an alternate Ultimate in DMO data. Treat
        SkullSatamon as the DMI default until a hatch table says otherwise.
      </p>

      <h2>Why he is on this wiki</h2>
      <ul>
        <li>
          Champion <strong>Devimon</strong> is the Infinite Mountain{" "}
          <Link href="/drops">Giga Box</Link> farm (50–100% box, then scan).
        </li>
        <li>
          Mega form wants <Link href="/roles">SK</Link> gear — Skill Damage %
          and the SK <Link href="/sets">Carries</Link> set — until the
          assignment PDF contradicts that.
        </li>
        <li>
          Virus / Pitch Black, so light and vaccine matchups behave like classic
          DMO attribute charts.
        </li>
      </ul>

      <h2>Notes for DMI tamers</h2>
      <p>
        Do not walk Verdandi on this Mega. The map only spares Rookies and
        X-Antibody partners; anything else eats 500 HP every five seconds. Park
        him, hop a Rookie shuttle, then swap for the named bosses.
      </p>
    </WikiArticle>
  );
}
