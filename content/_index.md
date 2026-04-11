---
title: GDQL Documentation
description: "GDQL is a query language for the Grateful Dead discography. Find segues, setlists, lyrics, and 30 years of live history with one CLI."
---

## What is it

**GDQL** is a SQL-flavored query language for the Grateful Dead discography. Ask questions like *"every show where Scarlet went into Fire,"* *"the last time they played St. Stephen,"* or *"random show from the Brent era"* — get answers in milliseconds.

It ships as a single binary with the dataset baked in. Run it from the terminal, embed it in your app, or use it in the browser.

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
- **[Cookbook &mdash; recipes for every question a Deadhead might ask
- **[Language reference]({{< relref "/docs/reference" >}})** — every keyword, clause, and operator
- **[Sandbox](https://sandbox.gdql.dev)** — run queries in your browser, no install required

---

## At a glance

- Keywords are **case-insensitive** (`SHOWS` = `shows`)
- Song names use **double quotes** (`"Dark Star"`)
- Comments start with `--`
- Statements end with `;` (optional, required between multiple)
- Fuzzy matching forgives spelling and punctuation (`Truckin` finds `Truckin'`)
