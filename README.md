# figma-code-builder

AI agent kit that turns **Figma designs into Angular, React or Vue code** using your design system. It installs custom agents and skills into your project's `.github/` folder for GitHub Copilot (VS Code agent mode) and wires up the Figma MCP server.

## Quick start

```bash
cd your-project
npx figma-code-builder init
```

The wizard asks:

1. Which agent(s): Angular, React, Vue.js
2. Which design system(s): Vuetify, Material
3. Whether to configure an **organization-level design system** (package, prefix, docs URL, tokens path, extra rules)
4. How to connect to Figma: official remote MCP (OAuth), MCP with a personal access token, or skip
5. i18n locales (for example `en,sv,de`)

### What gets installed

```
.github/
  agents/figma-code-angular-builder.agent.md
  agents/figma-code-react-builder.agent.md
  agents/figma-code-vuejs-builder.agent.md
  skills/figma/SKILL.md
  skills/accessibility/SKILL.md
  skills/designsytem/SKILL.md      # generated from your answers
  skills/vuetifyjs/SKILL.md        # if selected
  skills/material/SKILL.md         # if selected
  figma-code-builder.json          # your choices, read by the agents
.vscode/mcp.json                   # Figma MCP server entry
```

Only the agents you pick are installed. Existing files are never overwritten without confirmation (`--force` to override).

### Non-interactive

```bash
npx figma-code-builder init -y \
  --agents angular,react \
  --design-system material \
  --org-name "Acme UI" --org-package @acme/ui --org-prefix acme \
  --figma mcp-remote --locales en,sv
```

## What the agent does

1. Fetches the Figma design (figma skill, MCP or API)
2. Maps elements to your design system / component library
3. Generates the feature structure: routing, components, services, models
4. Applies design tokens
5. Adds i18n keys for English and the other configured languages
6. Adds accessibility attributes (accessibility skill)

## Tips for best results

- **Name the feature folder** so files land in the right place.
- **Mention the route path** to have it wired into routing.
- **Share data model info** so accurate TypeScript interfaces are generated.

Example prompt:

> Build the screen from https://www.figma.com/design/XXXX?node-id=12-34. Feature folder: `src/app/features/orders`, route: `/orders`. Order has id, customer, items[], total, status.

## Figma access

- **mcp-remote**: official Figma MCP server (`https://mcp.figma.com/mcp`), sign in when VS Code asks.
- **mcp-token**: runs `figma-developer-mcp` and prompts for your personal access token (Figma, Settings, Security). The token is requested by VS Code and not stored in the repo.

## Note about `npm install`

npm does not allow interactive prompts from install scripts (no TTY, and output is hidden for dependencies). So installing the package only prints a hint; run `npx figma-code-builder init` for the wizard.

## Develop and publish

```bash
npm install
node bin/cli.js init --cwd /tmp/demo     # try it
npm pack --dry-run                       # check package contents
```

- Check the name is free first: `npm view figma-code-builder`. If taken, use a scope: change `name` to `@your-org/figma-code-builder`.
- Before the first release, replace the placeholder `YOUR-ORG` GitHub URLs in `package.json` with the real repository URLs.
- Configure an npm access token as the GitHub repository Actions secret `NPM_TOKEN`. Use a granular token with permission to publish this package, and enable 2FA on your npm account.
- To start an automated release, open **Actions → Release npm package → Run workflow**, select the release branch, and choose `patch`, `minor`, or `major`. The workflow updates `package.json` and `package-lock.json`, commits the version bump, creates a matching `vX.Y.Z` tag, tests and packs the tagged source, then publishes the tarball with npm provenance. Publishing stops if tests fail, the versions disagree, or that version is already on npm.

### Release a new version

For a local/manual release, run one of these commands to increment the version in `package.json` and `package-lock.json` and create a matching Git tag:

```bash
npm version patch   # 0.1.0 -> 0.1.1, for fixes
npm version minor   # 0.1.0 -> 0.2.0, for backward-compatible features
npm version major   # 0.1.0 -> 1.0.0, for breaking changes
```

Push the version commit and tag to GitHub:

```bash
git push --follow-tags
```

You can also publish manually with `npm login` followed by `npm publish --access public`; the automated workflow is optional.

## License

MIT
