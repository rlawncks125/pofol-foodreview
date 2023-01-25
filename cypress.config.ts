import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://foodreview.kimjuchan97.xyz/",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
