import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001",
    specPattern: "cypress/e2e/quiz.cy.js", // 👈 Only change this one!
    fixturesFolder: "cypress/fixtures",
    supportFile: false,
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}", // (leave this alone)
    fixturesFolder: "cypress/fixtures",
    supportFile: false,
  },
});
