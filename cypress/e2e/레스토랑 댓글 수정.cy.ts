import { slowCypressDown } from "cypress-slow-down";
import { testUser as user } from "../common/user";

slowCypressDown(200);

describe("레스토랑 댓글 수정", () => {
  it("레스토랑 댓글 수정", () => {
    cy.visit("");

    cy.get(".item-list > :nth-child(1)").click();

    // 아이디 입력
    cy.get("#floating_userName").type(user.userName);
    // 패스워드 입력
    cy.get("#floating_password").type(user.password);
    // 로그인 버튼
    cy.get("form > .text-white").click();

    cy.get('.item-list > [href="/chat/list"]').click();

    cy.get(":nth-child(3) > .btn-type-0").click();

    cy.wait(400);
    // marker 찾기
    // name이 nmarker로 시작하는 EL 찾기

    // 하나일떄
    // cy.get("[name^=nmarker-]").parent().click();

    // 여러요소일떄
    cy.get("[name^=nmarker-]").each(($el, index, $list) => {
      if (index === 0) {
        cy.wrap($el.parent()).click();
      }
    });

    // 레스토랑 창 열기
    cy.get(".bg-slate-100").click();

    cy.wait(200);

    // 첫번쨰 댓글 수정
    cy.get(
      `:nth-child(${4}) > .p-1 > :nth-child(1) > .justify-between > :nth-child(2) > .btn-type-edit`
    ).click();

    cy.get('[style=""] > #edit-commnet').type("댓글을 수정합니다.");

    cy.get('[style=""] > .btn-type-edit').click();
  });
});
