# Pagani CI research: corporate site, brand identity, dealer-site rules

**For:** the Pagani of Miami redesign (Pagani of Miami / Prestige Imports Miami, a child site of the Prestige Imports group site)
**Researched:** 1 Oct 2026. The live site was rendered in Playwright (system Chrome, headless) at 1440×900 and 390×844 (iPhone UA, touch), with consent set to "Use necessary cookies only". The raw CSS and JS were pulled with curl.
**How to read this:** every claim is tagged **[V]** verified (with its source), **[I]** inferred (with the reasoning), or **[?]** unknown / needs to be asked.
Screenshots are in `research/corp-site-shots/`.

---

## 0. Summary

| Topic | Finding |
|---|---|
| Corporate typeface | **Istok Web**, loaded from Google Fonts (`@import … family=Istok+Web:400,400i,700,700i` at the top of `main.css`). It is a **retail, free, open-source face** (SIL Open Font License) by **Andrey V. Panov**, 2008–2014, v1.0.2g, `fsType` 0. It is **not custom** and there is no licence obstacle to dealer web use **[V]**. Only weights 400 and 700 exist; the CSS asks for weight **100** on most titles, which the browser cannot honour and renders as 400 **[V]** |
| Colours | Strict **black `#000000` / white `#FFFFFF` monochrome**, with white at **50 % opacity** (`rgba(255,255,255,.5)`) as the secondary text tone. **There are no CSS custom properties, no tokens and no accent colour**: no Pagani blue and no gold in the UI **[V]**. Colour comes only from photography and the model logotypes. The one coloured brand element is the blue flourish in the full oval badge (menu only, PNG) |
| Logo | Header = the **PAGANI wordmark inside a thin oval**, served as a **PNG sprite** (`header-logo.png`, 264×70, white and black states), rendered at **132×15 px** at both 1440 and 390, centred in a 60 px fixed header. **There is no SVG wordmark on pagani.com** **[V]**. The full oval badge ("PAGANI / Automobili Modena", blue "P" flourish) appears only in the menu (79×42 PNG) |
| Motion | **No smooth-scroll library, no GSAP**. Native scrolling is switched off (`html, body {overflow:hidden}`). The site is a **wheel/swipe-hijacked full-screen slide deck** (custom jQuery 2.1.4 `Blocks` module): each wheel tick slides the next black panel up over **1.5 s** `cubic-bezier(.4,0,.2,1)` (1.0 s on mobile), then a black curtain fades off a slowly zooming (×1.1) still, then text fades in after 1.8 s. **`prefers-reduced-motion` is ignored** (identical values when emulated) **[V]** |
| Dealer lockup | Official convention = **PAGANI oval wordmark over "Pagani of [City]" in a serif, mixed case, centred**. Verified on the client's official Chicago vector files and on six other dealer sites. A "Pagani of Miami" PNG lockup already exists on the current Prestige page, but whether it is the current official artwork is **[?]**. **User decision: launch with the plain PAGANI wordmark only; the Miami lockup will come later.** |
| Written dealer-web rules | **None are public.** pagani.com has **no Terms of Use and no trademark clause** at all **[V: negative]**. The only public rule-like text is the **Official Statement of 4 Dec 2025**: only official dealers, Pagani S.p.A. and Pagani Automobili America, Inc. may sell Pagani products **[V]** |
| Client feedback (Chicago job) | Pagani rejected a deformed lockup, Title Case Every Word body copy, third-person "they" in Who We Are (must be "we"), a wrong Huayra R Evo Roadster logo, and asked to **hold the configurator post**. All the logos in the media folder are for **Pagani of CHICAGO, not Miami** **[V]** |

---

## 1. Corporate site: design specs (pagani.com)

Source for everything in this section: live render of https://www.pagani.com/ and https://www.pagani.com/pagani-utopia/ plus the theme files `/app/themes/pagani/assets/styles/{vendors,main,puro,job,override}.css` and `/assets/scripts/{vendors,main,puro,job}.js`. Values come from `getComputedStyle` and the stylesheets, captured 1 Oct 2026.

### 1.1 Stack and structure

| Item | Value |
|---|---|
| Platform | **WordPress** in a Bedrock layout (`/wp/`, `/app/themes/pagani/`, `/app/plugins/`). Plugins: WPML (EN/IT), All in One SEO 5.0.1.1, Contact Form 7 6.1.7, W3 Total Cache, a "map-dealer-locator" plugin, Cookiebot (consent) **[V]** |
| Front end | jQuery **2.1.4** (theme bundle) + Slick carousel + Hammer.js (touch) + Vivus (SVG line drawing) + jquery.inview + a jQuery `.parallax()` plugin + pickadate. Hand-written, unminified modules in `main.js`: Config, Utils, Blocks, Header, Menu, Reveal, Sliders, TechnicalSpecs, Timeline, Video, Dealer and others **[V]** |
| Breakpoint | One: **1025 px** (`Config.breakpoints.desktop: 1025`). The CSS has 719 `(min-width:1025px)` rules and 106 `(max-width:1024px) and (orientation:landscape)` rules **[V]** |
| Built by | `/credits/`: "Ideato e realizzato da **Bootique**, agenzia del Gruppo Triboo"; "Bootique Dev Team + **Purple Network** — Site development" **[V]** |
| Age | Most homepage imagery is dated `uploads/2016/11/`. Model pages were last modified 2025-11-11 (sitemap) **[V]**. The design system is about 2016–17 vintage **[I]** |
| Main IA (burger menu) | HOME · HISTORY · HYPERCARS (Zonda ×10 / Huayra ×6 / Utopia ×2 / Grandi Complicazioni ×6) · DEALERS · ARTE IN PISTA · PAGANI OFFICINA (Puro, Rinascimento, Unico) · VISIT US (Museo e Atelier, Museum tickets and Guided Tours, VIP Experience) · CONTACT · JOB & STAGE OPPORTUNITIES · PRESS ROOM · CALENDARIO PAGANI · PAGANI STORE (paganistore.com) · LEGAL & COMPLIANCE. Utilities: ITALIANO / ENGLISH; Instagram, Facebook, X, YouTube, LinkedIn **[V]** (shot 04) |
| Homepage sequence | (1) Hero still "ACT THREE, SCENE TWO: PAGANI UTOPIA ROADSTER." with the Utopia Roadster script logo, DISCOVER MORE \| PRESS RELEASE, SCROLL DOWN → (2) "PAST / PRESENT / FUTURE" over a B&W portrait of Horacio, with the italic quote "Inspired, at the highest level, by beauty and scientific research." and his signature. PAST and FUTURE each open a 5-slide sub-story (Intro, The Challenge, Leonardo, Perfection, The belief / Intro, The Research, Beauty, The Dream, Certainty). PRESENT is one slide. That is the whole homepage: **two wheel steps** plus click-entered chapters **[V]** (shots 01, 02, strip-home-01…08) |
| Model page sequence (Utopia) | 6 full-screen blocks with a numbered side pager: 01 Utopia (script logo + Horacio quote) → 02 Intro ("Pagani, Act III", READ MORE opens a white long-read overlay) → 03 Photogallery (4×3 thumbnail grid, 1/3 pager) → 04 Videogallery → 05 Technical Specifications (arc dial) → 06 Partners (AMG, Bosch, Pirelli, SKF, Brembo, ASPA, Arrow, ART logos) **[V]** (shots 06-utopia-01…06) |
| Defects seen | (a) The PHP `var_dump` of the logo attachment array ("array(24) { ["ID"]=> int(10236) … Utopia_Logo-Web.png") is printed as text in `main.content` on Utopia, Utopia Roadster, Huayra R, Huayra R Evo Roadster, Huayra Roadster BC, Huayra Tricolore, Imola and Codalunga Speedster. It is covered by the blocks so it is not visible, but it is in the DOM **[V]**. (b) Both homepage background videos (`player.vimeo.com/external/203426743.hd.mp4`, `…/203429601.hd.mp4`) return **HTTP 403**, so the PAST Intro and FUTURE Intro slides render plain black on desktop **[V]** (strip-home-03, -08). (c) Buttons render in **Arial** because `font: inherit` is not applied to `<button>` **[V]** |

### 1.2 Fonts: every @font-face

| family | src | weight/style | display |
|---|---|---|---|
| `Istok Web` | Google Fonts CSS `https://fonts.googleapis.com/css?family=Istok+Web:400,400i,700,700i` (via `@import` in main.css) → `fonts.gstatic.com/s/istokweb/v26/*.woff2`. 16 faces = 4 styles × 4 subsets (cyrillic-ext, cyrillic, latin-ext, latin). Latin files: 400 `3qTvojGmgSyUukBzKslpBmt_1EEYaA.woff2`, 400i `3qTpojGmgSyUukBzKslpA1t93kY6ah7E.woff2`, 700 `3qTqojGmgSyUukBzKslhvU5q-WMVQhTMMg.woff2`, 700i `3qT0ojGmgSyUukBzKslpA1PG-1MXSBPuMDgM.woff2` | 400 normal, 400 italic, 700 normal, 700 italic | not set by the legacy CSS API (browser default) |
| `FontAwesome` | `../fonts/fontawesome-webfont.{eot,woff2,woff,ttf,svg}?v=4.7.0` (vendors.css) | 400 normal | – |

- Body stack: `font-family: "Istok Web", sans-serif` (one declaration). A second stack, `"Helvetica Neue", sans-serif`, exists in main.css **[V]**.
- Spec dial labels use bare `font-family: sans-serif` (renders as the system sans, not Istok) **[V]**.
- Faces actually loaded on the homepage at 1440: Istok Web 400 normal and 400 italic. At 390 and on Utopia, 700 normal is also loaded **[V]**.

**Font file metadata**, read from the name table with fontTools (TTF builds of the same Google v26 files) **[V]**:
- Copyright: "Copyright (c) 2008-2014, Andrey V. Panov (panov@canopus.iacp.dvo.ru), with Reserved Font Name Istok".
- Family "Istok Web"; styles Regular / Italic / Bold / BoldItalic; version "1.0.2g"; unique ID "FontForge 2.0 : Istok Regular : 10-6-2014".
- Licence URL: `http://scripts.sil.org/OFL`. Vendor ID `PfEd` (the FontForge default, not a foundry code). `fsType` 0 (installable). Not variable. 250–255 glyphs in the latin subset.
- **Conclusion:** a free, open-source retail family, not a Pagani custom font. It may be self-hosted or used from Google Fonts. Under the OFL "Reserved Font Name" clause, a *modified* version may not be called "Istok" **[V]**.

**Weight trap.** The titles (`.block__title-h1/h3/h4`, `.block__title-h2`) declare `font-weight:100`. No 100 face exists, so they render as **Regular 400**. On ≤1024 px the h1 is switched to `font-weight:700` **[V]**. Anyone matching corporate should set these titles in 400, not ask for a Thin.

### 1.3 Type scale in use

**Display and heading text is uppercase and widely tracked (0.1–0.2em). Body text is sentence case. There is no fluid type; sizes jump at 1025 px.**

| Role (selector) | Desktop 1440: size / line-height | Mobile 390: size / line-height | Weight (rendered) | Tracking | Case |
|---|---|---|---|---|---|
| Hero / page title `h1.block__title-h1` | **36 / 42** | **24 / 32** | 100 → 400 (desktop); 700 (mobile) | 0.1em (3.6 / 2.4 px) | UPPER |
| Model name in running UI: the menu-current link, and `h1.year-two-col__title` in the white long-read | 20 / 20 | 18 / 18 | 700 | 0.2em (4 px) | UPPER |
| Section/slide title `h3.block__title-h3` ("WIND BLOWS ROUND.", "PAGANI UTOPIA") | **20 / 28** | **18 / 23** | 100 → 400 | 0.2em (4 / 3.6 px) | UPPER |
| Spec block title `h2.title` ("SPECIFICATIONS") | 20 / 20 | 20 / 20 | 700 | normal | UPPER |
| PAST/PRESENT/FUTURE buttons `.block__list-button` | 20 / normal | 14 / normal | 400 (**Arial**) | normal | as authored (UPPER) |
| Spec name `span.title__text` ("POWER") | 16 / 20 | 16 / 20 | 700 | normal | UPPER |
| Menu items `.menu__link > a` | 16 / 20 | 12 / 20 | 400 | normal | UPPER |
| Pull quote `q.block__quote` | 16 / 23, *italic*, sentence case | 12 / 17, *italic*, UPPER | 400 italic | normal | none / UPPER |
| Body / lead `h4.block__title-h4` (centred, max-width 60 %) | **13 / 23** | **14 / 18** | 100 → 400 | 0.1em (1.3 / 1.4 px) | none |
| Long-read body (white overlay) `p` | 13 / 23, justified, `#000` | 12 / 16, centred | 400 | 1.3 / 1.2 px | none |
| Hero sub-links "DISCOVER MORE \| PRESS RELEASE" | 13 / 20 | 13 / 20 | 100 → 400 | 0.65 px | UPPER as authored |
| "READ MORE" `.block__content-link` | 11 / 11 | 12 / 12 | 400 | 0.12em | UPPER as authored |
| Spec value `p.description` | 12 / 12, `rgba(255,255,255,.5)` | 12 / 14.4 | 400 | normal | **UPPER (CSS)** |
| Scroll invitation | 12 / 12 | 10 / 10 | 400 | normal | UPPER |
| Footer copyright `.footer__copyright` | 12 / 12, 50 % white, padding 20 / 25 px | footer hidden < 1025 px | 400 | normal | none |
| Spec dial label `span.label` | 10 / 10, 50 % white, system sans-serif | 10 / 10 | 400 | normal | UPPER |
| Side pager (number "01" / label) | 14 / – (label 10) | dots only | 400 | normal | label UPPER |
| "back to history of a dream" | 10 / 60 (Arial) | 10 | 400 | 1.2 px | UPPER |

**Full scale found in main.css** (font-size declarations by frequency): 20 px (27), 12 (25), 10 (25), 18 (17), 13 (15), 14 (10), 16 (6), 32 (4), 11 (4), 9 (2), 15 (2), 36, 26, 24 (1 each). Letter-spacing values: 0.2em (21), 0.1em (16), 0.12em, 0.05em, 1 px, 2 px, 1.2 px **[V]**.

### 1.4 Colour: tokens and what is actually rendered

**Custom properties: none in the theme.** The only `--*` properties on the page belong to WordPress core (`--wp-admin-theme-color` and so on) and the pickadate plugin **[V]**.

**Brand colours as used** **[V]** (main.css counts and computed values)

| Role | Value | Where |
|---|---|---|
| Ground | **`#000000`** | `html`, `body`, every `.block`, the menu, the black transition curtain (`.block:after`) |
| Primary text | **`#FFFFFF`** | `body {color:#fff}`, titles, active menu item |
| Secondary text | **`rgba(255,255,255,.5)`**, which composites to `#808080` on black | inactive menu items, footer, spec values, labels, pager |
| Hairlines on black | `#191919` (menu and spec-dial dividers), `#151515` (PAST/PRESENT/FUTURE dividers), `rgba(255,255,255,.5)` (pager rail) | |
| Button / control fill | `rgba(0,0,0,.4)` | `.button` (hamburger square, close, share) |
| Overlay | `rgba(0,0,0,.5)` page dim behind the open menu (desktop) | `.content:after` |
| Light surface | `#FFFFFF` with `#000` text | "block--white" long-read overlays |
| Gallery ground | `radial-gradient(ellipse at center,#333 0,#000 100%)` (`.bg-shade`) | photo and video gallery blocks |
| Texture | `bg-pattern.png`, a 3×3 px tile with 3 opaque black pixels on a diagonal, drawn at `background-size:3px 3px` | the diagonal scan-line texture over the hero and galleries |
| Others in CSS (not brand) | `#c03` (legacy news/factory bars), `#b1dcfb` / `#0089ec` (date picker), `#999`, `#a1a1a1`, `#141414` (slider dots), `#b00` / `#05d` (old cookie bar) | |

**Colours actually rendered**, counted across every element with its own text **[V]**:
- Home 1440: text `rgba(255,255,255,.5)` 64, `#ffffff` 37. Backgrounds `#000000` 18, `rgba(0,0,0,.4)` 5, `#ffffff` 1.
- Utopia 1440: text 50 % white 93, `#ffffff` 48, `#000000` 36 (the white long-read). Backgrounds `#ffffff` 14, `rgba(0,0,0,.4)` 13, `#000000` 8.

**Accent:** none. There is no "Pagani blue" or gold in the UI. The blue appears only inside the raster oval badge in the menu, and red only in model logotypes (the red "R" of Huayra R Evo Roadster).

**Measured contrast** (WCAG relative luminance; colour-taste I1 thresholds applied):

| Pair | Ratio | AA normal text |
|---|---|---|
| `#FFF` on `#000` | 21.0 : 1 | pass |
| 50 % white (`#808080`) on `#000` | 5.32 : 1 | pass, but used at **10–12 px** (spec labels/values, footer), below the 14 px functional floor. This is a finding, not a fix |
| `#000` on `#FFF` (long-read) | 21.0 : 1 | pass |
| White text over photography (hero, Utopia intro over a light grey studio shot, shot 06-utopia-02) | **not measured per pixel**. Visually, the white 13 px intro over the light car body in shot 06-utopia-02 is weak **[I]** | – |

### 1.5 Buttons and CTAs

There is no filled button family. CTAs are **text links or bordered nothing** **[V]**:

| Variant | Spec |
|---|---|
| `.button` (icon button: hamburger, close, share, gallery arrows) | `min-width 60px; min-height 60px; padding 18px; background rgba(0,0,0,.4); border none; color #fff; transition all .25s ease`. **border-radius 0** |
| Hamburger | 60×60 square at the top right, three 1 px lines (24 px tall icon); opening turns it into an X (`top .2s ease .2s, transform .2s`) |
| Text CTA (hero) | "DISCOVER MORE \| PRESS RELEASE", 13 px, 0.65 px tracking, no underline, no border |
| "READ MORE" | 11 px (desktop), 0.12em tracking |
| PAST/PRESENT/FUTURE | full-height list buttons, `padding 25px 60px`, 20 px, separated by 1 px `#151515` vertical rules; `min-width 240px` per item (desktop) |
| Hover | `.button--hover` opacity .5 → 1; menu links 50 % white → `#fff` plus a white bottom border, `.25s ease`; pager item widens 55 → 180 px and reveals its label (`.25s`, label `.5s`) |
| Download (press) | `.btn-download:hover {background:#fff; color:#000}` (inverts) |

### 1.6 Grid, containers and spacing

| Item | Value |
|---|---|
| Container | **None.** No max-width grid. Every block is `position:absolute; width:100%; height:100%` (one viewport) with centred content `.block__content` (`padding: 0 7%` mobile, `0 200px` ≥1025) vertically centred with `top:50%; translateY(-50%)` **[V]** |
| Text measure | Lead `h4` `max-width: 60%` (desktop) → 864 px at 1440 **[V]** |
| Block top padding | `padding-top: 60px` (clears the header) **[V]** |
| Spacing values seen | Margins after titles: h1 19 px (desktop) / 32 px (mobile); h3 25 px; h2 40 px; quote 30 / 25 px; CTA link offset 22 / 30 px; footer padding 20 / 25 px **[V]**. **No spacing scale or tokens** |
| General pages | `.block__content--general-page {max-width:1024px; line-height:24px}` **[V]** |

### 1.7 Header, logo and navigation

| Item | Value |
|---|---|
| Header | `.header {height:60px; position:fixed; top:0; z-index:2001; background transparent; pointer-events:none}`. **60 px at both 1440 and 390** (no media override). It enters with `transform .4s` from `translateY(-100%)` on init **[V]** |
| Logo file | `https://www.pagani.com/app/themes/pagani/assets/images/header-logo.png`: **PNG, 264×70, RGBA**, a two-state sprite. Top half = black wordmark+oval (bbox x1–262, y1–29); bottom half = white (bbox x1–262, y40–68). Saved as `ref-logo-header-logo.png` **[V]** |
| Logo render | `.header__logo {width:132px; height:15px; margin:22.5px auto; background-size:100% auto; background-position:50% 100%}`. So **132×15 CSS px, centred, at both 1440 and 390**, a 2× bitmap. The `.dark` class switches to `background-position:50% 0` (black) when a white block is current; the switch is delayed 1100 ms (to dark) and 150 ms (back to white) **[V]** |
| SVG | **None found on pagani.com.** The dealer-map page uses a "P" pin PNG (`map-dealer-locator/img/pin1.png`) **[V]** |
| Wordmark colour | Pure `#FFFFFF` (white state) and pure `#000000` (dark state), fully opaque pixels, anti-aliased edges **[V]** |
| Clear space / minimum size | **No rule is published.** Evidence only: the header gives 22.5 px above and below a 15 px-tall logo (1.5× the logo height), and the smallest rendered size is 132×15 px **[V]**. Any clear-space rule is **[?]** |
| Menu badge | `menu-logo.png`, 79×42, the full chrome oval badge ("PAGANI" + "Automobili Modena" + blue "P" flourish), shown small at the foot of the menu **[V]** |
| Other marks | `signature-white.png` (178×63, Horacio Pagani signature, white) under the homepage quote; favicon `cropped-favicon-32x32-1-*.png` (grey+alpha) **[V]** |
| Menu | Off-canvas from the right: **312 px wide on desktop** over a 50 % black page dim; **full-width on mobile**; `transform .5s cubic-bezier(.4,0,.2,1)`. Items are centred, uppercase, 16 px (12 px mobile), 50 % white → white. Sub-menus slide sideways (`.4s ease-out`) with a "BACK" link; language row and a 5-icon social row at the bottom, separated by 1 px `#191919` rules **[V]** (shots 04, 05) |
| Pager | Desktop: a fixed left rail with "01…06" + label, current item widened to 180 px with a white underline. Mobile: 6 px dots **[V]** |

### 1.8 Motion: a temporal capture of pagani.com

Measured from the live render (computed styles sampled every animation frame, plus a 25 fps screen recording) and from `main.js` / `main.css`.

**(a) Hero**
- Homepage hero = a **still image**, not video: `uploads/2024/07/Pagani-Utopia-Roadster-Home-1440x810-1.png` (desktop), with 1330×750 and 750×1180 (mobile portrait) variants, under the `bg-pattern` scan-line texture. The script logo `Utopia-Roadster-WEB-Logo-1.png` (950×350) sits above the h1 **[V]**.
- The only background `<video>` elements (PAST Intro, FUTURE Intro): `autoplay loop muted`, no `playsinline`, no poster, sources `player.vimeo.com/external/203426743.hd.mp4` and `…/203429601.hd.mp4`. **Both return HTTP 403**, so `readyState 0`, duration unknown, resolution unknown and nothing plays. Sound: muted by attribute **[V]**. On mobile these slides show stills instead (strip-home-m390-03, -08) **[V]**.
- Model-page films are **click-to-play** YouTube/Vimeo embeds in an overlay (`Video` module: `?autoplay=1` / `?autoplay=true`) **[V]**.

**(b) Scroll layer**
- Globals checked: `Lenis`, `lenis`, `gsap`, `ScrollTrigger`, `LocomotiveScroll`, `ScrollSmoother`, `Swiper`, `AOS`, `THREE`, `barba`, `Velocity`: **all absent**. Present: jQuery 2.1.4, Slick, Hammer, Vivus, inview, `.parallax()` **[V]**.
- `html` and `body` are `overflow:hidden`; `scrollHeight` equals the viewport height (900). **There is no document scroll at all** **[V]**.
- `Blocks` listens for `mousewheel DOMMouseScroll scroll` on each `.block`, reads only the sign of `wheelDelta`, and throttles: a new step is accepted only after `transitionDuration×2/3` = **533 ms**, while a `scrolling` lock is released **1500 ms** after `blockChanged`. On touch, Hammer pan up/down does the same. Keyboard: only **Esc** (leaves a child chapter); there are **no arrow, PageDown or Space keys** **[V]**.

**(c) Scroll-linked / pinned sequences.** None in the scroll-linked sense. Every "sequence" is a discrete step:

| Page | Steps | What changes per step |
|---|---|---|
| Home | 2 wheel steps (Hero → History), then click-entered chapters: PAST 5 slides, PRESENT 1, FUTURE 5 (wheel inside a chapter) | the full-screen panel replaces the previous one (see choreography below) |
| Utopia | 6 wheel steps (Utopia → Intro → Photogallery → Videogallery → Technical Specifications → Partners) | same choreography. The spec block reveals its dial with `transition-delay:1.5s` |

"Scroll length" in viewport heights is not meaningful: each step is one wheel tick, whatever its delta **[V]**.

**Step choreography (desktop, measured)** **[V]**

| t (ms from wheel) | Event | CSS |
|---|---|---|
| 0 | the next black `.block` gets `.slide-in` → `transform: translateY(100%) → none` | `transition: transform 1.5s cubic-bezier(.4,0,.2,1)` (desktop), `1s` (≤1024) |
| 0–1500 | panel edge measured at 100 ms intervals (px from top of the 900 px viewport): 900, 890, 855, 779, 650, 488, 348, 243, 167, 112, 71, 42, 22, 9, 2, 0 | front-loaded ease-out |
| 0 → | outgoing text gets `.fadeOut` (opacity 0 over 2 s ease-in-out) | `.js-reveal-content--hidden {transition: opacity 2s ease-in-out}` |
| 500 → 2500 | the black curtain on the new panel fades off | `.block:after` computed `opacity 2s 0.5s` (desktop); `1.35s 0.35s` (mobile) |
| 500 → 2500 | the background image goes from opacity 0, scale 1 → opacity 1, **scale 1.1** (a slow push-in) | `transform/opacity 2s cubic-bezier(.46,.03,.52,.96) .5s` (desktop); `.7s … .35s` (mobile). Outgoing: `.7s/1s cubic-bezier(.55,.09,.68,.53)` |
| 1800 → 3800 | text block fades in (opacity only, no translate) | `data-delay="1800"` (halved to 900 on mobile) then `opacity 2s ease-in-out` |
| 1100 | header logo swaps to the black state if the new block is white | `Header.darkify()` timeout |

Total time to full read ≈ **3.8 s per step on desktop** **[V: sum of delays + durations]**.

Frames: `strip-transition-00-panel-midslide.png` (≈0.2 s in), then `strip-transition-25/50/75.png` at 25 / 50 / 75 % of the ≈3.8 s choreography. These are from a headless screen recording, so the frame timing is ±40 ms **[V]**.

**(d) Entrances, transitions, hover, cursor**
- Header enters `translateY(-100%) → 0` over `.4s` on `body.init`; the footer the same from below; the pager `translate(-100%) → 35px` over `.4s` **[V]**.
- Scroll invitation: an SVG mouse icon with a line animating `moveLineDown 1s ease-out infinite` (translateY −5 → 15 px, opacity 0 → 1 → 0) **[V]**.
- Utopia: Timeline/spec content `transform, opacity 1s ease` with a 1–1.5 s delay; spec dots `transform .4s, background .4s`; spec labels `.4s` **[V]**.
- Menu: panel `transform .5s cubic-bezier(.4,0,.2,1)`; dim layer `opacity .4s`; sub-menu slide `.4s ease-out` + jQuery `fadeIn/fadeOut` (400 ms default) **[V]**.
- Close/info buttons: `all .35s ease 1.35s` (they appear 1.35 s after a slide lands) **[V]**.
- Page/route transitions: none. These are ordinary full page loads; a `pace` loader class (`pace-done`) is on `<body>` **[V]**.
- Cursor effects: none (no custom cursor rules) **[V]**.
- Easing palette in the CSS: `cubic-bezier(.4,0,.2,1)` ×3, `cubic-bezier(.55,.09,.68,.53)` ×3, `cubic-bezier(.46,.03,.52,.96)` ×1, plus `ease`, `ease-in-out` and `ease-out` **[V]**.

**(e) prefers-reduced-motion.** There are **0** `prefers-reduced-motion` rules in the CSS and no `matchMedia` call in the JS. Emulating `reduce` in Playwright gives `matchMedia(...).matches = true`, but every computed transition is identical and the measured slide curve is identical frame for frame (900 → 0 px over 1.5 s) **[V]**. The corporate site has no reduced-motion path.

**(f) Mobile (390)**
- The same deck is driven by swipe (Hammer pan).
- Panel slide 1.0 s; measured edge: 844, 822, 731, 534, 326, 189, 105, 52, 21, 5, 0 px at 100 ms steps.
- Curtain 1.35 s with a 0.35 s delay; image push-in 0.7 s; text reveal delay 900 ms.
- Video slides become stills. The menu is full width. The footer is hidden. The pager becomes 6 px dots. The PAST/PRESENT/FUTURE list stacks vertically **[V]** (strip-home-m390-01…08, 05-menu-390).

**(g) Filmstrips:** `strip-home-01…08.png` (1440) and `strip-home-m390-01…08.png` (390): hero, history, PAST intro, The Challenge, Leonardo, Perfection, The belief, FUTURE intro. `02-home-full-1440.png` is a contact sheet of the eight (a full-page capture is impossible because the document does not scroll).

### 1.9 How specs and KPIs are presented

- **There is no KPI strip.** No big numbers, no 0–100, no top speed on Utopia. Specs live in one full-screen block over a detail photo (Utopia: the quad exhaust) **[V]** (shots 06-utopia-05, 07-utopia-specs-open-1440).
- **Spec dial (desktop):**
  - The block shows "SPECIFICATIONS" (20/20 Bold, uppercase).
  - 10 white dots (9×9 px, radius 50 %) sit on a thin white arc, each labelled 10 px uppercase system sans at 50 % white.
  - Clicking a dot shows the spec name (16/20 Bold) and its value (12/12, uppercase, 50 % white) above the arc. This is a Slick fade carousel synced to the dial.
  - Mobile: the same carousel with arrows and a 2-column label grid with `#191919` rules **[V]**.
- **Values are authored in mixed case and uppercased by CSS**, so "635 kW" displays as "635 KW" **[V]**.
- **Disclaimers:** **none**. There is no EPA, consumption, emissions or "not homologated" text on any model page checked. The only consumption-like text is engine prose ("it delivers 864 bhp … 1100 Nm") **[V]**.
- **Model logotypes** are raster PNG script logos placed above the h1 (white on dark; the R Evo Roadster logo has a red "R"). Files saved: `ref-logo-model-*.png` (Utopia 950×291, Utopia Roadster 950×350, Huayra R 754×291, Huayra R Evo Roadster negative 1000×310 and 3913×1212, Codalunga Speedster 2723×1032, Imola 340×100, Huayra Roadster 340×100) **[V]**.

**Spec rows exactly as authored** (label | value, verbatim; not normalised) **[V]**:

*Utopia* (`/pagani-utopia/`): DRY WEIGHT 1.280 Kg (2822 lb) · POWER 864 HP (635 kW) at 6000 RPM at 18 °C · TORQUE 1100 Nm from 2800 RPM to 5900 RPM · ENGINE Pagani V12 60° 5980 cc twin turbochargers, developed on a bespoke basis by Mercedes-AMG · GEARBOX Pagani by Xtrac 7-speed transversal AMT (Automated Manual Transmission) or pure manual, with electro-mechanical differential · CHASSIS Monocoque in Pagani Carbo-Titanium HP62 G2 and Carbo-Triax HP62 with front and rear tubular subframes in Cr-Mo alloy steel · SUSPENSIONS Forged aluminum alloy independent double wishbone with helical springs and electronically controlled shock absorbers · BRAKES Pagani by Brembo 4 ventilated carbon-ceramic discs brake unit, 410x38 mm with 6 pistons monolithic calipers at the front and 390x34 mm with 4 pistons monolithic calipers at the rear · WHEELS APP forged monolithic aluminum alloy, 21” at the front and 22” at the rear · TYRES Pirelli PZero Corsa 265/35 R21 at the front and 325/30 R22 at the rear; Pirelli SottoZero for driving in low temperatures

*Utopia Roadster*: DRY WEIGHT 1,280 kg (2,822 lb) · POWER 864 HP (635 kW) at 6,000 rpm at 18° C · TORQUE 1,100 Nm from 2,800 to 5,900 rpm · ENGINE Pagani V12 60° 5980 cc twin turbochargers, developed for Pagani by Mercedes-AMG · GEARBOX (as Utopia) · CHASSIS … CrMo alloy steel · SUSPENSION (as Utopia) · BRAKES … 410×38 mm … 390×34 mm … · WHEELS Forged monolithic aluminum alloy, 21” at the front and 22” at the rear · TIRES Pirelli P ZERO™ Corsa 265/35 R21 … 325/30 R22 …; Pirelli P ZERO™ Winter for driving in low temperatures

*Huayra R*: Chassis … · Engine Pagani V12-R - 6.0 litres – naturally aspirated 12-cylinder V · Power 850 HP (625 kW) at 8250 rpm · Torque 750 Nm from 5500 to 8300 rpm · Traction Rear-wheel drive · Gearbox 6-speed sequential, non-synchronized dog ring gearbox · Brakes Brembo CCM-R … · Wheels … Front 19 inches; Rear 19 inches · Tyres Pirelli P Zero slick version - Dry and Wet: Front 275/675 R19; Rear 325/705 R19 · Suspensions … · Dry weight 1050 Kg (2314 lb)

*Huayra R Evo Roadster*: POWER 900 hp (662 kW) at 8,750 rpm · TORQUE 770 Nm from 5,800 to 8,200 rpm · ENGINE Pagani V12-R Evo, 6.0 liters, naturally aspirated 12-cylinder V 60° and longitudinal central position · GEARBOX 6-speed sequential plus reverse, non-synchronized dog ring gearbox with sintered metal 3-disc racing clutch · TRANSMISSION Rear-wheel drive · CHASSIS … · SUSPENSION … with additional heave damper per axle · BRAKES Brembo CCM-R ventilated discs front 410×38 mm … rear 390×34 mm with monolithic 6-piston calipers · WHEELS … front 19 inches and rear 20 inches · TIRES Pirelli P ZeroTM Slick, in Dry and Wet specs front 280/680 R19 and rear 345/725 R20 · DRY WEIGHT 1,060 kg (2,336.94 lb) · DIMENSIONS Length: 5180 mm (203.94 inches); width: 2077 mm (81.77 inches); height: 1164 mm (45.83 inches); wheelbase: 2792 mm (109.92 inches) · MAX SPEED 350 km/h (218 mph)

*Huayra Codalunga*: ENGINE Pagani V12 60° 36 valves 5,980 CC, twin turbo · POWER 840 CV (618 kW) at 5,900 rpm · TORQUE 1,100 Nm from 2,000 rpm to 5,600 rpm · TRANSMISSION Pagani by Xtrac, transverse mounted 7-speed sequential · … · DRY WEIGHT 1,280 kg (2,822 lb)

*Huayra Codalunga Speedster*: Dimensions Length 4,912 mm (193.3 in) / Width 2,050 mm (80.7 in) / Height 1,174 mm (46.2 in) / Wheelbase 2,795 mm (110.0 in) · Dry weight 1,270 kg (2,800 lb) · Engine 60° Pagani V12, 5,980 cc, twin-turbo, developed with Mercedes-AMG · Power 864 HP (635 kW) at 6,000 rpm · Torque 1,100 Nm (811 lb-ft) from 2,800 rpm · Gearbox 7-speed transverse Pagani by Xtrac, available in AMT … or pure manual · … · Wheels Monolithic Avional, 20" front, 21" rear · Tires Pirelli Trofeo R Front 265/30 R20 Rear 355/25 R21

*Imola Roadster*: DRY WEIGHT 1,260 kg (2,776.67 lb) · POWER 850 CV (625 kW) at 5,600 rpm at 18 °C · TORQUE 1,100 nm from 3,600 to 5,600 rpm · … · MAXIMUM SPEED 350 km/h (217.48 mph), self-limiting

*Pagani Imola*: Power 827 HP · Torque 1100 Nm · Engine Mercedes-Benz AMG 60° V12; 5980 cc. · Dry weight 1,246 kg/ 2747 lbs (other rows on page)

**Contradictions inside the corporate spec data** (reported, not resolved):
- Power unit varies: "HP" (Utopia, Huayra R), "hp" (R Evo Roadster), "CV" (Codalunga, Imola Roadster).
- Thousands separator varies: "1.280 Kg" (Utopia, Italian dot) vs "1,280 kg" (Utopia Roadster and Codalunga).
- Spelling varies: "Kg"/"kg", "nm"/"Nm", "Tyres"/"Tires", "Suspensions"/"Suspension", "18 °C"/"18° C".
- Engine credit varies: "developed on a bespoke basis by Mercedes-AMG" vs "developed for Pagani by Mercedes-AMG" vs "developed with Mercedes-AMG" vs "Mercedes-Benz AMG 60° V12".
- Torque band varies: Codalunga Speedster "from 2,800 rpm" vs Codalunga "from 2,000 rpm to 5,600 rpm".
- Imola Roadster lists wheels "Front 21 inches; Rear 22 inches" but tyres "R20 / R21".

### 1.10 Imagery and UI motifs

- **Imagery:** low-key, cinematic, often monochrome or desaturated (Horacio portrait in B&W, sketches, macro details of machined parts, carbon weave). Cars appear as studio shots on light grey (Utopia gallery) or as detail crops. The hero is a high-key studio render of the Utopia Roadster **[V]** (strip-home-01…08, 06-utopia-*).
- **Script model logotypes** are the strongest graphic device: a large white script above a small tracked uppercase title (shot 06-utopia-01) **[V]**.
- **Scan-line texture** (`bg-pattern.png`, 3×3 px diagonal) is laid over hero and gallery imagery **[V]**.
- **Leonardo / art-and-science** voice: "Art and science can walk together, hand in hand" (Leonardo da Vinci), "Knowledge is the daughter of experience", "Wind blows round." Horacio's signature is used as a graphic sign-off **[V]**.
- Map pins on the dealer locator are black teardrops with a white "P" **[V]** (09-dealers-miami-1440).

---

## 2. Brand identity

### 2.1 Logo and marks

| Fact | Source |
|---|---|
| The current corporate mark in web use is the **"PAGANI" wordmark in a wide, rounded, geometric uppercase inside a thin horizontal ellipse**, flat, single colour (white or black) **[V]** | `header-logo.png` (live) |
| The **full badge** ("PAGANI" on a chrome oval, a blue "P" flourish top left, "Automobili Modena" lettering) is still used, but small: only in the menu foot on pagani.com **[V]**. On Greenwich's dealer site it sits beside "MILLER MOTORCARS" (bench-greenwich) | `menu-logo.png` (live); bench screenshot |
| History: secondary sources say the logo has had **two designs**: an original 3-D oval badge, and a simplified flat version (thin oval and wordmark only) said to date from **2005**. The badge's "P" and "Automobili Modena" pay tribute to Modena **[V-secondary]** — not confirmed on a Pagani primary page | https://1000logos.net/pagani-logo/ ; https://logotyp.us/logo/pagani/ |
| The wordmark letterforms are drawn (custom), not a font. No font name is published **[I]**: the files are outlines/bitmaps and the letters do not match Istok Web | header-logo.png; Chicago PDF (no fonts embedded) |
| Founder mark: **Horacio Pagani's signature** (`signature-white.png`) is used as a brand element on the homepage **[V]** | live |

### 2.2 Horacio Pagani, the Atelier, naming

- Company names in use **[V]**: "Pagani S.p.A." (footer, contact page; VAT 02054560368), "Horacio Pagani S.p.A." (Pagani App privacy policy, as data controller), "Pagani Automobili" (press releases, menu), "Pagani Automobili America, Inc." (Coral Gables, FL corporate office).
- Legal address: Via dell'Artigianato, 5 – Vill. La Graziosa, 41018 San Cesario sul Panaro (MO), Italy. Operations: Via dell'Industria, 26 **[V]** (`/contact-us/`).
- House vocabulary, as styled on pagani.com **[V]**:
  - **Atelier**, capitalised ("the Pagani Atelier", "Pagani Museo e Atelier").
  - **Hypercar(s)**, capitalised in press copy ("a curated display of Hypercars").
  - **Grandi Complicazioni**, the division for few-off and one-off creations.
  - **Arte in Pista**, the track-client programme.
  - **Pagani Officina**, with its three programmes **Pagani Puro**, **Pagani Rinascimento** (restoration) and **Pagani Unico** (one-off tailoring).
  - **Pagani VIP Experience**.
  - **Calendario Pagani**.
  - "**few-off**", lower case and hyphenated.
- Horacio's title in press releases: "**Founder & Chief Designer of Pagani Automobili**" **[V]** (press, Huayra R Evo Roadster, 8 Feb 2024).
- Recurring line: "**Inspired, at the highest level, by beauty and scientific research.**" (homepage, signed by Horacio) **[V]**. The Chicago dealer site reuses it (bench-chicago).

---

## 3. Dealer / retailer rules

### 3.1 What is verified

| Item | Detail | Source |
|---|---|---|
| Terminology | Dealer locator titles: "**PAGANI *of* [City]**" (with "of" and the city in `<em>`), subtitle "**Official Dealer for [territory]**". Hero: "DISCOVER THE WORLDWIDE PAGANI DEALER AND SERVICE NETWORK." Service-only partners are "Authorized Service Centre". Corporate does not use "retailer" | `admin-ajax.php?action=mobile_map_ajax_request` (25 records); `/dealers/` |
| **Pagani of Miami record** | Title "PAGANI of Miami"; subtitle "**Official Dealer for the State of Florida**"; "MIAMI, FLORIDA (USA)"; address "14800 Biscayne Boulevard, North Miami, 33181-" (sic, trailing hyphen); tel **+1 833 290 6287**; contact e-mail at the prestigeimports.com domain; site **https://www.paganimiami.com/**; lat/long 25.913485, -80.157503. The dealer image referenced (`wpdealers-image/7_Pagani of Miami.jpg`) does not load **[V]** | same endpoint; shot 09-dealers-miami-1440 |
| Address mismatch | The current Prestige page header shows **14780** Biscayne Blvd, North Miami Beach; Pagani's locator shows **14800** Biscayne Boulevard, North Miami. Which is correct for Pagani is **[?]** | bench-miami-current; locator |
| Domain | `paganimiami.com` **redirects to `prestigeimports.com/pagani-ast`** (page title "Pagani - Art and Science Together in North Miami Beach FL") **[V]** | Playwright final URL |
| Corporate office in Florida | "PAGANI Automobili America, Inc — Pagani Corporate Office — 4135 Laguna Street, Coral Gables, FL 33146" **[V]** | locator JSON id 102 |
| **Official Statement** (4 Dec 2025) | "…certain legal entities and individuals have unlawfully used the Pagani name and brand in order to offer or sell new Pagani vehicles… **only the official Pagani dealers, Pagani S.p.A. and Pagani Automobili America Inc. are authorized to sell Pagani products and provide after sales services for our vehicles.**" It asks the public to verify against the dealer list and report to legal@pagani.com | https://www.pagani.com/press/official-statement/ |
| Trademarks / Terms of Use | **No Terms of Use, no trademark notice and no IP clause on pagani.com.** The Privacy Notice, App Privacy Policy, Whistleblowing, Credits and Contact pages were checked **[V: negative]**. Marks are still registered IP. The absence of a published clause is **not** permission **[I]** | the pages listed |
| Corporate footer line | "**© 2026 Pagani S.P.A. - rights reserved - P.IVA 02054560368 - credits**" (sic: "S.P.A.", lower-case "rights reserved") **[V]** | live footer |
| Miami showroom | Opened as "Pagani of Miami" in partnership with Prestige Imports, North Miami Beach. Described as "an extension of the Pagani brand's Atelier", with signature Pagani furniture, digital visualisation, carbon fibre, leather, aluminium, titanium, Italian brickwork and a "hidden vault" aesthetic. Christopher Pagani: "Miami is one of Pagani's most successful markets." Article dated 23 Oct 2023 **[V-secondary]** | https://news.dupontregistry.com/blogs/dealer-news/pagani-automobili-debuts-the-new-pagani-of-miami-dealer-as-it-expands-in-the-u-s |

### 3.2 What the client's Pagani feedback says (media folder, Chicago job)

Source: `/Users/alex/Desktop/WORK/______MEDIA PAGANI/Pagani.docx` (text and the six images in `word/media`). These comments were made on a **Pagani of Chicago** site **[V]**.

| # | Pagani's comment (verbatim) | What it tells us |
|---|---|---|
| 1 | "the Pagani of Chicago logo is still wrong and deformed" (image1: the oval PAGANI with "OF CHICAGO" in an uppercase sans underneath) | The lockup must be the supplied artwork, unmodified. The rejected version swapped the serif "Pagani of Chicago" for "OF CHICAGO" in uppercase sans. **No redrawing, no restyling, no stretching** |
| 2 | "All the text has the initial letter capitalized. It doesn't have to be", followed by an example in Title Case Every Word ("A Car May Be Compared To A Sculpture…") | **Body copy in sentence case.** No Title Case Every Word |
| 3 | "The Hypercar and Grandi Complicazioni links on the menu don't work" | Navigation QA. Pagani's own categories are expected in the menu |
| 4 | "The Who We Are text speak in 3rd plural (they) but it should be 1st plural (we)" | **Dealer copy speaks as "we"** |
| 5 | "You need to separate the Contact button from the car" | CTAs must not sit on the car |
| 6 | "On the Huayra BC page you have the Huayra logo" | Each model page must use **that model's own logotype** |
| 7 | "On the News and Events page, hold off on posting the page with the Pagani configurator for now" (image5: the configurator article text, mentioning virtualexp.pagani.com, MHP, Unreal Engine) | **Configurator content is on hold.** Do not publish it without Pagani's go-ahead |
| 8 | "The Huayra R Revo Roadster logo is wrong. The correct version is:" (image6) | The correct logotype is "Huayra" script + red "R" + "EVO" + "Roadster" script. The model's official name is **Huayra R Evo Roadster** (pagani.com menu and page title). "Revo" in the comment is the R and EVO read together. **Do not write "Revo"** |

**Logo files in the folder are for Pagani of CHICAGO, not Miami** **[V]**:
- `Logo_Pagani_of_Chicago.eps`: Illustrator 28.4, created 18/04/24, "For: Anna Pietri", BoundingBox 0 0 142 36. The swatch list holds PANTONE Cool Gray 10 C, PANTONE 7578 C and PANTONE 2945 C (listed swatches only; not all are proven to be used).
- `Pagani of Chicago_Positive version (1).pdf`: 141.73 × 35.01 pt. **All outlines, no fonts.**
  - 22 paths, all filled with the single spot colour **Separation "PANTONE Cool Gray 10 C"**. The alternate tint values in the file are `C1 [.387155 .394442 .413078]`, which is about `#636569` (derived from the file's alternate space; not a Pagani-published hex).
  - Contrast of that alternate on white is 5.85 : 1.
- `…Negative version (1).pdf`: same geometry, filled `#FFFFFF`.
- `…page-0001.jpg` (296×73) is a raster preview.
- `huayrarevo.png` (918×424) is the correct R Evo Roadster logotype (identical in content to docx image6).

**Lockup geometry** (Chicago positive PDF, in pt) **[V]**:
- Oval: 141.73 × 16.09.
- Wordmark letters: cap height 7.30 (45 % of oval height), spanning x 25.28 → 118.19.
- City line "Pagani of Chicago": serif, mixed case, x 23.08 → 118.50 (≈ the same width as the wordmark), cap height 8.38, x-height 5.87.
- Gap from the oval bottom to the city cap top: 7.0.
- Overall aspect 4.05 : 1.
- The serif typeface is not identifiable from outlines **[?]**.

Copies saved: `ref-logo-client-pagani-of-chicago-positive.png` / `-negative.png`, `ref-docx-image1-chicago-logo-deformed.png`, `ref-docx-image6-huayra-r-evo-roadster-correct.png`, `ref-logo-client-huayra-r-evo-roadster-supplied.png`.

### 3.3 US and Florida legal requirements (these apply whatever Pagani's CI says)

| Requirement | Detail | Source |
|---|---|---|
| FL advertised price | The advertised price must include all fees the customer must pay except taxes, tag, registration and title (§501.976(16)). Predelivery-fee disclosure wording per §501.976(18) | https://www.flsenate.gov/Laws/Statutes/2025/501.976 |
| EPA fuel economy | Any MPG figure shown must be identified as an EPA estimate (16 CFR 259.4). **Pagani publishes no MPG anywhere**, so the safest route is to show none unless supplied **[I]** | https://www.law.cornell.edu/cfr/text/16/259.4 |
| Track-only cars | Huayra R and R Evo Roadster are track cars (Arte in Pista). Whether US dealer pages need a "not street legal" note is **[?]** | press, Huayra R Evo Roadster |

### 3.4 Not public (unknown, must be requested) **[?]**

- Whether Pagani Automobili America has a **dealer website standard**, approval step or approved-vendor list.
- The **official Pagani of Miami lockup** (vector, positive/negative, colour, clear space, minimum size). A raster "Pagani of Miami" lockup (`cdn-ds.com/media/sz_14327/1477/Artboard_43_w.png`, 1350×284, white at alpha 166/255, aspect 4.75 : 1) is on the current Prestige page. Its proportions differ from the official Chicago file (4.05 : 1), so it may be a redraw (`ref-logo-pagani-of-miami-lockup-from-prestige-page.png`).
- A **vector of the plain PAGANI oval wordmark**. pagani.com ships only a 264×70 PNG.
- Clear space, minimum size and colour rules for the wordmark, and **co-branding rules with Prestige Imports**.
- Model logotypes as vectors, photography and video rights.
- Whether the configurator (virtualexp.pagani.com) may now be linked or posted (the Chicago job put it on hold).
- Pricing policy (MSRP, "price on request"), pre-owned/certified wording, and the disclaimer set.

---

## 4. Benchmarks: other official Pagani dealer sites

Rendered 1 Oct 2026 at 1440. Screenshots are `corp-site-shots/bench-*-hero-1440.png` and `bench-*-full-1440.png`.

| Dealer | Platform | Type | Palette (rendered) | Lockup | Motion layer | Premium? |
|---|---|---|---|---|---|---|
| **Pagani of Miami** (current; paganimiami.com → prestigeimports.com/pagani-ast) | DealerSocket / DealerFire (`cdn-ds.com`, `dfanalytics.dealerfire.com`), jQuery 2.2.4 **[V]** | Roboto 300/400/700 + Abel | text `#3c3939`, `#ffffff`, `#1d1b25`; bg `#ffffff`, `#928888`, `#000000` | Prestige Imports group header; a "PAGANI / Pagani of Miami" raster lockup in the page hero | AOS present, 13 running animations, YouTube autoplay iframe, no smooth scroll, 0 reduced-motion rules **[V]** | Low. A group-site template page, not a Pagani site |
| **Pagani of Beverly Hills** (O'Gara) | Dealer.com (DDC, React, jQuery 1.7.2) **[V]** | DDC Heading Font Face + Schibsted Grotesk | white / `#999999` on `#3a3a3a` / `#202020` | oval + "Pagani of Beverly Hills" serif, white SVG (`logo-one-color-white.svg`, 162×34) | Full-bleed autoplay muted loop MP4 hero (1080×608, 107 s, videos.dealer.com); 2 reduced-motion rules **[V]** | Medium. Good film, generic chrome |
| **Pagani of Greenwich** (Miller Motorcars) | WordPress 4.9.28, theme "aanWordpress" **[V]** | **IstokWeb** (self-hosted) + GillSans | `#0c2234` navy, white, `#545454` | "MILLER MOTORCARS" + full chrome badge | jQuery, 296 transitioned elements, side pager "01–06" copying corporate; no smooth scroll **[V]** | Low–medium. Copies the corporate pager and type, but carries the group brand |
| **Pagani of Chicago** | WordPress 6.1 + Elementor 3.13 + WP Rocket, theme "**aanWordpress**" (same theme name as Greenwich) **[V]** | Roboto + **Istok Web** | white, cyan accents `#48b5d3` / `#57c6be`, `#000` | oval + "Pagani of Chicago" (`mainlogo.svg`, 243×60). In the capture it overlaps the Utopia script logo | AOS; fixed 110 px header; autoplay muted loop MP4 hero (2560×1440, 30.9 s); 3 reduced-motion rules **[V]** | Medium. Corporate quote and font, but a cyan accent that is not Pagani's |
| **Pagani of San Francisco** | DealerOn **[V]** | Roboto Condensed 900 | `#222222`, white, `#003f7a` | oval + "Pagani of San Francisco" serif PNG | video element present (no source loaded); 7 reduced-motion rules | Low. Heavy condensed caps, dealer chrome |
| **Pagani Dallas** | Dealer.com **[V]** | DDC Heading Font Face | white / black | oval + "Pagani of Dallas" | autoplay muted loop MP4 (1080×563, 59 s) | Low. Page title "Richardson Car Loan…" |
| **Pagani of Nashville** | WordPress 6.9 + WPBakery **[V]** | **Istok Web** 400/700 + Lato | black, white, `#777` | oval + "Pagani of Nashville" PNG (202×50) | Vimeo background iframes (`background=1`); right-hand dot pager like corporate; 36 reduced-motion rules **[V]** | Medium–high. Black, restrained, corporate font, corporate-style pager |
| **Pagani of Monaco** (→ bpmexclusive.com/gamme-pagani) | Custom (BPM Exclusive) **[V]** | BPM house fonts | white / black | oval + "Pagani of Monaco" over a studio Utopia | `scroll-behavior: smooth`; 21 reduced-motion rules | Medium. Clean, but a group site |

**Smooth-scroll check across all eight:** no Lenis (no `lenis` classes), no GSAP, no Locomotive **[V]**.

**What they share:**
- **The lockup convention: the PAGANI oval over "Pagani of [City]" in a serif, mixed case, centred.** Seen on Beverly Hills, San Francisco, Dallas, Nashville, Monaco, Chicago (official file) and Miami (current page). This is consistent with Pagani supplying it **[V/I]**.
- "Official Dealer" language.
- Dark grounds.
- Three of eight (Greenwich, Chicago, Nashville) set text in Istok Web, so dealers already align with the corporate font **[V]**.

**What differs:** the platform (DealerSocket, Dealer.com ×2, DealerOn, WordPress ×3, custom). **No mandated template is evident** **[I]**.

---

## 5. Current line-up and official naming (pagani.com, 1 Oct 2026)

| Group (menu) | Names exactly as in the corporate menu | Notes |
|---|---|---|
| Zonda | Zonda C12, Zonda S, Zonda Roadster, Zonda F, Zonda Roadster F, Zonda Cinque, Zonda Cinque Roadster, Zonda Tricolore, Zonda R, Zonda Revolución | heritage pages |
| Huayra | Huayra, Huayra BC, Huayra Roadster, Huayra Roadster BC, Huayra R, **Huayra R Evo Roadster** | R / R Evo Roadster = track cars, Arte in Pista |
| Utopia | **Utopia** (page title "Utopia"; h1 copy "Pagani Utopia"), **Utopia Roadster** | the current series production. The homepage hero is "ACT THREE, SCENE TWO: PAGANI UTOPIA ROADSTER." |
| Grandi Complicazioni | Zonda HP Barchetta, Imola, Huayra Tricolore, Huayra Codalunga, **IMOLA ROADSTER** (sic, uppercase in the menu), Huayra Codalunga Speedster | few-off |
| Latest few-off and one-off (press, not yet in the menu) | **Pagani Huayra 70 Derecho**: world premiere at Goodwood Festival of Speed (release dated 7 Jul 2026); "a new few-off creation born from… the Grandi Complicazioni division and second of the three Huayra 70 made to celebrate Horacio Pagani 70th birthday"; Pearl Orange and Inky Blue livery. **Pagani Zonda C12S 7.0L** (one-off, 2000, Rinascimento) at Concorso d'Eleganza Villa d'Este 2026. **Pagani Zonda Cervino** (Pagani Unico) **[V]** | https://www.pagani.com/press/pagani-automobili-at-the-goodwood-festival-of-speed-world-premiere-of-the-pagani-huayra-70-derecho/ ; https://www.pagani.com/press/pagani-automobili-on-lake-como-the-pagani-zonda-c12s-7-0l-officially-debuts-at-the-concorso-deleganza-villa-deste-2026/ |
| Packages | Huayra R "with the optional **Tempesta** package" (Goodwood 2026 release) **[V]** | same |
| Programmes | Arte in Pista; Pagani Officina → Pagani Puro, Pagani Rinascimento, Pagani Unico; Pagani Museo e Atelier; Pagani VIP Experience; Pagani Store (paganistore.com) **[V]** | menu |

**Casing:**
- In UI, corporate CSS uppercases titles and spec values; the authored names are in title case ("Huayra R Evo Roadster", "Utopia Roadster").
- Accents are kept: "Zonda Revolución", "Concorso d'Eleganza Villa d'Este".
- "IMOLA ROADSTER" is authored in uppercase in the menu, an inconsistency.
- In running copy, Pagani writes "Hypercar(s)" and "Atelier" capitalised **[V]**.
- The Huayra 70 itself (the first of the three) was not found on pagani.com in this pass **[?]**.

---

## 6. Implications for the redesign

### Hard constraints (treat as non-negotiable until Pagani says otherwise)

1. **Marks: use supplied artwork only, unmodified.** Pagani has already rejected a deformed and restyled lockup on Chicago.
   - **Per the user's decision, launch with the plain PAGANI oval wordmark only.** Pagani's own source is a 264×70 PNG (132×15 at 1×), so a vector must be requested before launch.
   - Do not typeset "Pagani of Miami" ourselves, and do not reuse the Chicago files.
2. **Each model page carries its own model logotype**, and the R Evo logo is the red-R version. The name is written "**Huayra R Evo Roadster**", never "Revo".
3. **Copy voice:** first person plural ("we"); body in **sentence case** (no Title Case Every Word); house terms as Pagani styles them (Atelier, Hypercar, Grandi Complicazioni, Arte in Pista, Pagani Officina / Puro / Rinascimento / Unico).
4. **Configurator content on hold** until Pagani approves it (Chicago precedent).
5. **Claim only what the Official Statement allows:** "Official Dealer for the State of Florida" is the corporate wording for Miami. Do not imply that Prestige can sell Pagani products outside that status.
6. **Florida pricing law** and, if any fuel figure is shown, EPA labelling. Corporate shows none.

### Freedoms (peers vary widely and corporate publishes no dealer web rules)

- **Typeface:** Istok Web is OFL and free to use and self-host, so there is no licensing barrier to matching corporate. Three dealers already use it.
- **Palette:** corporate defines only black, white and 50 % white. Any accent would be our invention. The Chicago site's cyan shows that dealers do invent one, but nothing mandates or forbids it **[I]**.
- **Platform and stack:** five different stacks across the benchmarks.
- **Motion:** corporate's slide-deck hijack and its lack of a reduced-motion path are not a standard we have to inherit. Lenis (house rule) is compatible with nothing Pagani mandates **[I]**.
- **Layout, IA, local content:** the Miami showroom ("extension of the Atelier", vault aesthetic), our own photography.

### Aligning with corporate (recommended, not required)

- A black ground with white and 50 %-white text; widely tracked uppercase titles (0.1–0.2em); quiet sentence-case body.
- The scan-line texture over imagery.
- Script model logotypes above a small tracked title.
- Slow push-in reveals (scale 1 → 1.1 over 2 s) and long opacity fades (2 s ease-in-out), with the curve vocabulary `cubic-bezier(.4,0,.2,1)` and `(.46,.03,.52,.96)`.
- A 60 px transparent header with the centred 132×15 wordmark.
- Spec presentation as label/value pairs with units as authored (dual metric/imperial in brackets).

---

## 7. Questions for the client and Pagani Automobili America

1. Is there a **Pagani dealer website standard**, an approval step or an approved-vendor list? Must Pagani sign off on the site before launch?
2. **Wordmark:** can we have the plain PAGANI oval wordmark as vector (SVG/EPS), positive and negative, with clear-space and minimum-size rules? (Needed now, since the user has decided on the plain wordmark for launch.)
3. **Pagani of Miami lockup (open item, to fix later):** the official vector artwork, equivalent to the Chicago files we hold. Is the raster "Pagani of Miami" lockup on the current Prestige page approved and current?
4. **Co-branding:** how may Prestige Imports appear on the Pagani of Miami site (footer only, a separate bar)? Is paganimiami.com to become a standalone site rather than a redirect to prestigeimports.com/pagani-ast?
5. **Address:** Pagani's locator says 14800 Biscayne Boulevard, North Miami 33181; the Prestige page says 14780 Biscayne Blvd, North Miami Beach. Which goes on the site, and should Pagani's record (and its broken dealer image) be updated?
6. **Model logotypes:** vector files for every current model, especially the correct Huayra R Evo Roadster (red R).
7. **Configurator:** is the hold from the Chicago job still in force? May we link virtualexp.pagani.com?
8. **Spec data:** which source is canonical, and in which unit style (HP or CV, decimal separator, metric first)? The corporate pages contradict each other (see §1.9).
9. **Pricing, inventory and pre-owned:** rules for showing prices, pre-owned Pagani wording and any certification name.
10. **Imagery and video rights** for corporate press photography, and whether the Huayra 70 Derecho and other few-offs may be featured.

---

## Sources (primary first)

- Live corporate site, CSS and JS: https://www.pagani.com/ · https://www.pagani.com/pagani-utopia/ · https://www.pagani.com/app/themes/pagani/assets/styles/main.css · https://www.pagani.com/app/themes/pagani/assets/scripts/main.js · https://www.pagani.com/page-sitemap.xml
- Font: https://fonts.googleapis.com/css?family=Istok+Web:400,400i,700,700i (name tables read locally from the Google v26 files) · OFL http://scripts.sil.org/OFL
- Logos: https://www.pagani.com/app/themes/pagani/assets/images/header-logo.png · /menu-logo.png · /signature-white.png · /bg-pattern.png · model logos under https://www.pagani.com/app/uploads/
- Model pages: /utopia-roadster/ · /huayra-r/ · /huayra-r-evo-roadster/ · /pagani-imola/ · /imola-roadster/ · /huayra-codalunga/ · /huayra-codalunga-speedster/ · /huayra-roadster-bc/ · /huayra-tricolore/ · /zonda-hp-barchetta/
- Dealers: https://www.pagani.com/dealers/ · https://www.pagani.com/wp/wp-admin/admin-ajax.php?action=mobile_map_ajax_request&search=&v=1.1
- Legal: https://www.pagani.com/privacy-notice/ · /privacy-policy/ · /credits/ · /contact-us/ · /whistleblowing/ · Official Statement https://www.pagani.com/press/official-statement/
- Press: https://www.pagani.com/press/ · Huayra 70 Derecho (Goodwood 2026) · Zonda C12S 7.0L (Villa d'Este 2026) · Huayra R Evo Roadster (8 Feb 2024) · Monterey Car Week 2025
- Miami opening: https://news.dupontregistry.com/blogs/dealer-news/pagani-automobili-debuts-the-new-pagani-of-miami-dealer-as-it-expands-in-the-u-s
- Logo history (secondary): https://1000logos.net/pagani-logo/ · https://logotyp.us/logo/pagani/
- Florida §501.976: https://www.flsenate.gov/Laws/Statutes/2025/501.976 · FTC 16 CFR 259.4: https://www.law.cornell.edu/cfr/text/16/259.4
- Client material: /Users/alex/Desktop/WORK/______MEDIA PAGANI/ (Pagani.docx; Logo_Pagani_of_Chicago.eps; logos/*.pdf; huayrarevo.png)
- Benchmarks: prestigeimports.com/pagani-ast (via paganimiami.com) · paganibeverlyhills.com · paganiofgreenwich.com · paganiofchicago.com · paganisanfrancisco.com · paganiofdallas.com (via paganidallas.com) · paganiofnashville.com · bpmexclusive.com/gamme-pagani (via paganiofmonaco.com)
