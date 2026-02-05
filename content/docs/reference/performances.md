---
title: PERFORMANCES
description: "GDQL PERFORMANCES: list performances of a song with FROM, WITH LENGTH, ORDER BY, LIMIT."
weight: 3
---

# PERFORMANCES

List performances of a specific song across shows.

---

## Synopsis

```gdql
PERFORMANCES OF "Song Name" [ FROM date_range ] [ WITH LENGTH length_condition ]
  [ ORDER BY sort_spec ] [ LIMIT n ];
```

---

## Description

`PERFORMANCES OF "Song Name"` returns one row per performance of that song. Use `FROM` to limit to a date range and `WITH LENGTH` to filter by duration (e.g. `> 20min`). Use `ORDER BY` and `LIMIT` to sort and cap results.

---

## Clauses

| Clause | Description |
|--------|-------------|
| `OF "Song Name"` | The song to search for (required) |
| `FROM` | Date range of shows |
| `WITH LENGTH` | Filter by duration (e.g. `> 20min`, `< 10min`) |
| `ORDER BY` | e.g. `LENGTH DESC` |
| `LIMIT` | Maximum number of results |

---

## Examples

**All performances of a song:**

```gdql
PERFORMANCES OF "Dark Star";
PERFORMANCES OF "Scarlet Begonias";
PERFORMANCES OF "Eyes of the World";
```

**By date range:**

```gdql
PERFORMANCES OF "Dark Star" FROM 1972;
PERFORMANCES OF "Dark Star" FROM 1972-1974;
PERFORMANCES OF "Eyes of the World" FROM 1974-1977;
```

**Filter by length:**

```gdql
PERFORMANCES OF "Dark Star" WITH LENGTH > 20min;
PERFORMANCES OF "Dark Star" WITH LENGTH > 30min;
PERFORMANCES OF "Playing in the Band" WITH LENGTH < 10min;
```

**Sort and limit:**

```gdql
PERFORMANCES OF "Eyes of the World" ORDER BY LENGTH DESC LIMIT 5;
PERFORMANCES OF "Dark Star" ORDER BY DATE LIMIT 10;
PERFORMANCES OF "Scarlet Begonias" FROM 77-79 ORDER BY DATE DESC LIMIT 20;
```

**Combine date + length + order:**

```gdql
PERFORMANCES OF "Dark Star" FROM 1973-1974 WITH LENGTH > 20min ORDER BY LENGTH DESC LIMIT 5;
```
