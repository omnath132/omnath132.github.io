# Circuit Portfolio

A single-page project showcase with a circuit-board theme: a glowing power rail
runs down the page and each project **powers on** as you scroll to it. Static
HTML/CSS/JS — no build step, no dependencies.

## Files

```
index.html        ← your content lives here (projects, links, name)
css/styles.css     ← all styling / theme colors
js/main.js         ← scroll "power on" animation
assets/            ← project images + your resume.pdf
.nojekyll          ← tells GitHub Pages to serve files as-is
```

## Customize

Everything you'll normally edit is in `index.html`:

1. **Your name & tagline** — top of the `<header class="hero">` block.
2. **Links** — replace the `href`s for Résumé, GitHub, LinkedIn, Email.
   GitHub is pre-filled to `github.com/omnath132`; update if needed.
3. **Projects** — each `<section class="project">` is one project card. Edit the
   title, `card-role`, description, `tags`, and the two `card-links`.
   To **add a project**, copy a whole `<section class="project" data-side="...">`
   block and paste it; alternate `data-side="left"` / `data-side="right"` so
   cards zig-zag along the rail.
4. **Images** — drop your images in `assets/` and point each `<img src="...">`
   at them (e.g. `assets/my-project.png`). Placeholder `.svg` files are there now.
5. **Résumé** — save your resume as `assets/resume.pdf` (the Résumé buttons
   already link to it). Then delete `assets/README.txt`.

Colors live at the top of `css/styles.css` under `:root` (change `--glow` to
recolor the whole "powered" look).

## Preview locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python -m http.server 8000
```

then visit http://localhost:8000

## Deploy to GitHub Pages

1. Create a GitHub repo and push these files to the `main` branch.
2. Repo **Settings → Pages**.
3. Under **Build and deployment**, set **Source: Deploy from a branch**,
   **Branch: `main`**, **Folder: `/ (root)`**, then **Save**.
4. Wait ~1 minute — your site appears at
   `https://<your-username>.github.io/<repo-name>/`.

> Tip: name the repo `<your-username>.github.io` to get the clean URL
> `https://<your-username>.github.io/` with no subfolder.
