import { slowCypressDown } from "cypress-slow-down";
import { testUser as user } from "../common/user";

slowCypressDown(200);

describe("방목록 찾기", () => {
  it("방목록 찾기", () => {
    cy.visit("");

    cy.get(".item-list > :nth-child(1)").click();

    // 아이디 입력
    cy.get("#floating_userName").type(user.userName);
    // 패스워드 입력
    cy.get("#floating_password").type(user.password);
    // 로그인 버튼
    cy.get("form > .text-white").click();

    cy.get('.item-list > [href="/chat/mypage"]').click();

    cy.get(":nth-child(2) > button.btn-type-0").click();
    cy.wait(1000);
    cy.get("#user-dsc").clear().type("자기 소개를 하지");
    cy.get(".my-2 > .btn-type-0").click();
    cy.wait(1000);
  });
});
