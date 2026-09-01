# DMI Wiki

Fan encyclopedia for **Digimon Masters Infinite** (DMI), a Digimon Masters Online private server. Dark Infinite chrome, DMO-wiki article shape.

## Run locally

```bash
npm install
npm run dev -- --port 43127 --hostname 127.0.0.1
```

Open [http://127.0.0.1:43127](http://127.0.0.1:43127).

## Digimon pages

Partner articles follow [dmowiki Apollomon](https://dmowiki.com/Apollomon) / [Omegamon X Extreme](https://dmowiki.com/Omegamon_X_Extreme):

- Right infobox: art, form, attribute, element, type, family, **rank badge**, **DMI role** (SK / AA / TA / SUP)
- Default stats: HP, DS, DE, AT, AS, CT, HT, EV, BL
- Attacks (F1 / F2 / F3, DS, cooldown)
- Digivolution chips with encyclopedia portraits
- Category links including rank

Full pages currently: Agumon line, Apollomon line, DoneDevimon, Omegamon X Extreme.

## Rank

Same ladder as [dmowiki Rank System](https://dmowiki.com/Rank_System): **N, A, A+, S, S+, SS, SS+, SSS, SSS+, U, U+**.

- `/rank-system` — ladder
- `/rank/u` — Category: Digimon Rank U (see [dmowiki Rank U](https://dmowiki.com/Category:Digimon_Rank_U))

## Assignment PDF

Ranks and roles for every form live in `digimon_role_assignment_all_forms_new.pdf`. Put that file in `/data`. Until then, articles mark rank/role as pending.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui. Wiki skin is `public/dmi-skin.css`.
