---
name: accessibility
description: Apply WCAG 2.2 AA accessibility to generated UI code using semantic HTML, keyboard support, focus management, and ARIA only when native elements are insufficient. Use when creating or reviewing components, forms, navigation, dialogs, tables, images, or app shells.
---

# Accessibility skill

Target: **WCAG 2.2 AA**. Prefer native HTML semantics first; add ARIA only when HTML cannot express the behavior. Always make generated interfaces keyboard-accessible, screen-reader-friendly, and responsive to reduced motion.

## Core semantic HTML rules
- Use semantic landmarks: `header`, `nav`, `main`, `aside`, `footer`, `section`, and `article` where appropriate.
- Use exactly one meaningful `h1` per page or screen, followed by a logical heading outline; do not skip heading levels without reason.
- Use native interactive elements: `button` for actions, `a` for navigation, `input`, `select`, `textarea` for form controls, `label` to associate text, `ul`/`ol` for lists, and `table`/`thead`/`tbody`/`th`/`td` for tabular data.
- Do not make non-interactive elements clickable with `div`/`span` alone; if it behaves like a control, it must be a real control or have correct ARIA semantics.
- Use `figure`/`figcaption` when content is informative, and preserve reading order matching visual order.
- Use `role="presentation"` or `aria-hidden="true"` only for decorative items that should be ignored by assistive technology.

## Keyboard and focus requirements
- Ensure all interactive controls can be reached and operated with keyboard only.
- Show a visible focus indicator for links, buttons, form controls, tabs, menus, dialogs, switches, and custom controls.
- Avoid keyboard traps; focus must move logically and predictably.
- Support Enter/Space for buttons and interactive components when applicable; ensure tab order matches visual and logical reading order.
- Do not remove native focus behavior when replacing or styling controls.
- For custom widgets, implement keyboard patterns such as arrow keys for menus, tabs, listboxes, and radio groups according to WAI-ARIA patterns.

## Form accessibility
- Every form control must have a visible label; if a visible label is not possible in the design, use an accessible name from `aria-label` or `aria-labelledby` as a fallback.
- Associate labels explicitly with `for`/`id` or by wrapping the control in a `label`.
- Link validation text and helper text using `aria-describedby`.
- Mark required fields clearly and expose requirements to assistive tech with `required` and `aria-required="true"` when appropriate.
- Set `aria-invalid="true"` on invalid form controls and ensure error messaging is programmatically associated with the field.
- Use `autocomplete` attributes where relevant and consistent with the input purpose.
- Keep validation messages understandable, specific, and visible next to the relevant control.

## Images, icons and media
- Meaningful images need informative `alt` text or i18n-based alt text.
- Decorative images must use `alt=""` or `aria-hidden="true"`.
- Icon-only buttons and icon-only toggles require accessible names via `aria-label` or visually hidden text.
- If a control includes status or state information, expose it in text and/or ARIA state attributes rather than color alone.
- For audio/video content, provide captions, transcripts, or alternative text as applicable.

## Dynamic regions and state messaging
- Use `aria-live` only for regions that change dynamically: toasts, validation summaries, status alerts, loading states, and server updates.
- Prefer `polite` for non-urgent updates and `assertive` only for urgent, time-sensitive messages.
- Add `aria-busy="true"` while loading content or processing operations.
- Use polite, concise status text that can be announced without stealing focus.

## Dialogs, menus, and tab patterns
- Dialogs must have a clear title, focus moved into the dialog on open, and focus restored to the trigger when closed.
- Support `Esc` to close the dialog unless the design intentionally forbids it; follow WAI-ARIA dialog best practices.
- Menus, tabs, accordions, and select-like widgets must support proper keyboard navigation and ARIA states.
- When a component is expanded/collapsed, update `aria-expanded`, `aria-controls`, and visible state together.
- Ensure modal overlays prevent background interaction and maintain screen-reader context.

## Table and data semantics
- Use real HTML tables for tabular data, not CSS grid unless the design is purely decorative.
- Include `caption` where useful and use `scope` on `th` elements for row/column headers.
- Keep header association clear for assistive technology; avoid relying only on visual styling.
- For sortable tables, expose sort state with `aria-sort` and ensure keyboard accessibility.

## Color, contrast, and motion
- Meet contrast minimums: text 4.5:1, large text and key UI components 3:1.
- Do not rely on color alone to convey state, meaning, or validation.
- Flag Figma colors and states that fail contrast checks before implementation.
- Respect `prefers-reduced-motion` and avoid unnecessary animation, auto-scrolling, or flashing content.
- Keep target sizes at least 24x24 CSS pixels, with preferred larger hit areas for touch devices.

## Language and i18n accessibility
- Set the `lang` attribute on the document or root element and update it when the locale changes.
- All visible labels, aria labels, hints, status messages, and announcements must be routed through i18n.
- Keep translation strings concise and screen-reader friendly.

## Output requirements
After generating code, provide a brief accessibility summary including:
- which semantic HTML elements were used
- keyboard behavior and focus handling
- labels, state messaging, and live region decisions
- any Figma issues found (low contrast, missing labels, small tap targets, inaccessible icon buttons, missing heading hierarchy, or invalid control semantics)

## Report
After generating code, list a11y decisions and any Figma issues (low contrast, missing labels, small targets, invalid semantics, or missing focus handling).
