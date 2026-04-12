---
title: RANDOM SHOW
description: "GDQL RANDOM SHOW: pick a random Grateful Dead show to listen to, optionally filtered by era or date range."
weight: 7
---


`RANDOM SHOW` is the "I want to listen to something tonight" command. It picks a random show and returns its full setlist.

---

## Synopsis

```gdql
RANDOM SHOW [ FROM date_or_era ];
```

---

## Examples

{{< gdql >}}
RANDOM SHOW;
{{< /gdql >}}

{{< gdql >}}
RANDOM SHOW FROM PRIMAL;
RANDOM SHOW FROM EUROPE72;
RANDOM SHOW FROM BRENT_ERA;
{{< /gdql >}}

{{< gdql >}}
RANDOM SHOW FROM 1977;
RANDOM SHOW FROM 1972-1974;
RANDOM SHOW AFTER 1985;
{{< /gdql >}}

---

## Tips

- Every run returns a different show — it's truly random.
- The result is a full setlist (same format as `SETLIST FOR`).
- Pair with an era to stay in a specific period of the Dead's history.
