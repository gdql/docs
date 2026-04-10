---
title: Example queries
description: "Ready-to-run GDQL examples: shows by year, venue, and segue, setlists, song search, performances, and output formats."
weight: 12
---


Ready-to-run GDQL for common tasks. Click **Try it** to run any query in the [sandbox](https://sandbox.gdql.dev). See the [language reference]({{< relref "reference" >}}) for full syntax.

---

## Shows by year and era

Use `FROM` with a year, a range, or a named era.

```gdql
-- All shows in 1977
SHOWS FROM 1977;

-- Two-digit years work (77 = 1977)
SHOWS FROM 77;

-- Year range, sorted by date
SHOWS FROM 1977-1980 ORDER BY DATE;

-- Named eras
SHOWS FROM PRIMAL;       -- 1965-1969
SHOWS FROM EUROPE72;     -- Spring 1972 Europe tour
SHOWS FROM BRENT_ERA;    -- 1979-1990

-- Most recent 1972 shows
SHOWS FROM 1972 ORDER BY DATE DESC LIMIT 5;
```

[Try: 1977](https://sandbox.gdql.dev?q=U0hPV1MgRlJPTSAxOTc3Ow&run=1) | [Try: 1977-1980](https://sandbox.gdql.dev?q=U0hPV1MgRlJPTSAxOTc3LTE5ODAgT1JERVIgQlkgREFURTs&run=1) | [Try: PRIMAL](https://sandbox.gdql.dev?q=U0hPV1MgRlJPTSBQUklNQUw7&run=1)

---

## Shows at a venue

Use `AT` to search by venue name or city. Partial matches work.

```gdql
-- All Fillmore West shows in 1969
SHOWS AT "Fillmore West" FROM 1969;

-- All Winterland shows in 1977
SHOWS AT "Winterland" FROM 1977;

-- Shows in New York
SHOWS AT "New York" LIMIT 20;
```

[Try: Fillmore West](https://sandbox.gdql.dev?q=U0hPV1MgQVQgIkZpbGxtb3JlIFdlc3QiIEZST00gMTk2OTs&run=1) | [Try: Winterland](https://sandbox.gdql.dev?q=U0hPV1MgQVQgIldpbnRlcmxhbmQiIEZST00gMTk3Nzs&run=1) | [Try: New York](https://sandbox.gdql.dev?q=U0hPV1MgQVQgIk5ldyBZb3JrIiBMSU1JVCAyMDs&run=1)

---

## Shows with a specific segue

Find shows where songs were played consecutively. The `>` operator means "followed by" -- the songs appeared back-to-back in the same set.

```gdql
-- The classic Scarlet > Fire
SHOWS FROM 77-80 WHERE "Scarlet Begonias" > "Fire on the Mountain";

-- Three-song chain
SHOWS WHERE "Help on the Way" > "Slipknot!" > "Franklin's Tower";

-- INTO is an alias for >
SHOWS WHERE "China Cat Sunflower" INTO "I Know You Rider";
```

[Try: Scarlet > Fire](https://sandbox.gdql.dev?q=U0hPV1MgRlJPTSA3Ny04MCBXSEVSRSAiU2NhcmxldCBCZWdvbmlhcyIgPiAiRmlyZSBvbiB0aGUgTW91bnRhaW4iOw&run=1) | [Try: Help > Slip > Frank](https://sandbox.gdql.dev?q=U0hPV1MgV0hFUkUgIkhlbHAgb24gdGhlIFdheSIgPiAiU2xpcGtub3QhIiA-ICJGcmFua2xpbidzIFRvd2VyIjs&run=1) | [Try: China > Rider](https://sandbox.gdql.dev?q=U0hPV1MgV0hFUkUgIkNoaW5hIENhdCBTdW5mbG93ZXIiIElOVE8gIkkgS25vdyBZb3UgUmlkZXIiOw&run=1)

Other transition types:

```gdql
-- >> or THEN: played in sequence (with a break between)
SHOWS WHERE "Estimated Prophet" THEN "Eyes of the World";

-- ~> or TEASE: one song teased during another
SHOWS WHERE "Dark Star" ~> "Saint Stephen";
```

---

## How many times was it played?

Use `COUNT` to get a quick tally.

```gdql
COUNT "Dark Star";
COUNT "Scarlet Begonias";
COUNT "Dark Star" FROM 1972-1974;
```

[Try: Dark Star](https://sandbox.gdql.dev?q=Q09VTlQgIkRhcmsgU3RhciI7&run=1) | [Try: Scarlet](https://sandbox.gdql.dev?q=Q09VTlQgIlNjYXJsZXQgQmVnb25pYXMiOw&run=1) | [Try: Dark Star 72-74](https://sandbox.gdql.dev?q=Q09VTlQgIkRhcmsgU3RhciIgRlJPTSAxOTcyLTE5NzQ7&run=1)

---

## Set position

Query by where a song appeared in the show structure.

```gdql
-- First set openers
SHOWS WHERE SET1 OPENED "Jack Straw";

-- Second set closers
SHOWS WHERE SET2 CLOSED "Sugar Magnolia";

-- Encore
SHOWS WHERE ENCORE = "U.S. Blues";
SHOWS WHERE ENCORE = "One More Saturday Night";
```

[Try: SET1 OPENED](https://sandbox.gdql.dev?q=U0hPV1MgV0hFUkUgU0VUMSBPUEVORUQgIkphY2sgU3RyYXciOw&run=1) | [Try: ENCORE](https://sandbox.gdql.dev?q=U0hPV1MgV0hFUkUgRU5DT1JFID0gIlUuUy4gQmx1ZXMiOw&run=1)

---

## Played / guest

Find shows that included a specific song, or featured a guest musician.

```gdql
-- Shows with both Dark Star and Saint Stephen
SHOWS WHERE PLAYED "Dark Star" AND PLAYED "Saint Stephen";

-- Eyes of the World in 1977
SHOWS FROM 1977 WHERE PLAYED "Eyes of the World";

-- Guest sit-ins
SHOWS WHERE GUEST "Branford Marsalis";
```

[Try: Dark Star AND St. Stephen](https://sandbox.gdql.dev?q=U0hPV1MgV0hFUkUgUExBWUVEICJEYXJrIFN0YXIiIEFORCBQTEFZRUQgIlNhaW50IFN0ZXBoZW4iOw&run=1) | [Try: Eyes 1977](https://sandbox.gdql.dev?q=U0hPV1MgRlJPTSAxOTc3IFdIRVJFIFBMQVlFRCAiRXllcyBvZiB0aGUgV29ybGQiOw&run=1)

---

## Combining conditions

Use `AND` and `OR` to build complex queries.

```gdql
-- Scarlet > Fire AND Estimated Prophet in the same show
SHOWS FROM 1977 WHERE "Scarlet Begonias" > "Fire on the Mountain"
  AND PLAYED "Estimated Prophet";

-- Scarlet > Fire at Winterland
SHOWS AT "Winterland" WHERE "Scarlet Begonias" > "Fire on the Mountain";

-- Shows opened by Jack Straw or Bertha
SHOWS WHERE SET1 OPENED "Jack Straw" OR SET1 OPENED "Bertha";
```

[Try: Scarlet + Estimated](https://sandbox.gdql.dev?q=U0hPV1MgRlJPTSAxOTc3IFdIRVJFICJTY2FybGV0IEJlZ29uaWFzIiA-ICJGaXJlIG9uIHRoZSBNb3VudGFpbiIgQU5EIFBMQVlFRCAiRXN0aW1hdGVkIFByb3BoZXQiOw&run=1) | [Try: Winterland Scarlet > Fire](https://sandbox.gdql.dev?q=U0hPV1MgQVQgIldpbnRlcmxhbmQiIFdIRVJFICJTY2FybGV0IEJlZ29uaWFzIiA-ICJGaXJlIG9uIHRoZSBNb3VudGFpbiI7&run=1)

---

## Setlist for a date

Get the full setlist for a specific show.

```gdql
-- Cornell '77 (the famous one)
SETLIST FOR 5/8/77;

-- Closing of Winterland, New Year's '78
SETLIST FOR 12/31/78;

-- Veneta '72
SETLIST FOR 8/27/72;
```

[Try: Cornell '77](https://sandbox.gdql.dev?q=U0VUTElTVCBGT1IgNS84Lzc3Ow&run=1) | [Try: Winterland '78](https://sandbox.gdql.dev?q=U0VUTElTVCBGT1IgMTIvMzEvNzg7&run=1)

---

## Song search

Find songs by lyrics keywords.

```gdql
-- Songs with "sun" in the lyrics
SONGS WITH LYRICS("sun");

-- Multiple keywords (must contain all)
SONGS WITH LYRICS("train", "road");

-- Lyrics + date range
SONGS WITH LYRICS("sun", "shine") WRITTEN 1968-1972;
```

[Try: "sun"](https://sandbox.gdql.dev?q=U09OR1MgV0lUSCBMWVJJQ1MoInN1biIpOw&run=1) | [Try: WRITTEN 1968-1970](https://sandbox.gdql.dev?q=U09OR1MgV1JJVFRFTiAxOTY4LTE5NzA7&run=1)

---

## Performances of a song

Find every time a song was played, with optional filters.

```gdql
-- All Dark Star performances
PERFORMANCES OF "Dark Star";

-- Dark Star in the early 70s
PERFORMANCES OF "Dark Star" FROM 1972-1974;

-- Scarlet Begonias in the late 70s
PERFORMANCES OF "Scarlet Begonias" FROM 77-79 ORDER BY DATE DESC LIMIT 20;
```

[Try: Dark Star](https://sandbox.gdql.dev?q=UEVSRk9STUFOQ0VTIE9GICJEYXJrIFN0YXIiOw&run=1) | [Try: Dark Star 72-74](https://sandbox.gdql.dev?q=UEVSRk9STUFOQ0VTIE9GICJEYXJrIFN0YXIiIEZST00gMTk3Mi0xOTc0Ow&run=1)

---

## Output formats

Results default to a table. Use `AS` to change the format.

```gdql
SHOWS FROM 1977 LIMIT 3 AS TABLE;
SHOWS FROM 1977 LIMIT 3 AS JSON;
SHOWS FROM 1977 LIMIT 3 AS CSV;
```

[Try: JSON](https://sandbox.gdql.dev?q=U0hPV1MgRlJPTSAxOTc3IExJTUlUIDMgQVMgSlNPTjs&run=1) | [Try: CSV](https://sandbox.gdql.dev?q=U0hPV1MgRlJPTSAxOTc3IExJTUlUIDMgQVMgQ1NWOw&run=1)

---

## Quick reference

| Goal | Example | Try it |
|------|---------|--------|
| Shows in a year | `SHOWS FROM 1977` | [Try](https://sandbox.gdql.dev?q=U0hPV1MgRlJPTSAxOTc3Ow&run=1) |
| Shows at a venue | `SHOWS AT "Fillmore West"` | [Try](https://sandbox.gdql.dev?q=U0hPV1MgQVQgIkZpbGxtb3JlIFdlc3QiIEZST00gMTk2OTs&run=1) |
| Famous segue | `SHOWS WHERE "Scarlet Begonias" > "Fire on the Mountain"` | [Try](https://sandbox.gdql.dev?q=U0hPV1MgRlJPTSA3Ny04MCBXSEVSRSAiU2NhcmxldCBCZWdvbmlhcyIgPiAiRmlyZSBvbiB0aGUgTW91bnRhaW4iOw&run=1) |
| How many times? | `COUNT "Dark Star"` | [Try](https://sandbox.gdql.dev?q=Q09VTlQgIkRhcmsgU3RhciI7&run=1) |
| Setlist for a date | `SETLIST FOR 5/8/77` | [Try](https://sandbox.gdql.dev?q=U0VUTElTVCBGT1IgNS84Lzc3Ow&run=1) |
| Songs with lyrics | `SONGS WITH LYRICS("train", "road")` | [Try](https://sandbox.gdql.dev?q=U09OR1MgV0lUSCBMWVJJQ1MoInRyYWluIiwgInJvYWQiKTs&run=1) |
| Long performances | `PERFORMANCES OF "Dark Star" WITH LENGTH > 20min` | [Try](https://sandbox.gdql.dev?q=UEVSRk9STUFOQ0VTIE9GICJEYXJrIFN0YXIiIFdJVEggTEVOR1RIID4gMjBtaW4gT1JERVIgQlkgTEVOR1RIIERFU0MgTElNSVQgNTs&run=1) |
| Opener / closer | `SHOWS WHERE SET1 OPENED "Jack Straw"` | [Try](https://sandbox.gdql.dev?q=U0hPV1MgV0hFUkUgU0VUMSBPUEVORUQgIkphY2sgU3RyYXciOw&run=1) |
| Encore | `SHOWS WHERE ENCORE = "U.S. Blues"` | [Try](https://sandbox.gdql.dev?q=U0hPV1MgV0hFUkUgRU5DT1JFID0gIlUuUy4gQmx1ZXMiOw&run=1) |
