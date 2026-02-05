# GDQL docs

Documentation for [GDQL](https://github.com/gdql/gdql) (Grateful Dead Query Language), built with [Doks](https://themes.gohugo.io/themes/doks/). Hosted on GitHub Pages at **https://gdql.github.io/docs/** (or [docs.gdql.dev](https://docs.gdql.dev) if you set a custom domain).

## Run locally

```bash
git clone https://github.com/gdql/docs
cd docs
npm install
npm run dev
```

Open the URL shown (e.g. http://localhost:1313/). No Hugo install needed — Thulite (Doks) uses it via Node.

## GitHub Pages (build & deploy)

1. **Enable Pages:** In this repo go to **Settings → Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**.
2. On each push to `main`, the **Deploy to GitHub Pages** workflow runs: it installs deps, builds the site with Hugo, and deploys the `public/` artifact to Pages.
3. The site is available at **https://gdql.github.io/docs/**.

**Custom domain:** To use e.g. docs.gdql.dev, set the custom domain in Settings → Pages, then set `baseURL = "https://docs.gdql.dev/"` in `config/_default/hugo.toml` and re-run the workflow (or add a workflow env override for `HUGO_BASEURL`).

## Build for production (manual)

```bash
npm run build
```

Output is in `public/`. Deploy that folder to any static host.

## What’s in this repo

- **content/** — GDQL docs (getting started, language reference, syntax highlighting).
- **config/_default/** — Doks/Hugo config (title, baseURL, theme params).
- **package.json** — Doks (Thulite) dependencies; theme assets come from `node_modules` when you run `npm install`.

The old Hugo Book theme and root `hugo.toml` are removed; this site is Doks-only. If you have an existing clone that still has `themes/hugo-book`, remove it so Doks is used: `git submodule deinit -f themes/hugo-book 2>/dev/null; git rm -f themes/hugo-book 2>/dev/null; true`
