#!/usr/bin/env node
// NOTE: npm does not give lifecycle scripts an interactive TTY (npm >= 7 also hides
// their output for dependencies), so a real wizard cannot run from "postinstall".
// We only print a hint; the wizard lives in `npx figma-code-builder init`.
if (!process.env.CI) {
  console.log('\n  figma-code-builder installed.\n  Run:  npx figma-code-builder init\n');
}
