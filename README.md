# DMI Wiki

Fan encyclopedia for **Digimon Master Online — DMI**, a Digimon Masters Online private server. The site uses a dark Infinite-style chrome (cyan/purple, Orbitron) with the same wiki article structure. Compact New Digimon list on the Main Page.

First articles are transcribed from Discord `#server-informations`.

## Run locally

```bash
npm install
npm run dev -- --port 43127
```

Open [http://127.0.0.1:43127](http://127.0.0.1:43127).

## Pages

Main Page, rules, party, guild, hatching, events, combat, roles, EXP boosters, size fruits, Carries sets, Verdandi, boss fruit boxes, and starter Digimon articles (Agumon, DoneDevimon).

| Path | Content |
| --- | --- |
| `/` | Main Page with banner |
| `/combat` | Level gap, hit chance, block, boss defence |
| `/roles` | AA / TA / SK / SUP |
| `/exp` | Membership and EXP boosters |
| `/fruits` | Size fruits by class and hatch grade |
| `/sets` | Carries set bonuses |
| `/verdandi` | Map rules and chests |
| `/drops` | Boss fruit boxes |
| `/digimon/donedevimon` | Mega infobox page |
| `/digimon/agumon` | Starter Rookie |

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
