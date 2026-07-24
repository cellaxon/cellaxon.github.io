# Design QA — CELLAXON company homepage

## Comparison setup

- Source: `C:\Users\realwolf\.codex\generated_images\019f920c-a2b7-7b21-880d-b7b82d1dc135\exec-acc82618-ce40-4676-8438-395a74955266.png`
- Implementation: `C:\Users\realwolf\.codex\visualizations\2026\07\24\019f920c-a2b7-7b21-880d-b7b82d1dc135\cellaxon-desktop-1440x1024.png`
- Desktop viewport and source dimensions: 1440 × 1024
- Mobile implementation: `C:\Users\realwolf\.codex\visualizations\2026\07\24\019f920c-a2b7-7b21-880d-b7b82d1dc135\cellaxon-mobile-390x844.png`
- State: English, page top, navigation closed

## Full-view comparison

The implementation preserves the source composition: restrained white header, two-line editorial hero, coral–magenta–violet neural visual, dual CTA row, and a single three-product portfolio band. Official CELLAXON and Ranvier assets replace concept placeholders. FlightOps remains visually separated as validation-stage work.

## Focused regions

1. **Header** — checked logo scale, centered navigation, language state, contact affordance, and sticky behavior because the source depends on a very quiet top bar.
2. **Hero** — checked headline wrapping, neural asset overlap, copy width, CTA rhythm, and section height because these determine first-impression fidelity.
3. **Product band** — checked the asymmetric two-available/one-validation column system, media crop, card borders, and status hierarchy because portfolio legibility was the central product decision.
4. **Mobile top and cards** — checked breakpoint switching, menu accessibility, CTA stacking, overflow, image crop, and single-column cards.

## Iteration history

### Pass 1

- P1: Hero headline wrapped to three lines and pushed the product band below the source position.
- P1: Equal-width product columns made FlightOps look like a third released product and compressed the two available products.
- P2: FlightOps contained explanatory copy not present in the selected option and read as visually busy.

Changes: converted the desktop hero visual to a layered right-side composition, reduced hero height to 480px, changed the product grid to `1.12fr / 1fr / 0.62fr`, and removed the extra FlightOps paragraph from the card.

### Pass 2

- Desktop product band begins at 565px; cards begin at 628px and keep the selected source's first-viewport balance.
- Product card widths are 527px, 470px, and 292px at 1440px.
- Mobile viewport is exactly 390px wide with no horizontal overflow; all cards are 358px wide.
- No remaining P0, P1, or P2 visual issues.

## Fidelity surfaces

| Surface | Result |
| --- | --- |
| Composition and hierarchy | Passed — source section order, hero balance, and portfolio grouping preserved |
| Typography and copy | Passed — Space Grotesk/Noto Sans KR pairing, two-line desktop headline, bilingual copy |
| Color, borders, and depth | Passed — official CELLAXON palette, subtle card borders, restrained media shadow |
| Real asset fidelity | Passed — official company/Ranvier assets and real DevPulse/Ranvier screenshots used |
| Responsive behavior | Passed — 1440×1024 and 390×844 checked with no horizontal overflow |

## Copy and product-boundary check

- Ranvier Dev Assist is not presented on the homepage.
- Ranvier and Cellaxon DevPulse are grouped under “Available now.”
- FlightOps is grouped under “In validation” and labeled “Concept validation.”
- No fabricated FlightOps interface or release claim is shown.

## Interaction and runtime check

- English/Korean switch updates visible copy, `lang`, title, and URL query state.
- Mobile navigation opens and closes with the correct expanded state.
- Product and company links have real destinations; external product links use a new tab.
- TypeScript check and Vite production build passed.
- Browser console warnings/errors: none.

## Korean copy and typography follow-up — 2026-07-24

### Comparison setup

- Source/problem evidence: `C:\Users\realwolf\AppData\Local\Temp\codex-clipboard-a5a9027b-c8b8-4185-9344-81fa52bd67f8.png`
- Desktop implementation: `C:\Users\realwolf\.codex\visualizations\2026\07\24\019f920c-a2b7-7b21-880d-b7b82d1dc135\02-korean-home-typography-fixed-desktop.png`
- Mobile implementation: `C:\Users\realwolf\.codex\visualizations\2026\07\24\019f920c-a2b7-7b21-880d-b7b82d1dc135\03-korean-home-typography-fixed-mobile.png`
- Viewports: desktop 1680 × 850, mobile 390 × 844
- State: Korean, page top, mobile navigation closed

### Findings and iteration

1. **P1 — translated tone and abstract positioning.** The previous hero used noun-heavy phrases such as “명시적 의사결정, 로컬 인텔리전스, 검증 가능한 운영,” which read as translated product language rather than a natural Korean company introduction.
2. **P1 — Latin display metrics on Korean.** The previous Korean hero inherited Space Grotesk display metrics, producing overly tight strokes, tracking, and line rhythm.
3. **P2 — syllable-level wrapping.** Product and FlightOps copy could break inside Korean words, weakening scanning and making the validation card look unfinished.
4. **P2 — product-state labels.** “이용 가능” and “검토 중” did not clearly distinguish public products from concepts under business review.

Changes: rewrote the Korean hero, product descriptions, FlightOps framing, company introduction, navigation, and CTAs in direct Korean; changed the Korean hero display face to Noto Sans KR; adjusted weight, tracking, line height, and responsive sizes; applied `word-break: keep-all`; and renamed the portfolio states to “공개 제품” and “사업 검토 중.”

### Post-fix evidence

- Desktop hero holds the intended two lines at 1680 × 850: “복잡한 시스템을” / “한눈에.”
- Desktop hero uses Noto Sans KR at 87.36px, weight 650, and 92.60px line height.
- Mobile hero holds the same two-line hierarchy at 390 × 844 with no horizontal overflow.
- Korean body and card copy wrap at word boundaries; the longer DevPulse description remains within the card hierarchy.
- English → Korean → English/Korean state transitions update the visible copy, document language, title, and pressed state.
- Mobile navigation opens and closes with the correct expanded state.
- Browser console warnings/errors: none.

### Fidelity surfaces

| Surface | Result |
| --- | --- |
| Content hierarchy | Passed — public products and business-review concepts remain clearly separated |
| Korean typography | Passed — Noto Sans KR metrics, two-line hero, and word-safe wrapping verified |
| Brand continuity | Passed — original CELLAXON palette, neural visual, logo, and card system preserved |
| Responsive layout | Passed — 1680 × 850 and 390 × 844 checked with no horizontal overflow |
| Interaction and runtime | Passed — language switch, mobile menu, links, and console state verified |

final result: passed
