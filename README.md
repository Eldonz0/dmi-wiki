# DMI Wiki

Fan encyclopedia for **Digimon Masters Infinite** (DMI). Dark Infinite chrome, DMO-wiki Digimon articles.

## Run locally

```bash
npm install
npm run dev -- --port 43127 --hostname 127.0.0.1
```

Open [http://127.0.0.1:43127](http://127.0.0.1:43127).

Public sidebar: **Main page**, **Digimon List**, **Guide**, **Dungeons**, **Accessory**, **Clothing**. **Sign in** sits in the **Account** box. Clicking it logs you in immediately with no password (testing). Then click **Editor mode**. The public layout stays. Each box gets small **Edit / Duplicate / Up / Down / Remove** buttons. **Add below** inserts an announcement, banner (image upload), text, Digimon list, or links. Click **Edit** on a box to open its tools — the New Digimon grid does not swap into a full editor until then. **Save** writes `data/catalog.json`, `data/pages.json`, `data/guides.json`, `data/dungeons.json`, or `data/accessories.json`. Visitors never see editor chrome.

## Tamer catalog (one account)

There is no register page. Click **Sign in**, then **Editor mode**. **Add Digimon** is on Digimon List and **Digimon index editor**. New Digimon on the home page uses slot dropdowns and **Save New Digimon box**.

The account is still `admin` / `infinite` if a password form is used later. Override with `DMI_ADMIN_USER` and `DMI_ADMIN_PASS`.

Saves write `data/catalog.json` (seeded from the assignment PDF plus the wired evolution trees). Public Digimon pages read that file — HP / AT / DE / AS are not hardcoded.

Landing page text lives in `data/pages.json`.

## Guide

`/guide` is a **left-hand list of points** (`*` bullets). Each point opens a landing page. The right side holds banners you upload and drag in Editor mode. **New guide landing page** adds a point. On a landing page, **Edit** for notes, tables, and pictures. Saved in `data/guides.json`.

## Dungeons

`/dungeons` uses the same point list. Each row is **entry ticket chip + dungeon name**. The name opens a landing page. In Editor mode, click the 36×36 chip to upload the ticket icon (no file-picker chrome). Saved in `data/dungeons.json`.

## Accessory

`/accessory` lists four slots, same idea as [dmowiki Clothing](https://dmowiki.com/Clothing) accessories: **Rings**, **Necklaces**, **Earrings**, **Bracelets**. Each category opens a table of pieces plus **recommended stats for SK / AA / TA / SUP**. Click a chip in Editor mode to upload the item icon. Saved in `data/accessories.json`.

On each form you can:

- click the chip beside **Name** in **Digimon index editor** (or Digimon List with Editor mode on) to upload a 52×52 icon — every evolution chip with that same name updates
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
