const common = [
  '--require-module ts-node/register' // Load TypeScript module
];

const cms_backend = [
  ...common,
  'tests/apps/cms/backend/features/**/*.feature',
  '--require tests/apps/cms/backend/features/step_definitions/*.steps.ts'
].join(' ');

module.exports = {
  cms_backend
};
