#!/usr/bin/env node
import path from 'node:path';
import fs from 'node:fs';
import prompts from 'prompts';
import { AGENTS, DESIGN_SYSTEMS } from '../src/catalog.js';
import { runWizard } from '../src/wizard.js';
import { install } from '../src/installer.js';

const BOOLEAN = new Set(['yes', 'force', 'help', 'version']);

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '-y') out.yes = true;
    else if (a === '-h') out.help = true;
    else if (a === '-v') out.version = true;
    else if (a.startsWith('--')) {
      const [k, v] = a.slice(2).split('=');
      if (v !== undefined) out[k] = v;
      else if (!BOOLEAN.has(k) && argv[i + 1] && !argv[i + 1].startsWith('-')) out[k] = argv[++i];
      else out[k] = true;
    } else out._.push(a);
  }
  return out;
}

const HELP = `
figma-code-builder: Figma to Angular / React / Vue agents for GitHub Copilot

Usage
  npx figma-code-builder [init]        Interactive setup (default)
  npx figma-code-builder list          Show available agents and design systems

Options
  -y, --yes                  Non-interactive (needs --agents)
  --agents <list>            angular,react,vuejs
  --design-system <list>     vuetifyjs,material
  --org-name <name>          Add an org-level design system
  --org-package <pkg>        e.g. @acme/ui
  --org-prefix <prefix>      e.g. acme
  --org-docs <url>           Docs / Storybook URL
  --org-tokens <path|pkg>    Design tokens location
  --figma <mode>             mcp-remote | mcp-token | none
  --locales <list>           e.g. en,sv,de
  --force                    Overwrite existing files without asking
  --cwd <dir>                Target project (default: current directory)
  -h, --help | -v, --version
`;

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

  if (args.version) return console.log(pkg.version);
  if (args.help) return console.log(HELP);

  const command = args._[0] || 'init';

  if (command === 'list') {
    console.log('\nAgents:');
    for (const [k, a] of Object.entries(AGENTS)) console.log(`  ${k.padEnd(10)} ${a.label}`);
    console.log('\nDesign systems:');
    for (const [k, d] of Object.entries(DESIGN_SYSTEMS)) console.log(`  ${k.padEnd(10)} ${d.label}`);
    return;
  }
  if (command !== 'init') {
    console.error(`Unknown command "${command}".\n${HELP}`);
    process.exit(1);
  }

  if (!args.yes && !process.stdin.isTTY) {
    console.error('No interactive terminal detected. Use --yes with --agents, or run in a terminal.');
    process.exit(1);
  }

  const cwd = path.resolve(args.cwd || process.cwd());
  console.log(`\nfigma-code-builder v${pkg.version}`);
  console.log(`Target project: ${cwd}\n`);

  const cfg = await runWizard(args);

  const results = await install(cfg, {
    cwd,
    force: !!args.force,
    confirmOverwrite: args.yes
      ? null
      : async (rel) => (await prompts({ type: 'confirm', name: 'ok', message: `${rel} exists. Overwrite?`, initial: false })).ok
  });

  console.log('\nResult');
  for (const r of results) console.log(`  ${r.status.padEnd(18)} ${r.file}`);

  console.log(`
Next steps
  1. Open the project in VS Code with GitHub Copilot (agent mode).
  2. ${cfg.figmaMode === 'mcp-token' ? 'Start the "figma" MCP server in .vscode/mcp.json and paste your Figma token when asked.' : cfg.figmaMode === 'mcp-remote' ? 'Start the "figma" MCP server in .vscode/mcp.json and sign in to Figma.' : 'Configure Figma access (MCP or API token).'}
  3. Pick the agent (${cfg.agents.map((a) => AGENTS[a].file.replace('.agent.md', '')).join(', ')}) and prompt, for example:
     "Build the feature in <figma-url>. Folder: src/app/features/orders, route: /orders"
`);
}

main().catch((e) => {
  console.error(`\nError: ${e.message}`);
  process.exit(1);
});
