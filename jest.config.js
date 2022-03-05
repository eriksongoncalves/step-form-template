module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  bail: true,
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.ts(x)?', 'src/**/**/.ts(x)?'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  modulePaths: ['<rootDir>/src/', '<rootDir>/setupTests.ts']
};
