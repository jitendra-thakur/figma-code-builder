import prompts from 'prompts';
import { AGENTS, DESIGN_SYSTEMS, FIGMA_MODES } from './catalog.js';

const onCancel = () => {
  console.log('\nCancelled. Nothing was written.');
  process.exit(1);
};

const csv = (v) => (typeof v === 'string' ? v.split(',').map((s) => s.trim()).filter(Boolean) : []);

export async function runWizard(args) {
  // Non-interactive path (CI or --yes)
  if (args.yes) {
    const agents = csv(args.agents);
    const ds = csv(args['design-system']);
    for (const a of agents) if (!AGENTS[a]) throw new Error(`Unknown agent "${a}". Use: ${Object.keys(AGENTS).join(', ')}`);
    for (const d of ds) if (!DESIGN_SYSTEMS[d]) throw new Error(`Unknown design system "${d}". Use: ${Object.keys(DESIGN_SYSTEMS).join(', ')}`);
    if (!agents.length) throw new Error('--yes requires --agents (angular,react,vuejs)');
    return {
      agents,
      designSystems: ds,
      org: args['org-name']
        ? { name: args['org-name'], packageName: args['org-package'] || '', docsUrl: args['org-docs'] || '',
            tokensPath: args['org-tokens'] || '', prefix: args['org-prefix'] || '', notes: '' }
        : null,
      figmaMode: args.figma && FIGMA_MODES[args.figma] ? args.figma : 'mcp-remote',
      locales: csv(args.locales).length ? csv(args.locales) : ['en']
    };
  }

  const { agents } = await prompts({
    type: 'multiselect',
    name: 'agents',
    message: 'Which agent(s) do you want to install?',
    hint: 'space to select, enter to confirm',
    min: 1,
    choices: Object.entries(AGENTS).map(([value, a]) => ({ title: a.label, value }))
  }, { onCancel });

  const recommended = new Set(agents.map((a) => AGENTS[a].recommendedDS));
  const { designSystems } = await prompts({
    type: 'multiselect',
    name: 'designSystems',
    message: 'Which public design system(s) do you want?',
    hint: 'space to select, enter to confirm (none is fine if you only use an org design system)',
    choices: Object.entries(DESIGN_SYSTEMS).map(([value, d]) => ({
      title: d.label, value, selected: recommended.has(value)
    }))
  }, { onCancel });

  const { useOrg } = await prompts({
    type: 'confirm',
    name: 'useOrg',
    message: 'Configure an organization-level design system (your own component library)?',
    initial: false
  }, { onCancel });

  let org = null;
  if (useOrg) {
    org = await prompts([
      { type: 'text', name: 'name', message: 'Design system name', validate: (v) => !!v.trim() || 'Required' },
      { type: 'text', name: 'packageName', message: 'npm package (e.g. @acme/ui)' },
      { type: 'text', name: 'prefix', message: 'Component selector / class prefix (e.g. acme)' },
      { type: 'text', name: 'docsUrl', message: 'Docs / Storybook URL' },
      { type: 'text', name: 'tokensPath', message: 'Design tokens file or package (e.g. @acme/tokens or src/styles/tokens.scss)' },
      { type: 'text', name: 'notes', message: 'Extra org rules for the agent (optional, one line)' }
    ], { onCancel });
  }

  if (!designSystems.length && !org) {
    console.log('\nNo design system selected: the agent will fall back to plain framework defaults.');
  }

  const { figmaMode } = await prompts({
    type: 'select',
    name: 'figmaMode',
    message: 'How should the agent connect to Figma?',
    choices: Object.entries(FIGMA_MODES).map(([value, title]) => ({ title, value }))
  }, { onCancel });

  const { locales } = await prompts({
    type: 'text',
    name: 'locales',
    message: 'i18n locales to generate (comma separated, first = default)',
    initial: 'en',
    format: (v) => csv(v)
  }, { onCancel });

  return { agents, designSystems, org, figmaMode, locales: locales.length ? locales : ['en'] };
}
