import { slowCypressDown } from "cypress-slow-down";
import { testUser as user } from "../common/user";

slowCypressDown(200);

describe("방목록 조회", () => {
  it("방목록 조회", () => {
    cy.visit("");

    cy.get(".item-list > :nth-child(1)").click();

    // 아이디 입력
    cy.get("#floating_userName").type(user.userName);
    // 패스워드 입력
    cy.get("#floating_password").type(user.password);
    // 로그인 버튼
    cy.get("form > .text-white").click();

    cy.get('.item-list > [href="/chat/list"]').click();

    // cy.get(":nth-child(3) > .btn-type-0").click();
  });
});
