# DMI Wiki

Fan encyclopedia for **Digimon Master Online — DMI**, a Digimon Masters Online private server. Layout follows the classic DMO wiki look (dark MediaWiki skin, orange portal boxes, infoboxes) without copying dmowiki.com artwork.

First articles are transcribed from Discord `#server-informations`.

## Run locally

```bash
npm install
npm run dev -- --port 43127
```

Open [http://127.0.0.1:43127](http://127.0.0.1:43127).

## Pages

| Path | Content |
| --- | --- |
| `/` | Main Page portals |
| `/rules` | F2P delay, macros, two-account cap |
| `/party` | Party EXP table |
| `/guild` | Member caps, GP, GSP |
| `/hatching` | Spirit / Raremon hatch points |
| `/events` | Distorted Data Village and Raremon notes |
| `/search` | Article search |

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
