let mappedModule;
switch (process.env.TEST_ENV) {
  case "cjs":
    mappedModule = "<rootDir>/index";
    break;
  case "umd":
    mappedModule = "<rootDir>/umd/react-router.js";
    break;
  default:
    mappedModule = "<rootDir>/modules/index";
}

module.exports = {
  testRunner: "jest-circus/runner",
  restoreMocks: true,
  globals: {
    __DEV__: true
  },
  moduleNameMapper: {
    "^react-router$": mappedModule
  },
  modulePaths: ["<rootDir>/node_modules"],
  setupFiles: ["raf/polyfill"],
  testMatch: ["**/__tests__/**/*-test.js"],
  testURL: "http://localhost/"
};
