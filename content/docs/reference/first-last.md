---
title: FIRST / LAST
description: "GDQL FIRST and LAST — find the debut and farewell performance of any Grateful Dead song across 2,014 shows from 1965 to 1995, with date and venue."
weight: 8
---


`FIRST` and `LAST` answer the simplest historical question: when did this song first appear, and when did it say goodbye?

---

## Synopsis

```gdql
FIRST "Song Name";
LAST "Song Name";
```

Returns a single show — the first or last time that song was performed.

---

## Examples

{{< gdql >}}
FIRST "Help on the Way";
LAST "Saint Stephen";
LAST "Dark Star";  -- March 30, 1994
FIRST "Touch of Grey";
{{< /gdql >}}

---

## Tips

- The result is a show (date, venue, city) — the same format as `SHOWS` results.
- For a full list of every performance, use `PERFORMANCES OF "Song" ORDER BY DATE` instead.
