// import "cypress/vue";

// https://github.com/bahmutov/cypress-slow-down
import { slowCypressDown } from "cypress-slow-down";
import { testUser as user } from "../common/user";

slowCypressDown(200);

// describe("회원가입", () => {
//   it("회원가입", () => {
//     cy.visit("");

//     cy.get(".item-list > :nth-child(2)").click();

//     cy.get("#floating_email").type(user.email);
//     cy.get("#floating_userName").type(user.userName);
//     cy.get("#floating_password").type(user.password);
//     cy.get("#floating_repeat_password").type(user.password);

//     cy.get("form > .text-white").click();

//     cy.on("window:alert", (t) => {
//       expect(t).to.contains("생성되었습니다.");
//     });
//   });
// });

describe("이미 존재하는 회원", () => {
  it("이미 존재하는 회원", () => {
    cy.visit("");

    cy.get(".item-list > :nth-child(2)").click();

    cy.get("#floating_email").type(user.email);
    cy.get("#floating_userName").type(user.userName);
    cy.get("#floating_password").type(user.password);
    cy.get("#floating_repeat_password").type(user.password);

    cy.get("form > .text-white").click();

    cy.on("window:alert", (t) => {
      expect(t).to.contains("존재함");
    });
  });
});
