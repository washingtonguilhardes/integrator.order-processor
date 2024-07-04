/** @type {import('jest').Config} */
const config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.e2e-spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coveragePathIgnorePatterns: [
    '.*\\.module\\.(t|j)s',
    'index.ts',
    'main.ts',
    'expected-result.ts',
  ],
  coverageDirectory: '../coverage-e2e',
  testEnvironment: 'node',
  verbose: true,
  moduleNameMapper: {
    '^@src/(.+)$': '<rootDir>/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
};

module.exports = config;
