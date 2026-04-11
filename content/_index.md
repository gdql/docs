---
title: "GDQL: The Grateful Dead Query Language"
description: "Search every Grateful Dead setlist, show, and song from 1965-1995. GDQL is a query language for 2,014 concerts — find segues, lyrics, and live history."
seo:
  title: "GDQL — Search Grateful Dead Setlists, Shows & Songs"
---

## What is GDQL?

**GDQL** (Grateful Dead Query Language) is a query language for searching Grateful Dead setlists, shows, songs, and segues across the band's entire 30-year touring history. Ask questions like *"every show where Scarlet went into Fire,"* *"the last time they played St. Stephen,"* or *"random show from the Brent era"* — get answers in milliseconds.

It ships as a single binary with the full show database baked in: **2,014 concerts**, **536 songs**, and **37,180 performances** from 1965 to 1995. Run it from the terminal, embed it in your app, or [try it in the browser](https://sandbox.gdql.dev).

---

## Three things to try

{{< gdql >}}
SHOWS FROM 77-79 WHERE "Scarlet Begonias" > "Fire on the Mountain";
{{< /gdql >}}

{{< gdql >}}
COUNT "Dark Star" FROM BRENT_ERA;
{{< /gdql >}}

{{< gdql >}}
RANDOM SHOW FROM EUROPE72;
{{< /gdql >}}

---

## Where to go next

- **[Getting started]({{< relref "/docs/getting-started" >}})** — install the CLI in under a minute
- **[Cookbook]({{< relref "/docs/cookbook" >}})** — recipes for every question a Deadhead might ask
- **[Language reference]({{< relref "/docs/reference" >}})** — every keyword, clause, and operator
- **[Sandbox](https://sandbox.gdql.dev)** — run queries in your browser, no install required

---

## At a glance

- Keywords are **case-insensitive** (`SHOWS` = `shows`)
- Song names use **double quotes** (`"Dark Star"`)
- Comments start with `--`
- Statements end with `;` (optional, required between multiple)
- Fuzzy matching forgives spelling and punctuation (`Truckin` finds `Truckin'`)
