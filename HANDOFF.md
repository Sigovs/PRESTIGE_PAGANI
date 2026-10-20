# Pagani of Miami: home page v2 (dev handoff)

Live preview: https://sigovs.github.io/PRESTIGE_PAGANI/prototype/home/index_v2.html
Repo: https://github.com/Sigovs/PRESTIGE_PAGANI. Download as ZIP: https://github.com/Sigovs/PRESTIGE_PAGANI/archive/refs/heads/main.zip

**Build from v2.** It lives in `prototype/home/` as `index_v2.html`, `home_v2.css`, `home_v2.js` and `grand-opening.js`. v1 (`index.html`, `home.css`, `home.js`) is the earlier version shown to the client. Assets are shared between the two.

## Run locally
Use a web server, not `file://`. For example: `cd prototype/home && python3 -m http.server 8000`, then open http://localhost:8000/index_v2.html.

## Stack
- Static HTML/CSS/JS. No build step and no framework.
- Vendored in `prototype/home/vendor/`: GSAP with ScrollTrigger, and Lenis (JS and CSS).
- Google Fonts: Istok Web (400, 400 italic, 700), Roboto (200, 400, 500, 700) and EB Garamond (400, 500).
- Smooth scroll comes from Lenis.
- With `prefers-reduced-motion: reduce`, the page falls back to a static version: no pins, the lineup becomes tabs, the background films show their posters.
- Copy and figures are sourced in `prototype/home/DATA_SOURCES.md`.
- The repo holds only what the site uses. Working material (research, source images and films, earlier prototypes) is not in it.

## Home page structure (`index_v2.html`)
1. **Hero:** a film.
2. **The lineup:** Utopia, Utopia Roadster, Huayra R Evo Roadster and Huayra BC. Arrows, cards, keys and swipe change the model.
   - The big logo and "More" open the model page.
3. **Grandi Complicazioni:** four full-screen scenes, pinned on desktop.
   - The logos and "Explore" open the model pages.
4. **Art and science:** the engine film.
5. **Horacio Pagani.**
6. **Service.**
7. **Grand Opening (new).** Detailed below.
8. **Visit the showroom:** the enquiry form, then the footer, which links to all 8 model pages.

### 7 · Grand Opening (replaces the old "Pagani of Miami / Book a private viewing" section)
- **Background:** the film fills the section as a muted loop under a single 60% overlay.
  - The desktop and phone files are chosen in JS. They load as the section approaches and pause off-screen.
- **WATCH THE FILM:** opens a full-screen `<dialog>` that plays the full film with sound and controls.
  - Esc or ✕ closes it. The page does not scroll while it is open.
  - Code: `grand-opening.js`.
- **Files** in `assets/video/`, all H.264 MP4 with a `.webp` poster each:

| File | What it is | Size |
|---|---|---|
| `grand-opening-loop-d.mp4` | background, 1920×1080, 48.8 s, no audio | 46 MB |
| `grand-opening-loop-m.mp4` | background, 1280×720 | 13 MB |

  - The background loop skips the end card (the logo on black).
  - **The full film (WATCH THE FILM) is not in the repo.** It streams from Alex's Dropbox: the original file, 1920×1080, 54 s, with audio, 137 MB.
    - Link: https://www.dropbox.com/scl/fi/zpokmxp7ro1tq3dc4yj4v/POM-Grand-Opening-Wide-4K-Final.mp4?rlkey=u8556f5iwbolvl2x7tpgnwqrf&st=h3e399dx&dl=0
    - In `index_v2.html`, the same link with `raw=1` sits in the `data-src` of `.gofilm__v`.
  - **For production:** download the film, host it on your own CDN or object storage, and replace that `data-src`. Host the two background loops there too.
- **The old section is commented out, not deleted.** To restore it, remove the `DISABLED … Miami v1` comments in three places:
  - `index_v2.html`: the markup block before the "NEW SECTION STARTS HERE" comment.
  - `home_v2.css`: seven `#miami` rules.
  - `home_v2.js`: two blocks.

## Model pages (temporary "coming soon" pages)
- **8 pages** in `prototype/home/`:
  - `utopia.html`
  - `utopia-roadster.html`
  - `huayra-r-evo-roadster.html`
  - `huayra-bc.html`
  - `huayra-codalunga-speedster.html`
  - `huayra-codalunga.html`
  - `huayra-epitome.html`
  - `huayra-tricolore.html`
- **Styles and script:** `model.css` and `model.js`, on top of the shared `home_v2.css`.
- Each page fits a single screen with no scroll. It shows the logo, the car, the specs or one line of copy, and a short note.
- **Buttons:**
  - "Enquire about the …" slides a dark-glass enquiry up from the foot. It is a native `<dialog>` with the model pre-selected.
  - "See it in the collection" goes back to that car on the home page. It uses `#model-<slug>` for the lineup and `#gc-<slug>` for Grandi Complicazioni. `home_v2.js` lands the page there once it has measured itself.

## Side menu: "Hypercars" (every Pagani model, by family, as on pagani.com)
- **Files:** `models-menu.css` and `models-menu.js`. The `<dialog class="mm">` markup is repeated in `index_v2.html` and in each model page.
- **Levels:** site sections → Hypercars → family → model.
- **The 25 models by family:**

| Family | Models |
|---|---|
| Zonda | 10 |
| Huayra | 6 |
| Utopia | 2 |
| Grandi Complicazioni | 7 |

- **Where models link:** the 8 with a page here open it. The other 17 open their page on pagani.com in a new tab, marked ↗.
- **How it opens:**
  - On a phone, the header's Menu button opens it.
  - On desktop, "Hypercars ⌄" in the header opens it at the Hypercars level; Back leads up to the sections.
- **Adding a model page later:** create the page, then in every page's drawer markup change that model's link from pagani.com to the local file.

## URL parameters (QA only)
| Parameter | Effect |
|---|---|
| `?snap=1` | Turns the old lineup snap back on (off by default) |

## Open items before going live
- [ ] **Forms:** the home page `[data-enq]` and the model pages' `.psheet` form validate on the client only and show a "not connected" note. Wire them to the CRM or lead endpoint. The fields are `name`, `email`, `phone`, `interest` and `message`.
- [ ] **Video hosting:** download the full Grand Opening film from Dropbox and move it to your CDN, along with the two background loops (see above).
- [ ] **Indexing:** remove `<meta name="robots" content="noindex">` and the "PROTOTYPE … not for publication" comment at launch.
- [ ] **Phone and address:** confirm with Prestige: sales (833) 290-6287, service (833) 290-5148, and the address 14780 Biscayne Blvd.
- [ ] **Image rights:** Pagani press imagery and films are used for the prototype. Confirm usage rights with Pagani.
- [ ] **Header nav:** "Inventory" and "Finance" are placeholders (`href="#"`, marked `is-todo`).
