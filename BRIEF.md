# Pagani of Miami: home page design plan (BRIEF)

> **Status (1 Oct 2026, later):** the live direction is Alex's `IMAGES ALEX/CONCEPT.png` plus his section list, built in `prototype/home/` (all sections). §0b decisions still bind. `prototype/stage/` is superseded.


**Status:** plan + a working prototype of the lineup stage (`prototype/stage/`). The full home page is not built yet. Updated 1 Oct 2026 with Alex's decisions (§0b).
**System:** design_dna, canonical path `/Users/alex/Desktop/WORK/design_dna/` (TASTE.md + DNA build standard). Skills: composition, motion-judgment, motion-taste, dimensionality, scroll-site, gsap-implementation, content-provenance, generated-imagery.
**Sources:** `research/CURRENT_SITE_CONTENT.md`, `research/lake-forest-figma/NOTES.md`, `research/press-images/MANIFEST.md`, `research/cutouts-from-figma/`, and `research/corp-site-shots/` (pagani.com frames). `research/PAGANI_CI_RESEARCH.md` (fonts, colours, line-up, motion of pagani.com). ⏳ marks what is still waiting on the client or on assets.

---

## 0. Design Read

```
Delivery: BUILD. The direction is set: Lake Forest is the base, "similar, but better".
Reading this as the home page of the official Pagani dealer in Florida, for a collector with $3M+ who already knows the brand, leaning theatrical-atelier: a dark stage, one car under light, its record beside it.
Mandate: REDESIGN. The Pagani identity is fixed; layout, hierarchy and motion are in scope.
Style mode: HYBRID. Anchor: brief-derived "Pagani corporate" (from the pagani.com evidence). Contrast: auction-editorial, data only (spec plates, the record). Signature: none borrowed; the signature is our own (§4).
  Unifying principle: the theatre presents the car; the record proves it.
Dimensionality: SUPPORT. Motion carries the drama, but the page reads fully with no motion at all.
```

**What carries over untouched (REDESIGN):**
- the PAGANI oval wordmark (SVG from the client's vector PDF);
- the model script logotypes;
- a `#000` ground with white ink (§11);
- small, widely tracked uppercase for chapter titles (corporate);
- the theatrical chapter rhythm ("Act / Scene") and the chapter index on the left (observed on corporate; our chosen direction, not a guideline, §0b-18);
- Horacio Pagani's signature.

From the group: the header, menu and Lenis behaviour of the sibling Lamborghini Miami site, so both sites read as one house.

**Register: heightened.** The reason is not "luxury". It is two things:
- (a) the subject is a few-off object costing $3M+, and the presentation itself is the message;
- (b) the brand itself speaks in theatrical language ("ACT THREE, SCENE TWO", seen live on pagani.com, shot `strip-home-01`).

---

## 0b. Alex's decisions, 1 Oct 2026 (these override anything below that disagrees)

1. **Base:** Alex's own paganiofchicago.com and the Lake Forest Figma model presentation: large cutouts, air around them, model logotypes, switching. We develop that idea for Pagani Prestige.
2. **Full-screen sections, always.** Every act is at least one full screen (100svh). No half-height bands.
3. **Cutouts: audit what exists first, recut only where a specific source fails** (§13a holds the audit).
4. **`#000` stays.** Mid-tones and light are kept in the photography and on the studio floor, so black cars never sink.
5. **Soft rest stays,** tuned on the prototype. The **pinned stage stays** as the peak. 340vh is a starting point, not a final length.
6. **Wheel rotation is removed completely.** Whole cutouts only: no separated wheels, no repainted bodies.
7. **Scroll drives the cars directly;** scrolling back returns the whole scene in sequence.
8. **Soft rest rules:**
   - only inside the stage, and only after the user has stopped;
   - any new input cancels it at once;
   - it never pulls the user back in when they leave up or down;
   - it never fights menu, model-name or skip navigation;
   - off on touch and under reduced motion;
   - delay and speed are tuned on the prototype, not fixed in the brief.
9. **Choreography:** one stage and one stable floor line.
   - The body stays sharp and opaque during the main movement. Darkening is allowed only towards the stage edges, and two cars are never dissolved into each other.
   - The contact shadow travels with the car; a reflection is added only after testing on the real sources.
   - The rhythm per model is **entry → calm exposure in the centre → exit**: there must be scroll ranges where the car simply stands and can be looked at.
   - The pin length comes from two transitions plus three exposures.
10. **Scale must *look* consistent.** Exact px-per-metre only for comparable angles and prepared sources; normalising different perspectives is never presented as a physical comparison.
11. **Neighbours at the edges stay but are secondary;** one main car in the centre. The first and last positions are real ends: no artificial loop, and after the last car the page releases the user.
12. **Specs between the wheels is a variant, not a decided feature.** Compare a compact line under the car with the axis and wheel marks on the real cutouts, and pick what supports the car and reads well. Never a dimension drawing.
13. **Switching is sequential:** the old data leaves, then the new arrives; two sets are never readable at once.
    - No queue of stale animations on fast scroll, reverse or click: name, specs, active nav item and CTA always belong to one car.
    - Clicking a model name goes to that car's centre exposure.
14. **Mobile is undecided.** Test a short vertical pinned scene first (two transitions, a big car, compact specs, no empty scroll, no auto-rest on touch). If it is cramped, use swipe with model names and explicit switching. Decided on the prototype.
15. **Hero:** architecture, night, car, air for type; a separate vertical mobile frame.
    - The overlap into the stage stays. Zoom is optional: first try the text leaving, a light dim and the next scene arriving with no scaling.
    - The main CTA goes to the models; a secondary "In our showroom" link goes to stock.
16. **Grandi Complicazioni:** a strong photo composition first, motion second. The 8% column speed difference is provisional and checked by eye.
17. **Atelier stays calm.** The signature drawing comes later; for now the PNG is shown with no drawing, and a missing SVG blocks nothing.
18. **pagani.com observations are not dealer guidelines.** Istok Web, the black ground and the interface character are a direction we chose from the corporate site, not mandatory rules without an official document. Header, menu and navigation keep the link with Lamborghini Prestige; the page's own composition and motion stay Pagani.
19. **Client questions:**
    - **Address:** a fillable field in the prototype; the final address is confirmed separately.
    - **"Since 2011" and Project Vulcan:** not in the copy until confirmed; this does not block the build.
    - **Stock car:** use the dealer photo **with the watermark kept** until the original arrives. The watermark is not removed and the car is not replaced by a corporate image.
    - **Stock data:** mileage, availability and specs belong to the specific car and a dated stock snapshot, and are re-checked before publication.
    - **Model logotypes:** good transparent PNGs are fine for the prototype; SVG is preferred but not required to start. Logos are **not** redrawn by hand.
    - **Horacio's signature:** PNG is fine when static; SVG only for a line animation.
    - **Photo rights:** confirmed through the client before publication; prototype work continues on what we have.
    - **History, contacts, service:** confirmed facts only, with no unconfirmed promises or local services.
20. **Order:** update the brief, build a separate working prototype of the stage on real cutouts, test the behaviour, then move it into the full home page. No publishing yet.

---

## 1. The concept, the feeling curve, the peak

**Concept:** *a private showing.* The visitor is taken through the house one act at a time, and each car is rolled onto the stage under light, one by one.

| Act | Feeling | What causes it on screen |
|---|---|---|
| I · Hero | Stillness and awe | One car in old-world architecture at night. No interface except the name and one invitation |
| II · Lineup | Desire: "this one is mine" | Cars roll one at a time across a single studio floor, with the numbers under each car |
| III · Grandi Complicazioni | Rarity | One-offs as pieces on a wall: a different scale and a different register |
| IV · Atelier | Reverence for the craft | Hands, leather, Horacio. Photography slows down; the motion almost stops |
| V · Miami | Belonging and access | Official Florida dealer, the car in our showroom, a person to call |
| Coda | Invitation | The address, one action, the silhouette leaving into the dark |

No two adjacent acts share a feeling (DNA29).

**The peak (Act II):** *"In the lineup, every Pagani rolls onto the stage on its own as you scroll, and its numbers sit directly under it, between the wheels."*

**Grammar:** chaptered stage, a chaptered editorial with one pinned stage. It differs from Lamborghini Miami, where the cars slide in tile by tile in a grid. Here there is **one stage and one car at a time**.

---

## 2. Major masses (composition, without components)

1. **A dark, full first screen.** One illuminated subject, low to the right of centre, with the air on the left reserved for the name.
2. **A long horizontal stage** (pinned). The subject is centre-left, with the record as a thin horizontal band directly beneath it. Dim neighbours sit at the edges.
3. **A staggered wall of tall plates.** Rhythm comes from height and offset, not from equal cells.
4. **A slow two-part chapter.** A still photograph holds one side while short text pieces pass on the other.
5. **A compact operational band,** "we are here": one real car, contacts, service. Lower in tone, smaller in scale.
6. **Coda.** Deep dark, the address and the silhouette.

**Compositional centre:** semantic and optical are the same thing: **the car on the stage (mass 2)**. The page builds up to it (1), and everything after it (3–6) descends from it.
**C20 check:** operational material (address, inventory, service) comes only in mass 5, after three acts of desire, and is smaller in scale and tone.

**Persistent layers (U10), counted in the mass scheme:**
- **Header**, 80/64 px: PAGANI centred, MENU on the right, phone.
- **Chapter index** on the left (desktop only).
- **Nothing else.** No chat widget over content, and the cookie banner sits in the header zone, not as a second overlay.

---

## 3. Hero (Act I)

| | |
|---|---|
| Viewport ownership | The full first screen (100svh). The scene fills the screen, not the object |
| Scene | **Primary:** `hero_utopia_side-profile-black-brick-arches_7577x5051`. A black Utopia in profile against brick arches: old Italian architecture, night, still. **Alternative:** Huayra 70 Derecho in the studio (the newest model, but a studio does not read as a "scene") |
| Object scale | As in the source frame (about 45% of the width). **The car is not enlarged to the edges** |
| Focal point | The car's front wheel and headlight, right of centre |
| Text safe zone | Left third, lower half. That is where the arch's dark brick sits, so no scrim is needed. The contrast will be measured on the composited render (I6) |
| Desktop crop | Full arcade, with the car low in the frame |
| Mobile crop | **A separate frame:** `hero-portrait_utopia_front-3q-black-stone-arch_4024x6048`, the same car in the same place, shot vertically. Text goes at the top over the dark stone and the car at the bottom |
| Asset suitability | ✔. 7577px, real photography, not generated |

**First-screen event (A1):**
- **Subject:** the car.
- **Identity mass:** eyebrow "Official Pagani dealer · State of Florida" [V: pagani.com dealer list] above a short h1. The text will be written from the ledger, not invented.
- **Action:** one CTA, "Discover the lineup", which goes to Act II, plus a secondary link "In our showroom" that goes straight to stock.
- **Excluded:** the header and the chapter index.

**Hero motion:**
- **Entrance, by time, ≤1.2 s:**
  - the scene "comes up from black": opacity 0→1 plus a slight light lift (brightness .6→1), 1.2 s, easing out;
  - the text rises 8 px in order (eyebrow → h1 → CTA), 80 ms apart, starting 0.4 s in;
  - comprehension never waits: the text is readable from the first frame of the rise, and the static HTML is complete without JS.
- **Exit, a scrub (scrub #1):** over 100vh of scroll:
  - the photograph dims to 45%. **No zoom by default** (§0b-15); the push-in 1.00→1.06 is an option (`?zoom=1`), added only if it really improves the transition;
  - the text leaves first, faster (fade + −16 px over the first 30% of the travel), so it never passes under the header (U13);
  - **Act II moves up over the hero like a curtain** (sticky overlap), echoing the corporate "panel slides up" transition (shot `strip-transition-00`).
- **Mobile:** the same exit but shorter (60vh), with no push-in, only dimming.
- **Reduced motion:** the scene appears straight away, text with no travel, the next section overlaps without parallax.

---

## 4. Lineup, the stage (Act II): the peak and the signature move

### 4.1 What is on stage
- **Three cars** (CI §5):
  - **Utopia** and **Utopia Roadster**, the current series production;
  - **Huayra R Evo Roadster**, the track car (Arte in Pista), marked as such in the record: "Arte in Pista · track only".
  
  The name is **Huayra R Evo Roadster**, never "Revo", and its logotype is the version with the red R and the word "Huayra". Huayra BC and Huayra Roadster BC are out of production and are not on the stage.
- **CP7:** three real cars means a stage of three. No fourth is invented.
- One-offs go to Act III.

### 4.2 Stage composition (desktop)
```
┌───────────────────────────────────────────────────────────────────────────┐
│ 01 INTRO                                   PAGANI                    MENU │
│ 02 LINEUP ◀                                                               │
│ 03 …          ACT II · THE LINEUP                       [Utopia script]   │
│                                                                           │
│ ░░░░                                                                 ░░░░ │
│ ░next░            ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄                         ░prev░ │
│ ░car ░        ▄▄██████  UTOPIA  (cutout)  ██████▄▄                  ░car ░ │
│ ░20% ░          (●)                         (●)                     ░20% ░ │
│ ░░░░      ─────────┼──────────────────────────┼──────────                 │
│                    852 CV     1,100 Nm     1,280 kg  ← record "between    │
│                    V12 6.0 twin-turbo · manual                the wheels" │
│ ─────────────────────────────────────────────────────────────────────────│
│  01 UTOPIA  ·  02 UTOPIA ROADSTER  ·  03 HUAYRA R EVO        Explore  Enquire│
└───────────────────────────────────────────────────────────────────────────┘
```
(All figures in the sketch are placeholders. Real values come from pagani.com with a source (CP1); until then the render shows `—`.)

- **The car:** a whole cutout on a dark studio floor, with a soft pool of light and a contact shadow that travels with it. No reflection until tested on the real sources (§0b-9). **Correction:** every existing cutout faces **left** (the nose is on the left), not right as this brief first said. That decides the direction of travel (§4.3).
- **A consistent-looking scale, not a measurement** (§0b-10). The angles differ: Utopia is a rear three-quarter with the doors up, while the Roadster and R Evo are profiles. So the scale is taken from Alex's own Figma frames (`IMAGES ALEX/`), where the cars were already balanced by eye, about 54–60% of a 1920 canvas. No px-per-metre claim is made.
- **The record: two variants, compared on the real cutouts** (§0b-12):
  - **A, line** (`?spec=line`, default): a compact row centred under the car (name, three figures, one engine line);
  - **B, axis** (`?spec=axis`): a hairline with marks under the wheel centres and the figures between them.
  
  B only works where both wheels are visible in profile. On the Utopia (rear three-quarter) the marks land unevenly, so it reads as a dimension drawing, which §0b-12 rules out. **Working choice: A.** B stays in the prototype for Alex to compare.
- **Model logotype** top right, SVG, as in Lake Forest.
- **Neighbours at the edges, secondary:** about 12% of the car shows past the screen edge, darkened by the room (a fixed edge veil), not by a fade on the car. Because the cars face left, the stage drives **forward**:
  - **right edge = the next car, waiting;**
  - **left edge = the previous car, gone.**
  
  The first car has no left neighbour and the last has no right one: no loop (§0b-11).
- **Rail at the bottom:** `01 UTOPIA · 02 UTOPIA ROADSTER · 03 HUAYRA R EVO` with a progress hairline, plus Explore (secondary) and Enquire (primary, one per screen).

### 4.3 How the models change (scrub #2, the main one)
- **Rhythm per car:** exposure (the car stands still in the centre) → transition → exposure.
  - **Pin length = 3 × exposure + 2 × transitions.** In the prototype that is 60vh + 80vh, so 340vh in total; it is set by URL (`?hold=&trans=`) and tuned on the prototype.
  - The first car is already standing in the centre when the stage arrives over the hero.
- **Scroll drives the cars directly** (ScrollTrigger `onUpdate` on Lenis, no extra smoothing). Inside a transition the movement follows ease-in-out, so a car rolls in and settles rather than sliding at constant speed. Scrolling back returns everything in sequence.
- **Direction: a question for Alex.** §0b-9 says "the current car leaves to the right, the next comes from the left". That was written against my mistaken "cars face right". With the real cutouts (all facing left) it would mean the cars drive **backwards**. Mirroring is not an option, because it flips the lettering on the bodies (Pirelli, the "1", the Pagani script).
  - **The prototype default is forward:** the next car arrives from the right, the current one leaves to the left.
  - **Alex's literal version** is one URL away (`?dir=reverse`).
- **Wheels do not turn** (§0b-6). The cutouts stay whole.
- **Body:** sharp and opaque throughout; darkening comes only from the edge veil (§0b-9).
- **Text and data do not scrub. They switch sequentially, by threshold:**
  - at the middle of the transition (with hysteresis, so sitting on the midpoint never flickers) the old record leaves (0.16 s: fade + 6 px up), the content is swapped, and the new record arrives (0.26 s);
  - there is **one** set of nodes, so two sets of data can never be readable at once;
  - a new change kills the running switch and always renders the **latest** target. There is no queue: verified with fast scroll, reverse, and a click on 01 then 02 mid-flight;
  - the rail's active item and the CTAs change in the same call;
  - at 25 / 50 / 75% of a transition the frame shows two cars and the record of the one nearer the centre.
- **Soft rest** (§0b-8):
  - it fires 220 ms after the last scroll frame and waits for Lenis velocity to settle;
  - it goes to the **nearer** resting position (the end of the previous exposure or the start of the next), over 0.6 s scaled by distance;
  - it acts only when the stop falls inside a transition: stopping in an exposure, before the first car or after the last does nothing, so leaving the stage is never pulled back;
  - any wheel, touch or key input cancels it. Menu, rail and skip navigation set their own mode, so the rest never fights them;
  - it is off on touch and under reduced motion. Delay and speed are URL parameters (`?snapdelay=&snapdur=`) for tuning.
- **Clicking a model in the rail** scrolls via `lenis.scrollTo` to that car's position. The visitor controls the transport (MJ6), and the same works from the keyboard (Tab → Enter).
- **Exit from the stage:** after the last car, the stage releases (unpin) and Act III enters from below without overlap. That is a pause after the peak.

### 4.4 Mobile: undecided, tested on the prototype (§0b-14)
- **Version 1 (in the prototype now):** a short vertical pinned scene. 30vh exposures + 55vh transitions = **200vh**; the floor at 50% of the screen; the logotype above; the record under the car; no auto-rest on touch.
- **Findings at 390×844:**
  - the car is about 80% of the width, which could be larger;
  - the rail of three model names wraps onto several lines, so it needs a different form (one current name plus a 01/03 counter).
- **Version 2, if 1 feels cramped:** a swipe rail with model names and explicit switching.
- The decision is Alex's, on the device.

### 4.5 Reduced motion
- No travel. The car changes with a 300 ms crossfade.
- No pin: a short block with tabs.
- The data and logotype change instantly.

---

## 5. Grandi Complicazioni (Act III)

- **What:** one-offs and few-offs, from the Grandi Complicazioni corporate menu plus press (CI §5):
  - **Huayra 70 Derecho**, the newest, Goodwood 2026;
  - **Huayra Codalunga Speedster**;
  - **Imola Roadster**;
  - **Zonda HP Barchetta**.
  
  Possibly also **Huayra Epitome**: we have a photograph, but it is not in the GC menu. **Four plates** is a provisional number. If the client wants five, the wall takes five; the template does not dictate the count. The list, the "1 of N" figures and the dates all come from the ledger. Lake Forest put the same Epitome specs on every card, and that is exactly what we do not repeat.
- **Composition:** a "gallery wall" of tall plates in two columns offset by half a plate (Lake Forest's idea), but:
  - the plates are different heights, set by each photograph rather than one template;
  - each plate shows the photograph, the script logotype and **one line of record** ("One of 5 · 2024"), with no spec table. These cars are not bought by their numbers.
- **Ground:** the darkness of the stage stays, with a cooler, desaturated "hall" tone. **The sunset-sky background from Lake Forest is removed;** it competes with the cars (C2).
- **Motion:**
  - **(scrub #3, light):** the two columns move at different speeds, as if the wall has depth. The **8% figure is provisional,** checked by eye so the photographs and captions stay easy to look at (§0b-16). There are no scrub layers behind text;
  - each plate **floats in**: a mask opens from the bottom while the plate rises 60 px and the picture settles from scale 1.18 to 1 (1.4 / 1.8 s, ease-out), bound to the role `[data-reveal="plate"]` (MJ11). This is in the prototype's next section.
  - hover: the photograph brightens by 6% and the logotype rises 2 px (D2).
- **Mobile:** one column, no parallax; mask reveal only.

---

## 6. Atelier / Horacio (Act IV)

- **What:** "Art and science walk hand in hand" (a Leonardo line Pagani uses itself; shot `strip-home-07`, with the source quoted from pagani.com). Three short beats:
  1. the hands (leather stitching);
  2. the material (technician and car);
  3. Horacio (portrait and signature).
  
  Text is written from sources, and Horacio's biography comes from pagani.com.
- **Composition:** a **sticky photograph** on the left (55% of the width), with the three beats scrolling past on the right. The photograph **changes by crossfade, by threshold, not by scrub,** on each beat. **This is the quietest act:** no parallax and no travel.
- **Signature:** for now the **PNG, static** (it floats in with the text). The drawing along the stroke is an add-on after the main stage, and needs an SVG (§0b-17). It does not block anything.
- **Chapter end:** a quote from Horacio, centred, with air. This is the pause before the commercial part.
- **Mobile:** the photograph sits above each beat (three photo-plus-text pairs) and the signature appears with no drawing.

---

## 7. Pagani of Miami (Act V): the dealer

The operational block. **Smaller and quieter than everything above it (C20).**

- **"Official Pagani dealer for the State of Florida"** [V], plus a short history of Prestige and Pagani. Two facts from the Story page are **unverified**, so a written confirmation from the client is needed:
  - the franchise since 2011;
  - "Project Vulcan", the Huayra Horacio gave Brett David in memory of his father.
  
  Not a single figure about "the first of N dealers"; both current versions are wrong.
- **"In our showroom":** one real car, the 2024 Utopia Coupé with 3,832 mi, laid out as a **spec plate** (auction-editorial D4): year, model, colour, mileage and **"as of [date]" printed on screen** (CP5). Its photograph: the 4999px dealer studio shot of the Utopia, **with its "Pagani of Miami" watermark kept** until the client sends the original (§0b-19). The watermark is not removed and the car is not swapped for a corporate image. The data is a dated snapshot, re-checked before publication. If there is no car, the block shows "Commission or source a Pagani" instead of an empty card.
- **Service and PURO:** a single line plus a link to service; no separate cards.
- **Motion:** only rise reveals (8 px, by role). Nothing is scrubbed here (MJ5: business information never waits on choreography).

---

## 8. Coda and footer

- The address, phone and hours in **one** visible block, from the ledger. **The address is a fillable field** in the prototype; 14780 vs 14800 Biscayne is confirmed separately and never guessed (§0b-19). One action: "Book a private viewing".
- At the bottom, the **car silhouette** going into the dark (from Lake Forest), static: the "ending" (C19).
- Footer: PAGANI SVG, legal text from Prestige, links to the group site.
- **Cut:** the light sweep across the silhouette on approaching the end. It adds nothing to the meaning.

---

## 9. How motion works across the whole site (MOTION READ)

```
Subject          Hypercars as works of art. The cars are not temporal, but the presentation is heightened (§0).
Journey          Look (hero) → choose (lineup) → believe in the rarity (GC) → trust the craft (atelier) → contact (Miami).
Static verdict   Yes. The page is complete with no JS and no motion: the hero, the stage as a three-tab block, the wall, three atelier beats, the dealer block.
Time adds        The stage: a car "rolled out" one at a time (presentation order and proportion). Hero exit: the curtain. Atelier: the signature.
Register         heightened (§0: a few-off object plus the brand's own theatrical language).
Primary idea     The cars rolling across one stage (Act II). Everything else is subordinate.
Stable           All text while it is being read; the record under the car; the header; prices and contacts. Nothing moves behind body text.
Roles            hero entrance → atmosphere/orientation · hero exit + curtain → continuity · stage travel → subject expression + narrative progression ·
                 data crossfade → state change · GC parallax → spatial explanation (the wall's depth) · plate mask reveal → hierarchy ·
                 atelier crossfade → narrative progression · signature drawing → subject expression (the author's hand) ·
                 rise reveals → hierarchy · menu → state change · hover → feedback · header scrim/solid → orientation
Transport        Always the reader. The pin is driven by scroll; the rail gives direct transitions; the soft rest is desktop only and does not fight the scroll.
Learning         Nothing needs to be learned. The rail with names is visible straight away; scrolling advances the cars. The skip is the rail and the chapter index.
Mobile           Re-authored: the stage is a swipe rail, the wall has no parallax, the atelier is pairs, the hero exit is shorter.
Reduced motion   Lenis not created; no pin; crossfades only (200–300 ms); the signature appears; every state is reachable.
Cost             The 340vh pin is the main price (scroll distance). A cutout per car means a load: we budget ≤180 KB each. The scrubbed parallax needs 60 fps on mid-range hardware.
Cut              Numbers rolling as counters (theatre for its own sake) · car blur in motion (lies about the material) · horizontally scrolling GC wall (a second pin, competing with the peak) ·
                 light sweep across the footer silhouette · custom cursor · a car "drive-in" on the inventory block (repeats the stage) · video in the hero (pagani.com does not use one either, and there is no suitable source).
```

### Motion map (scrub = tied to scroll, time = by time/threshold)

| # | Where | Type | What happens | Length |
|---|---|---|---|---|
| 0 | Hero arrival | time | The scene comes up from black (1.8 s), then the copy rises line by line (28 px, 0.12 s stagger), then the header | once on load |
| 1 | Hero → Act II | **scrub** | Text leaves first, dim to 45%, Act II moves up as a curtain. The stage's type floats in with it, and the first car rolls the last 18% into place. Zoom is optional | 100vh |
| 2 | Act II, stage | **scrub + pin** | exposure → transition → exposure. The next car arrives from the right, the current one leaves to the left (direction is §4.3's open question); no wheel rotation | 3×60 + 2×80 = 340vh desktop (provisional), 200vh mobile (test) |
| 2a | Act II, data | time (threshold) | Old record out 0.16 s → swap → new record in 0.26 s; one set of nodes, no queue | — |
| 2b | Act II, soft rest | time | 220 ms after scrolling stops, inside a transition only → nearest exposure; cancelled by any input | 0.6 s × distance |
| 3 | Act III, wall | **scrub** (light) | Columns at different speeds; the value is provisional and checked by eye | the section's height |
| 3a | Act III, plates | time | Floats in: mask from the bottom + 60 px rise + the picture settling 1.18→1 | — |
| 4 | Act IV, signature | later | Static PNG for now; the stroke drawing only with an SVG | — |
| 4a | Act IV, photograph | time (threshold) | Sticky photograph crossfade per beat | — |
| 5 | Everywhere (role) | time | **Floats in:** rise 32 px + fade, 1.1 s, bound to `[data-reveal]`; reverses when scrolled back above it. *Dialect yield:* motion-taste D1 (≤8 px travel) yields to Alex's direction that the page must visibly float in. Floor: I1, a complete static path | — |
| 6 | Header | time/state | Scrim over the hero → solid after leaving it (U13 split), never hidden (as on the Lambo site) | 300 ms |
| 7 | Menu | time | Panel opens from the top with item stagger; Escape and focus handled (choreography from the Lambo site) | 650 / 400 ms |
| 8 | Chapter index | time | The active act is highlighted, with a hairline running from item to item | 250 ms |

**Motion tokens (motion-taste I3):**
- `--dur-1 .15s`, `--dur-2 .25s`, `--dur-3 .4s`, `--dur-4 1.2s`;
- ease-out `cubic-bezier(.22,1,.36,1)` for entrances;
- ease-in `cubic-bezier(.55,0,1,.45)` for exits (U20: never use the entrance curve on an exit);
- all scrubs are linear (G4).

**Stack:**
- Lenis 1.3.x (DNA90), `autoRaf:false` on `gsap.ticker`, `anchors:true`, not created under reduced motion; menu and rails carry `data-lenis-prevent` only where needed (the lesson from the Lambo footer).
- GSAP + ScrollTrigger: the pin and the scrubbed stage need ScrollTrigger; CSS cannot provide pin plus scrub plus reversal.
- `gsap.matchMedia` for desktop / mobile / reduced (G5).
- All content is visible in HTML before init (G7).
- Motion is bound to roles (`data-act`, `data-reveal`, `data-stage`), not to ids (MJ11).

---

## 10. Section-language ledger (the plan, read down the columns)

| Section | ask | ground | type voice | containers | image | depth | motion | device |
|---|---|---|---|---|---|---|---|---|
| Hero | nothing → look | photo, night | tracked caps + h1 | none | full-screen scene | photo | entrance + scrub exit | curtain |
| Lineup | browse | dark studio | caps + figures | hairline rail | cutout on a floor | real scale | **pinned scrub** | **record between the wheels** |
| GC | look | dark hall | caps + 1 line | none, plates by photo | portrait plates | two-speed columns | light scrub + mask | — |
| Atelier | read | dark | caps + body + quote | none | sticky photograph | — | crossfade + signature | signature |
| Miami | act | slightly lighter dark | caps + spec plate | hairline plate | 1 photograph | — | rise | spec plate |
| Coda | act | deep dark | caps + address | none | silhouette | — | rise | — |

**Changes that are carried by the concept:**
- the depth model differs by act (stage, wall, still); each is "one depth idea per screen";
- the ask goes look → choose → look → read → act, so no two adjacent sections make the same demand.

**Drift:** none in the plan. Type, palette, borders and buttons follow one language throughout.

---

## 11. Type and colour (from `research/PAGANI_CI_RESEARCH.md` §1.2–1.4)

> These are **observations of pagani.com that we chose to follow** (§0b-18), not dealer guidelines. No official Pagani dealer web standard has been found.

- **Font: Istok Web**, the corporate face of pagani.com (Andrey Panov, **SIL OFL**, free to self-host). It comes in 400, 400i, 700 and 700i.
  - This is a carrier, not a stand-in: we use the corporate face itself, self-hosted (woff2), through the `--font-brand` token.
  - It has no thin weights. Corporate asks for weight 100 but gets 400, so there is no point imitating "thin".
- **Corporate type scale** (desktop/mobile):
  - hero 36/42 · 24/32;
  - section titles 20/28 · 18/23;
  - body 13/23 · 14/18;
  - spec values 12, labels 10.
  
  **We keep the voice and lift the sizes:**
  - **Hierarchy:** corporate is small and quiet, a gallery voice. We keep that character, but the h1 rises to clamp(40→64), the stage's model name to clamp(28→44), and spec values to 18–22.
  - **Floor:** functional text never goes below **14 px** (I7). Corporate runs 10–13 px; that is the cost of being "quiet", and we do not pay it.
  - **Uppercase:** chapter titles and labels are uppercase, tracked 0.16–0.24em, as on corporate. Body is sentence case (Pagani's own remark).
- **Colour, the chosen direction:** corporate has only `#000000`, `#FFFFFF` and white at 50%. No accent, no Pagani blue or gold.
  - **Ground:** **`#000`, as in corporate.** *Dialect yield:* color-taste D1 ("never #000") yields because the brand palette is established. The pure black is the "stage" of Pagani itself, and the photography is shot to black.
  - Plus **one** service step `#0B0B0C` for the Act V band only, so the operational part is tonally lower than the stage without becoming a different world.
  - **Ink:** `#FFFFFF` for headings and values; secondary text is white at 64% (`#A3A3A3`, ≈8.5:1 on black). Corporate's 50% (5.32:1) passes AA but is too dim at our sizes. Hairlines are white at 16%.
  - **Wordmark:** our SVG in `#FFFFFF` (corporate's header logo is silver `#bec0c2` in PNG; we use the white SVG, Q1 is solved: `research/logos-svg/`).
  - **Accent: none.** The roles of "action" and "active" are carried by light (full white against 64%) and the hairline. The Lake Forest teal and the Chicago cyan are removed (I5: an accent with no source).
- **Buttons:** hairline outline 1 px at 40% white, square corners, uppercase 14 px tracked 0.2em; hover fills white with black text. One primary per screen.
- **Spec values:** units and formats differ across Pagani's own pages (HP vs CV, "1.280 Kg"). **We decide (judgment call):** CV and hp both, `1,280 kg`, US punctuation, `tabular-nums`. Each value carries a source in the ledger.

---

## 12. Budget (DM3 / DNA38 / DNA72)

| | |
|---|---|
| Scroll | Hero 100vh · Lineup ~340vh (3 cars) · GC ~160vh · Atelier ~220vh · Miami ~120vh · Coda ~80vh. **≈ 10.2 screens on desktop**, ~8 on mobile |
| LCP | ≤ 2.5 s on 4G. The hero is AVIF/WebP: ≤ 350 KB desktop, ≤ 200 KB mobile, with a still preload |
| Cutouts | WebP with alpha, 2400px long side, ≤ 180 KB each; lazy-loaded except the first |
| First-screen payload | ≤ 1.2 MB, JS ≤ 120 KB gz (GSAP + ScrollTrigger + Lenis) |
| Frames | 60 fps on a MacBook Air M1 and an iPhone 12; transforms and opacity only |

---

## 13. Assets: origin and what is missing

| Position | Origin | Status |
|---|---|---|
| Hero desktop / mobile | Pagani press, real | ✔ (rights to confirm) |
| Stage cutouts | Alex's own cutouts (Figma / paganiofchicago.com) | ✔ audited, §13a. **No recut needed** for the prototype |
| GC plates | Pagani press | ✔ |
| Atelier | Pagani press | ✔ |
| Utopia in stock | dealer 4999px, with watermark | ✔ used with the watermark until the original arrives |
| Model logotypes | Alex's `IMAGES ALEX/logos`: **vector** for Huayra R Evo Roadster (`Group.svg`, the correct version with the red R) and Huayra (`Group 9497`). The rest are PNG embedded in SVG; good transparent PNGs for Utopia / Utopia Roadster | ✔ for the prototype. Never redrawn by hand. `Group 9500` is the wrong Revo (no "Huayra"), so it is not used |
| Horacio's signature | PNG (pagani.com) | ✔ static. SVG only for a future stroke animation |
| Miami lockup | raster only | later; for now PAGANI only |
| **Generated imagery** | **none** | Cars are never generated (GI3). fal is used only for background cuts and upscaling |

### 13a. Cutout audit (1 Oct 2026, measured)

| Car | File used | Size | Angle | Edges | Margins | Shadow | Verdict |
|---|---|---|---|---|---|---|---|
| Utopia | `research/cutouts-from-figma/utopia_side-3q-rear-white-doors-open_1963x865.png` (= Alex's paganiofchicago.com `slider-img-2`) | 1963×865 | rear 3/4, doors up, **faces left** | clean, no halo on black or grey | 95–106 px | soft baked contact shadow | ✔ |
| Utopia Roadster | `…/utopia-roadster_side-red-doors-open_1122x481.png` (= `slider-img-3`) | 1122×481 | profile, doors and clamshells open, **faces left** | clean | **0 px at the top** (the raised clamshell touches the edge) | baked | ✔ for now. The smallest source: soft on retina above about 1000 CSS px. A larger cut of the same photo is the first candidate if it shows |
| Huayra R Evo Roadster | `research/cutouts-from-figma/_sources/revo4` (Lake Forest node 281:1104) | car 2888 px wide (export 2400) | profile, **faces left** | clean | generous | baked + tail-light glow | ✔ **Replaces** the 1152 px version, which was cropped flush to both sides |
| Huayra Roadster BC | `…/huayra-roadster-bc_front-3q-red-carbon_2332x775.png` | 2332×775 | front 3/4, faces left | clean | ok | light | Out of production, so off the stage. In the prototype as `?cars=4` |

Scale and placement follow Alex's 1920×1080 frames in `IMAGES ALEX/`. The floor line is aligned on the measured tyre contact (`contactY` in `prototype/stage/assets/cars.json`), not on the image bottom, so the baked shadows don't lift the cars.

---

## 14. Claims ledger: what is needed before the copy

Each item goes into `content-ledger.json` with a source.

- **Status:** "Official Dealer for the State of Florida" [V pagani.com].
- **Dealership history:** 2011 and Project Vulcan stay **out of the copy** until confirmed. This does not block the build.
- **Address:** a fillable field until the client confirms 14780 or 14800 Biscayne. Never guessed.
- **Phone:** (833) 290-6287 [V on both].
- **Hours** [client].
- **Every spec** for the stage, from pagani.com, page by page.
- **"1 of N"** for each GC car [V pagani.com].
- **Utopia in stock:** a dated snapshot.
- **PURO** [V group site].

**Banned:**
- "first / one of N dealers" (both versions are false);
- any copy from Lake Forest (CP3);
- Title Case everywhere (Pagani's own remark); copy is written as "we".

---

## 15. Critique panel on the direction

| Critic | Point |
|---|---|
| **Composition** | The centre is clear: the stage. Risk: the hero (a black car in arches) and the stage (a car on black) are two "car on dark" masses one after the other, so Act II could repeat Act I. The difference must be in the kind of mass: the hero is a scene with an environment, the stage is an object with its record and no environment. |
| **Craft** | 340vh of pin is a lot of scroll on a trackpad. Data must clear AA over the floor's light pool. The cutouts must be recut at high resolution or they will be soft on retina. |
| **User advocate** | Job 1, "see what they sell": 1 scroll. Job 2, "find out what's in stock": Act V is 7–8 screens down, too far. Needs a "In our showroom" link in the header/menu and in the hero (secondary). Job 3, "call": the phone is in the header at all times. |
| **Brief advocate** | "Similar to Lake Forest, but better": the stage, the switcher, the peeking neighbours, GC and Horacio are all kept and deepened. Motion is the user's top priority: it has a declared primary idea and a map. |
| **Contrarian** | The strongest objection: three cars do not need 340vh of pin. A collector does not want an "experience", they want to see the car and call, and a rail with three cars and no pin is faster. The alternative most worth considering: **a stage without a pin**, where the car changes by click/swipe on every format and scroll stays plain. Cost: the motion peak is lost, the very thing the user asked for. |

**Dispositions:**

| Point | Disposition |
|---|---|
| Hero and stage alike | **accept.** The hero is an environment (arches, sky); the stage is a studio with no environment plus the record. The difference is in the kind of mass, not the interval |
| Long pin | **accept.** 100vh per car, not 150vh; plus the rail for jumping and a skip link "skip the lineup ↓" in the stage's top corner |
| AA over the light pool | **accept.** Measured on the composited render at 3 positions of travel (I6) |
| Low-res cutouts | **accept.** Recut from the 8000px press originals |
| Stock too far down | **accept.** Added "In our showroom" to the menu and as a secondary link in the hero |
| Contrarian: stage without a pin | **reject-with-reason.** The pin only on desktop gives the one thing a static rail cannot: the order and true proportion of the cars as one scene. Mobile already gets the version without a pin. The cost (scroll) is reduced by the rail and the skip |

---

## 16. Prototype: what exists and what it showed

- **Where:** `prototype/stage/` (`index.html`, `stage.css`, `stage.js`; local GSAP 3.13 + ScrollTrigger + Lenis 1.3). Serve with `python3 -m http.server 8781`, then open `http://localhost:8781/`.
- **URL params:** `?debug=1` (state HUD) · `?spec=axis` · `?dir=reverse` · `?cars=4` · `?hold=&trans=` · `?snapdelay=&snapdur=` · `?snap=0` · `?zoom=1`.
- **Recordings:** `prototype/stage/_video/`:
  - `stage-desktop.mp4` (38 s, 1440×900, real wheel input: arrival, entry, early stop → rest, run-through, reverse, clicks 03 and 01, exit into the next act);
  - `stage-mobile.mp4` (390×844);
  - `stage-reduced.mp4`.
- **Frames:** `prototype/stage/_shots/`.
- **Verified, with a headless Chrome test that has no frame throttling:**
  - a stop early in transition 1 rests back on Utopia (y 1600 → 1440);
  - after the last car the page releases with no pull-back (y 5038 stays);
  - click 03 → R Evo centre exactly (3690); click 01 then 02 mid-flight → Roadster, with no stale record;
  - skip → next act; menu → Utopia Roadster;
  - no page errors on desktop, mobile or reduced.
- **Not yet verified:** soft-rest interruption caught mid-glide (the test caught the page after the rest had finished), and trackpad feel. These need Alex's hand on a real trackpad.

## 17. Order of work

1. ✔ CI research closed. ✔ Stage prototype built (§16). ⏳ Alex reviews the stage: direction, rest feel, spec variant A/B, mobile version 1 vs swipe, pin length.
2. Assets: the Utopia Roadster at a larger size if it reads soft; web versions of everything; logotypes stay PNG where no vector exists.
3. **Static page** in full, with no motion (MJ5). Desktop + mobile, real copy.
4. Lenis from the very first build (DNA90). Then motion in order: header/menu → hero → **stage** → GC → atelier → reveals.
5. Check: 8 stops along the scroll, 25/50/75% inside the stage, reduced motion, no-JS, AA on the render, 1440 / 1024 / 768 / 390.
6. Gates 1–4, then screenshots to Alex with no explanations (Gate 5).
