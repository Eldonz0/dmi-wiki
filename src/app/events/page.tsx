import type { Metadata } from "next";
import { Infobox, WikiArticle } from "@/components/wiki-article";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <WikiArticle
      title="Events"
      category="Content"
      infobox={
        <Infobox
          title="Events"
          rows={[
            { label: "Type", value: "Timed content" },
            { label: "Village start", value: "17:00" },
            { label: "Respawn", value: "Every 2 hours" },
            { label: "Source", value: "GM Raremon notes" },
          ]}
        />
      }
    >
      <p>
        Extra lines from Game_Master_DMI about Raremon, maintenance rewards, and
        the Distorted Data Village map.
      </p>

      <h2>Distorted Data Village</h2>
      <p>
        Timed event map. Server start time cited by the GM: <strong>17:00</strong>.
        Spawns refresh every <strong>2 hours</strong>.
      </p>

      <h2>Raremon eggs and silk</h2>
      <ul>
        <li>
          Maintenance notes mention fixes for <strong>bounded silk Raremons</strong>{" "}
          and related fruits.
        </li>
        <li>
          Some maintenance reward packages include{" "}
          <strong>Raremon Lv3 ×2 eggs</strong>.
        </li>
        <li>
          Players have asked whether official-game maps also drop Raremon eggs.
          Treat that as unconfirmed until a GM answers in Discord.
        </li>
      </ul>

      <h2>Currency trade rate</h2>
      <p>
        A GM post changed an exchange to <strong>2 OCS/NCS for 3 Digisoul</strong>.
        Confirm the current shop before dumping currency.
      </p>
    </WikiArticle>
  );
}
