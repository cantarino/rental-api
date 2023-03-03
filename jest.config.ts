import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).ts"],
  collectCoverage: false,
  coverageDirectory: "__tests__/coverage",
  collectCoverageFrom: ["src/**"],
};

export default config;
