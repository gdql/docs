---
title: FIRST / LAST
description: "GDQL FIRST and LAST: find the very first or very last time the Grateful Dead played a song."
weight: 6
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
