import Link from "next/link";
import type { RankCode } from "@/lib/ranks";
import type { RoleCode } from "@/lib/digimon";

export function RankBadge({
  rank,
  href,
}: {
  rank: RankCode;
  href?: string;
}) {
  const inner = (
    <span className={`rank-badge rank-${rank.replace("+", "p")}`} title={`Rank ${rank}`}>
      {rank}
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
