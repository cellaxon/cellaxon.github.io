# CELLAXON Web Design System

## Direction

The company site uses a true-white editorial canvas with the official CELLAXON coral–magenta–violet signature. Product identities stay scoped: Ranvier keeps cyan/orange, while CELLAXON DevPulse and Haven Desktop keep their own dark UI palettes inside their screenshots and icons. Haven Desktop is presented as "in preparation" until its Microsoft Store listing is live.

## Brand tokens

| Role | Token | Value |
| --- | --- | --- |
| Canvas | `--color-white` | `#FFFFFF` |
| Primary text | `--color-ink` | `#17131D` |
| Secondary text | `--color-muted` | `#625B68` |
| Soft section | `--color-blush` | `#F7EDF4` |
| Coral | `--color-coral` | `#CD4469` |
| Magenta | `--color-magenta` | `#C30076` |
| Violet | `--color-violet` | `#4E1B87` |
| Ranvier cyan | `--color-ranvier-cyan` | `#0088AA` |
| Ranvier orange | `--color-ranvier-orange` | `#FF5B2E` |

The gradient is a signature treatment for primary actions and selected display text. Solid magenta or violet should be used for small text and focus states where gradient contrast is unreliable.

## Typography

- Display: Space Grotesk Variable, with Noto Sans KR Variable as the Korean fallback.
- Body and UI: Noto Sans KR Variable.
- Display headings use compact tracking and restrained weights rather than extra-bold defaults.
- Body copy targets a `1.6–1.7` line height.
- Korean display text uses Noto Sans KR directly with looser tracking and line height than the Latin display system.
- Korean prose uses `word-break: keep-all` so words do not split between syllables on narrow cards and mobile screens.
- English mobile display text uses a dedicated three-line scale so the hero keeps a comparable first-viewport rhythm across languages.

## Layout and spacing

- Desktop content uses a maximum 1440px shell with 48px outer gutters.
- The base spacing unit is 8px.
- Cards use 8–12px radii; large pill-shaped containers are avoided.
- Sections alternate density and media balance instead of repeating one card grid.

## Product hierarchy

1. Ranvier is presented as one complete product. Supporting developer tooling is intentionally omitted from the company homepage to keep the portfolio legible.
2. CELLAXON DevPulse is presented as a separate VS Code product covering local-first Git analytics and AI agent work tracking.
3. Haven Desktop is presented as an unreleased product: an "in preparation" status, real screenshots from the app, no download link or Store badge, and the "not made or endorsed by Microsoft" disclaimer next to it. Copy describes only what the app does today (it manages `wslc` containers; it is not a Docker or Podman front end).

Products are shown as full-width rows that alternate copy and media sides, each with a status, three concrete points, and one action.

## Interaction and accessibility

- All core actions have visible text labels and keyboard focus rings.
- Focus rings use opaque brand magenta rather than transparent color so the indicator remains distinct on white surfaces.
- External destinations use an external-link icon and `target="_blank"` with `rel="noreferrer"`.
- Motion is subtle and disabled when `prefers-reduced-motion` is active: the hero copy rises in, signal pulses travel along the hero artwork, sections reveal once on scroll, and the Haven Desktop screens cross-fade (auto-rotation stops as soon as a tab is chosen).
- Pulse positions in the hero are percentages of `neural-signal.png`; update them if the artwork changes.
- Decorative imagery is hidden from assistive technology; meaningful product screenshots have descriptive alternative text.

- Product screenshots are buttons that open an enlarged view (`<dialog>`); outbound links live in the text link beside them. On narrow screens the enlarged view fits the screen height and pans sideways.
- On narrow screens each product's three points are collapsed behind a "show key features" toggle to keep the page short.

## Localization

- Korean copy is rewritten for Korean readers, not translated sentence by sentence from English. Keep the meaning aligned between languages, not the sentence structure.

- English is served at `/`; Korean is served at `/ko/`.
- Both language routes expose their own title, description, Open Graph metadata, canonical URL, and `hreflang` alternates.
- Runtime language switching keeps the current hash while replacing the route and localized metadata.
- Navigation labels, skip links, and accessible control names are localized alongside visible copy.
