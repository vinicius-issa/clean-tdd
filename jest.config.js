/* eslint-disable max-len */
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {

  roots: ['<rootDir>/src'],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'babel',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**', '!<rootDir>/src/**/*-protocols.ts', '!**/protocols/**', '!**/test/**'],

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // A map from regular expressions to paths to transformers
  transform: {
    '.*\\.ts$': 'ts-jest'
  },
  preset: '@shelf/jest-mongodb'

}
