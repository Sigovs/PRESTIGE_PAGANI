# Task for a coding agent: Pagani of Miami — Service and Contact pages

You are porting two finished prototype pages to the live Pagani of Miami site (WordPress, built by All Auto Network; staging at
paganimiami.aandemo.com, behind a password). The design is approved. **Reproduce it; do not redesign it.**

## Sources of truth
- Repo: https://github.com/Sigovs/PRESTIGE_PAGANI (branch `main`), folder `prototype/home/`.
- The two pages, live: https://sigovs.github.io/PRESTIGE_PAGANI/prototype/home/service.html and
  https://sigovs.github.io/PRESTIGE_PAGANI/prototype/home/contact.html
- Human handoff with context and open items: `HANDOFF.md` (section "Service and Contact pages").
- Markup: `service.html`, `contact.html`. Styles: `home_v2.css` → `models-menu.css` → `model-page.css` → `pages.css` (in that
  order). Scripts: `vendor/gsap.min.js`, `vendor/ScrollTrigger.min.js`, `vendor/lenis.min.js`, `model-page.js`, `models-menu.js`,
  `pages.js`.
- Generator (reference only): `_build/mkpages.py` holds every word, picture, phone number, the Xtime address and the map in one place.

## Where the pages go
| Prototype | Site URL (replace the demo's current page) |
|---|---|
| `service.html` | `/service-appointment/` |
| `contact.html` | `/contact-us/` |

The site's header, side menu ("Hypercars") and footer already exist on the demo; keep the site's own. Only these must hold in them:
the header reads **Inventory · Hypercars · Service · Contact** (no Finance) and Service and Contact link to the two URLs above.

## Rules
1. **Words are final.** Copy every string from the prototype exactly, including punctuation ("Schedule Service.", "Let's talk.",
   "Prefer to call?", "&", the em dashes). Do not add headings, intros or marketing lines.
2. **Same blocks, same order, same anchors** (`#department`, `#schedule`, `#film`, `#find-us`, `#invite` on Service;
   `#reach-us`, `#film`, `#visit`, `#invite` on Contact). The floating chapters bar (`.mn`) links to them; its last item,
   **Message**, goes to the form (`#invite`).
3. **Reuse the prototype's CSS classes and scripts** rather than rebuilding the layout in Elementor widgets. If the theme forces
   widgets, an HTML widget per section holding the prototype's markup is acceptable; the stylesheets above must load on both pages.
4. **Type roles** (from the design system): capitals only for labels and buttons. Phone numbers in running text and in the hero are
   not capitalised or letter-spaced (`.pg__tel`, `.pg__call`). Hours and phone numbers in "Find Us"/"Visit" are large light
   figures (`.pg__f`), not body text.
5. **Service · Find Us:** the buttons' lower edge sits exactly on the picture's lower edge at 1024 px and wider
   (`pages.css`, the rules under "a figures block with no list under it").
6. **Xtime scheduler** (`#schedule`): an iframe, exactly
   `https://consumer.xtime.com/scheduling/?webkey=xtm202511261024xx1&variant=SERVICETAB` — **without** `vmode=modal`
   (with it, Xtime draws a second box and an overlay inside the frame). Height 900 px desktop, 980 px phone. If Prestige gives a
   different webkey for Pagani, use theirs.
7. **Map** (Contact, after `#visit`): Google Maps embed `https://www.google.com/maps?q=14780+Biscayne+Blvd,+North+Miami+Beach,+FL+33181&z=15&output=embed`,
   black and white through the CSS filter in `.pmap__m iframe`, `pointer-events: none` so the wheel keeps scrolling the page, the
   whole map a link to Google Maps directions in a new tab. **Google's logo and terms must stay visible** at its foot: no overlay
   or fade over the bottom of the map.
8. **Films:** the held screens play the MP4 loops muted, only while on screen, and show the poster under
   `prefers-reduced-motion: reduce` (`pages.js`). Host the MP4s on the site's CDN, not on GitHub Pages.
9. **Forms:** the finale's form (`[data-enq]`) must post to the dealer's lead endpoint/CRM; the prototype only validates and
   shows a "not connected" note. Fields: `name`, `email`, `phone`, `interest`, `message`. Keep the labels and the button text.
10. **Do not** add the quote section ("We're not just about selling cars…") — it was removed on purpose. Do not add a Finance
    link anywhere.

## Facts (do not change without the client)
- Showroom: 14780 Biscayne Blvd, North Miami Beach, FL 33181.
- Sales +1 (833) 290-6287 · Mon – Fri 9:00 AM – 7:00 PM · Saturday 10:00 AM – 6:00 PM · Sunday Closed.
- Service +1 (833) 290-5148 · Mon – Fri 8:00 AM – 5:30 PM · Saturday – Sunday Closed.
- Parts: no number supplied; the card shows none.

## Acceptance checks (do all of them, report each)
- [ ] Both pages render at 1920, 1440, 1024, 768 and 390 px wide with **no horizontal scroll** (`scrollWidth - clientWidth === 0`).
- [ ] Visual diff against the GitHub Pages prototype at 1440 and 390: same blocks, order, words, pictures and crops.
- [ ] Every chapter in the floating bar scrolls to its section, Message included; the bar hides over the form.
- [ ] Xtime loads inside the frame and shows "Schedule your service appointment"; no second box or ✕ inside it.
- [ ] The map is black and white, does not trap the mouse wheel, opens directions on click, and Google's marks are legible.
- [ ] Films play on screen, pause off screen, and are posters only with reduced motion.
- [ ] Every `tel:` link dials the number shown; "Get Directions" opens Google Maps.
- [ ] Header shows no Finance; Service and Contact are marked current on their own pages.
- [ ] The form submits to the real endpoint and shows the site's success state.
- [ ] No console errors.
