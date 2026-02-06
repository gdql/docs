---
title: Example queries
description: "Ready-to-run GDQL examples: shows by year and segue, setlists, song search, long performances."
weight: 12
---

# Example queries

Ready-to-run GDQL for common tasks. See the [language reference]({{< relref "reference" >}}) for full syntax.

---

## Shows by year and era

```gdql
SHOWS FROM 1977 LIMIT 10;
SHOWS FROM 77;
SHOWS FROM 1977-1980 ORDER BY DATE;
SHOWS FROM 77-80 LIMIT 25;
SHOWS FROM PRIMAL;
SHOWS FROM EUROPE72;
SHOWS FROM BRENT_ERA;
SHOWS FROM 1972 ORDER BY DATE DESC LIMIT 5;
```

**{{< sandbox "shows" "Try in Sandbox" >}}** · **{{< sandbox "shows-77" "FROM 1977" >}}** · **{{< sandbox "shows-range" "1977–1980" >}}** · **{{< sandbox "shows-primal" "PRIMAL" >}}** · **{{< sandbox "shows-77-80-limit" "LIMIT" >}}** · **{{< sandbox "shows-77-order" "ORDER BY" >}}**

---

## Shows with a specific segue

Find shows where one song segued into another (no break):

```gdql
SHOWS FROM 1977 WHERE "Scarlet Begonias" > "Fire on the Mountain";
SHOWS FROM 77-80 WHERE "Help on the Way" > "Slipknot!" > "Franklin's Tower";
SHOWS WHERE "China Cat Sunflower" INTO "I Know You Rider";
SHOWS FROM 1974 WHERE "Weather Report Suite" > "Let It Grow";
```

**{{< sandbox "scarlet-fire" "Scarlet→Fire" >}}** · **{{< sandbox "help-slip-frank" "Help→Slip→Franklin's" >}}**

Followed by (with break):

```gdql
SHOWS WHERE "Scarlet Begonias" >> "Fire on the Mountain";
SHOWS WHERE "Estimated Prophet" THEN "Eyes of the World";
```

Tease:

```gdql
SHOWS WHERE "Dark Star" ~> "Saint Stephen";
SHOWS WHERE "Uncle John's Band" TEASE "St. Stephen";
```

---

## Set position

First set opened with a song:

```gdql
SHOWS WHERE SET1 OPENED "Jack Straw";
SHOWS WHERE SET1 OPENED "Bertha";
SHOWS FROM 1977 WHERE SET1 OPENED "New Minglewood Blues";
```

Second set closed with a song:

```gdql
SHOWS WHERE SET2 CLOSED "Sugar Magnolia";
SHOWS WHERE SET2 CLOSED "Around and Around";
```

Encore (third set; many shows have more than two sets):

```gdql
SHOWS WHERE ENCORE = "U.S. Blues";
SHOWS WHERE ENCORE = "Brokedown Palace";
SHOWS WHERE ENCORE = "One More Saturday Night";
SHOWS WHERE SET3 OPENED "U.S. Blues";
SHOWS WHERE SET3 CLOSED "Brokedown Palace";
```

---

## Played / guest

Shows that included a song:

```gdql
SHOWS FROM 1990 WHERE PLAYED "Eyes of the World";
SHOWS FROM 1977 WHERE PLAYED "Scarlet Begonias";
SHOWS WHERE PLAYED "Dark Star" AND PLAYED "Saint Stephen";
SHOWS FROM 72 WHERE PLAYED "Morning Dew";
```

**{{< sandbox "played-st-stephen" "PLAYED St. Stephen" >}}**

Shows with a guest:

```gdql
SHOWS WHERE GUEST "Branford Marsalis";
SHOWS WHERE GUEST "Clarence Clemons";
SHOWS FROM 1990 WHERE GUEST "Branford Marsalis";
```

---

## Setlist for a date

```gdql
SETLIST FOR 5/8/77;
SETLIST FOR 8/27/72;
SETLIST FOR 12/31/78;
SETLIST FOR 3/29/90;
SETLIST FOR "Cornell 1977";
SETLIST FOR 1977;
```

**{{< sandbox "setlist-cornell" "5/8/77" >}}** · **{{< sandbox "setlist-cornell-name" "Cornell 1977" >}}**

---

## Song search

All songs:

```gdql
SONGS LIMIT 50;
SONGS ORDER BY TITLE LIMIT 30;
```

**{{< sandbox "songs" "Try in Sandbox" >}}**

Songs whose lyrics contain words:

```gdql
SONGS WITH LYRICS("train");
SONGS WITH LYRICS("train", "road");
SONGS WITH LYRICS("rose") WRITTEN 1970 LIMIT 20;
SONGS WITH LYRICS("sun", "shine");
SONGS WITH LYRICS("water");
SONGS WITH LYRICS("highway") WRITTEN 1969-1971 LIMIT 10;
```

**{{< sandbox "songs-lyrics" "LYRICS" >}}** · **{{< sandbox "songs-lyrics-rose" "LYRICS+WRITTEN" >}}**

Songs written in a range:

```gdql
SONGS WRITTEN 1968-1970;
SONGS WRITTEN 1970;
SONGS WRITTEN 1969 LIMIT 20;
```

**{{< sandbox "songs-written" "WRITTEN" >}}**

---

## Performances of a song

All performances:

```gdql
PERFORMANCES OF "Dark Star";
PERFORMANCES OF "Scarlet Begonias";
PERFORMANCES OF "Eyes of the World";
```

**{{< sandbox "dark-star" "Dark Star" >}}**

By date range and length:

```gdql
PERFORMANCES OF "Dark Star" FROM 1972-1974;
PERFORMANCES OF "Dark Star" WITH LENGTH > 20min;
PERFORMANCES OF "Dark Star" WITH LENGTH > 30min;
PERFORMANCES OF "Eyes of the World" ORDER BY LENGTH DESC LIMIT 5;
PERFORMANCES OF "Playing in the Band" WITH LENGTH < 10min;
```

Combine date, length, sort, and limit:

```gdql
PERFORMANCES OF "Dark Star" FROM 1973-1974 WITH LENGTH > 20min ORDER BY LENGTH DESC LIMIT 5;
PERFORMANCES OF "Scarlet Begonias" FROM 77-79 ORDER BY DATE DESC LIMIT 20;
```

---

## Output format

Table (default), JSON, CSV, setlist-style:

```gdql
SHOWS FROM 1977 LIMIT 3;
SHOWS FROM 1977 LIMIT 3 AS TABLE;
SHOWS FROM 1977 LIMIT 3 AS JSON;
SHOWS FROM 1977 LIMIT 3 AS CSV;
SHOWS FROM 1977 LIMIT 3 AS SETLIST;
SHOWS FROM 1977 LIMIT 3 AS CALENDAR;
```

**{{< sandbox "shows-77-json" "AS JSON" >}}**

---

## Combining conditions

```gdql
SHOWS FROM 1977 WHERE "Scarlet Begonias" > "Fire on the Mountain" AND PLAYED "Estimated Prophet";
SHOWS WHERE SET1 OPENED "Jack Straw" OR SET1 OPENED "Bertha";
SHOWS WHERE SET2 CLOSED "Sugar Magnolia" OR SET2 CLOSED "Around and Around";
SHOWS WHERE PLAYED "Dark Star" AND NOT PLAYED "Saint Stephen";
SHOWS FROM 1990 WHERE GUEST "Branford Marsalis" AND PLAYED "Eyes of the World";
SHOWS WHERE "Help on the Way" > "Slipknot!" > "Franklin's Tower" AND PLAYED "Estimated Prophet";
```

---

## Quick reference

| Goal | Example |
|------|--------|
| Shows in a year | `SHOWS FROM 1977` |
| Famous segue | `SHOWS WHERE "Scarlet Begonias" > "Fire on the Mountain"` |
| Setlist for a date | `SETLIST FOR 5/8/77` |
| Songs with lyrics | `SONGS WITH LYRICS("train", "road")` |
| Long "Dark Star" | `PERFORMANCES OF "Dark Star" WITH LENGTH > 20min` |
| Opener / closer / encore | `SHOWS WHERE SET1 OPENED "Jack Straw"` |

**{{< sandbox "" "Open Sandbox" >}}** — Use the [reference]({{< relref "reference" >}}) for full WHERE and operator details.
