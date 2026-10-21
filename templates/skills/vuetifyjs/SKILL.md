---
name: vuetifyjs
description: Use Vuetify components, theming and layout when building Vue UI from Figma. Use when the project design system is Vuetify.
---

# Vuetify skill

Use this skill when Vuetify is the selected design system and no higher-priority organization design system provides the component. Vuetify is a Vue component framework; do not use React or Angular Material APIs in Vue code.

## Before implementing
- Inspect `package.json`, app entry points, and existing components to identify Vue and Vuetify versions, Vite/Nuxt setup, styling conventions, and installed icon/i18n packages.
- Use only APIs supported by the installed Vuetify version. Prefer existing project setup; do not duplicate plugin registration or add Vuetify/dependencies unless requested.
- Check the existing `createVuetify` configuration, theme, defaults, aliases, and component registration/treeshaking setup before editing them.
- Review Figma variants, variables, responsive layouts, and interaction states. Match by purpose and use a Vuetify component when it fits; create a small custom component from Vuetify primitives only when no suitable component exists.
- Apply tokens in this order: organization system, existing Vuetify theme/CSS variables, then a documented custom value only when no token exists. Report unresolved token gaps instead of inventing a parallel palette.

## Setup and theming
- Configure Vuetify once through the project's app/plugin entry point (commonly `createVuetify`); preserve the current plugin and SSR/Nuxt conventions.
- Extend the existing theme. Map design tokens to supported theme colors (such as `primary`, `secondary`, `error`, and `surface`) and preserve the configured light/dark behavior. Do not create a separate theme inside a view or component.
- Use theme colors, typography, and supported `rounded`, `density`, and `elevation` props rather than repeated raw styling values. Use `defaults` for genuinely shared component defaults, not feature-specific differences.
- Follow the project's icon configuration (for example, an already-installed MDI set). Do not assume an icon package or icon set is installed; use configured aliases and give icon-only actions an accessible name.
- When Vuetify components need explicit registration in the current setup, follow the project's established registration or treeshaking mechanism rather than changing it ad hoc.

## Layout
- Use the existing app shell (`v-app`, `v-main`) and Vuetify layout primitives (`v-container`, `v-row`, `v-col`, `v-spacer`) where they match the design. Check the installed version's grid and breakpoint APIs.
- Use spacing helpers such as `pa-*`, `mx-*`, and `ga-*` only when they correspond to the project's spacing tokens; do not assume Figma spacing always follows a 4px scale. Use utility classes such as `d-flex`, `align-center`, and `justify-space-between` when they fit the established layout.
- Preserve responsive behavior at the project's breakpoints. Avoid fixed widths/heights when the design is fluid and provide a strategy for overflow in dense content.
- Navigation patterns may use `v-app-bar`, `v-navigation-drawer`, `v-tabs`, and `v-breadcrumbs`; use links for navigation and buttons for actions.

## Components
Match the Figma intent and variant to the API available in the installed version. This table is a guide, not a requirement to replace working project components.

| Figma pattern | Vuetify component |
| --- | --- |
| Button | `v-btn` with supported `variant`, `color`, and `size` |
| Text field / textarea | `v-text-field` / `v-textarea` |
| Select / autocomplete | `v-select` / `v-autocomplete` |
| Checkbox / radio / switch | `v-checkbox` / `v-radio-group` / `v-switch` |
| Card | `v-card` with `v-card-title`, `v-card-text`, and `v-card-actions` as needed |
| Dialog / modal | `v-dialog` |
| Toast / transient feedback | `v-snackbar` |
| Data table | `v-data-table`; check version and project needs before choosing a server-side or virtualized variant |
| Chip / badge | `v-chip` / `v-badge` |
| Loading / empty state | `v-progress-*` / a meaningful empty-state layout using project components |

## Forms
- Use `v-form` and the installed version's validation API; keep validation rules typed and avoid duplicating validation already enforced by the service/backend.
- Use Vue's `v-model` with the correct value type and existing project conventions. Provide visible labels, helper text, required indicators, and clear error messages; keep validation and disabled/loading states consistent with the Figma design.
- Route user-visible labels, hints, and errors through the project's i18n library when configured. Do not assume a global `t()` exists; use the project's actual Composition API or template usage.
- Apply the accessibility skill to labels, keyboard operation, focus behavior, error associations, and icon-only controls. Prefer Vuetify's native accessible behavior; add ARIA only when needed.

## Vue implementation
- Follow the app's Vue 3 SFC conventions, typically `<script setup lang="ts">` and Composition API, rather than introducing a different component style.
- Use Vuetify's documented component props, events, slots, and `v-model` contracts. Prefer slots for custom content within a library component rather than reaching into its internal DOM.
- Keep view-specific composition in focused components/composables; use computed state for derived UI and avoid mutating props.
- Preserve Vue Router/Nuxt navigation conventions and SSR safety. Do not access browser-only APIs during server rendering unless guarded appropriately.
- Respect existing scoped/global style conventions. Avoid deep selectors, internal Vuetify class targeting, and `!important`; prefer public props, theme, defaults, utilities, or a custom wrapper.

## Finish and verify
- Implement relevant hover, focus, selected, disabled, loading, error, empty, and expanded states. Do not use color alone to communicate state.
- Check responsive behavior, keyboard/focus behavior, and contrast using the accessibility skill; ensure custom wrappers do not break Vuetify's built-in behavior.
- Run the project's available lint, test, and build checks. In the final summary, list component mappings, token/theme decisions, custom components, and any API/version or design limitations.

## Do not
- Do not assume a Vuetify version, icon set, plugin registration mode, or optional package that is not in the project.
- Do not override Vuetify internals with deep selectors or `!important`; prefer public props, theme, utilities, slots, and `defaults`.
- Do not add a second app shell, theme, or Vuetify plugin when one already exists.
