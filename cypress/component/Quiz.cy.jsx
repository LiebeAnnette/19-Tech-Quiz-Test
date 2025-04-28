import Quiz from "../../src/components/Quiz"; // ← updated import to remove /client
import { mount } from "cypress/react18";

describe("Quiz Component", () => {
  beforeEach(() => {
    // Intercept the correct API call before each test
    cy.intercept("GET", "/api/questions/random", {
      fixture: "questions.json",
    }).as("getQuestions");
  });

  it("should render a start button initially", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").should("exist");
  });

  it("should show loading spinner when quiz starts", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").click();
    cy.get(".spinner-border").should("exist");
  });

  it("should display a question after loading questions", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").click();
    cy.wait("@getQuestions");

    cy.get("h2").should("exist");
    cy.get("button").should("have.length.greaterThan", 1); // answer buttons
  });
});
