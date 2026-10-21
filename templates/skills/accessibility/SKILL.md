---
name: accessibility
description: Apply WCAG 2.2 AA accessibility to generated UI code. Use when creating or reviewing components, forms, navigation, dialogs, tables or images.
---

# Accessibility skill

Target: **WCAG 2.2 AA**. Prefer native semantics; add ARIA only when HTML cannot express the behavior.

## Checklist
- **Landmarks and headings**: `header`, `nav`, `main`, `footer`; one `h1`; no skipped heading levels.
- **Interactive elements**: use `button` for actions and `a` for navigation, never clickable `div`s. Visible focus indicator, logical tab order, no keyboard traps.
- **Forms**: every control has a visible `label` (or `aria-label` if the design has none); link errors and hints with `aria-describedby`; mark required fields; `aria-invalid` on errors; set `autocomplete`.
- **Images and icons**: meaningful images get `alt` text (from an i18n key); decorative ones get `alt=""` or `aria-hidden="true"`; icon-only buttons get an accessible name.
- **Dynamic content**: `aria-live` (polite/assertive) for toasts, validation summaries and loading results; `aria-busy` while loading.
- **Dialogs/menus/tabs**: follow WAI-ARIA Authoring Practices (role, focus trap and return, Esc to close, arrow-key navigation).
- **Tables**: `th` with `scope`, `caption` where useful.
- **Color and contrast**: text 4.5:1, large text and UI components 3:1; never convey meaning by color alone. Flag Figma colors that fail.
- **Target size**: at least 24x24 CSS px.
- **Motion**: respect `prefers-reduced-motion`.
- **Language**: set `lang` and update it on locale change; all ARIA labels go through i18n.

## Report
After generating code, list a11y decisions and any Figma issues (low contrast, missing labels, small targets).
