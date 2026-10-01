# Pagani of Miami: home page concept (art direction)

> **Status (1 Oct 2026):** after this was written, Alex set the art direction himself in `IMAGES ALEX/CONCEPT.png` and a written section list. Black / white / silver; six to eight equal full-screen scenes; huge photography; type never on a car; no gold. **That direction overrides this document wherever they disagree**: the warm `#E6C078` follow-spot, the `#1E1C26` grade and the Chicago film hero are not used. The diagnosis (§1) and the stage engine rules still stand. Build: `prototype/home/`.


**Status:** binding concept for the next build, written 1 Oct 2026 after Alex rated the first build 2/10. It replaces `BRIEF.md` §1–§10 and §15. `BRIEF.md` §0b (Alex's decisions), §11 (type facts only), §13a (cutout audit) and §14 (claims ledger) stay in force. Where this file and §0b collide, §0b wins and the collision is named here (§9).
**Author role:** art direction only. No markup, CSS or scene code is written here. Builder: `designer`. Reviewer: `design-critic`. Gate 5: Alex.
**System:** design_dna, resolved from the canonical path `/Users/alex/Desktop/WORK/design_dna/` (TASTE.md, `.claude/rules/design-dna.md` DNA1–DNA94, skills academic-composition, motion-judgment, dimensionality, anti-patterns, color/typography/motion-taste, content-provenance; dialects/HYBRID.md, cinematic-industrial.md).

---

## 0. Evidence I looked at, and what it actually shows

The reads below come from opening the images and sampling pixels, not from file names.

- **Chicago live capture** (`research/paganiofchicago-site/capture/_sheet-desktop.jpg`, `_sheet-mobile.jpg`, `d-*.png`):
  - The page ground is not black. It runs from `#18181E` to `#23222A`, a violet-grey night.
  - The stage glow behind the cutout is warm: `#3B3535` to `#423B39`, sampled at the car's flanks in `d-strip-02.png`.
  - The ending fades into a near-black navy, `#050914`.
- **Chicago film** (`research/paganiofchicago-site/banner-video.mp4`: 2560×1440, 25 fps, 30.93 s, 8.9 Mbit/s). My timed contact sheet shows:

  | Time | Content |
  |---|---|
  | 0.0–2.5 s | near-black town skyline |
  | 2.6–4.8 s | arcade, the car approaches with its headlights on |
  | 4.9–5.9 s | close side pass |
  | 6.0–7.6 s | piazza, the car crosses right → left in shop-window light |
  | 7.6–8.6 s | wheel close-up |
  | **8.8–20.5 s** | **the Thomas More quote, baked in, on black** |
  | 20.6–27.4 s | causeway in mist, tail lights, then wheel close-ups |
  | 27.5–30.0 s | aerial: the car alone on a causeway toward a domed town in fog |
  | 30.0–30.9 s | close-up |

  **The film is pre-graded to bleed into the page.** Every frame fades at top and bottom to `#1E1C26`, the same value at 6.5 s, 21.5 s and 28.5 s. That is the mechanism behind Chicago's "one world". It is a grade, not a CSS trick.
- **Our failed build** (`prototype/stage/_shots/_sheet-desktop.jpg`):
  - The hero photo `hero_utopia_side-profile-black-brick-arches_7577x5051` is **overcast daylight on warm brick, not night**. BRIEF §3 called it night. It is a different world from the stage.
  - "PAGANI OF MIAMI" (three stacked lines) and the CTA box sit on the car's nose.
  - The stage is a void of `#000` with no wall, no floor and no light.
  - I counted 11 uppercase strings at 10–14 px on one stage screen (`02-utopia-hold.png`), including the debug HUD.
  - The act after the stage reads "NEXT SECTION".
- **Lake Forest Figma** (`research/lake-forest-figma/prestige-file-node-794-4509.png`):
  - It is the same world as the live capture: violet-grey ground, warm glow on the stage, sunset track behind Grandi Complicazioni (GC), sepia Horacio, blue silhouette at the end.
  - The bands between GC and Horacio, and between service and footer, are 50–70 vh of nothing.
- **Chicago defect nobody listed:** in `capture/d-00-first.png` the header lockup "Pagani of Chicago" collides with the Utopia script logo. Two identity marks overlap on the first screen.
- **`IMAGES ALEX/CONCEPT.png`** is a generated mood board: illegible pseudo-text and invented cars. **It is not evidence and nothing is taken from it (GI3).** It is the most likely source of the "pure black void" reading.
- **Stock photo conflict (a fact for Alex, see §10):**
  - `research/images-current-site/hero/hero_utopia_side-profile-black-gold-studio-pagani-of-miami-watermark_4999x3337.jpg` shows a **black-carbon Utopia with gold wheels**.
  - The VDP feed (`CURRENT_SITE_CONTENT.md` l.258) says the stock car is **Yellow**.
  - Either the photo is not the stock car or the feed is wrong.
- **Vault:** 11 relevant references (rolls-roycemotorcars, mclaren, porsche-com-usa, hispanosuizacars, oilstainlab, rimac-nevera, semlerpremium ×3, polestar, rmsothebys), 0 unusable for missing notes.
- **Projects (self-similarity check):** our dark builds are lux-cars `#0B0B0D`, vegas-auto-gallery `#0B0F14`, hinderer `#1F1D19` and 360-auto-care `#090C0D`. A violet night `#1E1C26`, Istok Web and a film-led hero collide with none of them. The sibling Lamborghini Miami build slides tiles in a grid; this page must not.

---

## 1. Diagnosis of the 2/10, and the principle read of Chicago

### 1a. What failed, in compositional terms

| # | Failure | Rule |
|---|---|---|
| 1 | **Two worlds on one URL.** A daylight warm-brick photograph, then a `#000` void. Two grades and two light logics. The hero and the stage cannot be read as one place. | U11, DNA23, DNA4 |
| 2 | **The title sat on the car.** No text-safe zone was reserved before the crop. The h1 and CTA were placed where there was room, which turned out to be the nose. | C22 (type region reserved, not found), A1/hero declaration |
| 3 | **The hard black curtain.** An opaque edge crossed the live photograph. The seam stated nothing: no light change, no time change. It was a panel. | U17, U13, DNA64, DNA65 |
| 4 | **No tonal structure.** On `#000` with no wall or floor, the only mid-tones are the car. Figure-ground has no ground. Neighbours read as cut paper in space, and the page has one value step. Black cars sink by construction. | C3, C4, §0b-4 (its second half was ignored) |
| 5 | **The signature was a carousel.** Cars sliding sideways on black is the generic device with a scroll binding. Nothing about it is Pagani or this site. | DNA37, motion-taste D1, MJ10 (the cars carried the truth, the device carried nothing) |
| 6 | **Interface sprayed into the corners.** Act label top-left, skip top-right, rail bottom-left, two CTAs bottom-right, HUD, chapter index: 11 small uppercase strings competing with one car. | U10, A3, typography I8 / I4, DNA31 |
| 7 | **Built from the section outward.** The stage was designed as an isolated poster. The page around it was a placeholder ("NEXT SECTION"), so no page-level composition existed to judge it against. | C21, U15, C19, C15 |
| 8 | **Identity carried by one asset class.** With the cutout off-screen there was nothing: no world, no light, no ground. | C17 |

**The single root cause:** the build had **no environment**. Chicago is a place you are in; the failed build is a list of objects shown on nothing. Alex's "it's the whole layout" is exactly this.

### 1b. Chicago, read for principle (the reference solves X by Y, which here means Z)

1. **One continuous world.** Chicago solves *a page made of unrelated assets (film, cutouts, press photos) must read as one place* by **grading the film's edges to the page ground (`#1E1C26`) and using that value as the field**. Here that means:
   - the ground token **is** that grade, sampled from the film;
   - the world gets a **time axis**: the page is one evening, from dusk on the road to lights out. Each act is a different state of light inside the same night, not a different colour.
2. **Chapters melt.** Chicago solves *sections pasted together* by **feathering every edge into the ground**. Here that means:
   - no act has a box edge or a band;
   - **every seam is a lighting cue** (a pool opens, windows light, a lamp warms, the house lights rise, the lights go out). DNA64 is satisfied because each seam says what changed: the light.
3. **Cinematic video hero.** Chicago solves *establish the world before the product* with **a looping film plus a baked quote**. Here that means the same footage **recut to 4.8 s**:
   - it plays once and comes to rest on the aerial causeway as a designed still;
   - the quote is removed;
   - the type sits in the graded dark field the film already provides.
   
   Comprehension does not wait on it (MJ7). Nothing loops behind reading (DM9).
4. **Cutouts on a toned ground with a warm glow.** Chicago solves *a cutout floats on a void* by **painting a warm glow behind it, an implied light**. Here that means **the glow becomes a real light with behaviour**: one fixed spot on the stage that finds each car on its mark. That is the signature (§3e).
5. **GC plates over a sunset track.** Chicago solves *one-offs are a different register from the range* by **changing the environment**. That broke its own world: a saturated sunset track sits in a violet night. Here the register changes **by the role of light, not by the location**: in a darker night, **each plate is itself the light source**, a lit window on a sleeping square. That is the piazza windows from the film, carried forward.
6. **Sepia Horacio.** Chicago solves *the founder belongs to another time* by **a sepia filter**. Here the atelier is **the warmest light on the page, the source of the stage lamp itself**:
   - tungsten photographs chosen as shot, with no filter;
   - the ground warms to `#221D1E`.
7. **Silhouette ending.** Chicago solves *the page must end, not trail* by **returning to the car as a shape in darkness**. Here that means **lights out**:
   - the page's last light is a single warm rim along a roofline;
   - the address sits in that light;
   - it is the only place the field reaches `#000`.

**Chicago's weaknesses, confirmed and extended:**
- placeholder/AI copy in Title Case;
- Chicago facts;
- 12–14 px type;
- teal outline buttons;
- 50–70 vh empty dark bands;
- **plus:** a header lockup colliding with the hero logo;
- **plus:** a stage that was static tabs with a paragraph of copy;
- **plus:** a GC sunset that left the world.

---

## 2. The Design Read

```
Delivery:      BUILD. The direction exists (Chicago, "similar but better"). The 2/10 is a missing concept, not a missing choice between three.
Reading this as the home page of the official Pagani dealer for Florida, for a collector who already knows Pagani and can buy one,
               leaning nocturne-theatrical: one evening, one stage, light as the only instrument of emphasis.
Mandate:       REDESIGN. Pagani's identity is fixed; layout, ground, light, hierarchy and motion are in scope.
Style mode:    HYBRID. Anchor: brief-derived "Pagani house" (from pagani.com evidence). Contrast: cinematic-industrial (library dialect),
               owning light, image behaviour and depth only. Signature: none borrowed (the follow-spot is ours).
               Unifying principle: whatever ranks is lit; whatever recedes is evening.
Dimensionality: SUPPORT. Light and the scrubbed stage reinforce a page that reads complete as stills (DM1, MJ5).
Register:      heightened. Reason: Pagani speaks in theatre on its own home page ("ACT THREE, SCENE TWO", corp-site-shots/strip-home-01.png),
               and these are few-off objects where the presentation is the message (MJ3). "Luxury" is not the reason.
```

**Carried through untouched (REDESIGN), listed first:**
1. The PAGANI oval wordmark: `research/logos-svg/pagani-wordmark-oval_white.svg`, unmodified, centred in the header at 132 px wide.
2. The model script logotypes as supplied:
   - `IMAGES ALEX/logos/Group.svg` (Huayra R Evo Roadster, with "Huayra" and the red R);
   - the Utopia and Utopia Roadster PNGs from the prototype assets.
   
   Never redrawn, and never `Group 9500.svg`.
3. **Istok Web** 400/700, self-hosted.
4. White ink, sentence case, "we" voice (Pagani's own remarks, `PAGANI_CI_RESEARCH.md` §0).
5. Horacio's signature PNG.
6. **The Chicago film footage**, as Pagani world footage. It is recut and regraded, not redrawn.
7. The group header and menu from `/Users/alex/Desktop/WORK/PRESTIGE/_____LAMBO PRESTIGE/site/` (`.site-header` with brand, nav, phone and menu; menu choreography 650/400 ms).

**CONTROL MAP (HYBRID.md):**

| Domain | Owner |
|---|---|
| composition / grid | brief-derived |
| hierarchy / density | brief-derived (ranked by luminance first, then scale) |
| typography voices | brief-derived (Istok only, one voice) |
| spacing / rhythm | brief-derived |
| colour / contrast | **cinematic-industrial** (contrast spent on luminance, one warm light) |
| image behaviour | **cinematic-industrial** |
| containers / geometry | brief-derived (none; hairlines only) |
| depth / materiality | **cinematic-industrial** (wall, floor, pool, contact shadow) |
| motion / interaction | brief-derived (corporate's calm, plus the light cue) |
| information presentation | brief-derived |
| task means / CTA rank | central idea + usability |

- **Rejected alternatives:**
  - auction-editorial as contrast. Its air-first, light-ground editorial logic has no job on a night stage, and a mono third voice would be decoration.
  - immersive-authored-world. It is confirmed, but Alex did not name it, and it is never inferred (TASTE §4).
- **Collision risk:** cinematic-industrial's "mechanical rhythm" leaking into the grid. It is not given composition.

**Vault principles applied (cited by id):**
- `vault/rolls-roycemotorcars-com-en-us-home-html` (3, in) solves *the UI separating from the imagery* by **making video, UI and background one environment**. Here that means:
  - no header bar or translucent panel over the film;
  - controls sit in the light.
  
  Its own weakness ("frosted-glass legibility depends on footage") is why there are no glass surfaces over the film.
- `vault/oilstainlab-com` (3, in), weakness: *"the car and information become secondary to the site's creativity."* So the spot may never dim the car at centre. Only the room breathes.
- `vault/mclaren-com-cars-gl-en` (2, in), weakness: competing campaign worlds and a corporate tail. Hence one evening, and acts after the peak stay inside it. Works: a visible selector gives control, so the rail is the transport.
- `vault/porsche-com-usa` (2, hybrid), weakness: *"strong spatial decisions come from images, not composition."* Our signature is a composed light behaviour, not a better asset.
- `vault/hispanosuizacars-com` (2, in): mythology before understanding. So the dealer identity is on screen from frame one (C18).
- `vault/rimac-automobili-com-nevera` (2, in): heavy technical ending. The record is three figures and one line, with no spec archive.
- `vault/semlerpremium-dk-brands-porsche-911-gt3-…` (3, in): desire → inspection → data. Act V shows the photograph before the plate. Its weakness (dependence on strong photography) is the declared C17 risk of the dealer photo.
- `vault/polestar-com-us` and `vault/rmsothebys-com` (1, out): a strong opening that never develops. So C19 is checked on the last three masses (§4).
- EVIDENCE.md:
  - A1: one governing event owns screen one.
  - A2: identity carried by **one** system, here light.
  - A3: interface subordinate, with Alex's own floor at I7.
  - **C2e: darkness is not itself a preference.** So the night is justified by the evening concept, not by taste.
  - D1: nothing is known about Alex's colour taste, so every colour here is derived from footage, not chosen.

### 2a. Hero declaration

**Decision: the Chicago film, recut and regraded. Not a press still.**
- The brick-arch still is daylight and was the cause of failure 1.
- The Derecho studio still has no world.
- The film is the only asset that already contains the evening, the architecture and the ground grade.

| Field | Decision |
|---|---|
| Viewport ownership | Full first screen, 100 svh. The scene is full-screen; the car is never scaled to the edges (C22) |
| Scene treatment | **Environment.** Night town, then dawn-mist causeway. Footage graded to `#1E1C26` at the bottom 30 % and the top 8 % |
| Object scale | As shot. Arcade shot: the car ≈ 18 % of frame width. Hold frame: the car ≈ 8 % of width, alone on the road. The scale of the world is the point |
| Focal point | Hold frame: the car's tail lights at (61 %, 70 %) of a 1440×900 viewport, on the road that vanishes to the domed town at (42 %, 31 %) |
| Negative space | The fog field and sky above the horizon (y 8–30 %), as **directional air**: the road leads the eye up into it. The lower-left graded field is the reserved text zone |
| Text safe zone | **Desktop: x 8–39 %, y 67–92 %** (115–560 px × 600–830 px at 1440×900). Reserved before the crop. Every film frame used is chosen so the car never enters it (§8) |
| Desktop crop | The 16:9 source fits height at 1440×900 (1600×900, 80 px off each side). `object-position: 50% 50%`, verified on the render, not assumed |
| Mobile crop | **Separate frame: a still, not video.** Portrait crop of the hold frame (source x 1024–1688 of 2560, full height = 664×1440), centred on the road. The car lands at ≈ (54 %, 70 %), the type zone at y 74–94 % on the graded field. Served at 664 px wide with no upscaling; fog forgives softness, measured at DPR 3 before sign-off |
| Asset suitability | ✔ Night, architecture, car, air for type (§0b-15). Footage rights to be confirmed through the client, like the press photos. **The baked quote (8.8–20.5 s) is never shown and never re-set as copy** (no ledger source) |

**The edit (one decision, built exactly):**
- Shot A: source **2.6–4.8 s** (arcade, headlights approach).
- 0.6 s dissolve.
- Shot B: source **27.6–29.9 s** (aerial causeway).
- **Freeze on 29.9 s.** Total running time ≈ 4.8 s, under WCAG 2.2.2's 5 s, so no pause control is owed.
- Regrade: the bottom 30 % and top 8 % to `#1E1C26`, baked into the encode (GI5 / color I4: legibility held at the asset, not by a CSS scrim).
- The frozen frame is also exported as the poster (`hero-hold.avif`).

**Load order:**
- The hero renders the field `#1E1C26` with the HTML headline at final size. **The LCP element is the h1** (DNA74).
- The film fades up from the field over 600 ms when it can play. If it is not playable 2.5 s after load, the poster fades in instead and the film is never started.
- Reduced motion: poster only.

**Governing event (A1), as named components:**

| Component | Selector / rectangle (1440×900) |
|---|---|
| event statement | *A Pagani crosses a sleeping town and goes out alone onto a road in the fog; the house that sells it introduces itself beneath.* |
| primary subject | the car in the film: `.hero__film` sampled box per shot (§8) |
| identity / headline mass | `.hero__id`: eyebrow "Official Pagani dealer for the State of Florida" [V, pagani.com dealer list] + h1 "Pagani of Miami", rect 115,620 → 560,780 |
| supporting record | none (deliberate; the record belongs to the stage) |
| CTA cluster | `.hero__cta`: primary "See the collection" → stage; secondary "In our showroom" → Act V. Rect 115,790 → 560,830 |
| active field | `.hero__film` + its graded field `#1E1C26` (the bottom 30 % carries the type; the top fog is directional air) |
| intentional negative space | the fog and sky band y 8–30 %: directional air the road leads into |
| excluded | `.site-header` (wordmark, menu, phone). Nothing else is on screen one: no chapter index, no scroll hint, no cookie overlay outside the header zone |

---

## 3. Concept, feeling curve, peak, grammar, signature

### 3a. The concept, in one sentence
**The page is one evening at the house of Pagani, from the road in the fog to the lights going out, and in it every car is found by light rather than delivered.**

It can be wrong. It is wrong if:
- any act is lit by a different world (daylight, a sunset track, a void);
- any car arrives without a light change;
- any seam is a box edge.

### 3b. Feeling curve (DNA29)

| Act | Feeling | What causes it on screen |
|---|---|---|
| I · Arrival | **Anticipation** | A car moves through a sleeping town and out onto a misty road; the film stops on it alone, and the dealer's name sits beneath |
| II · The stage | **Desire, the choosing** | On one stage under one fixed light, each car rolls to its mark and the light opens on it; the room dims between cars |
| III · Grandi Complicazioni | **Astonishment at rarity** | The stage light goes out; in the deeper dark, four windows light up one by one, each holding a one-off |
| IV · Atelier | **Intimacy, reverence** | Warm lamp light: hands on leather, a technician under a car, Horacio at the piano. The page slows to reading |
| V · Miami | **Assurance, belonging** | The house lights come up: the brightest field since the film, one real car in our showroom, a dated record and a phone number |
| VI · Coda | **Farewell with an open door** | Lights out. One warm rim along a roofline, the address in that last light |

No two adjacent feelings are the same, and none is filler: each act changes the light, and the light is the story.

### 3c. The peak (DNA28)
**Act II, the stage:**
> On one stage under one fixed light, each Pagani rolls onto its mark and the light finds it. The house dims between cars and opens on each arrival, and the car's name and numbers change in the dark between them.

It takes:
- the asset budget: the cutouts at 2400 px;
- the silence in front of it: the hero ends on a still, and nothing moves for the last 30 % of the dissolve except the room's light;
- the most scroll room: 360 vh of 1010, 36 % of the page.

### 3d. Page grammar (DNA36)
**Continuous world with one pinned stage.**
- It is not chaptered editorial: there are no bands and no boxes.
- It is not a split stage.
- The sibling Lambo Miami is a tiled grid, and the failed build was a void carousel. This grammar is neither.

### 3e. The signature move: **the follow-spot cue**
A theatre lighting cue, bound to scroll, run on the stage. The light is the actor that changes; the cars move through it.

1. **One fixed light at the stage axis (x 50 %).** It is three layers, all of the same lamp colour `#E6C078`. That colour is sampled from the shop windows in the film at 6.5 s, so the stage light is literally the piazza light:
   - **wall bloom:** ellipse centred (50 %, 52 %), radii 38 vw × 34 vh, lamp at α .10 over the wall `#2A2733`;
   - **floor pool:** ellipse centred (50 %, 71 %), radii 30 vw × 4.5 vh, lamp at α .20 over the floor `#24212C` (composite core ≈ `#4C433F`);
   - **contact shadow:** ellipse `rgba(0,0,0,.65)` 46 vw × 1.6 vh under the tyres. It is the only layer that travels with the car.
2. **Car exposure is a function of distance from the light, not of time** (§0b-9: "darkening only towards the stage edges").
   - d = the car centre's offset ÷ half the viewport width.
   - B(d) = 1.00 for |d| ≤ 0.12, falling on a smoothstep to **0.42** at |d| = 0.90 (the neighbour position).
   - Body sharp and opaque throughout. Never below 0.42, so a car never sinks.
3. **The house breathes between cars.** For transition progress t ∈ [0, 1], scrubbed linearly by scroll:
   - spot intensity **I(t) = 1 − 0.45·sin(πt)**: 1.00 on a mark, 0.55 at mid-transition;
   - pool width **W(t) = 1 + 0.25·sin(πt)**: the pool widens and softens like house light between scenes, then **tightens onto the arriving car in the last 15 % of travel**. That tightening is the "found" moment;
   - ambient floor on the neighbours **A(t) = 0.42 + 0.08·sin(πt)**: the edges come up slightly while the stage is between cues.
4. **The record changes in the dark.** The sequential data switch from §0b-13 is placed at the light minimum, t = 0.50 ± 0.04 hysteresis:
   - the old logotype and record leave (160 ms, ease-in) while I is falling;
   - the new ones arrive (260 ms, ease-out) as I rises;
   - one node set, no queue.
   
   The theatre logic is what makes the sequential switch feel motivated, not mechanical.
5. **Implementation note for the builder (compositor-only):**
   - each cutout is two stacked copies of the same file: the lower one at a static `filter: brightness(.42)`, the upper one lit;
   - B(d) drives only the **opacity** of the lit copy;
   - the light layers animate only opacity and scale.
   
   No animated filters and no layout properties (DNA76).

**DNA37 test:** "the cars stand still under a fixed spotlight while the room dims and re-opens on each one, and the names change in the dark" cannot be confused with a sliding carousel, the Lambo tile grid or any earlier build of ours.

**The first cue happens on arrival:**
- Utopia is already on its mark when the stage overlaps the hero.
- During the last 30 % of the hero dissolve, I goes from 0 to 1.
- The spot opens on a car that was standing in the dark.

---

## 4. COMPOSITION READ and PLAN (page level)

```
COMPOSITION READ
1.  Context:       Official dealer, one car in stock, a buyer who knows the brand; the page must make desire first and give a phone number last.
2.  Artistic image: one evening at a private house: road, stage, windows, workshop, showroom, lights out.
3.  Format forces: 100svh acts; scroll is time; one pin; header 80/64px is the only persistent mass.
4.  Major masses (6):
    M1 the film scene: a wide misty field, mass low-left (type) against a vanishing road;
    M2 the lit stage: a symmetric vertical axis (logotype, car, record) inside a warm pool, dim forms at the edges;
    M3 the night wall: four bright rectangles of differing height, staggered, on the darkest field;
    M4 the warm workshop: a tall photographic mass bleeding off the left edge against a narrow right reading column;
    M5 the showroom: the brightest rectangle since M1, right-weighted, with a compact record left;
    M6 lights out: a dark low silhouette under a small bright text block, the field descending to #000.
5.  Centres:       semantic = optical = the car under the spot (M2). Geometric centre coincides there by decision (the spot is centred).
                   Centre of action = the rail + Enquire in M2, and the phone/viewing in M5–M6. Secondary centres strengthen (they sit on lit spots too).
6.  Dominance:     M2 dominant; M1 subordinate (it builds to M2); M3 and M5 support; M4 the rest; M6 the counterweight and resolution.
7.  Balance:       stable per screen; M1 deliberately weighted low-left against the road's upward pull; M4 and M5 mirror each other (photo left, then right).
8.  Direction:     M1 the road pulls up and in (toward the stage); M2 lateral travel right→left, arriving at the axis; M3 a zig-zag down the stagger;
                   M4 down the reading column; M5 left record → right photograph; M6 the roofline arc carries the eye to the address and out.
9.  Rhythm:        slow → held → pulse (four windows) → slow → bright still → dark still. One pulse, one peak, two rests.
10. Negative space: the fog (M1) as directional air; the dimmed room around the pool (M2) as isolation; the night between windows (M3) as interval;
                   the dark below the silhouette (M6) as the exhale. No empty bands: every dark field is a lit room's falloff.
11. Tension:       M1 tiny car against a huge world (scale tension), resolved by M2 where the car becomes large and lit.
12. Depth:         one model throughout: a room (wall + floor + light) or a night exterior. No elevation shadows, no glass.
13. Edges:         photographs bleed only at the left (M4) and right (M5) edges and in the film; cutouts never touch an edge except the neighbours (12% visible, intentional).
14. Unity:         one ground ladder, one lamp colour, one typeface, one reveal logic (light on), one CTA style.
15. Typography:    a low compact mass in M1; a centred axis in M2; small lit captions in M3; a narrow column in M4; a plate in M5; a short block in M6.
16. Imagery:       the film pulls deep; the cutouts sit flat on a floor; the GC photos are self-lit windows; the atelier photos are tungsten. All in one evening.
17. Responsive:    the M2 axis survives vertically; M4 and M5 splits become photo-over-text; M3 stagger becomes one column; M1 becomes a still.
18. Functional:    see the collection (1 scroll); stock (hero link, menu, Act V); call (header phone); enquire (stage CTA, Act V, coda).
19. Diagnosis:     the risk is M1 and M2 reading as "car on dark" twice. The answer is in the kind of mass: M1 is a world with a tiny car, M2 is a room with a big car and its record.
```

**COMPOSITION PLAN:**
- **Mass scheme:** M1–M6 above, in that order, each ≥ 100 svh.
- **Primary centre:** the car on its mark under the pool (M2), at 1440×900: x 720 ± 0, floor line at y 630 (70 %).
- **Hierarchy mechanism:** **luminance first** (whatever is lit ranks), scale second, position third.
- **Tonal sequence (the "one continuous world"):** a light ladder that moves through one evening.

  | Act | Field | Highest light |
  |---|---|---|
  | M1 | film mid-tones up to `#7E7E84` (fog), graded field `#1E1C26` | fog |
  | M2 | wall `#2A2733` → field `#1E1C26`, floor `#24212C`, pool core ≈ `#4C433F` | the car |
  | seam M2→M3 | **spot goes out**: room to `#121118` over 40 vh | none |
  | M3 | `#121118`, lamp spill α .06 around each plate | the photographs |
  | M4 | warms to `#221D1E` | tungsten photographs |
  | M5 | lifts to `#2A2733` | the grey studio photo (≈ `#C8C8C8` at its centre) |
  | M6 | `#1E1C26` → `#000000` across the lower 35 % | a 2 px lamp rim at α .5 |

  The ladder survives grayscale. The page reads as a dark curve with three lifts: M1, M2's pool, M5.
- **Eye path:**
  - M1: h1 → road → town;
  - M2: logotype → car → record → rail;
  - M3: tall plate → stagger;
  - M4: photo → column;
  - M5: record → photo → phone;
  - M6: rim → address → CTA.
- **Edges:** no hard horizontal edge anywhere on the page. Every act-to-act seam is a ≥ 40 vh ground gradient. Measured: no adjacent pixel-row luminance step > 2/255 across a seam, excluding image content.
- **Negative space:** directional air (M1), isolation (M2), interval (M3), exhale (M6). **No dark band longer than 30 vh without a light source in it** (this fixes Chicago's empty bands).
- **Culmination and release:** the culmination is M2's third car. The release is the blackout seam into M3.
- **Last three masses (C19):**
  - M4 hands the visitor *trust in the making* → M5;
  - M5 hands *a real car and a person to call* → M6;
  - M6 hands *the address in the last light*, then the page ends.
- **Grid (named only now):**
  - desktop: 12 columns, outer margin 8 vw (115 px at 1440), gutter 24 px;
  - mobile: 4 columns, 20 px margins, 16 px gutter;
  - bleeds only at the declared edges.
- **Spacing tokens:** 8 · 16 · 24 · 40 · 64 · 104 · 168 px (each step ≈ 1.6×).
- **Type** (Istok Web only; I8: one voice, roles by size and weight):

  | Role | Setting (1440 / 390) |
  |---|---|
  | display h1 | 400, 72 / 44 px, lh 1.02, sentence case |
  | section title | 400, 40 / 28 px (72/40 = 1.8 ≥ DNA7's 1.6) |
  | record figures | 400, 28 / 22 px, `tabular-nums` |
  | body | 400, 17 / 16 px, lh 1.6, measure ≤ 62 ch |
  | label | 700, 14 px, uppercase, tracked .16 em. **The only uppercase role; ≤ 3 strings per screen** |
  | CTA | 700, 14 px, uppercase .14 em; 1 px `rgba(255,255,255,.4)` outline, square; fills white on hover |
  | rail names | 400, 16 px, sentence case |

- **Colour tokens** (derived; color I5 derivation stated):

  | Token | Value | Derivation / use |
  |---|---|---|
  | `--night-2` | `#1E1C26` | the field; film grade, sampled |
  | `--night-1` | `#121118` | deep night (M3, coda top) |
  | `--night-0` | `#000000` | coda end and footer only |
  | `--wall` | `#2A2733` | stage wall, showroom field |
  | `--floor` | `#24212C` | stage floor |
  | `--warm-night` | `#221D1E` | atelier field |
  | `--lamp` | `#E6C078` | **light only, at alpha ≤ .20, never ink or fill**; sampled from the piazza windows |
  | `--ink` | `#FFFFFF` | primary ink |
  | `--ink-2` | `rgba(255,255,255,.68)` ≈ `#B7B6BA` | ≈ 8.4:1 on the field |
  | `--rule` | `rgba(255,255,255,.18)` | hairlines |

  **No accent. No teal. No blue.** Action and "active" are carried by full white against 68 %.
- **Responsive recomposition:** §5c and the mobile shot list. Each act is re-authored, not shrunk (C12, DNA67).
- **Measurable commitments:** §8.

---

## 5. MOTION READ, shot lists, scroll budget

```
MOTION READ
Subject          Hypercars: static objects, presented at a heightened register (MJ3, reason in §2).
Journey          arrive (I) → choose (II) → be astonished (III) → trust (IV) → act (V) → leave with the address (VI).
Static verdict   Yes. With no JS: hero poster still + copy; the stage as three stacked lit stills with the rail as anchors; lit plates; three atelier pairs; showroom; coda.
Time adds        the evening's light changing; a car arriving into a light; windows lighting one by one.
Register         heightened (§2).
Primary idea     the follow-spot cue on the stage. Every other motion is a lighting state, so the page has one temporal language.
Stable           all text while readable; the record under a car on its mark; the header; contacts; nothing moves behind body copy (DM9).
Roles            hero film → atmosphere + orientation (plays once) · hero dissolve → continuity · stage travel → subject expression + narrative progression ·
                 spot cue → hierarchy (whatever is lit ranks) · record switch → state change · blackout seam → narrative progression ·
                 windows lighting → hierarchy · atelier crossfade → narrative progression · house lights up (V) → state change ·
                 lights out (VI) → narrative progression · menu → state change · hover → feedback.
Transport        the reader. The pin is scroll-driven; the rail jumps; the soft rest follows §0b-8 exactly (desktop only, cancelled by any input).
Learning         nothing to learn: scrolling advances, the rail names are visible.
Mobile           re-authored (§5c).
Reduced motion   no film (poster), no pin, no scrub; the stage is one 100svh screen with the rail as tabs (200 ms crossfade, light fixed at I = 1);
                 plates and photos shown lit; Lenis not constructed (DNA90).
Cost             260vh of pin; a 1.6 MB film after LCP; three cutouts ≤ 180 KB; double-stacked cutouts (one decode each).
                 Attention: the room dimming must never read as the car dimming (oilstainlab weakness).
Cut              hero push-in zoom (the dissolve says more) · GC column parallax 8% (a second depth idea on a flat wall) · plate mask + scale 1.18 settle ·
                 the 32px rise on every block (motion map #5 in BRIEF; it was motion as wallpaper) · spec variant B "axis" · progress hairline ·
                 chapter index · visible "skip the lineup" · second stage CTA "Explore the …" · a looping hero · the baked quote ·
                 the signature stroke-drawing (later, needs SVG; static PNG now) · light sweep on the coda.
```

**Lenis** is in the first commit (DNA90): `autoRaf:false` on `gsap.ticker`, `anchors:true`, not constructed under reduced motion, and `data-lenis-prevent` on the menu.

### 5a. Scroll budget (DM3 / DNA38)

| Act | Desktop | Mobile |
|---|---|---|
| I Hero | 100 vh (dissolve overlap included) | 100 svh |
| II Stage | 100 vh section + **260 vh pin** (3 exposures × 40 + 2 transitions × 70) = 360 vh | 100 + **185 vh pin** (3 × 25 + 2 × 55) |
| III GC | 160 vh | 4 plates × ≈ 90 svh ≈ 360 svh |
| IV Atelier | 160 vh (sticky photo, 3 beats) | 3 pairs ≈ 240 svh |
| V Miami | 100 vh | ≈ 160 svh |
| VI Coda + footer | 100 + 30 vh | 100 + 40 svh |
| **Page** | **≈ 1010 vh (10.1 screens)**; the peak takes 36 % | ≈ 1185 svh |

### 5b. Desktop shot list (1440×900)

| Act | Shot (DNA27 / DNA50) | Device | Exact behaviour |
|---|---|---|---|
| I | **reveal → release** | the film plays once, freezes | Field `#1E1C26` with h1 present → film fades up 600 ms → A (2.2 s) → 0.6 s dissolve → B (2.3 s) → freeze. Copy has no entrance travel: it fades in 400 ms with the field, readable from the first frame (MJ7) |
| I→II | **dissolve** (continuity) | the stage overlaps the hero (§0b-15), feathered | Over 100 vh: the hero copy leaves first (0–30 %, opacity → 0, −16 px, ease-in); the film dims (overlay `#1E1C26` 0 → .6); the stage's leading 45 vh is mask-feathered (no edge, U17); the spot opens on Utopia, I 0 → 1 over the last 30 % |
| II | **reveal** (camera holds, the light finds the subject), with the cars' **lateral dolly** through the frame | follow-spot cue (§3e) | exposure (40 vh, nothing moves) → transition (70 vh: car out right → left, next in from the right on a sine ease-in-out mapped from scroll; I, W, A per §3e; record switch at t = .5) → exposure. Direction is forward (nose left, cars drive left; BRIEF §4.3). The rail jumps with `lenis.scrollTo` to an exposure centre. Soft rest per §0b-8 |
| II→III | **interruption** | blackout seam | After the last exposure, a 40 vh unpinned tail: I → 0 and the room → `#121118`. The last car stays visible at B = .42 and leaves upward with the page. Silence before the windows |
| III | **reveal ×4** | lights on (`[data-light]`) | Each plate goes from ground to lit (opacity 0 → 1, 900 ms, ease-out) when 25 % in view; one-shot; no rise, no scale. The title "Grandi Complicazioni" (40 px) lights with the first plate |
| IV | **macro → mid → portrait** | sticky photograph, crossfade by threshold | Photo 56 vw × 100 vh bleeding left; feathered right 12 vw into `#221D1E`. Beats: leather hands (`atelier/atelier_pagani-arte-leather-stitching-hands_7000x4667.jpg`) → technician (`atelier/atelier_huayra-on-lift-technician_6240x4160.jpg`) → Horacio (`brand/horacio-pagani_portrait-utopia-premiere_6048x4024.jpg`); 500 ms crossfades; text static; signature PNG after beat 3 |
| V | **release** (house lights up) | ground lift | The field moves `#221D1E` → `#2A2733` across the 40 vh seam; the photo lights (the same 900 ms "lights on"); the record is static |
| VI | **interruption reversed → release** | lights out | The field descends to `#000`; the silhouette's rim lights last (900 ms); then nothing moves |

### 5c. Mobile shot list (390×844), authored separately (DNA44, DM10, MJ8)

| Act | Shot | Behaviour |
|---|---|---|
| I | **still** (no film: payload and attention) | The hold frame, portrait crop (§2a). The h1 is 44 px, two lines ("Pagani / of Miami"), at y 74–88 %; CTAs stacked full-width at 44 px tall. No dissolve overlap: the stage begins with a 30 svh feather from the field |
| II | **reveal + dolly, vertical stage** | Decided: §0b-14 version 1, the short pin, **because the signature depends on scrubbed travel through a fixed light**. Swipe stays as the recorded fallback if Alex finds it cramped on device. Layout: logotype 60 vw at y 18–26 %; car 92 vw on the floor line at y 56 %; pool radii 48 vw × 3.5 vh; record row (3 figures, 22 px) at y 64–72 %; the rail becomes **current name + "1 / 3" + previous and next buttons (44×44)** at y 88 %; one CTA. No soft rest on touch. Same I, W and A curves |
| II→III | interruption | 30 svh blackout tail |
| III | reveal ×4 | One column, plates 350 px wide (full width minus 20 px gutters), each lit on entry; logotype + one record line beneath |
| IV | three pairs | photo (100 vw, 4:3) above each beat; crossfade cut; signature static |
| V | release | photo full-bleed on top (3:2, watermark visible), plate below, phone as a 44 px tap target |
| VI | release | silhouette 92 vw at y 58–74 %; address block above it |

---

## 6. Section-language ledger and device budget

| Act | ask | ground | type voice | containers | image | depth | motion | light role (signature device) |
|---|---|---|---|---|---|---|---|---|
| I | look | film + `#1E1C26` | Istok: label + h1 + CTA | none | film, environment | atmospheric (fog) | plays once, holds | the world's own light |
| II | choose | room: wall/floor + pool | Istok: logotype + figures + rail | none | cutouts on a floor | one room | scrubbed cue | **follow-spot** |
| III | look | `#121118` | Istok: title + 1 line | none (plates are photos, no frames) | self-lit photos | flat wall | lights on | windows |
| IV | read | `#221D1E` | Istok: body + quote | none | tungsten photos | flat | crossfade | lamp source |
| V | act | `#2A2733` | Istok: title + plate | one hairline plate | studio photo | flat | lights on | house lights |
| VI | act | → `#000` | Istok: address + CTA | none | silhouette | flat | lights out | last rim |

**Read down the columns:**
- `ground` changes every act, carried by the concept: each change is a light state of one evening.
- `depth` changes once, from room to flat, carried by "the stage is the only room".
- `type voice`, `containers` and the CTA style never change.
- `motion` is the same language throughout: every motion is a lighting state.
- `ask` alternates look / choose / look / read / act / act. The two final "act" masses differ in kind (a bright photograph against a dark ending), which C21 and §2c require.

**Device budget: cut from the failed build**
- the `#000` field;
- the hard curtain;
- the daylight hero;
- the 3-line uppercase h1;
- "ACT II · THE LINEUP";
- visible "SKIP THE LINEUP" (kept as a keyboard-only skip link, shown on focus);
- "EXPLORE THE …";
- the debug HUD;
- the chapter index;
- the progress hairline;
- spec variant B;
- the hero zoom;
- GC parallax and mask-scale;
- the universal 32 px rise;
- the Lake Forest sunset;
- the teal buttons.

**Devices that remain (each with one job):**

| Device | Job |
|---|---|
| light (pool / bloom / spill / rim) | ranks |
| contact shadow | grounds |
| rail | transport |
| outline CTA | action |
| hairline plate (V only) | dated record |
| feathered seams | continuity |

**The reduced interface on the stage. That is all:**
- the header: wordmark, MENU, phone;
- the model logotype (22 vw, centred, y 14–24 %);
- the car;
- the record under it (three figures with labels plus one engine line; values `—` until sourced, CP1);
- the rail: three names at 16 px, bottom-left at y 93 %;
- one CTA, "Enquire about the Utopia", bottom-right, changing with the car.

**Corners:** the four corner zones (18 vw × 14 vh) hold nothing but header items and the rail/CTA baseline. Uppercase strings on screen: ≤ 3 (MENU, the CTA, the record labels as one role).

---

## 7. Critique panel (on the direction) and dispositions

**1 · Composition.**
- Central idea in one sentence: yes, §3a.
- The devices that strengthen it are the pool, the seams and the lit windows. The device that competes is the film's own spectacle: a 4.8 s montage could outrank the stage as the peak.
- The stage is fully symmetric under a centred header wordmark. Everything centred is the template default (DNA6).
- Q6 (remove 20 %): the 20 % is already cut (§6). Removing more would cost the record or the rail, which are content, so **keep**.

**2 · Craft.**
- AA risks: the record's 68 % ink over the pool core `#4C433F` computes at ≈ 5.5:1, which needs a measured render at t = 0, .25 and .5.
- The h1 over the arcade shot (warm café light at left) is unmeasured.
- The mobile hero is a 664 px source shown at DPR 3.
- The film adds 1.6 MB.
- A double-stacked cutout costs DOM, not decode.

**3 · User advocate.**
- Job 1, see the cars: 1 scroll.
- Job 2, the stock car: the hero secondary link and the menu "In our showroom", 1 tap.
- Job 3, call: header phone, 1 tap.
- On the 50th visit, the 260 vh pin will annoy, but the rail, keyboard skip and soft rest reduce it.
- The film plays every visit, but it is 4.8 s and never blocks.

**4 · Brief advocate.**
- §0b-2 "full-screen sections, always": ✔ every act ≥ 100 svh.
- §0b-5 "pinned stage stays as the peak": ✔.
- §0b-6 "no wheel rotation": ✔.
- §0b-9 "darkening only towards the stage edges": ✔, since B(d) is distance-based and only the room breathes.
- §0b-4 "`#000` stays": **partly**. `#000` stays as the bottom of the ladder (coda and footer), not as the field. That is a reading of the decision, named in §9.
- §0b-15 "architecture, night, car, air for type": ✔, and the brick still that failed it is gone.

**5 · Contrarian (mandatory dissent).**
- **The strongest objection:** the hero is **Chicago's own film**. Alex asked us to *beat* Chicago, and opening Miami with Chicago's footage of an Italian town makes Miami a re-edit of the site it must surpass, with nothing on screen one that says Florida.
- **The alternative most worth considering:** open on the **Huayra 70 Derecho studio still** (`press-images/hero/hero_huayra-70-derecho_side-profile-copper-blue-studio_9550x6366.jpg`), the newest few-off, in a blue studio. It would be ours alone.

| Point | Disposition |
|---|---|
| The film could outrank the stage as the peak | **accept.** It plays once (4.8 s), is ≤ 2 shots, and freezes on the wide where the car is 8 % of the frame. The stage's car is 56 vw. Peak by scale and duration stays at II |
| Everything centred = template (DNA6) | **accept.** The axis belongs only to the stage (the spot is centred by physics). Every other act is asymmetric: M1 low-left vs. the road, M3 stagger, M4 photo left, M5 photo right. Stage asymmetry comes from the single neighbour at entry and exit |
| AA over the pool and over the arcade shot | **accept.** Measured on the composited render: the record at t = 0 / .25 / .5; the h1 every 0.4 s across the film plus the hold frame. If the arcade fails, shot A starts at 3.4 s |
| Mobile hero softness | **accept.** Measured at DPR 3. If it reads as noise rather than fog, the mobile hero becomes the portrait still `press-images/hero/hero-portrait_utopia_front-3q-black-stone-arch_4024x6048.jpg` regraded to dusk (a regrade, not a generation) |
| Pin annoyance on the 50th visit | **accept.** Pin cut from 340 to 260 vh. Rail jumps; a focus-only skip link; soft rest per §0b-8 |
| **Contrarian: Chicago's film makes Miami a copy of Chicago** (core: dominant composition / central proposition) | **reject-with-reason.** Alex's instruction is "similar but better", and the film is Pagani-world footage (the house is Italian; Miami is where you meet it, Act V), not a Chicago-specific asset. What made Chicago Chicago (its quote card, its loop, its lockup, its facts) is cut. The edit, freeze, grade, type position and the whole stage logic are new. The Derecho still has no evening and no architecture, so it would fail §0b-15 and remove the world the concept depends on. **The cost is stated:** screen one does not say "Florida" in imagery, only in copy. That is accepted, because C18 is satisfied by the eyebrow "Official Pagani dealer for the State of Florida" from frame one |
| Contrarian: no stock car shown above the fold | **reject-with-reason.** C20: operational truth may not outrank desire on a $3M+ object. Stock is one tap from the hero and the menu |

**Selection Pass (each significant decision: what it strengthens, and the effect):**

| Decision | Strengthens | Effect |
|---|---|---|
| Ground `#1E1C26` from the film grade | central concept | the film, stage and every act share one physical night, so no seam needs a box |
| Recut the film, play once, freeze | concept + usability | the evening is established in < 5 s, then holds still under the type, so nothing moves under the reading |
| Follow-spot cue as the signature | concept + hierarchy | the car on its mark is always the lightest mass on screen, so rank is read before any text |
| Record switch at the light minimum | usability + concept | two records are never readable at once, and the swap happens where the stage is darkest, so it reads as a scene change |
| Spot goes out before GC | hierarchy | the peak ends on a silence, so GC reads as a new register rather than a fourth car |
| GC plates as lit windows, no sunset | concept + brand character | one-offs gain rarity by being the only light in the dark, inside the same evening |
| Atelier as the warmest light | concept | the lamp that lit the stage is shown at its source: the hands and the man |
| Showroom as the brightest ground after the film | usability + hierarchy | the commercial act is easy to find and reads as "the lights are on for you" |
| Coda as lights out with a rim | concept (C19) | the page ends on a designed last light, not a footer |
| One voice (Istok), uppercase ≤ 3 per screen | brand character + hierarchy | pagani.com's character at legible sizes, without the scattered labels of the failed build |
| No accent colour; lamp only as light | brand character | Pagani's monochrome UI is kept, and warmth exists only where light falls |

---

## 8. Build first: the proof for Gate 1

**The deciding sequence:** **Act I through the first transition of Act II.** The film edit, the freeze, the dissolve into the room, the spot opening on Utopia, the exposure, and the transition to Utopia Roadster with the record switch in the dark.
- Desktop 1440×900 and mobile 390×844, plus the reduced-motion still.
- Below it, a 100 vh stub of the blackout seam into `#121118`, to prove the release.
- Nothing else is built until Alex has seen this sequence. Gate 5 runs on clean screenshots and a screen recording, with no rationale.
- Build it as a new folder `prototype/evening/`. **`prototype/stage/` stops being live.** It is kept for its tested engine (pin, soft rest, rail, sequential switch), which carries across. Its visual layer (void, curtain, corner labels) is killed.

**Acceptance criteria and measurable commitments (each measured on the render, never on the source):**

| # | Commitment | Number |
|---|---|---|
| 1 | A1: `eventCoverage` of the hero's named components | ≥ 0.90 |
| 2 | A1: `competition` | ≤ 0.60 |
| 3 | Text vs. car: the `.hero__id` + `.hero__cta` box against the car's box, sampled every 0.4 s across the 4.8 s edit plus the freeze, desktop and mobile | 0 intersections; clearance ≥ 24 px at the worst sample |
| 4 | h1 contrast on composited pixels under its glyphs, worst sample | ≥ 4.5:1 (target 7:1) |
| 5 | eyebrow, CTA and record contrast | ≥ 4.5:1 at t = 0, .25, .5 |
| 6 | The field is never `#000` above the coda: pixel samples at 9 scroll stops | 0 pixels of `#000` in the field (cutout blacks excluded) |
| 7 | Seam continuity: the film's bottom row vs. the stage's top row in the overlap | ΔE00 ≤ 3; no row-to-row luminance step > 2/255 outside image content |
| 8 | Stage geometry at exposure (1440×900) | car width 56 vw ± 2; floor line y 70 % ± 1; logotype 22 vw; neighbour 12 % ± 2 of its width visible |
| 9 | Spot values, read from computed opacity | I = 1.00 on a mark; I = 0.55 ± .03 at t = .5; lit-copy opacity at the neighbour position = 0 (so B = .42) |
| 10 | Record exclusivity across t ∈ [.40, .60], including fast scroll, reverse and rail clicks mid-flight | summed opacity of the outgoing + incoming records ≤ 1.0 at every frame |
| 11 | Interface budget on the stage screen | uppercase strings ≤ 3; functional text ≥ 14 px (I7); corner zones 18 vw × 14 vh empty except header and rail baseline |
| 12 | Hard edges | 0 opaque edges crossing the film during the dissolve (U13, U17) |
| 13 | Performance | LCP (the h1) ≤ 2.0 s desktop / ≤ 2.5 s 4G mobile; film ≤ 1.6 MB H.264 + ≤ 1.0 MB AV1, fetched after first paint; poster AVIF ≤ 220 KB; mobile still ≤ 100 KB; cutouts ≤ 180 KB each; JS ≤ 120 KB gz; 60 fps through the pin on a MacBook Air M1; only opacity and transform animate |
| 14 | Paths | Lenis present from the first commit (DNA90). The reduced-motion path and the no-JS path are both opened and screenshotted (DNA88) |
| 15 | Stops | 8 scroll stops plus 25 / 50 / 75 % of the transition, each a composed frame (MJ4, DNA87) |

**What passing this proves, and what it does not:** it proves the world, the seam and the signature exist in the render. Whether it is desirable is Alex's verdict alone (Gate 5).

---

## 9. Collisions with §0b, named

- **§0b-4 "`#000` stays."**
  - Read as: `#000` stays in the palette as the floor of the tonal ladder (coda end, footer). The field is the film's night `#1E1C26`, because the same decision's second half ("keep mid-tones and light so black cars never sink") and Alex's 2/10 (pointing at Chicago's violet world) cannot both be met on a `#000` field.
  - If Alex wants `#000` as the field, the light layers still work, but the seams and the film grade must be re-solved.
- **§0b-14 "mobile undecided."** Decided: version 1 (the vertical pin), for the reason in §5c. Swipe remains the recorded fallback.
- **§0b-12 "specs between the wheels is a variant."** Decided: variant A only. B is cut (the rear three-quarter Utopia makes it a dimension drawing).
- **BRIEF §0 "chapter index on the left" as a carrier.** Cut. It is a persistent mass (U10) doing a job the rail and menu already do. Restore from `prototype/stage/` if Alex asks.

## 10. Facts that need Alex (facts, not taste)

1. **The stock photo vs. the feed:** the watermarked studio shot shows a black-carbon, gold-wheeled Utopia; the VDP says Yellow. Until the VIN-to-photo match is confirmed, Act V shows the photo but the plate's colour field reads `—` (CP4). The photo is not labelled "in our showroom" as fact.
2. **Footage rights** for the recut Chicago film (Pagani-originated?) need confirming, the same as the press photos.
3. **Address** (14780 vs. 14800 Biscayne) stays a fillable field.
