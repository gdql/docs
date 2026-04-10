---
title: Advanced queries
description: "Multi-clause GDQL queries — exclusion, three-song chains, era comparisons, COUNT shortcuts, and more."
weight: 14
---


This page is where GDQL stops being a list filter and starts answering the questions Deadheads actually argue about. Every query below was verified against the live dataset and returns real results — click **▶ Try it** under any block to run it in the [sandbox](https://sandbox.gdql.dev).

If you're new to GDQL, start with [Getting started]({{< relref "getting-started" >}}) and [Example queries]({{< relref "examples" >}}) first.

---

## Exclusion: NOT PLAYED

`NOT PLAYED` is the negative-space tool. Use it to find shows that included one song but explicitly *didn't* include another — perfect for spotting unusual omissions or hunting the post-Pigpen and post-Brent eras.

{{< gdql >}}
SHOWS WHERE PLAYED "Dark Star" AND NOT PLAYED "Saint Stephen" LIMIT 10;
{{< /gdql >}}

Scarlet Begonias played without Fire on the Mountain after Fire's 1977 debut — vanishingly rare:

{{< gdql >}}
SHOWS AFTER 1980 WHERE PLAYED "Scarlet Begonias" AND NOT PLAYED "Fire on the Mountain" LIMIT 10;
{{< /gdql >}}

The short form drops the `PLAYED` keyword:

{{< gdql >}}
SHOWS WHERE PLAYED "Truckin'" AND NOT "Drums" LIMIT 10;
{{< /gdql >}}

---

## Multi-clause filtering

Stack venue, era, segue, and additional conditions to ask very specific questions.

The Winterland '77–'78 Scarlet → Fire shows that *also* played Estimated Prophet:

{{< gdql >}}
SHOWS AT "Winterland" FROM 1977-1978 WHERE "Scarlet Begonias" > "Fire on the Mountain" AND PLAYED "Estimated Prophet" ORDER BY DATE LIMIT 10;
{{< /gdql >}}

Fillmore '69 shows that opened with Dark Star and brought back Saint Stephen:

{{< gdql >}}
SHOWS AT "Fillmore" FROM 1969 WHERE OPENER "Dark Star" AND PLAYED "Saint Stephen";
{{< /gdql >}}

Shows that opened with either Jack Straw or Bertha — the two classic first-set openers:

{{< gdql >}}
SHOWS WHERE OPENER "Jack Straw" OR OPENER "Bertha" LIMIT 20;
{{< /gdql >}}

How many times they played Eyes of the World in 1974, the song's first full year:

{{< gdql >}}
COUNT "Eyes of the World" FROM 1974;
{{< /gdql >}}

---

## Three-song segues with extra conditions

Help → Slip → Frank that *also* featured Dark Star turns out to have happened exactly once: 9/10/91 at Madison Square Garden.

{{< gdql >}}
SHOWS WHERE "Help on the Way" > "Slipknot!" > "Franklin's Tower" AND PLAYED "Dark Star";
{{< /gdql >}}

The classic primal trio at the Fillmore West:

{{< gdql >}}
SHOWS AT "Fillmore West" WHERE "Dark Star" > "Saint Stephen" > "The Eleven" ORDER BY DATE;
{{< /gdql >}}

China → Rider at the Spectrum in Philly:

{{< gdql >}}
SHOWS AT "Spectrum" WHERE "China Cat Sunflower" > "I Know You Rider";
{{< /gdql >}}

---

## OPENER / CLOSER with segue chains

`OPENER` and `CLOSER` accept parenthesized segue chains, so you can ask about shows that opened or closed with a specific multi-song sequence.

Shows that opened with Help > Slipknot!:

{{< gdql >}}
SHOWS WHERE OPENER ("Help on the Way" > "Slipknot!");
{{< /gdql >}}

Shows that opened with Help > Slip and closed with Brokedown Palace:

{{< gdql >}}
SHOWS WHERE OPENER ("Help on the Way" > "Slipknot!") AND CLOSER "Brokedown Palace";
{{< /gdql >}}

Shows that closed with Throwin' Stones > Not Fade Away:

{{< gdql >}}
SHOWS WHERE CLOSER ("Throwin' Stones" > "Not Fade Away");
{{< /gdql >}}

---

## Set position with date filters

Bertha openers in the early Brent era:

{{< gdql >}}
SHOWS FROM 1979-1981 WHERE OPENER "Bertha" ORDER BY DATE;
{{< /gdql >}}

Late-era Morning Dew closers — a rare and emotionally loaded combo:

{{< gdql >}}
SHOWS AFTER 1985 WHERE CLOSER "Morning Dew" ORDER BY DATE;
{{< /gdql >}}

---

## COUNT with all the trimmings

`COUNT` answers "how many?" for songs and shows alike. Combine it with date ranges, eras, and now `WHERE` conditions for instant trivia.

How many Dark Stars during the Brent era?

{{< gdql >}}
COUNT "Dark Star" FROM BRENT_ERA;
{{< /gdql >}}

How many shows in the band's first decade?

{{< gdql >}}
COUNT SHOWS BEFORE 1976;
{{< /gdql >}}

How many Scarlet Begonias performances after 1977?

{{< gdql >}}
COUNT "Scarlet Begonias" AFTER 1977;
{{< /gdql >}}

How many times did they play Help > Slip > Frank?

{{< gdql >}}
COUNT SHOWS WHERE "Help on the Way" > "Slipknot!" > "Franklin's Tower";
{{< /gdql >}}

How many shows opened with Bertha?

{{< gdql >}}
COUNT SHOWS WHERE OPENER "Bertha";
{{< /gdql >}}

How many songs in the catalog mention both *sun* and *shine*?

{{< gdql >}}
SONGS WITH LYRICS("sun", "shine") AS COUNT;
{{< /gdql >}}

---

## FIRST and LAST

`FIRST` and `LAST` are shortcuts for "the very first / very last time this song was played".

The first Help on the Way:

{{< gdql >}}
FIRST "Help on the Way";
{{< /gdql >}}

The last Saint Stephen the band ever played:

{{< gdql >}}
LAST "Saint Stephen";
{{< /gdql >}}

The last Dark Star — a famous bookend, March 30, 1994:

{{< gdql >}}
LAST "Dark Star";
{{< /gdql >}}

---

## Comparing eras

How many shows in each era? Run them side-by-side and see how the band's intensity rose and fell.

{{< gdql >}}
COUNT SHOWS FROM PRIMAL;
{{< /gdql >}}

{{< gdql >}}
COUNT SHOWS FROM EUROPE72;
{{< /gdql >}}

{{< gdql >}}
COUNT SHOWS FROM BRENT_ERA;
{{< /gdql >}}

{{< gdql >}}
COUNT SHOWS FROM VINCE_ERA;
{{< /gdql >}}

---

## Discovery: random show from an era

`RANDOM SHOW` is the "I want to listen to something new tonight" command. Pair it with an era to scope the wandering.

{{< gdql >}}
RANDOM SHOW FROM PRIMAL;
{{< /gdql >}}

{{< gdql >}}
RANDOM SHOW FROM EUROPE72;
{{< /gdql >}}

{{< gdql >}}
RANDOM SHOW FROM BRENT_ERA;
{{< /gdql >}}

---

## Lyric search

Find songs by what they say, not what they're called. Lyrics are matched as whole words — `"sun"` finds songs with the word "sun" but won't match "Sunday" or "sunshine".

Songs that mention both the sun and shine:

{{< gdql >}}
SONGS WITH LYRICS("sun", "shine");
{{< /gdql >}}

Songs about trains and roads:

{{< gdql >}}
SONGS WITH LYRICS("train", "road");
{{< /gdql >}}

Separate LYRICS conditions with AND — find songs that mention both "sun" and "train" anywhere in the lyrics:

{{< gdql >}}
SONGS WITH LYRICS("sun") AND LYRICS("train");
{{< /gdql >}}

Just the count for "rose":

{{< gdql >}}
SONGS WITH LYRICS("rose") AS COUNT;
{{< /gdql >}}

---

## Output format showcase

Same data, different shapes. Pipe JSON into `jq` for ad-hoc analysis, or grab CSV for a spreadsheet.

{{< gdql >}}
SHOWS AT "Winterland" FROM 1977 LIMIT 5 AS JSON;
{{< /gdql >}}

{{< gdql >}}
SHOWS AT "Winterland" FROM 1977 LIMIT 5 AS CSV;
{{< /gdql >}}

---

## The Cornell '77 question

Three different ways to ask about the most famous show in the band's history:

{{< gdql >}}
SETLIST FOR 5/8/77;
{{< /gdql >}}

{{< gdql >}}
SHOWS AT "Barton Hall";
{{< /gdql >}}

{{< gdql >}}
SHOWS WHERE "Scarlet Begonias" > "Fire on the Mountain" AND PLAYED "Morning Dew" ORDER BY DATE;
{{< /gdql >}}

---

## Quick reference

| Pattern | Example |
|---------|---------|
| Venue + era + segue + condition | `SHOWS AT "X" FROM era WHERE "A" > "B" AND PLAYED "C"` |
| Three-song chain + extra condition | `SHOWS WHERE "A" > "B" > "C" AND PLAYED "D"` |
| Exclusion | `SHOWS WHERE PLAYED "X" AND NOT PLAYED "Y"` |
| Opener segue chain | `SHOWS WHERE OPENER ("A" > "B")` |
| Opener + closer combo | `SHOWS WHERE OPENER ("A" > "B") AND CLOSER "C"` |
| Separate LYRICS with AND | `SONGS WITH LYRICS("x") AND LYRICS("y")` |
| Count over a date range | `COUNT "song" AFTER year` (or `BEFORE`/`FROM`) |
| Count with WHERE | `COUNT SHOWS WHERE "A" > "B"` |
| Songs as a count with filter | `SONGS WITH LYRICS("x", "y") AS COUNT` |
| Random within an era | `RANDOM SHOW FROM era` |
| Set-position filter | `SHOWS FROM year WHERE OPENER "X"` |
| First / last performance | `FIRST "song"`, `LAST "song"` |
