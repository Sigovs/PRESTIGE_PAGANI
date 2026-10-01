# Pagani of Miami: current site content audit

**Site:** there is no stand-alone Pagani of Miami site. Pagani lives as a section of the group site, entered at https://www.prestigeimports.com/pagani-ast. `paganimiami.com` redirects there (see §1).
**Captured:** 2026-10-01, from the raw HTML of 24 URLs on prestigeimports.com. That is the 8 Pagani URLs in `sitemap-static.xml` (426 URLs in total), every Pagani link reachable from them, the shared About, Story and Contact pages, the Pagani and hypercar inventory views, the one Pagani VDP and the group homepage. Off-site, it also covers the Pagani filter on lamborghinimiami.com, pagani.com's official dealer network, and four candidate Pagani domains.
**Method:**
- `curl` with a Chrome UA. Visible text was extracted per page, and the shared header/footer chrome was stripped.
- Playwright was used for the JS-rendered parts: the `/pagani-ast` hero video and the PURO block, the zero-result inventory page, and the pagani.com dealer locator, whose data comes from its admin-ajax JSON.
- Nothing was submitted or changed.

**Images:** not downloaded here; another agent handles them. Image filenames are cited only where they show something.

> **Conventions.** Quotes in "…" are verbatim, typos included. **[UNVERIFIED]** means the site claims it and nothing else here confirms it. **[OBSERVED]** means I saw it in the markup, JSON or a render rather than in body copy. Inventory figures are a snapshot from **1 Oct 2026**. On `/pagani-ast` the copy is set in mixed case in the HTML, but CSS renders most of it in uppercase.

---

## 1. Platform and vendors

| Layer | Vendor | Evidence |
|---|---|---|
| CMS / website | **DealerFire "Engine 6"** (DealerSocket), app version 6.58.0. This is the same platform and the same dealer feed as lamborghinimiami.com. | Footer: "Next-Generation Engine 6 Custom Dealer Website powered by DealerFire. Part of the DealerSocket portfolio of advanced automotive technology products." Assets are on `cdn-ds.com/media/.../1477/`. `/pagani-ast` is typed `"Type":"mlp"` (a model landing page) in the DataLayer [OBSERVED]. |
| Pagani domain | **`paganimiami.com`** → 301 → `https://prestigeimports.com/pagani-ast` | It is registered at GoDaddy (created **2011-02-18**) and served from AWS Global Accelerator IPs, the same as prestigeimports.com. `www.` behaves the same. |
| Second Pagani domain | **`paganiofmiami.com`** → `https://www.prestigeimports.com/` (the group homepage, not the Pagani page) | Same IPs. |
| Not owned / not live | `paganimiami.net` and `pagani-miami.com` do not resolve. **`paganinewportbeach.com`** (see Story 2017, §3.8) is now a **spam clone**: it is titled "Pakde4D Pagani of Beverly Hills", sits behind Cloudflare and copies Pagani of Beverly Hills text. It does not belong to Prestige. | curl 2026-10-01 |
| Digital retail | Roadster: `shop.prestigeimports.com` | Group homepage "SHOP OUR DIGITAL SHOWROOM". It has no Pagani-specific entry. |
| Vehicle history | Carfax and AutoCheck | Pagani VDP |
| Configurator | Pagani's own "virtual experience" at `http://virtualexp.pagani.com/` (plain http) | `/pagani-ast` "DESIGN" button |
| Video | YouTube background video **`1mJk_FesmLY`**, autoplay, muted, looped | `/pagani-ast` hero [OBSERVED in Playwright] |
| Maps | Google Maps embed (place + Street View) | Contact, Coral Gables CLP |
| Analytics / ads | 3 × GTM containers, Facebook Pixel, Google Ads, DoubleClick Floodlight | Scripts |
| Shop | `prestigeimports.store` ("Store") | Nav. It has no Pagani section. |

**URL hygiene:**
- The Pagani hub has the meaningless slug `/pagani-ast` ("Art and Science Together").
- `/pagani` returns **404** "Oops! This page doesn't exist!".
- Model pages carry stale years in their slugs: `clp-2018-pagani-huayra-…` has the H1 "2014 / 2016 Pagani Huayra…", and `clp-2018-pagani-huayra-roadster-…` has the H1 "2017 Pagani Huayra Roadster…".

---

## 2. Sitemap and navigation tree

### Where Pagani sits in the group nav
The group mega-menu has **no Pagani item and no Models menu.** Pagani appears only as:
```
Home  /
New ............................ /new-vehicles-north-miami-beach-fl   ("View all [7]", only Lotus listed; JS count "New 9")
Pre-Owned ...................... /cars-for-sale-north-miami-beach-fl  ("View all [121]")
├─ … Hyper Cars ................ /used-vehicles-north-miami-beach-fl?comment1=H   → "0 Results" (the Utopia is not tagged)
├─ … Prestige Marine, Gunther Werks Miami, Consign
Service
├─ Our Services ................ /car-service-north-miami-beach-fl
├─ Schedule Service
├─ Order Parts
│   ├─ Lamborghini Parts & Accessories → /auto-parts-north-miami-beach-fl
│   ├─ Lotus Parts & Accessories ..... → lotusparts.prestigeimports.com
│   ├─ Pagani Parts & Accessories .... → /auto-parts-north-miami-beach-fl   (same generic form as Lamborghini/Karma)
│   └─ KARMA Parts & Accessories
└─ Service/Parts Specials
Store .......................... prestigeimports.store
Research ....................... /blog
├─ … Pagani Research ........... /clp-pagani-research-miami-fl
├─ … Other Featured Brands ..... /clp-other-featured-brands-in-miami-fl  (lists "Pre-Owned Pagani Hypercars")
About .......................... /about-prestige-imports-in-north-miami-beach-fl
├─ Our Dealership · Our Story (/story) · Testimonials · Employment · Contact
Header utility: "14780 Biscayne Blvd, North Miami Beach, FL" · "Today 9-7pm" · (833) 290-6287
```

### How a visitor reaches `/pagani-ast`
1. The **Pagani logo tile** on the group homepage (`Prestige-Pagani.png`). It is first in a row of five brand tiles: Pagani → `/pagani-ast`, Lamborghini → lamborghinimiami.com, Lotus → lotusmiami.com, Karma → `/karma-charged-emotion`, Czinger → `/czinger-dominating-performance`.
2. Typing **paganimiami.com**.
3. The sitemap.

**Nothing else on the site links to `/pagani-ast`.** The Research hub and the CLPs link to each other and to inventory, but never to the hub.

### Pagani URLs in `sitemap-static.xml` (8)
```
/pagani-ast ............................................. Pagani hub ("Art and Science Together")
/clp-pagani-research-miami-fl ........................... Pagani Research index
/clp-new-used-pagani-vehicles-north-miami-beach-fl ...... "Pagani | North Miami Beach FL" brand CLP
/clp-pre-owned-pagani-hypercars-for-sale-near-coral-gables-fl  SEO CLP (Coral Gables)
/clp-2018-pagani-huayra-north-miami-beach-fl ............ Huayra model CLP
/clp-2018-pagani-huayra-roadster-north-miami-beach-fl ... Huayra Roadster model CLP
/clp-pagani-huayra-vs-mclaren-p1 ........................ comparison CLP
/clp-2018-pagani-huayra-vs-2014-bugatti-veyron .......... comparison CLP
```
**Inventory/VDP (not in the static sitemap):**
- `/used-pagani-north-miami-beach-fl` (1 result)
- `/pagani-north-miami-beach-fl` (**0 results**)
- `/vehicle-details/used-2024-pagani-utopia-cpe-north-miami-beach-fl-id-65767973`

That VDP is **missing from `sitemap-vehicle.xml`**, which lists 130 VDPs.

### Not on the site at all (see §6)
- **Model pages:** no Utopia (the current model, and the car actually in stock), no Utopia Roadster, no Zonda, no Huayra R / Imola / Codalunga / BC, no Arte in Pista.
- **Programmes:** no Pagani Grandi Complicazioni / Rinascimento programme, and no proper PURO page (only one paragraph).
- **Aftersales and people:** no Pagani service page, no Pagani team or contact person.
- **Events and news:** no Pagani events or news page.

---

## 3. Page by page

### 3.1 Pagani hub `/pagani-ast` (paganimiami.com lands here). The de-facto Pagani home page.
- **Title:** "Pagani - Art and Science Together in North Miami Beach FL"
- **Meta description:** "All the models, the history of Horacio Pagani and the news on the Pagani Auto world in North Miami Beach FL". There are no models and no news on the page.
- **H1:** none. The hero has no heading element.
- **Section outline:**
  1. **Hero:** a full-bleed YouTube background video (`1mJk_FesmLY`) with an `Artboard_43_w.png` wordmark (852×178) and the line **"The car's atelier overtakes time, like the blowing wind."** Below it is the Horacio Pagani signature graphic (`signature-white.png`, 178×63).
  2. **"PAST"** chapter: five image+text panels.
     - **"WIND BLOWS AROUND"**: "That of Horacio Pagani is the great adventure of an art and engineering crusade. How did the myth of Pagani Automobili come to life, the brand for which cars the richest men in the world are willing to spend a crazy amount of money?"
     - **"The Challenge"**: "This is the challenge that strains one of the world's greatest car designers. The factory of Horacio is more like a tailor's atelier, or an artist's studio."
     - **"LEONARDO"**: "His source of inspiration has always been Leonardo da Vinci; it is to the works of the great master that Horacio brings his mind while chasing his dream: to build a car that is both an engineering marvel and a work of art."
     - **"perfection"**: "For Horacio it is not enough to build every component of the car with the absolute best materials, and make them achieve perfection in their performances; they must also be works of art."
     - **"THE BELIEF"**: "\"Art and science can walk together, hand in hand" ~ Leonardo da Vinci" (the quote marks are mismatched in the source).
  3. **"PRESENT"** chapter (one panel):
     - **"WE'VE GONE THIS FAR, DRIVEN BY THE WINGS OF ALL TIMES"**: "Designed to celebrate the harmony between art and science, these cars can catch the moment. Past and future meet at the perfect time, at the exact instant when the wind of creativity starts to blow. And that's how Huayra Roadster was born: a car of unique beauty, like a work of art made from a block of Carrara marble."
     - **Stale:** "Present" is the 2017 Huayra Roadster. The Utopia, launched in 2022, is never mentioned in copy.
  4. **"FUTURE"** chapter:
     - **"THE FUTURE IS WRITTEN IN THE WIND"**: "What it is in the making, which only exists as a spark that hasn't found its form yet; it's what can only happen through an intuition. The future is the breeze that is yet to blow, the wind that only the genius can catch and transform into a project, like the great Italian masters who have always inspired the myth of Pagani."
     - **"THE RESEARCH"**: "It's the quest for perfection that drives man to go beyond his limits and exceed, the science to rewrite its rules and the car to evolve constantly, in what can be defined as an ongoing challenge between intellect and creativity."
     - **"BEAUTY"**: "None of this would make sense if it was not enclosed by the lines of beauty at its highest expression; the Pagani design that can capture the heart and thrill the eyes."
     - **"THE DREAM"**: "Past and present melt into one: the experience of Horacio, the energy and passion of his team, the knowledge that makes every project of Pagani Automobili such an impossible dream and, at the same time, so close to reality."
     - **"CERTAINTY"**: "\"Knowledge is the daughter of experience" ~ Leonardo da Vinci". It reuses the same image (`futuro_1x-1.jpg`) as "THE BELIEF".
  5. **CTA band:** "CHECK AVAILABILITY" / "BUILD YOURS", followed by a stray literal **"b"** character [OBSERVED]. The buttons are "INQUIRE" → `/contact` (the generic group contact page) and "DESIGN" → `http://virtualexp.pagani.com/`.
  6. **Inventory card (1):** "2024 Pagani Utopia Cpe" with "Details" and "Save". No price is shown.
  7. **PURO block:** the PURO logo (`WHArtboard_44x.png`) and the text: "The **Pagan** PURO Program is designed to safeguard the investment in a Pagani Automobile by certifying the essence of the originality of the Pagani and enhancing its value over time. The PURO Program certifies the authenticity and condition of each individual component." The typo "Pagan" is in the source. The **"DETAILS" button is `href="#"`, a dead link** [OBSERVED].
- **Imagery** [OBSERVED, filenames only]: `home-history-2.jpg`, `02-la-sfida05x-2.jpg`, `03-leonardo05x.jpg`, `04-la-perfezione05x.jpg`, `futuro_1x-1.jpg`, `laterale_01.RGB_color.0000.V2-copy.jpg` (a Huayra Roadster side view, served up to 1920w), `02-laricerca-2.jpg`, `03-la-bellezza.jpg`, `04-il-sogno.jpg`, and a CSS background `DSC_5187_copy.jpg` (about 2 MB). The Italian filenames ("la sfida", "la perfezione", "il sogno") show that **the text and images were lifted from an older pagani.com "history" microsite.** None of it is dealer-authored.
- **Forms:** none on the page.

### 3.2 Pagani Research `/clp-pagani-research-miami-fl`
- **Title:** "Pagani Research | Miami, FL"
- **Meta description:** "Explore detailed information on all Pagani vehicles available at Prestige Imports in Miami, FL. Discover the latest models, features, and options today."
- **Body:**
  - **H1:** "# Pagani Model Research"
  - One image (`2018_Pagani_Huayra_A_o.jpg`, alt "Front-quarter view of the 2018 Pagani Huayra Black").
  - **"## Pagani Huayra"** with three links: "2014 / 2016 Pagani Huayra" (pointing to the `2018` URL), "Pagani Huayra Vs McLaren P1" and "2018 Pagani Huayra vs 2014 Bugatti Veyron".
  - **"## Pagani Huayra Roadster"** with one link: "2017 Pagani Huayra Roadster".
- **The newest model covered is from 2018.** Nothing about Utopia, Zonda or Imola.

### 3.3 Brand CLP `/clp-new-used-pagani-vehicles-north-miami-beach-fl`
- **Title / H1:** "Pagani | North Miami Beach FL"
- **Intro (verbatim):** "Much like Lamborghini, Pagani is becoming one of the most popular Italian exotic brands on the market. The company opened its doors in 1992, as Horacio Pagani – a frequent Lamborghini collaborator himself – began designing his first vehicle, the Zonda C12. Now 25 years later, the lone Pagani vehicle and successor to the Zonda is called the Huayra, and **Prestige Imports is one of the few dealerships in the world that is able to offer it.** Seeing a pre-owned Pagani model roll through our dealership is rare, but you can certainly find or order a brand-new Pagani Huayra right here at our sales desk. You can also keep your eyes peeled on our blog for updates about special edition Pagani Huayra models, or if a new model is ever announced. PrestigeImports.com is your one stop shop for all Pagani information and updates, so check back often."
  - "Now 25 years later" dates the text to about 2017.
  - The blog has no Pagani posts.
  - You cannot order a new Huayra; it is out of production.
- **CTA:** "View Pagani Inventory" → `/pagani-north-miami-beach-fl`, which shows **0 results** (§3.9).
- **"## Performance":** "The Pagani Huayra upholds a long-standing relationship with Mercedes-Benz by utilizing a 6.0L twin-turbo V12 developed by Mercedes-AMG that generates a whopping **720 horsepower**, allowing the car to hit **238 miles per hour**, or to hit **60 mpg** in just **2.8 seconds**." ("60 mpg" is a typo for mph.)
- **"## Technology":** "Every Pagani model is of course packed with technology. Whether we're talking about the performance tech… there is plenty both inside and out." (filler)
- **"## Design":** "We're not sure talking about Pagani design is even necessary, as it's obvious from one glance how much detail goes into it. Horacio Pagani has always been a designer, and it's obvious that he poured his passion and talents into the design of both the Zonda and Huayra."
- **Inventory card:** 2024 Pagani Utopia Cpe, "Call for price".
- **Images:** `Pagani-A_o.jpg` to `Pagani-D_o.jpg`, plus three icon PNGs.

### 3.4 Huayra model CLP `/clp-2018-pagani-huayra-north-miami-beach-fl`
- **Title:** "2018 Pagani Huayra North Miami Beach FL". **H1:** "# 2014 / 2016 Pagani Huayra North Miami Beach FL". The title and H1 do not match.
- **Meta description:** "The 2018 Pagani Huayra is an exotic sports car **soon to be available** here at Prestige Imports…" (stale).
- **Copy:**
  - "For the past seven years, Horacio Pagani and his team have been working hard on a project under the codename **C9**… the new Pagani Huayra consists of **over 4,000 components**…"
  - "…a vehicle with a 70 mm increase to the track and a 40 mm shift in cabin position."
- **CTA:** "View Our Pagani Inventory" → the **0-result** page.
- **"#### New Model Inventory":** the carousel shows **9 non-Pagani cars**: 7 × 2026 Lotus Emira ($113,447–$125,197), a 2026 Urus SE at $315,378 and a 2026 Temerario at $472,596.
- **"## Official Performance Specifications":** "Mercedes-AMG M158 V12 twin-turbocharged… **730 horsepower** alongside 738 pound-feet of torque from 2,600 to 4,200 RPM… top speed of **230 miles per hour**… 60 miles per hour in **3 seconds flat**… 7-speed gearbox and a curb weight of 2,976 pounds." It also describes active aero ("four flaps").
  - These figures contradict §3.3 (720 hp / 238 mph / 2.8 s).
- **Form:** "### Looking for a Pagani Huayra? Let us know!" (first name, last name, email, message).

### 3.5 Huayra Roadster CLP `/clp-2018-pagani-huayra-roadster-north-miami-beach-fl`
- **Title:** "2018 Pagani Huayra Roadster North Miami Beach FL". **H1:** "# 2017 Pagani Huayra Roadster North Miami Beach FL".
- **Meta description:** "…a supercar we have displayed here at Prestige Imports in North Miami Beach FL **in the past**."
- **Copy:**
  - "…the 2017 Pagani Huayra Roadster, will only have **100 models** built… **Recently, we had one of the incredible vehicles on display in our showroom!**"
  - "**While it is unlikely that we will have any of these vehicles on sale here at Prestige Imports**, we just wanted to touch on how incredible this vehicle truly is… Horacio Pagani himself has said that the Huayra Roadster is the most complicated project the brand has ever tackled…"
  - The page tells a buyer the dealer probably can't sell them the car.
- **Specs:** "carbo-titanium/carbo-triax HP52 monocoque", "6.0 Mercedes-Benz AMG V12… **764 horsepower** alongside 738 pound-feet", "7-speed… automated manual", "4 ventilated Brembo disc brakes", "20" forged-aluminum alloy **app** monolithic wheels… 21" in the back… Pirelli P Zero Corsa & Pirelli P Zero Trofeo R".
  - It closes: "Again, it's unlikely that we'll be selling any of this vehicle here… don't hesitate to give us a call with any questions **or simply to try**."
- **Same 9-car Lotus/Lambo "New Model Inventory" carousel.**
- **Form:** "### Looking for a Pagani Huayra Roadster? Let us know!"

### 3.6 Comparison CLPs (SEO filler)
- **`/clp-pagani-huayra-vs-mclaren-p1`:** title/H1 "Pagani Huayra Vs McLaren P1".
  - **Copy:** "Hypercars are the latest trendsetting craze among supercar lovers. The Pagani Huayra definitely tops the list… Discover Pagani Huayra cars in our **massive inventory**… We will be mighty happy to hear from you."
  - **Table:** Huayra "6.0L Twincharged V12 / 709 hp / 737 lb.-ft. / 360 Kph / 12/20 MPG" vs P1 "3.8L V8 Plug-in Hybrid / 845 hp / 663 lb.-ft. / 350 Kph / 11/18". "Price (Approx.)" is left blank. (The Huayra is twin-turbo, not "twincharged".)
  - **"## Buy Pagani Huayra Hypercars in North Miami Beach, FL":** "…Call us anytime… **test drive them**."
  - The CTA "Explore Our Inventory" goes to *new* inventory, which is Lotus.
  - **Form:** "Interested in Pagani Huayra Cars?"
- **`/clp-2018-pagani-huayra-vs-2014-bugatti-veyron`:** title/H1 "2018 Pagani Huayra vs 2014 Bugatti Veyron".
  - **Copy:** "…we have compared two of the best supercars we have with us in our inventory… You can discover the 2018 Pagani Huayra and the 2014 Bugatti Veyron here in our inventory." **False today:** there is no Huayra and no Veyron in stock.
  - **Table is factually wrong:** it gives the Veyron as "**3.5-liter V6 / 295 hp / 263 lb.-ft.** / 407 Kph / 8/15". The real car is an 8.0 L quad-turbo W16 with about 1,001 hp.
  - The prose then says "The Bugatti Veyron is more power-packed in terms of engine power", which contradicts its own table.
  - "**Both these vehicles are sale-ready at Prestige Imports.**"
  - **CTA:** "Used Pagani and Bugatti Inventory". **Form:** "Interested in Pagani and Bugatti Supercars?"

### 3.7 Coral Gables SEO CLP `/clp-pre-owned-pagani-hypercars-for-sale-near-coral-gables-fl`
- **Title / H1:** "Pre-Owned Pagani Hypercars for Sale near Coral Gables, FL". It is linked from "Other Featured Brands".
- **Copy (verbatim excerpts):**
  - "## Where Do I Buy a Pre-Owned Pagani Hypercar near Coral Gables?" / "Prestige Imports near Coral Gables, FL, specializes in offering an exclusive selection of pre-owned luxury vehicles, and we're proud to feature an **exquisite inventory of Pagani hypercars**." (There is 1 car.)
  - "### Why Choose a Pagani Hypercar?" / "Pagani hypercars stand as icons of automotive excellence, blending artistry with engineering brilliance. These vehicles aren't just cars—they are masterpieces… Models like the Pagani Huayra and Zonda are revered for their advanced aerodynamics, lightweight carbon fiber construction, and powerful AMG-sourced engines." / "Owning one of these extraordinary vehicles is a rare privilege."
  - "### Pre-Owned Pagani Inventory at Prestige Imports" / "…we curate a handpicked selection of pre-owned Pagani hypercars… **Each vehicle in our inventory undergoes thorough inspections**…" / "When you choose Prestige Imports, you're not just purchasing a car but acquiring a piece of automotive history."
  - "### Why Buy from Prestige Imports?" lists three points: "Exclusive Inventory: We offer some of the most sought-after pre-owned hypercars in the world." · "Expertise You Can Trust…" · "Convenient Location: We're just a short drive from Coral Gables…"
  - "## Explore Popular Supercars near Coral Gables, FL".
- **Inventory card:** Utopia, "Call for price". **CTAs:** "Pagani Inventory" (the 0-result page) and "Reach Out to Us!".
- **Form:** "Interested in a Pre-Owned Pagani Car?". There is also a map, "## We Are Located Here! Come Meet Us!".
- **Images:** `Pagani_Huayra-A1/B1/B2_o.jpg`. One has the alt "front view of a Pagani Huayra parked in a showroom" **[UNVERIFIED whose showroom]**.

### 3.8 Shared group pages that carry Pagani content
**Our Story `/story`** (the group version, longer than the Lambo site's `/our-story`):
- **Intro:** "**Over 44 years ago**, Prestige Imports established itself…"
- **Franchise sentence:** "…premier franchises: Lamborghini Miami…; **Pagani of Miami, the first of five currently licensed dealers in North America**, Lotus of Miami…; and most recently, KARMA MIAMI…" **[UNVERIFIED; superseded, see §4]**
- **Timeline items for Pagani (verbatim):**
  - "**2011, Brett acquires PAGANI franchise fulfilling a long time dream of his father.**" Shown with `Pagani_Logo_WEB.png` and `IMG_4180.jpeg`.
  - "**2015, Horacio Pagani presents Brett with Pagani Huayra in memory of his father known as PROJECT VULCAN.**" Shown with `Pagani_Vulcan.jpg` and `IMG_3106.JPG`.
  - "**2017, Grand Opening of PAGANI NEWPORT BEACH, the first stand-alone Pagani showroom in the US.**" Shown with `Pagani_NB_Ext.jpeg`. **[UNVERIFIED]** Newport Beach is not in Pagani's current dealer list, and its domain is now spam (§1).
- **Other timeline items useful as group context:**
  - "1977, Irv David's Original Prestige Motorcar Imports, inc. on West Dixie Highway"
  - "1988, acquired Lamborghini franchise"
  - "1989, The last North American Lamborghini Countach produced 6/1989 for Irv David - VIN: ZA9CA05A7KLA12736"
  - "1990, Mr. Ferruccio Lamborghini signing a book for Irv at the Diablo unveiling in Monte Carlo"
  - "2012, Brett creates the AU79 Project with Gold Aventador"
  - "2014, #2 of only 3 in the world - Delivery of Lamborghini Veneno to Kris Singh"
  - "2017… our 40th Anniversary… new Prestige Imports Showroom, warmly referred to as 2.0"
  - "2020, the completion of the all new Lamborghini Miami showroom"
- **Charity list:** Ride2Revive (2011), Joe DiMaggio, Holtz, Nicklaus Children's, Make-A-Wish, Chai Lifeline, Mystic Force, The WOW Center, The Victory Center, Autos for Autism.
- **Brett David quote:** identical to the Lambo audit.

**About `/about-prestige-imports-in-north-miami-beach-fl`:**
- **H1:** "We are Prestige. in North Miami Beach, FL". YouTube `FcjeyTRW134`.
- **Pagani lines (verbatim):**
  - "We are an internationally-renowned destination for luxury, exotic, and supercars, including … Bugatti, … Koenigsegg, … **Pagani**…"
  - "…an ever-changing inventory of pre-owned hypercars like **the Pagani Huayra**, the Ferrari LaFerrari, Bugatti Veyron or Chiron and many more."
  - "**Prestige Imports is also a factory authorized dealer of PAGANI; a timeless interpretation of automotive art**, LOTUS, one of Florida's first Lotus dealerships… and most recently Karma…"
- **Also:**
  - The service claim "We're the largest Lamborghini service department in the country" **[UNVERIFIED]**.
  - Typos: "We are sell lifestyles", "VAN DUTCHand TECHNOMAR", "rounds out or brands".
  - Testimonials name **Eduardo/Edwardo, Cip, Mauricio, Jason, Luis, Carthur** (sales; no Pagani-specific mention).

**Group homepage `/` (live):**
- Brand-tile row, Pagani first (§2).
- **Brand copy:** "Prestige Imports offers four premium vehicle franchises, including one of North America's leading Lamborghini dealerships… Additional brands include Pagani, Lotus, and Karma…" It adds that they deliver to out-of-state customers "as far away as Washington, Texas, New York, Wisconsin".

**Service `/car-service-north-miami-beach-fl`:** "Vehicles like the ones in the Lamborghini, Lotus, Karma, and **Pagani** lines require careful attention and deft hands. Our service experts are professionally trained to tend to the needs of high-end models…" This is the only Pagani service statement. There is no claim of **factory-authorised Pagani service** **[UNVERIFIED either way]**.

**Contact `/contact-prestige-imports-in-north-miami-beach-fl`** (target of the hub's "INQUIRE" button):
- **H1:** "We Would Love To Hear From You"
- **Copy:** generic Prestige copy ("we are not just about selling cars, we are providing a lifestyle").
- **Location:** "Prestige Imports / 14780 Biscayne Blvd / North Miami Beach, FL 33181".
- **Sales:** "Open Thursdays until 7:00 pm", (833) 290-6287. **Service:** "Open Thursdays until 5:30 pm", (833) 290-5148.
- **Form:** "Ask A Question" (first name, last name, email, phone, comments, contact preference).
- There is nothing Pagani-specific.

### 3.9 Pagani inventory (snapshot 2026-10-01)
| URL | Count | Notes |
|---|---|---|
| `/pagani-north-miami-beach-fl` (target of every "View Pagani Inventory" CTA) | **0 Results** | "Sorry, no matching vehicles were found. Here are some other vehicles you may be interested in:", followed by Lotus, Porsche, Urus and other cars. Confirmed in curl **and** Playwright. |
| `/used-pagani-north-miami-beach-fl` | **1** | The working Pagani SRP |
| `/used-vehicles-north-miami-beach-fl?comment1=H` ("Hyper Cars" in nav) | **0** | The Utopia and the Jesko are not tagged as hypercars |
| `/cars-for-sale-north-miami-beach-fl` (all) | **130** | Used 121 / New 9 (the nav says "7") |
| lamborghinimiami.com `/pagani-miami-fl` | **1** (same car, same VDP ID) | Lambo-site make facet: Pagani 1 |

**The one Pagani: 2024 Pagani Utopia Cpe** (VDP id 65767973)
- **Identity:** VIN **ZA9U11UC7RSF76042**. Stock "CN2612", while the description says "Stock #ATF76042", a mismatch [OBSERVED].
- **Car:** used, **3,832 mi**, Yellow / Brown interior, 12 cyl. The feed says "automatic" **[UNVERIFIED: the Utopia is offered with a 7-speed manual or an AMT]**.
- **Status:** "Date in Stock 07/31/2026"; "Dealer Certified No / Certified No" (so it is **not PURO-certified** on the listing).
- **Price:** **"Call For Price"** (`finalPrice: 0`).
- **Photos and reports:** 61 photos, Carfax and AutoCheck links.
- **Description:** templated, AI-style copy. "# EXCEPTIONAL 2024 PAGANI UTOPIA COUPE – A MASTERPIECE OF AUTOMOTIVE ARTISTRY"; "Prestige Imports is honored to present one of the world's most exclusive and breathtaking hypercars…"; "Powered by a gasoline-fed engine that delivers symphony and fury in equal measure…" It never names the V12, the power or the gearbox. Sections: "EXTERIOR ELEGANCE / INTERIOR OPULENCE / PERFORMANCE PEDIGREE / EXCLUSIVITY DEFINED / PRESTIGE IMPORTS DIFFERENCE".
- **Fees:** "Sales Price includes dealer fee of $1447.50 and $299 electronic filing fee."
- **Form:** "Request Additional Information".
- **Double-listing check:** **No duplicates on prestigeimports.com.** All 130 listings were paged (`limit=20&offset=0…120`) and gave **130 unique VINs**, unlike the Lambo site's two-stock-ID pattern. The Utopia appears **once** on each site, under the same VDP ID.
- **Make mix (all 130):** Porsche 36 · Lamborghini 26 · Ferrari 11 · Mercedes-Benz 9 · Lotus 8 · Rolls-Royce 5 · BMW 4 · Dodge 4 · McLaren 3 · Land Rover 3 (+1 "LAND") · Chevrolet 3 · and 1–2 each of others, including **Koenigsegg Jesko (2025)** and **Pagani Utopia (2024)**. These are the only two hypercars.

---

## 4. Facts ledger

| Fact | Value | Source |
|---|---|---|
| Trading name | "Pagani of Miami" | `/story`; pagani.com dealer list ("PAGANI of Miami") |
| Official status | **"Official Dealer for the State of Florida"** | **pagani.com dealer network JSON, fetched 2026-10-01 [VERIFIED]** |
| Address (group site) | 14780 Biscayne Blvd, North Miami Beach, FL 33181 | Header, footer, contact JSON-LD |
| Address (pagani.com) | **"14800 Biscayne Boulevard, North Miami, 33181-"** | pagani.com. It **differs** from the group site's 14780 (perhaps the Lamborghini/Pagani building next door). **[UNVERIFIED which is correct for the Pagani showroom]** |
| Geo | 25.913485, -80.15750349 | JSON-LD |
| Pagani / Sales phone | **(833) 290-6287**. pagani.com lists the same: "+1 833 290 6287" | Header, VDP, pagani.com |
| Service phone | (833) 290-5148 | Contact JSON-LD |
| Pagani contact email | ngamarra@prestigeimports.com | pagani.com dealer JSON [OBSERVED]. A **personal address**; confirm before publishing. |
| Pagani website listed by Pagani | `https://www.paganimiami.com/`, which redirects to `prestigeimports.com/pagani-ast` | pagani.com; curl |
| Sales hours | Mon–Fri 09:00–19:00, Sat 10:00–18:00, Sun closed | Contact JSON-LD; header "Today 9-7pm" |
| Service hours | Mon–Fri 08:00–17:30 | Contact JSON-LD |
| Franchise acquired | **2011** ("Brett acquires PAGANI franchise fulfilling a long time dream of his father") | `/story`. Consistent with paganimiami.com being registered on 2011-02-18 [OBSERVED]. |
| Project Vulcan | 2015: Horacio Pagani presents Brett with a Huayra "in memory of his father known as PROJECT VULCAN" | `/story` **[UNVERIFIED externally]** |
| Pagani Newport Beach | 2017 grand opening, "the first stand-alone Pagani showroom in the US" | `/story` **[UNVERIFIED; no longer in Pagani's network; the domain is now spam]** |
| Dealer-count claim A | "Pagani of Miami, **one of only three licensed dealers in the country**" | lamborghinimiami.com `/our-story` **[OUTDATED]** |
| Dealer-count claim B | "Pagani of Miami, **the first of five currently licensed dealers in North America**" | prestigeimports.com `/story` **[OUTDATED; "first" UNVERIFIED]** |
| Dealer-count claim C | "Prestige Imports is one of the few dealerships in the world that is able to offer it" | `/clp-new-used-pagani-…` (about 2017) |
| **Actual network today** | **25 entries worldwide** (20 dealers and service centres plus corporate offices). **7 US dealers:** Beverly Hills, Chicago (Lake Bluff), Dallas (Richardson), Greenwich, **Miami**, Nashville, San Francisco (San Rafael). Add **Toronto** for **8 in North America**. Miami is the **only Pagani dealer in Florida and the whole US Southeast.** | pagani.com `admin-ajax.php?action=desktop_map_ajax_request` **[VERIFIED 2026-10-01]**. Both "three" and "five" are wrong now. |
| Pagani US HQ nearby | "PAGANI Automobili America, Inc, Pagani Corporate Office, 4135 Laguna Street, **Coral Gables**, FL 33146" | pagani.com [VERIFIED]. Pagani's American HQ is in Miami-Dade, a possible local angle. |
| PURO | Pagani's official certification programme; one paragraph on `/pagani-ast` | `/pagani-ast`. pagani.com loads `puro.js` [OBSERVED]. The Utopia VDP is not certified. |
| Service | "require careful attention and deft hands… professionally trained…" | `/car-service-…`. **No claim of factory-authorised Pagani service [UNVERIFIED]** |
| Founded (group) | 1977 (Irv David); CEO Brett David since 2007 | `/story`. The "Over 44 years ago" figure is stale; 1977 is 49 years ago. |
| Inventory | 1 Pagani: 2024 Utopia Coupe, 3,832 mi, yellow/brown, Call for Price, in stock since 31 Jul 2026 | SRP, VDP (2026-10-01) |
| Social | Group-level only: FB `prestigeimportsmiami`, IG `@prestigeimports`, X `PRESTIGEMIAMI`, YT `prestigeimportsmiami`, Pinterest. **No Pagani-specific handle found.** | Footer **[UNVERIFIED whether a Pagani Miami IG exists]** |
| Staff | **No named Pagani specialist on the site.** The pagani.com contact is "ngamarra@…", whose name and role are not stated. | **[UNVERIFIED]** |

---

## 5. What's weak or generic vs. worth keeping

### Weak, broken or generic (fix or drop)
1. **No Pagani home of its own.**
   - paganimiami.com is a 301 to an obscure group URL (`/pagani-ast`) with no H1.
   - Pagani has no nav entry, and nothing but the homepage tile links to the hub.
   - `paganiofmiami.com` goes to the group homepage instead.
2. **The hub's copy is borrowed Pagani factory text, years old.**
   - The "Past / Present / Future" essay is in the voice of a translated brochure ("the brand for which cars the richest men in the world are willing to spend a crazy amount of money").
   - "Present" is the 2017 Huayra Roadster, and the Utopia is never named.
   - It has no dealer voice, no Miami angle and no reason to buy *here*.
3. **Every model page is stale (2014–2018 Huayra-era) and several undermine the sale:**
   - The Roadster page says twice that they're "unlikely" to sell the car.
   - The Huayra meta says "soon to be available".
   - The brand CLP calls the Huayra "the lone Pagani vehicle" and invites buyers to "order a brand-new Pagani Huayra".
4. **Factual errors:**
   - The Huayra is given as 720 hp / 238 mph / 2.8 s on one page and 730 hp / 230 mph / 3.0 s on another; "709 hp / 360 kph" in the tables; the Roadster at 764 hp.
   - The Veyron is listed as a "3.5-liter V6, 295 hp".
   - "Twincharged"; "60 mpg"; "app monolithic wheels"; "Pagan PURO".
   - Title/H1 year mismatches (2018 vs 2014/2016; 2018 vs 2017).
5. **False availability claims:**
   - "Both these vehicles are sale-ready"; "you can discover the 2018 Pagani Huayra and the 2014 Bugatti Veyron here in our inventory".
   - "massive inventory" of Huayras; "an exquisite inventory of Pagani hypercars". There is 1 car.
6. **Broken paths:**
   - Every "View Pagani Inventory" CTA lands on a **0-results** page.
   - "Hyper Cars" returns 0.
   - The PURO "DETAILS" link is `#`.
   - `/pagani` is a 404.
   - The model CLPs' "New Model Inventory" carousels show Lotus Emiras and Lamborghinis.
   - "Pagani Parts & Accessories" goes to the generic parts form.
7. **Contradictory dealer claims:** "one of only three licensed dealers in the country" (Lambo site), "the first of five… in North America" (group site) and "one of the few dealerships in the world". All are out of date: there are 7 US and 8 North American dealers.
8. **Address inconsistency** with Pagani's own listing (14780 vs **14800** Biscayne; "North Miami Beach" vs "North Miami").
9. **The VDP for the only car** uses generic AI-style copy with no V12, power, gearbox or spec content. Its stock number conflicts (CN2612 vs ATF76042), and it is missing from the vehicle sitemap.
10. **Inquiry routing:** "INQUIRE" sends a Pagani prospect to the generic group contact form. There is no Pagani specialist and no direct line distinct from group sales.
11. **SEO filler:** the comparison CLPs and the Coral Gables CLP are thin, templated, keyword-stuffed pages ("We will be mighty happy to hear from you").

### Worth keeping (strong raw material)
1. **Verified franchise status.** Pagani lists "PAGANI of Miami – **Official Dealer for the State of Florida**", the only Pagani dealer in the US Southeast. That is a clean, true, defensible headline claim, replacing the "three/five dealers" lines.
2. **A personal relationship with Horacio Pagani:**
   - **2011:** Brett acquires the franchise, "fulfilling a long time dream of his father".
   - **2015:** **Project Vulcan**, the Huayra Horacio presented in Irv David's memory.
   - This is the most distinctive dealer-owned Pagani story available. It needs photos and verification, but it is exactly the home-page heritage beat the Lambo site lacks.
3. **Group heritage:** 1977, Irv and Brett David, the last North American Countach, Ferruccio Lamborghini at the Diablo launch, the Veneno delivery. It gives provenance to a hypercar dealer, used sparingly.
4. **The car in stock:** a 2024 Utopia Coupe, yellow over brown, 3,832 mi, 61 in-house photos. It works as a live "current allocation / available now" feature, provided the price policy ("Call for Price") is respected.
5. **PURO certification:** a genuine Pagani programme and a credible reason to buy a pre-owned Pagani from the official dealer.
6. **Pagani America HQ in Coral Gables:** a local-network angle **[confirm with client before using]**.
7. **Hero video** (YouTube `1mJk_FesmLY`) and the Leonardo "art and science" theme. Neither is dealer-owned, but the thematic hook (Arte e Scienza) is on-brand for Pagani.

---

## 6. Content gaps (for the new Pagani of Miami home page)
- **A real home page** at paganimiami.com, with an H1, a dealer-authored welcome and a clear "Official Pagani dealer for Florida" statement.
- **Current models:**
  - Utopia Coupe and Utopia Roadster, plus Pagani's current specials **[check with client what Pagani currently allows dealers to show]**.
  - A heritage strip (Zonda → Huayra → Utopia) rather than 2018 CLPs.
- **Available now / allocation:** the single Utopia card done properly, with real spec content and a working Pagani-only inventory link, or a "private collection / by appointment" framing.
- **Commissioning process:** how to order a Pagani through Miami. Covers Pagani's bespoke programme, the factory visit to San Cesario sul Panaro and the delivery experience. Nothing exists today.
- **PURO certified pre-owned:** a proper explanation, a CTA, and whether Miami carries PURO cars.
- **Pagani service:** whether the store is a factory-authorised Pagani service centre, its technicians, flying-doctor support. **[UNVERIFIED; must ask]**
- **People:** a named Pagani brand specialist (the pagani.com contact "ngamarra@" suggests one exists), with a direct phone and email.
- **The Prestige–Pagani story:** 2011, Project Vulcan and the father-and-son dream. Photos exist (`IMG_4180.jpeg`, `Pagani_Vulcan.jpg`, `IMG_3106.JPG`) but only at the Story page's sizes.
- **Showroom:** where Pagani physically sits (14780 vs 14800 Biscayne), with photos of the Pagani space. There are none.
- **Events / community:** Pagani owner events, Exotics & Espresso, Arte in Pista track programme hand-off.
- **Social:** a Pagani-specific Instagram, if one exists.
- **Accurate facts:** a single dealer-count statement, or better none, using "Official Pagani dealer for Florida". Specs should come from Pagani press material, not the 2018 CLPs.

---

## 7. Group-site positioning of Pagani (new Prestige group homepage, `prestige-final/index_v2.html`)
How the in-progress group redesign treats Pagani, which matters for consistency with the child site:
- **Pagani leads.** It is the **first brand** in both the hero "Authorized brands" row (line ~290) and the "Explore Our Brands / Seven Brands. One Floor." grid (line ~541). The card reads "Pagani / Miami / Explore Brand", with the city label "Miami" applied to every brand.
- **The card links to `srp_v2.html?make=pagani`** (group inventory), not to a Pagani sub-site. Once the child site exists this link should point to it, as the live site does for Lamborghini Miami and Lotus Miami.
- **Brand count copy:** "South Florida's authorized house for Lamborghini, Pagani, Lotus, Czinger, Gunther Werks, Eccentrica, and Karma — represented under one roof." / "seven distinguished brands". Elsewhere: "Five premium franchises — Lamborghini, Pagani, Lotus, Karma, and Czinger".
  - The brand count is inconsistent within the mockup (5 vs 7).
  - The live site says "four premium vehicle franchises".
- **Data in the mockup that conflicts with the live data** (content-provenance flags):
  - The SRP dropdown says **Pagani "3"**; live there is **1**.
  - A "2024 Pagani Utopia" card shows "**85 mi / Manual**" inside a section introduced as "**factory-new inventory**". Live, the car is **used, 3,832 mi**, and the feed says "automatic".
  - A review card ("J. Okafor, 4 months ago: …The first was a Karma, this time a Pagani…") is **placeholder copy, not a real review**. It must not ship as genuine.
- **Other Pagani touchpoints:** a nav link to `pagani_parts_v2.html` ("Pagani Parts"); the Utopia image is reused twice in the Instagram grid.

---

## 8. Page inventory audited
**Pagani pages:** `/pagani-ast` (hub, rendered in curl and Playwright) · Pagani Research · Brand CLP (`clp-new-used-pagani-vehicles…`) · Huayra CLP · Huayra Roadster CLP · Huayra vs P1 · Huayra vs Veyron · Coral Gables pre-owned CLP.

**Inventory:** `/pagani-north-miami-beach-fl` (0) · `/used-pagani-north-miami-beach-fl` (1) · Hyper Cars filter (0) · all-inventory, paged in full (130) · Utopia VDP (65767973).

**Group and shared pages:** `/pagani` (404) · group homepage · About · Story · Contact · Service · Parts · Other Featured Brands.

**External:**
- lamborghinimiami.com `/pagani-miami-fl` and `/our-story`
- paganimiami.com, paganiofmiami.com, paganimiami.net, pagani-miami.com, paganinewportbeach.com
- pagani.com `/dealers/` and its dealer JSON

**Also checked:** robots.txt and the sitemap index, static and vehicle sitemaps.

**Totals:** 8 Pagani pages, 4 inventory views, 1 VDP, 8 shared group pages and 9 external URLs.
