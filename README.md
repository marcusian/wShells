# wShells

Marc Balcells's personal digital garden and notes, published at [marcusian.github.io/wShells](https://marcusian.github.io/wShells).

Built with [Quartz v4](https://quartz.jzhao.xyz) — a static site generator for Markdown-based digital gardens.

---

## Editing content

All notes live in the `content/` folder. You can open it as an [Obsidian](https://obsidian.md) vault:

1. Open Obsidian → **Open folder as vault**
2. Select the `content/` directory inside this repository
3. Write and edit Markdown files normally — wikilinks, callouts, LaTeX, and Obsidian-flavoured syntax are all supported

---

## GitHub Actions deployment

Pushing to `main` automatically builds the site and deploys it to GitHub Pages via the workflow at `.github/workflows/deploy.yaml`.

The pipeline runs two jobs:

| Job | What it does |
|-----|--------------|
| **build** | Checks out the repo, installs Node 22 dependencies (`npm ci`), runs `npx quartz build` to compile the site into the `public/` folder, then uploads it as a Pages artifact |
| **deploy** | Deploys the uploaded artifact to GitHub Pages |

The live site is available at **[marcusian.github.io/wShells](https://marcusian.github.io/wShells)** within a minute or two of each push.

To trigger a deployment manually without a push, go to **Actions → Deploy to GitHub Pages → Run workflow**.
