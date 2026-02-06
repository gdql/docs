---
title: Conventions
description: "GDQL conventions: case, strings, comments, and statement rules."
weight: 0
---

# Conventions

These rules apply across all GDQL statements.

---

## Case

**Keywords and identifiers are case-insensitive.**

You can write `SHOWS`, `shows`, or `Shows`. Song names and other string literals follow the casing you use in quotes.

```gdql
SHOWS WHERE DATE = 5/8/77;
shows where date = 5/8/77;
Shows From 1977 Limit 5;
```

---

## Strings

**Use double quotes for string literals** (song names, venue names, etc.).

```gdql
SONGS WHERE TITLE = "Scarlet Begonias";
SHOWS WHERE VENUE CONTAINS "Winterland";
PERFORMANCES OF "Eyes of the World";
```

Single quotes are not used for strings in GDQL. Song and venue names always use double quotes, e.g. `"Scarlet Begonias"`, `"Winterland"`.

---

## Comments

**Line comments start with `--`.** Everything from `--` to the end of the line is ignored.

```gdql
-- List shows from May 1977
SHOWS WHERE DATE IN 5/77
ORDER BY DATE
LIMIT 10;
```

```gdql
SHOWS FROM 1977;   -- Europe '77
SONGS WITH LYRICS("rose");  -- songs mentioning "rose"
```

There is no block comment syntax.

---

## Statement termination

**Statements can optionally end with a semicolon (`;`).** Multiple statements in one input are separated by semicolons.

```gdql
SHOWS WHERE DATE = 5/8/77;
SETLIST FOR 5/8/77
```

**Multiple statements in one input (semicolon required between them):**

```gdql
SHOWS FROM 1977 LIMIT 5;
SETLIST FOR 5/8/77;
SONGS WITH LYRICS("train");
```

**{{< sandbox "" "Try in Sandbox" >}}**

---

## Whitespace

Spaces, tabs, and newlines are used for readability. Keywords and identifiers must be separated by whitespace where required (e.g. `SHOWS WHERE` not `SHOWSWHERE`).

---

## Summary

| Convention | Rule |
|------------|------|
| Case | Case-insensitive (keywords, identifiers) |
| Strings | Double quotes `"..."` |
| Comments | `--` to end of line |
| Statement end | Optional `;`; use `;` to separate multiple statements |
| Whitespace | Required between tokens |

See [WHERE conditions]({{< relref "where" >}}) and [Operators]({{< relref "operators" >}}) for expression syntax.
