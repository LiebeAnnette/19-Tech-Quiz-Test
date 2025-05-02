import Quiz from "../../client/src/components/Quiz";
import { mount } from "cypress/react18";

describe("Quiz Component", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/questions/random", { fixture: "questions.json" }).as(
      "getQuestions"
    );
  });

  it("should render a start button initially", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").should("exist");
  });

  it("should show loading spinner when quiz starts", () => {
    mount(<Quiz />);
    cy.get("button").contains("Start Quiz").click();
    cy.get(".card").should("exist");
  });

  it("should display a question after loading questions", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").click();
    cy.wait("@getQuestions"); // Wait for our intercepted call

    cy.get("h2").should("exist"); // Question should appear
    cy.get("button").should("have.length.greaterThan", 1); // Answer buttons
  });
});
