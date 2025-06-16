# MiniTools Universe — Omini Agents Specification

> **Sole Source of Truth**  
> This file defines every Omini agent and their responsibilities.  
> • When a **new tool, feature, or workflow** is introduced, **update this file first**.  
> • Every agent consults this file before acting.  
> • A running **Task List** (at the end) tracks work in progress and completion.

---

## Core Specialist Agents

| Agent | Purpose | Key Triggers | Primary Responsibilities |
|-------|---------|--------------|--------------------------|
| **OminiDoc** | Project & user‑facing documentation | New/updated tool; request for docs | Keep README, guides, and keyword tables current; add usage instructions; log setup changes |
| **OminiUI** | UI consistency, accessibility, performance | New HTML page or style tweak | Enforce shared design; refactor HTML/CSS; improve a11y & responsiveness |
| **OminiTheme** | Tailwind/DaisyUI theme management | New design or theming request | Configure DaisyUI themes, update toggle logic and compile Tailwind styles |
| **OminiReq** | Dependency and tooling advice | Need for new lib/tool; recurring code patterns | Recommend libraries/dev‑tools; update `requirements.txt` (or note npm/dev deps) |
| **OminiSEO** | Organic‑search optimisation | New page; content changes; scheduled audit | Craft meta tags & JSON‑LD; update sitemap & internal links; run SEO checks |
| **OminiLogic** | JavaScript logic & algorithm tuning | New tool logic; bug/perf report | Optimise code; expand features; verify correctness & suggest simple tests |
| **OminiOffline** | Offline readiness & caching validation | Build updates; service worker changes | Verify service worker caching, ensure local asset references & OpenMoji icons, run offline audits |
| **OminiPy** | Python tooling & offline asset management | Python script updates; CLI/GUI feature | Maintain Python scripts like `download_assets.py`, implement offline asset manager features, ensure cross-platform use |

> **Third‑party libraries only**: CDN links are used by default, but critical assets may be copied to `vendor/` for offline availability.

## CDN Usage & Vendor Policy
To keep pages lightweight we reference frameworks like Tailwind, Alpine and GSAP
via CDN links. When preparing an offline bundle or improving load times, download
each CDN file into the `vendor/` directory and update the HTML to point to these
local paths. `docs/external-libraries.md` lists the snippets to mirror.

`vendor/cdn/` now holds **over 27 libraries**, each stored in its own subdirectory
(for example `vendor/cdn/bootstrap/bootstrap.min.css`). When redesigning pages,
agents must remove outdated CDN URLs and rely exclusively on these local copies.

### Additional Allowed Domains
The following external domains are explicitly permitted for research and
dependency retrieval when OminiReq evaluates new tools:

- `pypi.org`
- `github.com`
- `api.github.com`
- `raw.githubusercontent.com`
- `docs.python.org`
- `cdnjs.cloudflare.com`
- `cdn.jsdelivr.net`
- `unpkg.com`
- `fonts.googleapis.com`
- `fonts.gstatic.com`
- `pa11y.org`
- `registry.npmjs.org`
- `plausible.io`
- `content-autofill.googleapis.com`


---

## Meta / Management Agents

### **OminiForge**  (Organic Custom Agent Creator)
* **Purpose ** Spawn single‑use, highly‑focused sub‑agents for one‑off or experimental tasks that don’t fit neatly into existing specialists.
* **Workflow**
  1. A developer describes the niche task and desired skills.  
  2. OminiForge generates a **temporary agent spec** (name, purpose, short duties) and appends it under **“Spawned Agents”** below.  
  3. The spawned agent completes its assignment, reports back, then is *archived* (moved to an **“Archive”** subsection) by OminiForge to keep the file tidy.

### **OminiTaskMaster**  (Task‑List Coordinator)
* **Purpose ** Maintain the **Task List** at the end of this file, ensuring everyone knows what is pending and what’s finished.
* **Workflow**
  1. When any agent identifies work, it notifies OminiTaskMaster.  
  2. OminiTaskMaster adds a new markdown checkbox item under the appropriate heading.  
  3. When an agent finishes, it pings OminiTaskMaster, who marks the box as **`[x]`** and (optionally) appends a brief result note in parentheses.  
  4. Closed tasks remain visible for historical context.

---

## Spawned Agents
*(Created dynamically by **OminiForge** – section empty until first spawn.)*

---

## Archive
*(Retired spawned agents are moved here.)*
### **LinkCheckAgent**
*Purpose* Check all HTML pages for broken internal links.
*Duties* Run `linkinator` or `linkchecker` and report any errors.

---

## Task List

### 🔄 Active

- [ ] Check that offline bundles and meta tags remain SEO friendly (assigned → **OminiSEO**)
- [ ] Run an offline audit of all pages (assigned → **OminiOffline**)
- [x] Resolve sidebar overlap and search bar alignment issues (assigned → **OminiUI**) (search field has id and sidebar closes on click-away)
- [x] Run pa11y audits for accessibility (assigned → **OminiUI**) (Lighthouse unavailable)
- [x] Update Node dependencies and fix security warnings (assigned → **OminiReq**) (esbuild & workbox-cli updated)
- [ ] Document CLI and GUI usage of `download_assets.py` (assigned → **OminiDoc**)
- [ ] Implement manifest hashing and GUI features in `download_assets.py` (assigned → **OminiPy**)
- [x] Adjust sidebar toggle logic to prevent overlap bug (assigned → **OminiLogic**) (added escape and click-away handlers)

### ✅ Completed
- [x] Redesign `index.html` with improved layout, accessibility and modern styling (assigned → **OminiUI**) (header, hero & footer refreshed)
- [x] Refresh overall landing page using DaisyUI components and enhance SEO meta tags (assigned → **OminiUI**, **OminiSEO**) (hero & footer restyled, meta added)
- [x] Ensure `npm run build` copies `index.html` and tool pages to `dist/` so `pa11y` tests run on actual pages (assigned → **OminiUI**) (HTML copied)
- [x] Mirror CDN CSS/JS in vendor/ and update HTML references (assigned → **OminiUI**) (local files added)
- [x] Added `<link rel="manifest">` to all pages (OminiUI).
- [x] *example* Create meta descriptions for the new “Base-64 Encoder” page (assigned → **OminiSEO**) (added meta description and og tags).
- [x] Clean up `README.md` and document build steps (assigned → **OminiDoc**) (removed stray JS and clarified build script).
- [x] Deduplicate fonts/scripts and footers in `index.html`, add manifest link (assigned → **OminiUI**). (cleaned head & footer)
- [x] Refactor `mini.js` to remove duplicate service-worker logic (assigned → **OminiLogic**). (deduplicated SW and AOS init)
- [x] Populate icons in `manifest.webmanifest` and ensure canonical tags across pages (assigned → **OminiSEO**) (added emoji-based URLs).
- [x] Add `esbuild` and `workbox-cli` dev dependencies (assigned → **OminiReq**) (noted in package.json).
- [x] Verify internal links using **LinkCheckAgent** (spawned via OminiForge) (linkchecker ran with encoding warnings).

- [x] Remove duplicate Google Fonts link and add an aria-label to the color input in `tools/color-picker/index.html` (assigned → **OminiUI**)
- [x] Add `og:image` meta tags referencing OpenMoji icons for index and tool pages, then update `sitemap.xml` if needed (assigned → **OminiSEO**)
- [x] Document offline caching and the Dexie database in `README.md` (assigned → **OminiDoc**)
- [x] Configure `html5validator` to allow custom `x-*` attributes and integrate it into the CI workflow (assigned → **OminiReq**)
- [x] Add missing `src/styles/tailwind.css` so `npm run build` succeeds (assigned → **OminiUI**) (file committed)
- [x] Insert skip link on all pages and style in `tools.css` (assigned → **OminiUI**) (adds skip-link element and style)
- [x] Document local vendor CDN assets and emoji/SVG image replacements in `README.md` (assigned → **OminiDoc**) (added vendor section)
- [x] Download `workbox-sw.js` during build and load it from `/vendor/workbox/`; update `sw.js` accordingly (assigned → **OminiReq**) (build copies local library)
- [x] Provide PowerShell script for Windows to download OpenMoji icons into `assets/` (assigned → **OminiReq**) (script added)
- [x] Summarize CDN usage in `docs/external-libraries.md` and link from `README.md` (assigned → **OminiDoc**) (external libs documented)
- [x] Document CDN usage and vendor policy in AGENTS.md (assigned → **OminiDoc**) (added policy section)
- [x] Expand `requirements.txt` with documentation and CLI helpers; list allowed research domains (assigned → **OminiReq**)
- [x] Research offline search libraries to power an "Omini Search" feature (assigned → **OminiReq**) (considered Fuse.js, Lunr.js, FlexSearch)
- [x] Implement offline search with Fuse.js and generated index (assigned → **OminiLogic**) (Fuse integration and index build)
- [x] Document search setup and usage (assigned → **OminiDoc**) (README updated)
- [x] Ignore `dist/` in ESLint config to silence vendor build errors (assigned → **OminiReq**)
- [x] Document vendor/cdn structure and CDN replacement policy (assigned → **OminiDoc**)
- [x] Migrate `.eslintignore` to `eslint.config.js`, update lint script and add `"type": "module"` to `package.json` (assigned → **OminiReq**)

- [x] Updated esbuild and workbox-cli to latest versions to address security warnings (assigned → **OminiReq**)
- [x] Integrate DaisyUI plugin with Tailwind and document theme setup (assigned → **OminiTheme**) (plugin added and config updated)
- [x] Allow link navigation when GSAP fails to load (assigned → **OminiLogic**) (conditional fade animation in `mini.js`)
---
