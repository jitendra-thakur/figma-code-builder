---
name: figma
description: Fetch design data from Figma through the Figma MCP server or REST API (personal access token). Use when you need frames, layout, variables/tokens, text, or assets from a Figma URL.
---

# Figma skill

## Inputs
A Figma URL such as `https://www.figma.com/design/<fileKey>/<name>?node-id=<nodeId>`. Parse `fileKey` and `node-id` (`1-2` in the URL is `1:2` in the API). Ask the user if no link is given.

## Preferred: Figma MCP
Use the `figma` MCP tools configured in `.vscode/mcp.json`:
1. Get design context / metadata for the node (layout, styles, components used).
2. Get variables / design tokens if available.
3. Get a screenshot of the node and use it as visual truth.
4. Download image/SVG assets only when needed.

## Fallback: REST API
Token from `FIGMA_ACCESS_TOKEN` (header `X-Figma-Token`). Never print or commit the token.
- `GET https://api.figma.com/v1/files/:fileKey/nodes?ids=:nodeId`
- `GET https://api.figma.com/v1/files/:fileKey/variables/local` (Enterprise plans only)
- `GET https://api.figma.com/v1/images/:fileKey?ids=:nodeId&format=svg`

## What to extract
- Frame hierarchy, auto-layout (direction, gap, padding, alignment), constraints
- Component instances and their variants/properties (these map to design system components)
- Text content (for i18n keys), text styles
- Colors, spacing, radius, typography, shadows (as variables where defined)
- Interactive states (hover, focus, disabled, error) and responsive frames

## Output
Produce a short structured summary before coding: screens, component tree, tokens used, texts, assets, open questions. Do not guess values that are not in the design; flag them.
