import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Digimon" };

export default function DigimonIndexPage() {
  return (
    <article className="mw-article">
      <div className="mw-pre-title">From DMI Wiki · Digimon</div>
      <h1 className="mw-firstHeading">Digimon</h1>
      <p>
        Partner pages follow the DMO wiki shape: portrait infobox, attribute
        line, digivolution, and notes that actually matter on DMI (roles, map
        rules, box farms).
      </p>
      <div className="partner-grid">
        <Link href="/digimon/agumon" className="partner-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/digimon/agumon.png" alt="Agumon" />
          <span>Agumon</span>
        </Link>
        <Link href="/digimon/donedevimon" className="partner-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/digimon/donedevimon.png" alt="DoneDevimon" />
          <span>DoneDevimon</span>
        </Link>
        <Link href="/fruits" className="partner-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/digimon/spirit.png" alt="Spirit" />
          <span>Spirit / Hybrid</span>
        </Link>
      </div>
      <p>
        Drop the role-assignment PDF into the project and every form can pick up
        AA / TA / SK / SUP from the sheet instead of a DMO guess.
      </p>
    </article>
  );
}
