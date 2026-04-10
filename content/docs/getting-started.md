---
title: Getting started
description: "Install the GDQL CLI and run your first query in under a minute."
weight: 10
---


GDQL — the **Grateful Dead Query Language** — is a CLI tool for querying Grateful Dead live performance history. The database is embedded in the binary — download one file, run it, done.

---

## Option A: Download a release (recommended)

1. Open **[Releases](https://github.com/gdql/gdql/releases/latest)** and download `gdql` for your platform (or `gdql.exe` on Windows).
2. Move it somewhere on your `PATH` and make it executable:
   ```bash
   chmod +x ~/bin/gdql
   ```
3. Run your first query:
   ```bash
   gdql "SHOWS FROM 1977 LIMIT 5"
   ```

That's it. The database (2,000+ shows, 500+ songs, 37,000+ performances) is baked into the binary. No separate database file needed.

If you only want a quick taste with no install at all, jump to the **[sandbox](https://sandbox.gdql.dev)** instead.

---

## Option B: Build from source

You'll need [Go 1.24 or newer](https://go.dev/dl/).

```bash
git clone https://github.com/gdql/gdql
cd gdql
go build -o gdql ./cmd/gdql
```

The embedded database is compiled in automatically.

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
