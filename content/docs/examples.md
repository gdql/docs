---
title: Example queries
description: "Ready-to-run GDQL: shows by year and venue, segues, setlists, song search, performances, output formats."
weight: 12
---


This page is the cookbook. Every query below is verified against the live database and ready to run — click **▶ Try it in sandbox** under any block to open it in the [sandbox](https://sandbox.gdql.dev). For multi-clause questions, jump to [Advanced queries]({{< relref "advanced" >}}). For the full grammar, see the [language reference]({{< relref "reference" >}}).

---

## Shows by year and era

Use `FROM` with a year, a range, or a named era. Two-digit shorthand always means 19xx.

{{< gdql >}}
SHOWS FROM 1977;
{{< /gdql >}}

{{< gdql >}}
SHOWS FROM 1977-1980 ORDER BY DATE;
{{< /gdql >}}

{{< gdql >}}
SHOWS FROM PRIMAL;
{{< /gdql >}}

{{< gdql >}}
SHOWS FROM EUROPE72;
{{< /gdql >}}

{{< gdql >}}
SHOWS FROM BRENT_ERA;
{{< /gdql >}}

{{< gdql >}}
SHOWS FROM 1972 ORDER BY DATE DESC LIMIT 5;
{{< /gdql >}}

---

## Shows at a venue or city

`AT` does a partial-match lookup against venues and cities. `AT "Fillmore"` matches both Fillmore West and Fillmore East; `AT "New York"` matches every NYC venue.

{{< gdql >}}
SHOWS AT "Fillmore West" FROM 1969;
{{< /gdql >}}

{{< gdql >}}
SHOWS AT "Winterland" FROM 1977;
{{< /gdql >}}

{{< gdql >}}
SHOWS AT "New York" LIMIT 20;
{{< /gdql >}}

{{< gdql >}}
SHOWS AT "Madison Square Garden" LIMIT 10;
{{< /gdql >}}

---

## Segue queries

Find shows where one song flowed into another. The `>` operator matches songs that are adjacent in the setlist (position-based). `>>` (or `THEN`) means *followed by, with a pause*. `->` is an alias for `>`. Chain multiple songs to match multi-song sequences.

{{< gdql >}}
SHOWS FROM 77-80 WHERE "Scarlet Begonias" > "Fire on the Mountain";
{{< /gdql >}}

{{< gdql >}}
SHOWS WHERE "Help on the Way" > "Slipknot!" > "Franklin's Tower";
{{< /gdql >}}

{{< gdql >}}
SHOWS WHERE "China Cat Sunflower" INTO "I Know You Rider";
{{< /gdql >}}

{{< gdql >}}
SHOWS WHERE "Estimated Prophet" THEN "Eyes of the World";
{{< /gdql >}}

{{< gdql >}}
SHOWS WHERE "Dark Star" -> "Saint Stephen";
{{< /gdql >}}

---

## How many times was it played?

`COUNT` is the fast answer for "how many?" questions.

{{< gdql >}}
COUNT "Dark Star";
{{< /gdql >}}

{{< gdql >}}
COUNT "Scarlet Begonias";
{{< /gdql >}}

{{< gdql >}}
COUNT "Dark Star" FROM 1972-1974;
{{< /gdql >}}

{{< gdql >}}
COUNT "Scarlet Begonias" AFTER 1977;
{{< /gdql >}}

{{< gdql >}}
COUNT "Saint Stephen" BEFORE 1972;
{{< /gdql >}}

---

## Set position

Filter by where a song appeared in the show structure: opener, set 1 closer, encore, etc.

{{< gdql >}}
SHOWS WHERE SET1 OPENED "Jack Straw";
{{< /gdql >}}

{{< gdql >}}
SHOWS WHERE OPENER "Bertha";
{{< /gdql >}}

{{< gdql >}}
SHOWS WHERE SET2 CLOSED "Sugar Magnolia";
{{< /gdql >}}

{{< gdql >}}
SHOWS WHERE ENCORE = "U.S. Blues";
{{< /gdql >}}

{{< gdql >}}
SHOWS WHERE CLOSER "Morning Dew";
{{< /gdql >}}

---

## Played

`PLAYED` is the simple "this song appeared somewhere in the show" filter.

{{< gdql >}}
SHOWS WHERE PLAYED "Dark Star" AND PLAYED "Saint Stephen";
{{< /gdql >}}

{{< gdql >}}
SHOWS FROM 1977 WHERE PLAYED "Eyes of the World";
{{< /gdql >}}

---

## Combining conditions

Stack `AND` and `OR` to build sharper questions.

{{< gdql >}}
SHOWS FROM 1977 WHERE "Scarlet Begonias" > "Fire on the Mountain" AND PLAYED "Estimated Prophet";
{{< /gdql >}}

{{< gdql >}}
SHOWS AT "Winterland" WHERE "Scarlet Begonias" > "Fire on the Mountain";
{{< /gdql >}}

{{< gdql >}}
SHOWS WHERE SET1 OPENED "Jack Straw" OR SET1 OPENED "Bertha";
{{< /gdql >}}

---

## Setlist for a date

Pull the full setlist for one show.

{{< gdql >}}
SETLIST FOR 5/8/77;
{{< /gdql >}}

{{< gdql >}}
SETLIST FOR 12/31/78;
{{< /gdql >}}

{{< gdql >}}
SETLIST FOR 8/27/72;
{{< /gdql >}}

---

## Song search by lyrics

Search the lyric database. Words are matched as whole words (not substrings), and multiple words are AND-ed together — every word must appear.

{{< gdql >}}
SONGS WITH LYRICS("sun");
{{< /gdql >}}

{{< gdql >}}
SONGS WITH LYRICS("train", "road");
{{< /gdql >}}

{{< gdql >}}
SONGS WITH LYRICS("rose") AS COUNT;
{{< /gdql >}}

---

## Performances of a song

`PERFORMANCES OF` returns one row per time a song was played, with date and venue.

{{< gdql >}}
PERFORMANCES OF "Dark Star";
{{< /gdql >}}

{{< gdql >}}
PERFORMANCES OF "Dark Star" FROM 1972-1974;
{{< /gdql >}}

{{< gdql >}}
PERFORMANCES OF "Scarlet Begonias" FROM 77-79 ORDER BY DATE DESC LIMIT 20;
{{< /gdql >}}

---

## Output formats

Default output is an aligned table. Use `AS` to switch to JSON, CSV, or an inline-setlist view.

{{< gdql >}}
SHOWS FROM 1977 LIMIT 3 AS JSON;
{{< /gdql >}}

{{< gdql >}}
SHOWS FROM 1977 LIMIT 3 AS CSV;
{{< /gdql >}}

Pipe JSON output into `jq` to slice and dice in the shell:

```bash
gdql "SHOWS FROM 1977 AS JSON" | jq '.[].venue' | sort -u
```

---

## Quick reference

| Goal | Example |
|------|---------|
| Shows in a year | `SHOWS FROM 1977` |
| Shows at a venue | `SHOWS AT "Fillmore West"` |
| Famous segue | `SHOWS WHERE "Scarlet Begonias" > "Fire on the Mountain"` |
| How many times? | `COUNT "Dark Star"` |
| Setlist for a date | `SETLIST FOR 5/8/77` |
| Songs with lyrics | `SONGS WITH LYRICS("train", "road")` |
| Performances in a range | `PERFORMANCES OF "Dark Star" FROM 1972-1974` |
| Opener / closer | `SHOWS WHERE OPENER "Jack Straw"` |
| Opener segue chain | `SHOWS WHERE OPENER ("Help on the Way" > "Slipknot!")` |
| Encore | `SHOWS WHERE ENCORE = "U.S. Blues"` |
| Random show in an era | `RANDOM SHOW FROM EUROPE72` |
| First / last performance | `FIRST "Help on the Way"`, `LAST "Saint Stephen"` |

Want more complex examples? See [Advanced queries]({{< relref "advanced" >}}).
