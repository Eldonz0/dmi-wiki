# DMI Wiki

Fan encyclopedia for **Digimon Masters Infinite** (DMI). Dark Infinite chrome, DMO-wiki Digimon articles.

## Run locally

```bash
npm install
npm run dev -- --port 43127 --hostname 127.0.0.1
```

Open [http://127.0.0.1:43127](http://127.0.0.1:43127).

Public sidebar: **Main page**, **Digimon List**, **Guide**, **Dungeons**, **Accessory**, **Clothing**. **Sign in** sits in the **Account** box on the left (and in the top bar / mobile bar). Tools, search, catalog, and the home **Edit box** only appear after you sign in as admin. Use **Sign out** to go back to a visitor view.

## Tamer catalog (one account)

There is no register page. Click **Sign in** — while we are testing it logs you in immediately. Then use **Catalog** or **Tools** to edit the site from the wiki itself.

The account is still `admin` / `infinite` if a password form is used later. Override with `DMI_ADMIN_USER` and `DMI_ADMIN_PASS`.

Saves write `data/catalog.json` (seeded from the assignment PDF plus the wired evolution trees). Public Digimon pages read that file — HP / AT / DE / AS are not hardcoded.

Signed in, the home **New Digimon** box has **Edit box**: set how many names to show and pick them from the catalog. Visitors never see that control.

## Guide board

`/guide` is a topic list. Signed-in admin can **New topic**, write the post, upload pictures, and drag / resize them on the layout board. Topics are stored in `data/guides.json`.

On each form you can:

- edit rank, role, and the four sheet stats
- drag evolution chips on a grid and draw arrows between them
- upload a chip icon (png / jpg / webp)
- save — the same board is copied to every form that shares the line

Every form in the assignment PDF gets a starting board: all sheet-mates on the same egg line, ordered by rank then HP. A few U / U+ lines (Apollomon, Omegamon Extreme, …) start from the DMO wiki layout instead. Public chips always link to that Digimon’s page.

## Digimon pages

Articles follow [dmowiki Apollomon](https://dmowiki.com/Apollomon) / [dmowiki Agumon](https://dmowiki.com/Agumon):

- Striped infobox header (English + Japanese), 250px 3D portrait
- Rank badge and DMI role (SK / AA / TA / SUP)
- Default stats **HP / AT / DE / AS** from the live catalog
- Square 52×52 digivolution chips on a fixed 88px chip + 36px arrow grid (red frame on the current form)

`/digimon` lists all **646** forms. Featured portraits: Apollomon, Agumon, Omegamon Extreme, DoneDevimon, Bearmon.

## Rank

Same ladder as [dmowiki Rank System](https://dmowiki.com/Rank_System): **N, A, A+, S, S+, SS, SS+, SSS, SSS+, U, U+**. Unranked sheet rows are filed as N.

- `/rank-system`
- `/rank/u-plus` — Apollomon, Omegamon Extreme, Quantumon
- `/rank/u`

## Assignment PDF

`data/digimon_role_assignment_all_forms_new.pdf` is parsed into `src/lib/sheet.json`. Refresh with:

```bash
python3 scripts/parse_sheet.py
```

Then delete `data/catalog.json` and restart the app to re-seed, or edit forms in `/admin`.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui. Wiki skin is `public/dmi-skin.css`.
