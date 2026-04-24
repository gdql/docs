---
title: What's in the database
description: "Every field you can query in gdql — setlists, songs, lyrics, venues with coordinates, weather per show, recordings from the Internet Archive — and where each piece came from."
weight: 40
---


The gdql binary ships with one file and one file only: a compiled-in SQLite database with everything the queries touch. No network calls at runtime, no side-car JSON to install, no external services. `SHOWS`, `SONGS`, `VENUES` — the answer's inside the `.exe`.

This page covers every field the embedded DB carries today and where the underlying data came from.

---

## Shows

Every `SHOWS` query result row can carry:

| Field | Type | Notes |
|---|---|---|
| `date` | `YYYY-MM-DD` | Show date. Keyed through everything. |
| `venue` / `city` / `state` | strings | Venue metadata. |
| `tour` | string | Tour name (*"Spring 1977"*, *"Europe '72"*) where known. |
| `coords` | `{lat, lon}` | Venue coordinates. |
| `weather` | `{high_c, low_c, precip_mm, wind_kph, code}` | Daily weather for the show date at the venue location. `code` is a [WMO code](https://open-meteo.com/en/docs#api_form). |
| `recordings` | array | Archive.org identifiers circulating for this date, sorted SBD > Matrix > FM > AUD, downloads-desc within each tier. Each entry has `{id, src, dl, r, t}`. |

Example:

```
$ gdql 'SHOWS IN 1977-05-08 AS JSON'
{
  "date": "1977-05-08",
  "venue": "Barton Hall, Cornell University",
  "city": "Ithaca", "state": "NY",
  "tour": "Spring 1977",
  "coords": { "lat": 42.4374, "lon": -76.5483 },
  "weather": { "high_c": 15.8, "low_c": 2.8, "precip_mm": 1.6, "wind_kph": 25.7, "code": 53 },
  "recordings": [
    { "id": "gd1977-05-08.148737.SBD.Betty.Anon.Noel.t-flac2448", "src": "sbd", "r": 4.0, "dl": 48589, ... },
    ...
  ]
}
```

---

## Songs

`SONGS` rows carry the classic fields plus lyrics-joined metadata:

| Field | Notes |
|---|---|
| `name` / `short_name` / `writers` | Basic song metadata. Writers include composer / lyricist credits. |
| `first_played` / `last_played` / `times_played` | Aggregated from performances. |
| `related` | Cross-references: `variant_of` / `merge_into` / `pairs_with` connections to other canonical songs. |

Full-text lyric search is available via `SONGS WITH LYRICS("word", "word")`.

---

## Performances and setlists

`PERFORMANCES` and `SETLIST` queries expose segue structure, set/position, length in seconds, guest musician tags, is_opener / is_closer flags, and the computed performance order for every show.

See the [language reference]({{< relref "reference" >}}) for the query syntax.

---

## Where the data comes from

We aggregate from open, well-documented sources. The provenance chain:

- **Setlists, show dates, venues, tours** — scraped from the community-maintained [deadlists (setlists.net)](http://www.setlists.net) database and cross-checked against [setlist.fm](https://www.setlist.fm/)'s Grateful Dead API. Venue spellings are normalized across the two sources.
- **Song metadata** (writers, short names) — [Relisten](https://relisten.net/) and hand-curated entries for edge cases.
- **Song aliases** — hand-maintained list of raw setlist-text variants that should resolve to the same canonical song. ~1200 entries.
- **Song relations** — hand-curated list of cross-references between canonical songs. Three kinds: `variant_of` (distinct arrangements, e.g. Minglewood Blues / New Minglewood Blues), `merge_into` (data-entry duplicates, collapsed destructively), `pairs_with` (tight segue pairs like Scarlet → Fire, surfaced in downstream UIs).
- **Performance durations** — derived from [archive.org](https://archive.org/details/GratefulDead)'s track length metadata, matched back to setlist positions.
- **Lyrics** — scraped from [Genius](https://genius.com/) for songs with enough plays to warrant the attempt. ~220 songs covered; the long tail of one-off covers isn't on Genius.
- **Venue coordinates** — geocoded via [Nominatim (OpenStreetMap)](https://nominatim.openstreetmap.org/). A handful of ambiguous names (*"Studio"*, *"Backstage"*, real venues Nominatim misread) are hand-corrected and tracked in git.
- **Historical weather** — [Open-Meteo](https://open-meteo.com/)'s free historical archive, queried by the venue's lat/lon for the show's date. Daily resolution: max/min temperature, precipitation, wind speed, WMO weather code.
- **Archive.org recordings** — queried from archive.org's advancedsearch API once per date, ranked by source quality (SBD > Matrix > FM > AUD) then by downloads.

All of this gets merged into the embedded DB. Nothing is fetched at query time; a fresh gdql binary is a self-contained snapshot.

---

## Data freshness

New releases (`v*` tags) rebuild the embedded DB from scratch. The three enrichment sources that change over time (Nominatim / Open-Meteo / archive.org) are re-scraped weekly; hand-curated sources (aliases, relations) are updated as contributors notice gaps.

The full contribution flow is in the [gdql repo's CONTRIBUTING.md](https://github.com/gdql/gdql/blob/main/CONTRIBUTING.md).
