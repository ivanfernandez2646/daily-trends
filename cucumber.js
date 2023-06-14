const common = [
	'--require-module ts-node/register' // Load TypeScript module
];

const cmsBackend = [
	...common,
	'tests/apps/cms/backend/features/**/*.feature',
	'--require tests/apps/cms/backend/features/step_definitions/*.steps.ts'
].join(' ');

module.exports = {
	cmsBackend
};
