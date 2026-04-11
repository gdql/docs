---
title: Conventions
description: "GDQL syntax conventions — case-insensitive keywords, double-quoted song names, line comments, semicolons between statements, and flexible whitespace rules."
weight: 0
---


A handful of small rules apply across every GDQL statement. Learn them once and the rest of the language reads like English.

---

## Case

**Keywords and identifiers are case-insensitive.** Write whichever style you find readable — `SHOWS`, `shows`, and `Shows` all parse identically. The convention in these docs is uppercase keywords because they stand out from song names, but the parser doesn't care.

{{< gdql >}}
SETLIST FOR 5/8/77;
{{< /gdql >}}

{{< gdql >}}
setlist for 5/8/77;
{{< /gdql >}}

{{< gdql >}}
Shows From 1977 Limit 5;
{{< /gdql >}}

String literals (song names, venue names) keep whatever case you typed inside the quotes — but the lookup itself is also case-insensitive, so `"dark star"` and `"DARK STAR"` find the same song.

---

## Strings

**Wrap string literals in double quotes.** Use them for song titles, venue names, city names, guest musicians — anything that isn't a number, date, or keyword.

{{< gdql >}}
PERFORMANCES OF "Eyes of the World";
{{< /gdql >}}

{{< gdql >}}
SHOWS AT "Winterland";
{{< /gdql >}}

{{< gdql >}}
SHOWS WHERE PLAYED "Scarlet Begonias";
{{< /gdql >}}

Single quotes work too. They're handy when shell escaping gets ugly:

```bash
gdql 'SHOWS WHERE PLAYED "Scarlet Begonias"'
```

GDQL is forgiving about punctuation and exact spelling — `"Help on the Way!"` and `"Help on the Way"` resolve to the same song, and apostrophes in titles like `"Franklin's Tower"` work as written.

---

## Comments

**Line comments start with `--`** and run to the end of the line. Use them to label queries you're sharing or to leave notes in saved files.

{{< gdql >}}
SETLIST FOR 5/8/77;
{{< /gdql >}}

Trailing comments work too:

{{< gdql >}}
SHOWS FROM 1977;             -- Europe '77 + Cornell year SONGS WITH LYRICS("rose");   -- the rose songs
{{< /gdql >}}

Comments work in multi-statement blocks too — handy for labeling each query in a batch:

{{< gdql >}}
-- Cornell '77 and the next two nights
SETLIST FOR 5/7/77;
SETLIST FOR 5/8/77;  -- the famous one
SETLIST FOR 5/9/77;
{{< /gdql >}}

There is no block comment syntax. If you need to comment out several lines, prefix each one with `--`.

---

## Statement termination

**Semicolons end statements but are optional for a single query.** Use them whenever you want to chain multiple queries into one input.

{{< gdql >}}
SETLIST FOR 5/8/77
{{< /gdql >}}

When you have more than one query, separate them with `;`:

{{< gdql >}}
SHOWS FROM 1977 LIMIT 5;
{{< /gdql >}}

{{< gdql >}}
SETLIST FOR 5/8/77;
{{< /gdql >}}

{{< gdql >}}
SONGS WITH LYRICS("train");
{{< /gdql >}}

The CLI runs each statement in order and prints the results back-to-back.

**{{< sandbox "" "Try in Sandbox" >}}**

---

## Whitespace

Whitespace exists for readability. Spaces, tabs, and newlines are interchangeable wherever they're allowed, but at least one whitespace character must separate adjacent tokens — `SHOWS WHERE` is valid, `SHOWSWHERE` is not.

Indent and break long queries however you like:

{{< gdql >}}
SHOWS AT "Winterland" FROM 1977-1978 WHERE "Scarlet Begonias" > "Fire on the Mountain" AND PLAYED "Estimated Prophet" ORDER BY DATE LIMIT 10;
{{< /gdql >}}

---

## Quick summary

| Convention | Rule |
|------------|------|
| Case | Case-insensitive — keywords, identifiers, song lookups |
| Strings | Double quotes `"..."` (single quotes also work) |
| Comments | `--` to end of line; no block comments |
| Statement end | Optional `;`; required between multiple statements |
| Whitespace | Required between tokens; indentation is free |

Next up: read [WHERE conditions]({{< relref "where" >}}) for filtering, or [Operators]({{< relref "operators" >}}) for the full token list.
