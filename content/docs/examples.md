---
title: Example queries
description: "Ready-to-run GDQL examples: shows by year, venue, and segue, setlists, song search, performances, and output formats."
weight: 12
---

# Example queries

Ready-to-run GDQL for common tasks. See the [language reference]({{< relref "reference" >}}) for full syntax.

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
SHOWS FROM PRIMAL;       -- 1965–1969
SHOWS FROM EUROPE72;     -- Spring 1972 Europe tour
SHOWS FROM BRENT_ERA;    -- 1979–1990

-- Most recent 1972 shows
SHOWS FROM 1972 ORDER BY DATE DESC LIMIT 5;
```

---

## Shows at a venue

Use `AT` to search by venue name or city. Partial matches work.

```gdql
-- All Fillmore West shows
SHOWS AT "Fillmore West";

-- Fillmore West in 1969
SHOWS AT "Fillmore" FROM 1969;

-- All Winterland shows
SHOWS AT "Winterland";

-- Shows in New York
SHOWS AT "New York" LIMIT 20;
```

---

## Shows with a specific segue

Find shows where songs were played consecutively. The `>` operator means
"followed by" — the songs appeared back-to-back in the same set.

```gdql
-- The classic Scarlet > Fire
SHOWS FROM 77-80 WHERE "Scarlet Begonias" > "Fire on the Mountain";

-- Three-song chain
SHOWS WHERE "Help on the Way" > "Slipknot!" > "Franklin's Tower";

-- INTO is an alias for >
SHOWS WHERE "China Cat Sunflower" INTO "I Know You Rider";
```

Other transition types:

```gdql
-- >> or THEN: played in sequence (with a break between)
SHOWS WHERE "Estimated Prophet" THEN "Eyes of the World";

-- ~> or TEASE: one song teased during another
SHOWS WHERE "Dark Star" ~> "Saint Stephen";
```

---

## Set position

Query by where a song appeared in the show structure.

```gdql
-- First set openers
SHOWS WHERE SET1 OPENED "Jack Straw";
SHOWS WHERE SET1 OPENED "Bertha";

-- Second set closers
SHOWS WHERE SET2 CLOSED "Sugar Magnolia";

-- Encore
SHOWS WHERE ENCORE = "U.S. Blues";
SHOWS WHERE ENCORE = "One More Saturday Night";
```

---

## Played / guest

Find shows that included a specific song, or featured a guest musician.

```gdql
-- Shows with both Dark Star and Saint Stephen
SHOWS WHERE PLAYED "Dark Star" AND PLAYED "Saint Stephen";

-- Eyes of the World in 1977
SHOWS FROM 1977 WHERE PLAYED "Eyes of the World";

-- Morning Dew in 1972
SHOWS FROM 72 WHERE PLAYED "Morning Dew";

-- Guest sit-ins
SHOWS WHERE GUEST "Branford Marsalis";
```

---

## Combining conditions

Use `AND` and `OR` to build complex queries.

```gdql
-- Scarlet > Fire AND Estimated Prophet in the same show
SHOWS FROM 1977 WHERE "Scarlet Begonias" > "Fire on the Mountain"
  AND PLAYED "Estimated Prophet";

-- Shows opened by Jack Straw or Bertha
SHOWS WHERE SET1 OPENED "Jack Straw" OR SET1 OPENED "Bertha";

-- Help > Slip > Frank AND Estimated Prophet
SHOWS WHERE "Help on the Way" > "Slipknot!" > "Franklin's Tower"
  AND PLAYED "Estimated Prophet";
```

---

## Venue + date + segue

Clauses compose freely:

```gdql
-- Scarlet > Fire at Winterland
SHOWS AT "Winterland" WHERE "Scarlet Begonias" > "Fire on the Mountain";

-- 1977 Fillmore shows with Dark Star
SHOWS AT "Fillmore" FROM 1977 WHERE PLAYED "Dark Star";
```

---

## Setlist for a date

Get the full setlist for a specific show.

```gdql
-- Cornell '77 (the famous one)
SETLIST FOR 5/8/77;

-- Veneta '72
SETLIST FOR 8/27/72;

-- Closing of Winterland, New Year's '78
SETLIST FOR 12/31/78;

-- Grateful Dead meet the Mets, 3/29/90
SETLIST FOR 3/29/90;
```

---

## Song search

Find songs by lyrics keywords.

```gdql
-- All songs (limited)
SONGS LIMIT 50;

-- Songs with "train" in the lyrics
SONGS WITH LYRICS("train");

-- Multiple keywords (must contain all)
SONGS WITH LYRICS("train", "road");

-- Lyrics + date range
SONGS WITH LYRICS("sun", "shine") WRITTEN 1968-1972;
```

Songs written in a range:

```gdql
SONGS WRITTEN 1968-1970;
SONGS WRITTEN 1970;
```

---

## Performances of a song

Find every time a song was played, with optional filters.

```gdql
-- All Dark Star performances
PERFORMANCES OF "Dark Star";

-- Dark Star in the early 70s
PERFORMANCES OF "Dark Star" FROM 1972-1974;

-- Long Dark Stars (requires length data)
PERFORMANCES OF "Dark Star" WITH LENGTH > 20min ORDER BY LENGTH DESC LIMIT 5;

-- Scarlet Begonias in the late 70s
PERFORMANCES OF "Scarlet Begonias" FROM 77-79 ORDER BY DATE DESC LIMIT 20;
```

---

## Output formats

Results default to a table. Use `AS` to change the format.

```gdql
-- Table (default)
SHOWS FROM 1977 LIMIT 3 AS TABLE;

-- JSON
SHOWS FROM 1977 LIMIT 3 AS JSON;

-- CSV (great for piping to other tools)
SHOWS FROM 1977 LIMIT 3 AS CSV;

-- Setlist-style
SHOWS FROM 1977 LIMIT 3 AS SETLIST;
```

---

## Quick reference

| Goal | Example |
|------|---------|
| Shows in a year | `SHOWS FROM 1977` |
| Shows at a venue | `SHOWS AT "Fillmore West"` |
| Famous segue | `SHOWS WHERE "Scarlet Begonias" > "Fire on the Mountain"` |
| Setlist for a date | `SETLIST FOR 5/8/77` |
| Songs with lyrics | `SONGS WITH LYRICS("train", "road")` |
| Long performances | `PERFORMANCES OF "Dark Star" WITH LENGTH > 20min` |
| Opener / closer | `SHOWS WHERE SET1 OPENED "Jack Straw"` |
| Encore | `SHOWS WHERE ENCORE = "U.S. Blues"` |
| Combine filters | `SHOWS AT "Winterland" FROM 77 WHERE PLAYED "Dark Star"` |
