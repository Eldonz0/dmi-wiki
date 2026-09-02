# DMI Wiki

Fan encyclopedia for **Digimon Masters Infinite** (DMI). Dark Infinite chrome, DMO-wiki Digimon articles.

## Run locally

```bash
npm install
npm run dev -- --port 43127 --hostname 127.0.0.1
```

Open [http://127.0.0.1:43127](http://127.0.0.1:43127).

Public sidebar: **Main page**, **Digimon List**, **Guide**, **Dungeons**, **Accessory**. **Sign in** opens a username/password form (one account). Then click **Editor mode**. The public layout stays. Each box gets small **Edit / Duplicate / Up / Down / Remove** buttons. **Add below** inserts an announcement, banner (image upload), text, Digimon list, or links. Click **Edit** on a box to open its tools — the New Digimon grid does not swap into a full editor until then. **Save** writes `data/catalog.json`, `data/pages.json`, `data/guides.json`, `data/dungeons.json`, or `data/accessories.json`. Visitors never see editor chrome.

Copy `.env.example` to `.env.local` and set `DMI_ADMIN_USER`, `DMI_ADMIN_PASS`, and `DMI_SESSION_SECRET`. Restart the dev server after changing env.

## Tamer catalog (one account)

There is no register page. Sign in with the env credentials, then **Editor mode**. **Add Digimon** is on Digimon List and **Digimon index editor**. New Digimon on the home page uses slot dropdowns and **Save New Digimon box**.

Saves write `data/catalog.json` (seeded from the assignment PDF plus the wired evolution trees). Public Digimon pages read that file — HP / AT / DE / AS are not hardcoded.

Landing page text lives in `data/pages.json`.

## Going live

Two different things get published:

1. **Code** — Next.js app in git. New versions replace the app, not your wiki text, as long as live files are not on the same overwrite path as the git checkout.
2. **Live wiki data** — Editor saves JSON and uploads. Those must sit on a **persistent disk** (Docker/VPS volume, not Vercel’s ephemeral filesystem).

Set on the host:

```
DMI_ADMIN_USER=…
DMI_ADMIN_PASS=…
DMI_SESSION_SECRET=…   # long random string
DMI_DATA_DIR=/var/dmi/data
DMI_UPLOADS_DIR=/var/dmi/uploads
```

Mount the uploads volume so the app can still serve `/uploads/...`:

- bind `/var/dmi/uploads` → `public/uploads` in the container, **or**
- set `DMI_UPLOADS_DIR` to that bind.

If you deploy by `git pull` into the same folder that holds `data/`, a pull can overwrite `data/*.json`. Point `DMI_DATA_DIR` **outside** the repo (or use a named volume) so editor work survives new code.

Do not use a host that wipes the disk on every deploy unless you attach a volume. A small VPS or Fly/Railway with a volume is the fit; serverless (Vercel) is not, unless you later move saves to object storage.

Seeds (Digimon sheet, dungeon list, accessory tables) only fill **missing** files/rows. They do not wipe pages you already saved.

## Guide

`/guide` is a **left-hand list of points** (`*` bullets). Each point opens a landing page. The right side holds banners you upload and drag in Editor mode. **New guide landing page** adds a point. On a landing page, **Edit** for notes, tables, and pictures. Saved in `data/guides.json`.

A search bar sits at the top of every page. Typing suggests Digimon, guide, dungeon, and accessory landing pages.

## Dungeons

`/dungeons` uses the same point list. Each row is **entry ticket chip + dungeon name**. The name opens a landing page. In Editor mode, click the 36×36 chip to upload the ticket icon (no file-picker chrome). Saved in `data/dungeons.json`.

## Accessory

`/accessory` lists four slots on one page: **Rings (Show)**, **Necklaces (Show)**, **Earrings (Show)**, **Bracelets (Show)**. Show expands the item table and role rolls in place; Hide collapses it. Click a chip in Editor mode to upload the item icon. Saved in `data/accessories.json`.

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
