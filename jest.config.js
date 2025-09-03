module.exports = {
  preset: "ts-jest",
  testMatch: ["**/*.test.ts"],

  collectCoverage: true,
  coverageReporters: ["html", "text", "lcov"], // html creates coverage folder
  coverageDirectory: "coverage",
  // optionally specify which files to collect coverage from
   collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["html", "text", "lcov"],
  collectCoverageFrom: [
    "services/**/*.ts", // include your services
    "controllers/**/*.ts",
    "!**/__tests__/**"
  ],

   reporters: [
    "default",
    ["jest-html-reporter", {
      outputPath: "./reports/jest-report.html",
      pageTitle: "Jest Test Report",
      includeFailureMsg: true,
      includeConsoleLog: true,
      theme: "dark"
    }]
  ]
};