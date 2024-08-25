import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: false,
  preset: 'ts-jest',
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  coverageProvider: "v8",
  watchman: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: "jest-environment-jsdom",
};

export default config;
