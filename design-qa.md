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

final result: passed
