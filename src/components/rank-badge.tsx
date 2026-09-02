import Link from "next/link";
import type { RankCode } from "@/lib/ranks";
import type { RoleCode } from "@/lib/digimon";

export function RankBadge({
  rank,
  href,
  src,
}: {
  rank: RankCode;
  href?: string;
  src?: string;
}) {
  const inner = (
    <span className="rank-badge-wrap" title={`Rank ${rank}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="rank-badge-img" src={src} alt="" />
      ) : null}
      <span className={`rank-badge rank-${rank.replace("+", "p")}`}>{rank}</span>
    </span>
  );
  if (href) {
    return (
      <Link href={href} className="rank-link">
        {inner}
      </Link>
    );
  }
  return inner;
}

export function RoleBadge({ role }: { role: RoleCode }) {
  const names: Record<RoleCode, string> = {
    AA: "Auto Attacker",
    TA: "Tank",
    SK: "Skill Attacker",
    SUP: "Support",
  };
  return (
    <Link href="/roles" className={`role-badge role-${role}`}>
      {role} — {names[role]}
    </Link>
  );
}
