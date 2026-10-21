# Figma Code Builder

Turn Figma designs into implementation-ready **Angular, React, or Vue.js features** with GitHub Copilot in VS Code. Figma Code Builder installs framework-specific Copilot agents and skills into your project. The agents inspect your existing codebase, use your design system, and help translate the selected Figma screen into code that fits your project.

> This package provides instructions and Figma MCP configuration for GitHub Copilot. It does not generate or run an application by itself; use the installed agents inside your application repository.

## Requirements

- Node.js 18 or later
- VS Code with GitHub Copilot and Agent Mode
- A project using Angular, React, or Vue.js
- Access to the Figma file you want to implement

## Install in your application

Open a terminal in the root of your application project and run:

```bash
npx figma-code-builder init
```

The setup wizard guides you through the choices below. You do not need to install this package as a dependency in your application.

### 1. Choose your framework agent

Choose one or more agents:

- **Angular** — builds Angular features using your app's Angular version and conventions.
- **React** — builds React and TypeScript features using your app's router, styling, and data conventions.
- **Vue.js** — builds Vue 3 features and follows your app's Vue, routing, and component conventions.

### 2. Choose a design system

Select one or more libraries if they apply to your project:

- **Material** — Angular Material or MUI, depending on your framework.
- **Vuetify** — for Vue.js projects.

You can skip public libraries if you use your own component library or want framework defaults.

### 3. Add your organization design system (optional)

If your company has a component library, provide its name and any available npm package, component prefix, documentation or Storybook URL, design-token path, and extra rules. The agent treats this as the primary design system and uses public libraries only when your own library does not provide an appropriate component.

### 4. Connect to Figma

Choose how the agent should access your design:

- **Figma remote MCP (recommended):** uses Figma's remote MCP server. VS Code will ask you to sign in and authorize access.
- **Figma MCP with a personal access token:** VS Code requests the token as a secret input when the MCP server starts. Never paste the token into source files or commit it.
- **Skip:** choose this if you will configure Figma access yourself.

The Figma account you authorize must have permission to view the design file.

### 5. Set locales

Enter comma-separated locales, such as `en,sv,de`. The first locale is the default. The agent follows your project's existing i18n library and conventions where available.

## What gets installed

The installer writes files into your application project:

```text
.github/
  agents/
    figma-code-angular-builder.agent.md  # if selected
    figma-code-react-builder.agent.md    # if selected
    figma-code-vuejs-builder.agent.md    # if selected
  skills/
    figma/SKILL.md
    accessibility/SKILL.md
    designsytem/SKILL.md                 # generated from your selections
    material/SKILL.md                    # if selected
    vuetifyjs/SKILL.md                   # if selected
  figma-code-builder.json               # selected agents, systems, Figma, and locales
.vscode/
  mcp.json                               # Figma MCP entry, unless skipped
```

Only selected agents and libraries are installed. Existing files are not silently overwritten: the wizard asks before replacing them. Use `--force` only when you want to overwrite existing generated files.

## Use the agent

1. Open the application project in VS Code.
2. If you configured Figma MCP, start the **figma** server from VS Code and complete the sign-in or token prompt.
3. Open GitHub Copilot Chat, switch to **Agent** mode, and select the installed framework agent (for example, **Figma to React Builder**).
4. Provide the Figma URL or frame/node link, where the feature should go, and any route or behavior requirements.
5. Review the generated changes, run your project's checks, and ask the agent to refine anything that does not match the design or project conventions.

### Example prompt

> Implement this Figma screen: https://www.figma.com/design/FILE_KEY/Orders?node-id=12-34. Use the React agent. Put the feature in `src/features/orders`, add it to the existing router at `/orders`, and reuse our existing table, button, and spacing tokens. The table should show loading, empty, and error states. Do not change unrelated files.

For the most accurate result, include the exact frame, route, destination folder, interactions, data fields, and existing components the feature should reuse. If you have desktop and mobile frames, include both links.

## What the agents do

Each framework agent is instructed to:

- Inspect your project and use APIs supported by its installed framework and dependency versions.
- Read the selected Figma frame, including layout, text, assets, variables/tokens, and interaction states when available.
- Map design elements to your organization library or selected public design system instead of inventing components or tokens.
- Follow your project structure, routing, styling, data-fetching, forms, and testing conventions.
- Apply accessibility guidance, including semantic markup, keyboard/focus behavior, labels, and contrast.
- Follow your configured locale and existing i18n conventions.
- Summarize the files changed, design-system mapping, assumptions, and checks performed.

The agent asks for missing information when necessary. Figma and code generation are not guaranteed to be pixel-perfect; review the result in your application and compare it with the source design.

## Non-interactive setup

For scripts or repeatable setup, provide the required `--agents` option. This example installs the Angular and React agents with Material and remote Figma MCP:

```bash
npx figma-code-builder init --yes --agents angular,react --design-system material --figma mcp-remote --locales en,sv
```

Use `--cwd` to target another project directory and `--force` to replace existing generated files:

```bash
npx figma-code-builder init --yes --agents vuejs --design-system vuetifyjs --cwd ../my-vue-app --force
```

See all supported choices with:

```bash
npx figma-code-builder list
```

## Troubleshooting

- **The wizard says there is no interactive terminal:** run the command in a terminal, or use `--yes` with `--agents` as shown above.
- **The Figma server is not available:** open `.vscode/mcp.json`, confirm the `figma` entry exists, then start it from VS Code. Sign in if prompted and check that your account can access the Figma file.
- **The agent cannot find the design:** share the full Figma design URL, including the `node-id` for the exact frame, and verify your account has access.
- **The wrong components or styles are used:** provide the component-library name, docs URL, token location, and examples of the components the agent should reuse; then rerun the prompt with those details.
- **An existing file was skipped:** rerun setup and confirm the overwrite prompt, or use `--force` if you intend to replace generated files.

## License

MIT. See [LICENSE](LICENSE).

## Maintainers: develop and release

This package does not have a separate compilation step. From the package repository, run tests and preview the files npm will include:

```bash
npm test
npm pack --dry-run
```

### Automated staged releases

Version `1.0.0` has already been approved and published. Ordinary code pull requests do not publish a release: the workflow compares the merged version with the base version and skips tagging/staging when it is unchanged.

To prepare a release, open **Actions → Prepare release PR → Run workflow**, choose `patch`, `minor`, or `major`, and run it from `main`. The workflow updates `package.json` and `package-lock.json` on a separate `release/vX.Y.Z` branch, tests and previews the package, then opens a PR; it never pushes version changes directly to `main`. Review and merge the generated PR to trigger tagging, packing, and npm staging. For example, after `1.0.0`, choose `patch` to prepare `1.0.1`. Allow Actions to create pull requests under **Settings → Actions → General → Workflow permissions → Allow GitHub Actions to create and approve pull requests**.

Configure **npm package Settings → Trusted Publisher → GitHub Actions** with owner `jitendra-thakur`, repository `figma-code-builder`, and workflow filename exactly `release-npm-package.yml` (the caller workflow; not `publish.yml`). The publishing job uses OIDC and does not need an `NPM_TOKEN` secret. Ensure the trusted publisher allows `npm stage publish`; direct `npm publish` permission is not required. The publish job uses a clean npm config so a stale token cannot override OIDC. Approve each staged release under **Staged Packages** on npmjs.com (or use `npm stage list figma-code-builder` followed by `npm stage approve <stage-id>`). Approval requires npm 2FA and makes that version public. Never retry a version that is already published.

The workflow requires npm CLI 11.15+ and Node.js 22.14+ for staged publishing; it installs current npm on its Node.js 24 runner. See [GitHub Actions](https://github.com/jitendra-thakur/figma-code-builder/actions) for workflow runs.
