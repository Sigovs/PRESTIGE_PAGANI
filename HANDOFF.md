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

## Model pages
- **11 pages** in `prototype/home/`: `utopia`, `utopia-roadster`, `huayra-r-evo-roadster`, `huayra-bc`, `huayra-tricolore`, `huayra-codalunga`, `huayra-codalunga-speedster`, `huayra-epitome`, `zonda-hp-barchetta`, `imola`, `imola-roadster` (`.html`).
- **Blocks, top to bottom:** hero (photo, name, one line, "Register your interest") · Exterior (words, a picture off the page's edge, three details stepping down, a held full-screen profile) · Interior (the same, mirrored) · the held film screen · Engine (large figures, a tall picture, the specifications) · gallery carousel · the showroom finale with the form.
- **Files:** `model-page.css`, `model-page.js`, `model-film.js` on top of `home_v2.css`; photographs in `assets/models/<slug>/`.
- **Generator:** `_build/mkmodel.py` wrote them, but the committed pages were edited after its last run. **Edit the HTML, do not re-run it**, or those edits are lost.

## Service and Contact pages (12 Nov 2026)
Live: https://sigovs.github.io/PRESTIGE_PAGANI/prototype/home/service.html · https://sigovs.github.io/PRESTIGE_PAGANI/prototype/home/contact.html

- **Built from the model page's own blocks** (same CSS classes, same `model-page.js`), plus `pages.css` and `pages.js` for what these two pages add. The demo site's words are used word for word (`/service-appointment/`, `/contact-us/`).
- **Service** (`service.html`), sections and anchors: hero · `#department` (words, picture, three details with the demo's captions) · `#schedule` (the Xtime scheduler) · `#film` (held film "Prefer to talk it through?") · `#find-us` (hours and service line as large figures; the buttons sit on the picture's lower edge) · `#invite` (the showroom finale with the contact form).
- **Contact** (`contact.html`): hero ("Let's talk.") · `#reach-us` (Sales, Service, Parts) · `#film` (the Grand Opening loop, "Come see us in person.") · `#visit` (both phones as large figures, sales and service hours) · the black-and-white map · `#invite` (finale with the form).
- **Floating chapters bar** (`.mn`): the sections plus **Message** (to the form). The corner card (`.mc`) goes to the scheduler on Service and to the form on Contact.
- **Xtime scheduler:** an iframe, `https://consumer.xtime.com/scheduling/?webkey=xtm202511261024xx1&variant=SERVICETAB`. The key is the one on prestigeimports.com/schedule-service. `vmode=modal` is left off on purpose: inside our frame it drew a second box with an overlay and a ✕. **Confirm with Prestige that this is the key for Pagani of Miami.**
- **Map:** Google Maps' free embed (`maps?q=…&output=embed`, no API key), live, turned black and white with a CSS filter. It sleeps until clicked ("Click to explore the map"), so the mouse wheel keeps scrolling the page; awake, it pans and zooms like Google Maps, and it sleeps again on a click elsewhere or when it scrolls off screen (`pages.js`). Google's logo and terms stay visible at its foot.
- **Films:** the held screens play our own MP4 loops (`assets/service-film.mp4`; `assets/video/grand-opening-loop-d.mp4`, `-m.mp4` on a phone), muted, only while on screen; with reduced motion the poster stays.
- **Pictures:** `assets/pages/svc-*.webp` are frames of the Pagani service film (1920×800). They are soft on the large middle card; swap them for Pagani press photographs if any are supplied.
- **Generator:** `_build/mkpages.py` (run it from `_build/`) writes both pages, lifting the head, header, both menus and scripts from `utopia.html` and the finale from `index_v2.html`. Words, pictures, the Xtime address and the map are at the top of that file.

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
- [ ] **Forms:** every page's showroom form (`[data-enq]`, in the finale) validates on the client only and shows a "not connected" note. Wire it to the CRM or lead endpoint. The fields are `name`, `email`, `phone`, `interest` and `message`.
- [ ] **Xtime:** confirm the scheduler key for Pagani of Miami (see Service and Contact).
- [ ] **Parts:** no parts phone number has been supplied; the Parts card shows none (as on the demo).
- [ ] **Video hosting:** download the full Grand Opening film from Dropbox and move it to your CDN, along with the two background loops (see above).
- [ ] **Indexing:** remove `<meta name="robots" content="noindex">` and the "PROTOTYPE … not for publication" comment at launch.
- [ ] **Phone and address:** confirm with Prestige: sales (833) 290-6287, service (833) 290-5148, and the address 14780 Biscayne Blvd.
- [ ] **Image rights:** Pagani press imagery and films are used for the prototype. Confirm usage rights with Pagani.
- [ ] **Header nav:** Inventory · Hypercars · Service (`service.html`) · Contact (`contact.html`). "Inventory" is still a placeholder (`href="#"`, `is-todo`): point it at the inventory (SRP) page. "Finance" was removed on 12 Nov 2026, as on the demo.
- [ ] **Spelling:** the copy is British ("Enquire", "enquiry"); the client asked for one spelling across all sites, and Marine and Gunther are US. Decide before launch.
