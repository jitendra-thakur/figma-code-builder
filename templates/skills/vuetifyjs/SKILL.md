---
name: vuetifyjs
description: Use Vuetify 3 components, theming and grid when building Vue UI from Figma. Use when the project design system is Vuetify.
---

# Vuetify skill

Check the installed Vuetify version (3.x expected) and use only APIs that exist in it.

## Setup and theming
- Register with `createVuetify` and a `theme` (light/dark); map Figma color variables to theme colors (`primary`, `secondary`, `error`, `surface`, ...) and use `rounded`, `density`, `elevation` props.
- Set shared looks with `defaults` in `createVuetify` instead of repeating props.
- Use icons via `mdi` consistently with the project.

## Layout
- `v-app`, `v-main`, `v-container`, `v-row`, `v-col` (12 column grid, breakpoints `sm md lg xl`), `v-spacer`.
- Spacing helpers `pa-4`, `mx-2`, `ga-3` map to Figma spacing (4px scale). Use `d-flex`, `align-center`, `justify-space-between` utility classes.
- Navigation: `v-app-bar`, `v-navigation-drawer`, `v-tabs`, `v-breadcrumbs`.

## Components
| Figma | Vuetify |
| --- | --- |
| Button | `v-btn` (`variant`: flat, outlined, text, tonal; `color`, `size`) |
| Text field / Textarea | `v-text-field` / `v-textarea` (`label`, `rules`, `error-messages`) |
| Select / Autocomplete | `v-select` / `v-autocomplete` |
| Checkbox / Radio / Switch | `v-checkbox` / `v-radio-group` / `v-switch` |
| Card | `v-card` with `v-card-title`, `v-card-text`, `v-card-actions` |
| Dialog | `v-dialog` |
| Toast | `v-snackbar` |
| Table | `v-data-table` |
| Chip / Badge | `v-chip` / `v-badge` |

## Forms
Wrap in `v-form` with `rules` arrays; messages come from `t()` (i18n). Set `aria-label` on icon-only `v-btn`.

## Do not
Do not override Vuetify internals with deep selectors; prefer props, theme and `defaults`.
