# Theme

We **use** the [Doks](https://themes.gohugo.io/themes/doks/) theme the official way: create a Doks site with the Thulite CLI (`npm create thulite@latest <name> -- --template doks`), then copy this repo’s `content/` in. No replicating config or committing the theme — see [README](README.md).

## Other Hugo docs themes

If you’d rather use a different theme, create a Hugo site with that theme and use this repo’s `content/` (you may need to tweak section names or front matter).

| Theme | Link | Notes |
|-------|------|--------|
| **Doks** (current) | [getdoks.org](https://getdoks.org/) · [themes](https://themes.gohugo.io/themes/doks/) | Use `npm create thulite@latest -- --template doks`. |
| **Hugo Book** | [themes](https://themes.gohugo.io/themes/hugo-book/) · [GitHub](https://github.com/alex-shpak/hugo-book) | Add as submodule, set `theme = "hugo-book"`. Hugo 0.146+ extended. |
| **Docsy** | [docsy.dev](https://www.docsy.dev/) · [GitHub](https://github.com/google/docsy) | Good for large doc sets. |
| **Relearn** | [demo](https://mcshelby.github.io/hugo-theme-relearn/) · [GitHub](https://github.com/McShelby/hugo-theme-relearn) | Learn fork, search, versioning. |
| **Geekdoc** | [geekdocs.de](https://geekdocs.de/) | Minimal, technical docs. |
