# RandomTrust UI Kit

## Palette

- bg: `#0D1117`
- bg-2: `#0F141B`
- card: `#161B22`
- border: `#222831`
- text: `#E6EDF3`
- muted: `#9BA7B4`
- cyan (accent): `#00BFFF`
- mint (success): `#4BFFB4`
- warn: `#FFD166`
- error: `#FF4D4D`

Light variant (optional):

- bg: `#F7F9FB`
- card: `#FFFFFF`
- border: `#E3E8EE`
- text: `#0F172A`
- muted: `#5B6472`
- cyan: `#008FD6`
- mint: `#17C690`
- warn: `#E5A400`
- error: `#E02424`

## Typography

- Sans: Inter
- Mono: JetBrains Mono
- H1: 36px / 900
- H2: 28px / 800
- H3: 22px / 700
- Body: 16px
- Small: 14px

Usage:

- Numbers, hashes → mono (`var(--font-mono)`).
- Body and headings → sans (`var(--font-sans)`).

## Components

### Button

- Height: 48px
- Radius: 12px
- Primary: `background: var(--cyan); color: #0D1117;`
- Success: `background: var(--mint);`
- Ghost: `background: color-mix(in oklab, var(--bg) 70%, black 30%);`
- Hover: border-color to `var(--cyan)`; subtle glow optional.

### Card

- Background: `var(--card)`
- Border: `1px solid var(--border)`
- Radius: `20px`
- Shadow: `var(--shadow)`
- Backdrop filter: `var(--glass)`
- Padding: 24px

### Chart

- Grid: `#30363D`
- Axis labels: `var(--muted)`
- Bars/lines: accent `var(--cyan)`, thresholds `var(--error)`

### Progress/Loader

- Bars use `var(--cyan)` with subtle shine overlay.
- Circular loader: border-bottom in accent and CSS rotate.

## Layout

- Container max-width: 960px
- Gap: 16px
- Symmetric padding, grid-first layout.

## Logo guidance

- Text-only: RANDOMTRUST in Inter Black / uppercase.
- Tight letter spacing: -2%.
- Accents: use cyan underscore or bracket (e.g., `RANDOM[TRUST]`).
- Optional mono alternates for tech feel.

## Usage snippets

Use CSS variables from `src/index.css` and module classes. Example:

```tsx
<button className="u-btn u-btn--primary">Запуск</button>
<div className="u-card">Контент</div>
```
