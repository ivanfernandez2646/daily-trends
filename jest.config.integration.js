module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }]
  },
  testMatch: ['**/tests/**/infrastructure/**/*.test.(ts|js)'],
  testEnvironment: 'node'
};
