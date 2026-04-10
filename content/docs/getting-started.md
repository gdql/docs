---
title: Getting started
description: "Install the GDQL CLI, get the database, and run your first query in under a minute."
weight: 10
---


GDQL — the **Grateful Dead Query Language** — is a CLI tool for querying Grateful Dead live performance history. This page gets you from zero to running queries. Pick the path that fits — pre-built binary or build from source — then point GDQL at a database and ask it something.

---

## Option A: Download a release (recommended)

Grab a pre-built binary and the ready-to-use database from GitHub Releases. No Go toolchain, no import step.

1. Open **[Releases](https://github.com/gdql/gdql/releases)** and download the latest:
   - **gdql** (or **gdql.exe** on Windows) — the CLI binary
   - **shows.db** — SQLite database with show, song, performance, and lyric data
2. Move the binary somewhere on your `PATH`, like `~/bin` or `/usr/local/bin`, and make it executable:
   ```bash
   chmod +x ~/bin/gdql
   ```
3. Drop `shows.db` next to the binary, or point at it explicitly:
   ```bash
   export GDQL_DB="$HOME/data/shows.db"
   # or pass -db on every invocation
   gdql -db ~/data/shows.db "SHOWS FROM 1977 LIMIT 5"
   ```
4. Run your first query:
   ```bash
   gdql "SHOWS FROM 1977 LIMIT 5"
   ```

If you only want a quick taste with no install at all, jump to the **[sandbox](https://sandbox.gdql.dev)** instead.

---

## Option B: Build from source

You'll need [Go 1.21 or newer](https://go.dev/dl/).

```bash
git clone https://github.com/gdql/gdql
cd gdql
go mod tidy
go build -o gdql ./cmd/gdql
```

`go install ./cmd/...` works too if you'd rather drop the binary straight into `$GOPATH/bin`. On Windows, build `gdql.exe` and run it as `.\gdql.exe`.

---

## Get a database

GDQL needs a SQLite database to query. Pick one:

- **Pre-built (easiest):** Download `shows.db` from [Releases](https://github.com/gdql/gdql/releases). It includes shows, venues, songs, performances, segues, and lyrics — everything the language can query.
- **Empty schema:** Run `gdql init` to create a fresh `shows.db` with the schema and a few sample rows. Useful for development or testing.
- **Full import from setlist.fm:** Bring your own [setlist.fm API key](https://www.setlist.fm/settings/api) and run the importer. Note that setlist.fm rate-limits aggressively, so a full import takes several hours:
  ```bash
  export SETLISTFM_API_KEY="your-key"          # bash/zsh
  # PowerShell: $env:SETLISTFM_API_KEY = "your-key"
  gdql import setlistfm
  ```
  See [setlist.fm import notes](https://github.com/gdql/gdql/blob/main/docs/SETLISTFM_IMPORT.md) for details.

---

## Run a query

Pass a query directly:

```bash
gdql "SHOWS FROM 1977 LIMIT 5"
gdql "SETLIST FOR 5/8/77"
gdql "COUNT \"Dark Star\""
```

For long, multi-line, or shell-unfriendly queries, read from a file or stdin:

```bash
gdql -f query.gdql
echo 'SHOWS FROM 1977;' | gdql -
```

Want JSON instead of a table? Add `AS JSON`:

```bash
gdql "SHOWS FROM 1977 LIMIT 5 AS JSON"
```

---

## Where to next

- **[Example queries]({{< relref "examples" >}})** — Copy-paste recipes for common questions.
- **[Advanced queries]({{< relref "advanced" >}})** — Multi-clause queries that show off the language.
- **[Language reference]({{< relref "reference" >}})** — Every query type and clause documented.
- **[Sandbox](https://sandbox.gdql.dev)** — Run GDQL in the browser; share queries via URL.
