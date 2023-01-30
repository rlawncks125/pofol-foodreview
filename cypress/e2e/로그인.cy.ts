// import "cypress/vue";

// https://github.com/bahmutov/cypress-slow-down
import { slowCypressDown } from "cypress-slow-down";
import { testUser as user } from "../common/user";

slowCypressDown(200);

describe("로그인", () => {
  beforeEach(() => {
    cy.visit("");

    cy.get(".item-list > :nth-child(1)").click();
  });

  it("로그인 실패 알람", () => {
    // 아이디 입력
    cy.get("#floating_userName").type(user.userName);
    // 패스워드 입력
    cy.get("#floating_password").type("flasePassword");
    // 로그인 버튼
    cy.get("form > .text-white").click();

    cy.wait(500);
    // 실패 알람 체크
    cy.on("window:alert", (t) => {
      expect(t).to.contains("비밀번호가 다릅니다.");
    });
  });

  it("로그인 성공", () => {
    // 아이디 입력
    cy.get("#floating_userName").type(user.userName);
    // 패스워드 입력
    cy.get("#floating_password").type(user.password);
    // 로그인 버튼
    cy.get("form > .text-white").click();
    cy.wait(500);
    // 성공 알람 체크
    cy.on("window:alert", (t) => {
      expect(t).to.contains("성공");
    });
    // 로그인성공시 chat 으로 가는지 url 검사
    cy.url().should("include", "/chat");

    // input value 비교 , 닉네임확인
    cy.get("#user-nickname").should("include.value", user.userName);
  });
});

describe("로그아웃", () => {
  it("로그아웃", () => {
    cy.visit("");

    cy.get(".item-list > :nth-child(1)").click();

    // 아이디 입력
    cy.get("#floating_userName").type(user.userName);
    // 패스워드 입력
    cy.get("#floating_password").type(user.password);
    // 로그인 버튼
    cy.get("form > .text-white").click();

    cy.wait(500);
    cy.contains("로그아웃").click();
    cy.wait(1000);
  });
});
