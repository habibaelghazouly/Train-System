module.exports = {
  preset: "ts-jest",
  testMatch: ["**/*.test.ts"],

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