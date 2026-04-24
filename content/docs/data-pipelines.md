---
title: Data Pipelines
description: "How gdql's embedded database stays current — song_relations, lyrics, venue geocoding, historical weather, and the CI workflows that keep downstream consumers synced."
weight: 40
---


GDQL ships as a single binary with a pre-baked embedded database. Beyond the core setlist data, several enrichment pipelines augment the DB and drive downstream sites like [Dead Daily Explore](https://explore.deaddaily.org) and [Dead Daily Listen](https://listen.deaddaily.org). This page documents what each pipeline produces, how to run it, and how the CI automation keeps them current.

---

## Enrichment artifacts

Four committed data artifacts live alongside the binary:

| File | Rows | Produced by | Used by |
|---|---|---|---|
| `data/song_aliases.json` | ~1200 | `gdql-import aliases` | Setlist text normalization at import |
| `data/song_relations.json` | 15 | `gdql-import relations` + manual | Cross-references between canonical songs |
| `data/song_merges.json` | 5 | `gdql-import merge-songs` | Pre-merge stats for UI transparency |
| `data/venues_geo.json` | 737 | `scripts/geocode_venues.py` | Venue map lat/lon |
| `data/weather.json` | 1,948 | `scripts/fetch_weather.py` | Per-show weather on detail pages |
| `lyrics.json` | 222 | `scripts/scrape_lyrics.go` | Song-page lyrics + full-text search |

---

## Song aliases vs. song relations vs. song merges

Three distinct concepts, often confused.

**`song_aliases`** — *text normalization*. Maps raw setlist strings to a single canonical song name. Example: `"Scarlet Begonias-"` and `"scarlet begonias"` both resolve to song id 1 (`Scarlet Begonias`). Applied at setlist import time so the same song doesn't get duplicated across rows.

**`song_relations`** — *cross-references between already-canonical songs*. Three kinds:

  - `variant_of` — distinct arrangements of the same tune. `Minglewood Blues` (1966–71) is a `variant_of` `New Minglewood Blues` (1966–95). Keep both rows.
  - `merge_into` — data-entry duplicates of the same song. `Me & My Uncle` is a `merge_into` `Me And My Uncle`. The from-row is collapsed at data-time (see next section).
  - `pairs_with` — songs that reliably segue as a pair. `China Cat Sunflower` `pairs_with` `I Know You Rider` (508 co-occurrences). Both rows stay; downstream UIs surface the link.

**`song_merges`** — the *record* of `merge_into` relations that have been applied destructively. When `gdql-import merge-songs` collapses a `merge_into` pair, it writes a record here capturing the pre-merge play count, first/last dates, etc. Downstream UIs read this to show "Also counted as X (×N)" transparency footnotes.

### Loading relations

```bash
gdql-import relations data/song_relations.json
```

Kinds `variant_of` and `pairs_with` stay as display-time cross-references. `merge_into` rows need a second command to apply them destructively:

```bash
gdql-import merge-songs data/song_relations.json --record data/song_merges.json
```

Each `merge_into` row: reattributes performances from the `from` song to the `to` song, recomputes aggregates, inserts `from_name` as an alias of `to` so future setlist imports normalize, and deletes the stale row. Idempotent — already-merged entries silently skip.

---

## Venue geocoding

`scripts/geocode_venues.py` hits Nominatim (OpenStreetMap) for every venue name in the `venues` table **and** every unique venue-name appearing in `shows_with_lengths.json` (since the two pipelines historically produced slightly different spellings). Output: `data/venues_geo.json`.

```bash
python3 scripts/geocode_venues.py
```

Resume-safe — already-resolved slugs are skipped. Respects Nominatim's 1-req/sec rate limit. Full cold run ≈ 12 minutes for ~740 venues; incremental runs finish in seconds.

Nominatim occasionally mis-resolves ambiguous names. `data/venues_geo.json` keeps entries without `lat`/`lon` for placeholders (`Unknown`, `Various`, `Studio`) so the script doesn't re-attempt them. Hand-corrected lat/lon for real venues with bad hits (e.g. `Bayfront Center Arena` in St. Petersburg, FL rather than Russia) are tracked in git.

---

## Historical weather

`scripts/fetch_weather.py` batches every show date per venue into one call to Open-Meteo's free historical-archive API and writes `data/weather.json` with daily max/min temp, precipitation, wind, and WMO weather code.

```bash
python3 scripts/fetch_weather.py
```

Resume-safe; already-fetched dates are skipped. Rate-limited with exponential backoff on 429. Current coverage: ~94% of the ~2,056 dated shows.

---

## Lyrics scraping

`scripts/scrape_lyrics.go` hits Genius for songs played at least N times (default 50; sensible lowering: 10). Output appends to `lyrics.json` at the repo root, then `gdql-import lyrics lyrics.json` folds them into the DB.

```bash
go run scripts/scrape_lyrics.go -db run/embeddb/default.db -out lyrics.json -min-plays 10
gdql-import lyrics lyrics.json
```

Resume-safe. Current coverage: 222 songs (roughly the top 40% by play count — many one-off covers have no Genius page).

---

## CI: `enrich-data` workflow

`.github/workflows/enrich-data.yml` runs the three long-tail scripts automatically and opens a PR per enrichment when outputs change.

Triggers:

  - **`push`** to `main` touching the relevant inputs — path-filtered so only affected jobs fire
  - **`workflow_dispatch`** — force a full or single-job rebuild
  - **weekly `schedule`** (Sundays 03:00 UTC) as a drift safety net

Each job is resume-safe and idempotent. Nothing auto-merges; the PR lands for review.

---

## Downstream dispatch

When a new `v*` tag is pushed, `.github/workflows/release.yml` fans out `repository_dispatch` events to three consumers:

  - **`gdql/sandbox`** — rebuilds the WASM playground
  - **`samburba/deaddaily-timeline`** (aka Dead Daily Explore) — regenerates `songs.json`, `lyrics.json`, `song_merges.json`, `venues_geo.json`, `weather.json` via its `scripts/export-gdql.sh`
  - **`samburba/deaddaily-listen`** — rebuilds `gdql.wasm` + `recordings.json` + copies lyrics

Each consumer has its own `gdql-sync.yml` workflow that checks out gdql at the tagged commit, runs its export, and opens a PR if the data diff is non-empty.

Required secrets in `gdql/gdql`:

  - `SANDBOX_DISPATCH_TOKEN` — fine-grained PAT scoped to `gdql/sandbox`
  - `DOWNSTREAM_DISPATCH_TOKEN` — fine-grained PAT scoped to both `samburba/deaddaily-timeline` and `samburba/deaddaily-listen`

---

## Source of truth summary

```
gdql DB                    ←  setlist imports (deadlists, setlist.fm)
 │
 ├─ song_aliases           ←  manual curation in data/song_aliases.json
 ├─ song_relations         ←  manual curation in data/song_relations.json
 ├─ song_merges            ←  `gdql-import merge-songs` (auto)
 ├─ lyrics                 ←  `scrape_lyrics.go` → `gdql-import lyrics` (auto)
 │
data/venues_geo.json       ←  `geocode_venues.py` (auto)
data/weather.json          ←  `fetch_weather.py`  (auto)
shows_with_lengths.json    ←  legacy setlist pipeline (manual)
```

Every consumer reads directly from the committed data files at a specific release tag. Never from the DB at runtime — gdql is a *static dataset*, not a service.
