---
name: material
description: Use Angular Material (Material 3) or MUI for React when building UI from Figma. Use when the project design system is Material.
---

# Material skill

Pick the package that matches the framework: **Angular Material** (`@angular/material`) or **MUI** (`@mui/material`). Check the installed version first and use only APIs that exist in it.

## Angular Material
- Import standalone components directly (`MatButtonModule`, `MatFormFieldModule`, `MatInputModule`, `MatTableModule`, `MatDialogModule`, `MatSnackBarModule`, ...) in the component `imports`.
- Theme with Material 3 Sass APIs (`mat.theme`, system variables like `--mat-sys-primary`). Put overrides in the global theme file, not per component.
- Layout with CSS grid/flex using spacing tokens; use `MatToolbar`, `MatSidenav`, `MatCard`, `MatList`, `MatTabs`.
- Forms: `mat-form-field` with `matInput`, `mat-error`, `mat-hint`; typed reactive forms.
- Tables: `mat-table` with `matSort` and `MatPaginator` when the design shows them.
- Icons: `mat-icon`; give icon-only buttons `aria-label`.

## MUI (React)
- Theme via `createTheme` + `ThemeProvider`; map Figma variables into `palette`, `typography`, `spacing`, `shape`.
- Use `sx`/`styled` with theme tokens (`theme.spacing`, `theme.palette.*`), not raw values.
- Prefer `Stack`, `Grid`, `Box`, `Container` for layout; `TextField`, `Button`, `Dialog`, `Snackbar`, `DataGrid` for components.

## Mapping hints
| Figma | Material |
| --- | --- |
| Button (filled/outlined/text) | `mat-flat-button` / `mat-stroked-button` / `mat-button` (MUI `Button` variants) |
| Text field | `mat-form-field` + `matInput` (MUI `TextField`) |
| Select / dropdown | `mat-select` (MUI `Select`) |
| Checkbox / Radio / Switch | `mat-checkbox` / `mat-radio-group` / `mat-slide-toggle` |
| Card | `mat-card` (MUI `Card`) |
| Modal | `MatDialog` (MUI `Dialog`) |
| Toast | `MatSnackBar` (MUI `Snackbar`) |
| Tabs / Nav | `mat-tab-group` / `mat-nav-list` (MUI `Tabs` / `List`) |
