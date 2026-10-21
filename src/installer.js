import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { AGENTS, DESIGN_SYSTEMS, SKILL_DIRS } from './catalog.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES = path.resolve(here, '../templates');

const exists = async (p) => !!(await fs.stat(p).catch(() => null));

async function writeFile(dest, content, { force, confirmOverwrite }, results, root) {
  const rel = path.relative(root, dest);
  if (await exists(dest)) {
    const existing = await fs.readFile(dest, 'utf8');
    if (existing === content) return results.push({ file: rel, status: 'unchanged' });
    const ok = force || (confirmOverwrite ? await confirmOverwrite(rel) : false);
    if (!ok) return results.push({ file: rel, status: 'skipped (exists)' });
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, content);
    return results.push({ file: rel, status: 'overwritten' });
  }
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, content);
  results.push({ file: rel, status: 'created' });
}

const readTemplate = (...p) => fs.readFile(path.join(TEMPLATES, ...p), 'utf8');

function renderDesignSystemSkill(template, cfg) {
  const selected = cfg.designSystems.length
    ? cfg.designSystems.map((d) => `- **${DESIGN_SYSTEMS[d].label}**, see \`.github/skills/${SKILL_DIRS[DESIGN_SYSTEMS[d].skill]}/SKILL.md\``).join('\n')
    : '- None selected. Use plain framework defaults and SCSS/CSS variables.';

  const org = cfg.org
    ? `## Organization design system: ${cfg.org.name}

This is the **primary** design system. Prefer it over every public library above.

| Setting | Value |
| --- | --- |
| npm package | ${cfg.org.packageName || '_not provided_'} |
| Selector / class prefix | ${cfg.org.prefix || '_not provided_'} |
| Docs / Storybook | ${cfg.org.docsUrl || '_not provided_'} |
| Design tokens | ${cfg.org.tokensPath || '_not provided_'} |

${cfg.org.notes ? `Extra rules: ${cfg.org.notes}\n` : ''}
If a docs URL or package is given, read its component list (Storybook / README / \`node_modules/${cfg.org.packageName || '<package>'}\`) before mapping Figma elements.
Only fall back to a public design system for components the org library does not provide.`
    : '_No organization design system configured. Re-run `npx figma-code-builder init` to add one._';

  return template.replace('{{SELECTED_SYSTEMS}}', selected).replace('{{ORG_SECTION}}', org);
}

async function mergeMcpJson(root, cfg, opts, results) {
  if (cfg.figmaMode === 'none') return;
  const dest = path.join(root, '.vscode', 'mcp.json');
  let json = { servers: {}, inputs: [] };
  if (await exists(dest)) {
    try { json = JSON.parse(await fs.readFile(dest, 'utf8')); } catch { return results.push({ file: '.vscode/mcp.json', status: 'skipped (invalid JSON)' }); }
    json.servers ||= {};
    json.inputs ||= [];
  }
  if (cfg.figmaMode === 'mcp-remote') {
    json.servers.figma = { type: 'http', url: 'https://mcp.figma.com/mcp' };
  } else {
    json.servers.figma = {
      type: 'stdio',
      command: 'npx',
      args: ['-y', 'figma-developer-mcp', '--stdio'],
      env: { FIGMA_API_KEY: '${input:figma-access-token}' }
    };
    if (!json.inputs.some((i) => i.id === 'figma-access-token')) {
      json.inputs.push({ type: 'promptString', id: 'figma-access-token', description: 'Figma personal access token', password: true });
    }
  }
  await writeFile(dest, JSON.stringify(json, null, 2) + '\n', { ...opts, force: true }, results, root);
}

export async function install(cfg, { cwd, force = false, confirmOverwrite }) {
  const root = path.resolve(cwd);
  const opts = { force, confirmOverwrite };
  const results = [];
  const gh = path.join(root, '.github');

  // 1. Agents
  for (const key of cfg.agents) {
    const file = AGENTS[key].file;
    await writeFile(path.join(gh, 'agents', file), await readTemplate('agents', file), opts, results, root);
  }

  // 2. Core skills (always)
  for (const key of ['figma', 'accessibility']) {
    const dir = SKILL_DIRS[key];
    await writeFile(path.join(gh, 'skills', dir, 'SKILL.md'), await readTemplate('skills', key, 'SKILL.md'), opts, results, root);
  }

  // 3. design system skill (rendered from config) + selected public systems
  const dsTemplate = await readTemplate('skills', 'designsystem', 'SKILL.md');
  await writeFile(path.join(gh, 'skills', SKILL_DIRS.designsystem, 'SKILL.md'), renderDesignSystemSkill(dsTemplate, cfg), opts, results, root);
  for (const key of cfg.designSystems) {
    const skill = DESIGN_SYSTEMS[key].skill;
    await writeFile(path.join(gh, 'skills', SKILL_DIRS[skill], 'SKILL.md'), await readTemplate('skills', skill, 'SKILL.md'), opts, results, root);
  }

  // 4. Config the agents read at runtime
  const config = {
    agents: cfg.agents,
    designSystems: cfg.designSystems,
    orgDesignSystem: cfg.org,
    i18n: { defaultLocale: cfg.locales[0], locales: cfg.locales },
    figma: { connection: cfg.figmaMode }
  };
  await writeFile(path.join(gh, 'figma-code-builder.json'), JSON.stringify(config, null, 2) + '\n', { ...opts, force: true }, results, root);

  // 5. Figma MCP wiring
  await mergeMcpJson(root, cfg, opts, results);

  return results;
}
