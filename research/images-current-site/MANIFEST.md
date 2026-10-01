# Image manifest: prestigeimports.com Pagani pages (current dealer site)

Captured 1 Oct 2026 from https://www.prestigeimports.com/pagani-ast (the "Pagani of Miami" brand page on the Prestige Imports DealerFire / DealerSocket "Engine 6" site), plus the pages it links to: https://www.prestigeimports.com/clp-pagani-research-miami-fl, the 2024 Utopia VDP, and the home and about pages, which were checked for Pagani or showroom imagery. http://virtualexp.pagani.com/ is also linked, but it did not respond (connection failed).

Curated for the **home page only**. The bar was a long edge of at least 1600px (1920px for heroes). **Only 2 images pass.** The Pagani page is built almost entirely from pagani.com's own 2016 "history of a dream" assets at 1440x810.

**How the CDN works (verified):** `cdn-ds.com/media/sz_NNNN/1477/…` is the same as the Lamborghini Miami site. The `sz_NNNN` path segment is a cache key, not a resize: the URL with it and the URL without it return byte-identical files (checked on `DSC_5187_copy.jpg`, 1,156,188 bytes either way; the sz value does not even equal the byte count). `w_NNN` / `h_NNN` path segments are width/height resizes, and `fp_WxH:Q` is a focal-point crop. All of them were stripped to reach the uploaded original. Inventory (VDP) photos live under `cdn-ds.com/stock/…` and top out at **1024x768**. Every dimension below was read with `sips`.

**Origin key:** *Dealer* = commissioned or shot by Prestige / Pagani of Miami. *Pagani web (re-hosted)* = a pagani.com asset uploaded to cdn-ds.com.

## Counts

| Category | Files |
|---|---|
| `hero/` | 1 |
| `models/` | 1 |
| **Total** | **2** |

## Files

| File | Dimensions | Size | Category | Source page | Original URL | Quality note | Origin |
|---|---|---|---|---|---|---|---|
| `hero/hero_utopia_side-profile-black-gold-studio-pagani-of-miami-watermark_4999x3337.jpg` | 4999x3337 | 1.1 MB | hero | https://www.prestigeimports.com/pagani-ast | https://cdn-ds.com/media/1477/Web_Static/PAGANI/DSC_5187_copy.jpg | The only large dealer image. Black Utopia coupé, gold wheels, clean side profile on a white-to-grey studio sweep, lots of headroom. It has a **"PAGANI / Pagani of Miami" lockup stamped bottom-right**, so it must be cropped or retouched before use as a clean hero. | Dealer (camera file name `DSC_5187`, dealer watermark) |
| `models/huayra-roadster_side-blue-desert-sunset_1600x1068.jpg` | 1600x1068 | 379 KB | models | https://www.prestigeimports.com/pagani-ast | https://cdn-ds.com/media/1477/Web_Static/PAGANI/laterale_01.RGB_color.0000.V2-copy.jpg | Blue Huayra Roadster in a desert at golden hour. Exactly 1600px, so it meets the non-hero bar but not the hero bar. Identical to pagani.com `/app/uploads/2017/02/laterale_01.RGB_color.0000.V2-copy.jpg` (1600px there too). The model is no longer current. | Pagani web (re-hosted) |

## Logos

None kept, because the rule is SVG only and **no SVG Pagani logo exists on prestigeimports.com.** The site's header uses a CSS icon font, and every logo is a PNG:

| Logo | URL | Size | Status |
|---|---|---|---|
| "PAGANI / Pagani of Miami" oval lockup, white | https://cdn-ds.com/media/1477/Artboard_43_w.png | 1350x284 PNG | **SVG NOT FOUND**. It is the dealer lockup anyway, which comes later. |
| "PAGANI / PURO" oval lockup, white | https://cdn-ds.com/media/1477/Web_Static/PAGANI/WHArtboard_44x.png | 1800x378 PNG | **SVG NOT FOUND** |
| "PAGANI / Pagani of Miami" lockup, grey on transparent 1200x1200 canvas | https://cdn-ds.com/media/1477/Prestige-Pagani.png | 1200x1200 PNG | **SVG NOT FOUND**. Brand tile on the Prestige home page. |
| Horacio Pagani signature, white | https://cdn-ds.com/media/1477/Web_Static/PAGANI/signature-white.png | 178x63 PNG | **SVG NOT FOUND** (identical to pagani.com theme `signature-white.png`) |
| Prestige Imports logo | https://cdn-ds.com/media/1477/PrestigeLogo-updated-2020.png | PNG | **SVG NOT FOUND** |

The vector PAGANI oval wordmark is in `../press-images/logos/` (from pagani.com). The client media folder `/Users/alex/Desktop/WORK/______MEDIA PAGANI` contains only "Pagani of Chicago" logos (EPS/PDF/JPG) and `huayrarevo.png`. Nothing was copied from it.

## Gaps

- **No showroom, Miami location, delivery or event photography** on any Pagani page of the site, and none on the about page. Ask the client for the original shoots, including the uncropped `DSC_5187` series, which is presumably a studio set of the Utopia.
- **No current-model gallery** (Utopia Roadster, R Evo Roadster, Codalunga, Imola). The page links out to pagani.com and the Virtual Experience. Use `../press-images/`.

## Seen but not kept (and why)

- **Brand-story band** (`02-la-sfida05x-2`, `02-laricerca-2`, `03-la-bellezza`, `03-leonardo05x`, `04-il-sogno`, `04-la-perfezione05x`, `futuro_1x-1`, `home-history-2`): all **1440x810**, under the bar. They are pagani.com's own 2016 history images, and pagani.com has them at the same 1440x810. The best of them are `04-il-sogno` (blue Huayra under a canyon wall), `03-leonardo05x` (B&W shifter) and `02-la-sfida05x-2` (Horacio sketching by candlelight). Worth requesting at full size from Pagani.
- **Research page header** `Backgrounds/2018_Pagani_Huayra_A_o.jpg`: 1410x460, black Huayra on track, dated.
- **2024 Utopia VDP** (`/vehicle-details/used-2024-pagani-utopia-cpe-north-miami-beach-fl-id-65767973`): stock photo 1024x768, a yellow Utopia on the showroom turntable with a Prestige / Pagani of Miami footer banner baked in. It is real dealer stock in the Miami showroom, but too small and carries text. Ask for the originals.
- **UI chrome:** favicons, collision/paint-shop icons, `default-icons.svg` (an icon font, not a logo).
