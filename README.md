# GDQL docs

Documentation for [GDQL](https://github.com/gdql/gdql) (Grateful Dead Query Language), built with [Doks](https://themes.gohugo.io/themes/doks/). **Lives at [docs.gdql.dev](https://docs.gdql.dev)** (configure custom domain in repo Settings → Pages). The homepage and sandbox will be at gdql.dev; this repo is docs-only.

## Run locally (minimal effort)

```bash
git clone https://github.com/gdql/gdql-docs
cd gdql-docs
npm install
npm run dev
```

Open the URL shown (e.g. http://localhost:1313/). No Hugo install needed — Thulite (Doks) uses it via Node.

## Deploy with GitHub Actions

1. **Enable GitHub Pages:** Repo **Settings → Pages → Build and deployment → Source:** choose **GitHub Actions**.
2. Push to `main` (or run the workflow manually from the Actions tab). The workflow builds the site and deploys to Pages.
3. Site will be at `https://<owner>.github.io/gdql-docs/` (or your custom domain if set in Pages settings).

To change the base URL (e.g. custom domain), edit `baseURL` in `config/_default/hugo.toml` and set your domain in repo Settings → Pages.

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
