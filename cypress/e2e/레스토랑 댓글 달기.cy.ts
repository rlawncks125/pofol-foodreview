import { slowCypressDown } from "cypress-slow-down";
import { testUser as user } from "../common/user";

slowCypressDown(200);

describe("레스토랑 댓글 달기", () => {
  it("레스토랑 댓글 달기", () => {
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

    // 별점 3점
    cy.get(":nth-child(3) > :nth-child(6) > .star-fll").click();

    // 댓글 작성
    cy.get(".content > .border").type("댓글 작성합니다.");

    // 댓글 달기
    cy.get(".btn-type-add.my-2").click();
  });
});
