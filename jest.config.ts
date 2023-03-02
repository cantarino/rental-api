import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).ts"],
  collectCoverage: true,
  coverageDirectory: "test/coverage",
  collectCoverageFrom: ["src/**"],
};

export default config;
