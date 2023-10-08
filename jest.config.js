module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    modulePaths: ['<rootDir>/src'],
    testMatch: ['**/*.test.ts'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    coverageDirectory: 'coverage',
    coverageReporters: ['lcov'],
    verbose: true,
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
  };