# Logos (SVG only)

Rule: logos ship as SVG only (Alex, 2026-10-01). No PNG or JPG logos in the build.

| File | What | Source |
|---|---|---|
| `pagani-wordmark-oval_currentColor.svg` | PAGANI oval wordmark. Fill is `currentColor`, so it is coloured from CSS | Paths 0–6 extracted verbatim from the client's vector PDF `______MEDIA PAGANI/Pagani of Chicago_Positive version (1).pdf` (PyMuPDF `get_drawings`). Only the "Pagani of Chicago" line (paths 7–21) was dropped. The mark's geometry is untouched |
| `pagani-wordmark-oval_white.svg` | Same paths, fill `#FFFFFF` | as above |
| `pagani-wordmark-oval_client-grey.svg` | Same paths, fill `#636469` (the PDF's own grey, rgb 0.387/0.394/0.413) | as above |
| `pagani-of-chicago_*_from-client-pdf.svg` | Full Chicago lockup converted 1:1. **Reference only, not for the Miami site** | client PDFs |

- The Miami dealer lockup ("Pagani of Miami") is **not** available as a vector. The Figma file has it only as a 960×201 raster; that file is in `lake-forest-figma/reference-only/`. Alex: use only PAGANI for now; the lockup gets fixed later.
- Model script logotypes (Utopia, Huayra R Evo Roadster, and so on) are being sourced as SVG by the image agent. See `press-images/logos/`.
