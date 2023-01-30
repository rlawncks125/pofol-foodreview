// import "cypress/vue";

// https://github.com/bahmutov/cypress-slow-down
import { slowCypressDown } from "cypress-slow-down";

slowCypressDown(200);

describe("방문 테스트", () => {
  it("passes", () => {
    cy.visit("/");
  });
});
