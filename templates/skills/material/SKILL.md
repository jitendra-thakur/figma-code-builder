---
---
name: material
description: Use Angular Material for Angular or MUI for React when building UI from Figma. Use when the project design system is Material.
---

# Material skill

Use this skill only when the project has selected Material and no higher-priority organization design system provides the component. Pick the library that matches the framework: **Angular Material** (`@angular/material`) for Angular or **MUI** (`@mui/material`) for React. Do not mix the two libraries.

## Before implementing
- Inspect `package.json` and existing components/theme files to identify the framework, installed library version, styling approach, and already-installed icon or data-grid packages.
- Follow existing project patterns and APIs supported by the installed version; do not copy setup snippets for a different major version. If the library is absent, do not add it unless the user asks.
- Review the Figma frame, variants, variables, responsive layouts, and interaction states. Map each element to an existing Material component where it fits; use custom markup only when no suitable component exists.
- Prefer the organization's tokens and component overrides, then the project's Material theme, then a documented custom value only when no token exists. Report unresolved token gaps rather than silently inventing design tokens.

## Angular Material
- Import the modules or standalone directives/components that the installed Angular Material version supports in the component or NgModule that uses them. Do not assume every Material component is standalone.
- Extend the existing global Sass theme. Use the theming API and CSS custom properties available in the installed version (for example, Material 3 `mat.theme` and `--mat-sys-*` tokens only when supported). Keep shared theme overrides global; avoid per-component palette overrides and internal selectors.
- Use CSS grid/flex or the project's layout utilities for page structure. Use Material components such as `MatToolbar`, `MatSidenav`, `MatCard`, `MatList`, and `MatTabs` for matching patterns rather than forcing them into unrelated layouts.
- For forms, use `mat-form-field` with the appropriate control (`matInput`, `mat-select`, etc.), visible labels, hints/errors, and typed reactive forms consistent with the project. Keep validation and disabled/loading states aligned with the design.
- For tables, use `mat-table`; add sorting, pagination, selection, or filtering only when the design or existing feature requires them. Provide a responsive strategy for wide tables.
- Use the project's configured icon font or registry with `mat-icon`; do not assume an icon package is installed. Give icon-only actions an accessible name.
- Use the button API/appearance supported by the installed version; Angular Material's button selectors and appearance APIs can differ between releases.

## MUI (React)
- Extend the existing `createTheme`/`ThemeProvider` setup; map Figma variables to `palette`, `typography`, `spacing`, `shape`, and component defaults where appropriate. Preserve existing light/dark mode behavior.
- Use `sx`, `styled`, or the project's established styling solution with theme values (`theme.spacing`, `theme.palette.*`, typography variants), not repeated raw values or one-off theme creation inside components.
- Prefer `Stack`, `Box`, and `Container` for layout; use `Grid` only with the API supported by the installed MUI version. Use `TextField`, `Button`, `Dialog`, `Snackbar`, and `Tabs` for matching patterns.
- Use MUI `Table` components for ordinary tabular data. Use `DataGrid` only if `@mui/x-data-grid` is already installed and the design needs its richer behavior; it is a separate package from `@mui/material`.
- Use the icon package already present in the project (commonly `@mui/icons-material`) and do not assume it is installed. Icon-only controls need accessible names.
- Use the `Button` API/variant supported by the installed MUI version; do not mix MUI version-specific Grid, color, or slot APIs.

## Component mapping

Match the Figma intent and variant to the project's available API; this table is a guide, not a requirement to replace working project components.

| Figma pattern | Angular Material | MUI |
| --- | --- | --- |
| Filled / outlined / text button | Material button directive with the matching supported appearance | `Button` with the matching `variant` |
| Text field / select | `mat-form-field` with `matInput` / `mat-select` | `TextField` / `Select` (often `TextField select` for labeled form fields) |
| Checkbox / radio / switch | `mat-checkbox` / `mat-radio-group` / `mat-slide-toggle` | `Checkbox` / `RadioGroup` / `Switch` |
| Card | `mat-card` | `Card` with `CardContent` and related subcomponents as needed |
| Dialog / modal | `MatDialog` | `Dialog` |
| Toast / transient feedback | `MatSnackBar` | `Snackbar` (with `Alert` when the design calls for severity) |
| Tabs / navigation | `mat-tab-group` / `mat-nav-list` or the matching navigation component | `Tabs` / `List` or the matching navigation component |
| Data table | `mat-table` | `Table`; `DataGrid` only when its package is installed and appropriate |

## Finish and verify
- Implement the states shown or implied by the design: hover, focus, pressed, selected, disabled, error, loading, empty, and expanded/collapsed where relevant. Do not communicate state through color alone.
- Preserve responsive behavior and content hierarchy; use library density, size, and layout options where they match the design instead of scaling components with arbitrary CSS.
- Prefer public component props, directives, slots, and theme APIs. Do not target library internals, use deep selectors, or use `!important` to force a visual match.
- Apply the accessibility skill for semantics, keyboard behavior, focus management, labels, and contrast. Check that Material's built-in behavior is not undermined by custom wrappers or styles.
- After implementation, check the app's available lint/test/build commands and run relevant checks. In the final summary, note the component mappings, token/theme decisions, custom components, and any design or version limitations.
