#!/usr/bin/env python3
"""Parse digimon_role_assignment_all_forms_new.pdf into JSON."""

from __future__ import annotations

import json
import re
from pathlib import Path

from pypdf import PdfReader

ROOT = Path("/workspace")
PDF = ROOT / "data/digimon_role_assignment_all_forms_new.pdf"
OUT = ROOT / "src/lib/sheet.json"

ROLES = {"TA", "AA", "SK", "Sup"}
RANK_RE = re.compile(
    r"^(U\+|U|SSS\+|SSS|SS\+|SS|S\+|S|A\+|A|unranked)\s*\(",
    re.I,
)
NUM_RE = re.compile(r"^\d+$")
SKIP = {
    "digimon_role_assignment",
    "role",
    "form",
    "end",
    "evolution line(s)",
    "hp",
    "at",
    "de",
    "as",
}


def slugify(name: str) -> str:
    s = name.strip().lower()
    s = s.replace(":", "")
    s = s.replace("'", "")
    s = s.replace("[", " ").replace("]", " ")
    s = s.replace("(", " ").replace(")", " ")
    s = s.replace("+", " plus ")
    s = s.replace("/", " ")
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def parse() -> list[dict]:
    reader = PdfReader(str(PDF))
    raw: list[str] = []
    for page in reader.pages:
        text = page.extract_text() or ""
        for line in text.splitlines():
            line = line.strip()
            if not line:
                continue
            if re.match(r"^Page\s+\d+$", line):
                continue
            raw.append(line)

    records: list[dict] = []
    rank = "unranked"
    i = 0
    while i < len(raw):
        line = raw[i]
        if RANK_RE.match(line):
            rank = RANK_RE.match(line).group(1)
            if rank.lower() == "unranked":
                rank = "N"
            i += 1
            continue
        if line.lower() in SKIP:
            i += 1
            continue
        if line not in ROLES:
            i += 1
            continue

        role = "SUP" if line == "Sup" else line
        i += 1
        if i >= len(raw):
            break
        form = raw[i].strip()
        i += 1
        if i < len(raw) and raw[i] == "+":
            i += 1
        line_parts: list[str] = []
        while i < len(raw) and not NUM_RE.match(raw[i]):
            if raw[i] in ROLES or RANK_RE.match(raw[i]) or raw[i].lower() in SKIP:
                break
            line_parts.append(raw[i])
            i += 1
        lines = " ".join(line_parts).strip()
        nums: list[int] = []
        while i < len(raw) and NUM_RE.match(raw[i]) and len(nums) < 4:
            nums.append(int(raw[i]))
            i += 1
        if not form or len(nums) != 4:
            continue
        records.append(
            {
                "name": form,
                "role": role,
                "rank": rank,
                "lines": [p.strip() for p in re.split(r",\s*", lines) if p.strip()]
                if lines
                else [],
                "hp": nums[0],
                "at": nums[1],
                "de": nums[2],
                "as": nums[3],
            }
        )

    seen: dict[str, int] = {}
    for rec in records:
        base = slugify(rec["name"])
        n = seen.get(base, 0)
        seen[base] = n + 1
        rec["slug"] = base if n == 0 else f"{base}-{rec['role'].lower()}-{slugify(rec['rank'])}"
    return records


def main() -> None:
    records = parse()
    ranks: dict[str, int] = {}
    for r in records:
        ranks[r["rank"]] = ranks.get(r["rank"], 0) + 1
    print("count", len(records), "ranks", ranks)
    print("first", records[0])
    print("agumon", [r for r in records if "Agumon" in r["name"] and "Classic" in r["name"]])
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(records, indent=2), encoding="utf-8")
    print("wrote", OUT)


if __name__ == "__main__":
    main()
