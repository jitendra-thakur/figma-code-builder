// Single place that defines what the package can install.
// Folder names follow the layout you specified (note: "designsytem" is kept
// configurable through SKILL_DIRS in case you want to fix the spelling).
export const SKILL_DIRS = {
  figma: 'figma',
  accessibility: 'accessibility',
  designsystem: 'designsytem',
  vuetifyjs: 'vuetifyjs',
  material: 'material'
};

export const AGENTS = {
  angular: { label: 'Angular', file: 'figma-code-angular-builder.agent.md', recommendedDS: 'material' },
  react: { label: 'React', file: 'figma-code-react-builder.agent.md', recommendedDS: 'material' },
  vuejs: { label: 'Vue.js', file: 'figma-code-vuejs-builder.agent.md', recommendedDS: 'vuetifyjs' }
};

export const DESIGN_SYSTEMS = {
  vuetifyjs: { label: 'Vuetify (Vue.js)', skill: 'vuetifyjs' },
  material: { label: 'Material (Angular Material / MUI)', skill: 'material' }
};

export const FIGMA_MODES = {
  'mcp-remote': 'Figma MCP server (official remote, OAuth login in VS Code)',
  'mcp-token': 'Figma MCP server using a personal access token',
  none: 'Skip, I will configure Figma access myself'
};
