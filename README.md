# Woman of the Day

Every day, a woman history overlooked. SvelteKit + Tailwind, served from Docker.

## Run it locally

```sh
pnpm install
pnpm dev
```

`.env` points at `content-sample/` and shows drafts (`SHOW_DRAFTS=true`, dev only).
To preview another date in dev, add `?date=MM-DD` to the URL, e.g. `/?date=11-07`.

## Content (the vault)

The notes live in a separate git repo, the Obsidian vault. The site reads every `.md` file in it.
**Only `status: approved` notes are ever published.** Drafts never show in production.

One note per woman. See `content-sample/women/lise-meitner.md` for a complete example.

| Field | What it is |
|---|---|
| `name`, `hook`, `date` | Required. `date` is `YYYY-MM-DD`, or `--MM-DD` when the year is unknown |
| `status` | `draft` or `approved` |
| `date_type` | `birth` (default), `death`, `baptism` or `achievement`. Any non-birth date gets a stamp |
| `date_note` | Optional, e.g. why a date is disputed |
| `born`, `died`, `role` | Shown on the label |
| `official_record` | The grey plaque the sticker covers: what history officially says |
| `official_record_source` | The number of the source backing the plaque |
| `image` | `file`, `alt`, `caption`, `credit`, `license`, `source_url`. Leave it out and the page uses a type-only treatment |
| `sources`, `further_reading` | Lists of `title` and optional `url` |

In the bio, write `[^2]` to link to source number 2, and `==like this==` to highlight words (same as Obsidian's highlight).

When no one is on today's date, the page shows the nearest date.

Each woman also has a permanent page at `/<note-filename>` (e.g. `/lise-meitner`), and every share button and copy link points there. Renaming a note breaks old links, so pick the filename once.

## Deploy (OVH)

```sh
git clone <vault repo> vault     # next to docker-compose.yml
# set ORIGIN in docker-compose.yml to the real domain
docker compose up -d --build
```

To publish new approved notes, run `git pull` inside `vault/`. The site picks them up within a minute.
Suggestions from the form are stored in SQLite in the `suggestions` volume (`/data/suggestions.sqlite`).
Put a reverse proxy with HTTPS (Caddy is simplest) in front of port 3000.
