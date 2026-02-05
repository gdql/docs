---
title: Getting started
description: "Install the GDQL CLI, get or create the database, and run your first query."
weight: 10
---

# Getting started

Install the CLI, create or download the database, and run a query.

---

## Option A: Download a release (recommended)

Pre-built binaries and a ready-to-use database are published on GitHub Releases. No build or import step required.

1. Open **[Releases](https://github.com/gdql/gdql/releases)** and download the latest:
   - **gdql** (or **gdql.exe** on Windows) — the CLI binary
   - **shows.db** — SQLite database with show/song data (optional; you can use `gdql init` for a minimal DB instead)
2. Put the binary on your PATH (e.g. `~/bin` or `/usr/local/bin`). Place `shows.db` in the same directory as the binary, or set `GDQL_DB` / use `-db path/to/shows.db`.
3. Run: `gdql "SHOWS FROM 1977 LIMIT 5"`

## Option B: Build from source

Requires [Go 1.21+](https://go.dev/dl/).

```bash
git clone https://github.com/gdql/gdql
cd gdql
go mod tidy
go build -o gdql ./cmd/gdql   # or: go install ./cmd/...
```

On Windows, build `gdql.exe` and run as `.\gdql.exe`.

## Create or get the database

- **From a release:** Download **shows.db** from [Releases](https://github.com/gdql/gdql/releases) and use it with `-db shows.db` or `GDQL_DB=shows.db`.
- **Minimal (no data):** Run `gdql init` to create `shows.db` with schema and sample data.
- **Full import (setlist.fm):** Use your own API key and run the importer (rate limits apply; see [setlist.fm import](https://github.com/gdql/gdql/blob/main/docs/SETLISTFM_IMPORT.md)):

```bash
export SETLISTFM_API_KEY="your-key"   # bash/zsh
# or PowerShell: $env:SETLISTFM_API_KEY = "your-key"
gdql import setlistfm
```

## Run a query

```bash
gdql "SHOWS FROM 1977 LIMIT 5"
gdql -db shows.db "SHOWS FROM 77-79 WHERE \"Scarlet Begonias\" > \"Fire on the Mountain\""
```

For complex or quoted queries, use a file or stdin:

```bash
gdql -f query.gdql
echo 'SHOWS FROM 1977;' | gdql -
```

## Next

- [Example queries]({{< relref "examples" >}}) — Ready-to-run GDQL.
- [Language reference]({{< relref "reference" >}}) — Query types, WHERE, operators, formats.
