---
title: COUNT
description: "GDQL COUNT: count song performances or shows with optional date ranges, eras, and WHERE conditions."
weight: 5
---


`COUNT` is the "how many?" shortcut. Count how many times a song was played, how many shows in a range, or how many shows match a condition — without listing them all.

---

## Synopsis

```gdql
COUNT "Song Name" [ FROM date_or_range ];
COUNT SHOWS [ FROM date_or_range ] [ WHERE condition ... ];
```

---

## Forms

| Form | What it counts |
|------|---------------|
| `COUNT "Dark Star"` | Total performances of this song |
| `COUNT "Dark Star" FROM 1972-1974` | Performances in a date range |
| `COUNT "Dark Star" AFTER 1977` | Performances after a year |
| `COUNT "Dark Star" FROM BRENT_ERA` | Performances in an era |
| `COUNT SHOWS` | Total shows in the database |
| `COUNT SHOWS FROM 1977` | Shows in a year |
| `COUNT SHOWS BEFORE 1970` | Shows before a year |
| `COUNT SHOWS WHERE ...` | Shows matching any WHERE condition |

---

## Examples

### Song counts

{{< gdql >}}
COUNT "Dark Star";
COUNT "Scarlet Begonias";
COUNT "Dark Star" FROM 1972-1974;
COUNT "Scarlet Begonias" AFTER 1977;
COUNT "Saint Stephen" BEFORE 1972;
{{< /gdql >}}

### Show counts

{{< gdql >}}
COUNT SHOWS;
COUNT SHOWS FROM 1977;
COUNT SHOWS BEFORE 1976;
COUNT SHOWS FROM BRENT_ERA;
{{< /gdql >}}

### Show counts with WHERE

{{< gdql >}}
COUNT SHOWS WHERE "Help on the Way" > "Slipknot!" > "Franklin's Tower";
COUNT SHOWS WHERE OPENER "Bertha";
COUNT SHOWS WHERE PLAYED "Dark Star" AND NOT PLAYED "Saint Stephen";
{{< /gdql >}}

### Song count with LYRICS

{{< gdql >}}
SONGS WITH LYRICS("sun", "shine") AS COUNT;
{{< /gdql >}}

---

## Tips

- `COUNT` returns a single number — much faster than listing all results and counting by hand.
- `COUNT SHOWS WHERE` accepts the same conditions as `SHOWS WHERE` — segues, position, played, AND/OR.
