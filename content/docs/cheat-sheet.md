---
title: Cheat Sheet
description: "GDQL cheat sheet — every Grateful Dead query pattern on one page: shows, songs, segues, openers, closers, eras, lyrics, and output formats. Bookmark this."
weight: 13
---


| I want to... | Query |
|--------------|-------|
| **Shows** | |
| All shows in a year | `SHOWS FROM 1977` |
| Shows in a range | `SHOWS FROM 1977-1980 ORDER BY DATE` |
| Shows in an era | `SHOWS FROM EUROPE72` |
| Shows at a venue | `SHOWS AT "Fillmore West"` |
| Shows on a tour | `SHOWS TOUR "Europe" FROM 1972` |
| Shows after/before a year | `SHOWS AFTER 1985` / `SHOWS BEFORE 1970` |
| **Setlists** | |
| Full setlist for a date | `SETLIST FOR 5/8/77` or `SETLIST 1977-05-08` |
| Expand shows with setlists | `SHOWS FROM 1977 LIMIT 3 AS SETLIST` |
| **Segues** | |
| Song A followed by Song B | `SHOWS WHERE "A" > "B"` |
| Three-song chain | `SHOWS WHERE "A" > "B" > "C"` |
| Song A but B did NOT follow | `SHOWS WHERE "A" !> "B"` or `"A" NOT INTO "B"` |
| Chain with negation | `SHOWS WHERE "A" > "B" !> "C"` |
| **Counting** | |
| Times a song was played | `COUNT "Dark Star"` |
| Count in a range | `COUNT "Dark Star" FROM 1972-1974` |
| Count shows matching a filter | `COUNT SHOWS WHERE OPENER "Bertha"` |
| **Songs** | |
| Most played songs | `SONGS ORDER BY TIMES_PLAYED DESC LIMIT 20` |
| Most played in a year | `SONGS FROM 1977 ORDER BY TIMES_PLAYED DESC` |
| Songs with lyrics | `SONGS WITH LYRICS("train", "road")` |
| Separate lyrics conditions | `SONGS WITH LYRICS("sun") AND LYRICS("train")` |
| Song count | `SONGS WITH LYRICS("rose") AS COUNT` |
| **Performances** | |
| Every time a song was played | `PERFORMANCES OF "Dark Star"` |
| In a date range | `PERFORMANCES OF "Dark Star" FROM 1972-1974` |
| Sorted by date | `PERFORMANCES OF "Dark Star" ORDER BY DATE DESC LIMIT 20` |
| **Set position** | |
| Show opener | `SHOWS WHERE OPENER "Bertha"` |
| Set 1 opener | `SHOWS WHERE SET1 OPENED "Jack Straw"` |
| Set 2 closer | `SHOWS WHERE SET2 CLOSED "Sugar Magnolia"` |
| Show closer | `SHOWS WHERE CLOSER "Morning Dew"` |
| Encore | `SHOWS WHERE ENCORE "U.S. Blues"` |
| Opener chain | `SHOWS WHERE OPENER "Help on the Way" > "Slipknot!"` |
| Closer chain | `SHOWS WHERE CLOSER "Throwin' Stones" > "Not Fade Away"` |
| **Negation** | |
| Song was NOT played | `SHOWS WHERE NOT PLAYED "Fire on the Mountain"` |
| Song wasn't the closer | `SHOWS WHERE PLAYED "X" AND NOT CLOSED "X"` |
| Song wasn't the opener | `SHOWS WHERE PLAYED "X" AND NOT OPENER "X"` |
| Song wasn't in the encore | `SHOWS WHERE PLAYED "X" AND NOT ENCORE "X"` |
| **Combining** | |
| AND conditions | `SHOWS WHERE PLAYED "A" AND PLAYED "B"` |
| OR conditions | `SHOWS WHERE OPENER "A" OR OPENER "B"` |
| Segue + condition | `SHOWS WHERE "A" > "B" AND PLAYED "C"` |
| Venue + date + condition | `SHOWS AT "X" FROM 1977 WHERE PLAYED "Y"` |
| **History** | |
| First time played | `FIRST "Help on the Way"` |
| Last time played | `LAST "Dark Star"` |
| Random show | `RANDOM SHOW FROM EUROPE72` |
| **Output** | |
| JSON | `SHOWS FROM 1977 LIMIT 3 AS JSON` |
| CSV | `SHOWS FROM 1977 LIMIT 3 AS CSV` |
| **Aliases** | |
| `IN` = `FROM` | `SHOWS IN 1977` |
| `->` = `>` | `"A" -> "B"` |
| `INTO` = `>` | `"A" INTO "B"` |
| `THEN` = `>>` | `"A" THEN "B"` |
| `!>` = `NOT >` | `"A" !> "B"` |
| `SHOW` = `SHOWS` | `RANDOM SHOW` |
| `OPENED` = `OPENER` | `SHOWS WHERE OPENED "Bertha"` |
| `CLOSED` = `CLOSER` | `SHOWS WHERE CLOSED "Morning Dew"` |
