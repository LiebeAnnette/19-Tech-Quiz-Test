describe("Tech Quiz E2E Test", () => {
  beforeEach(() => {
    // Mock the API call before each test
    cy.intercept("GET", "/api/questions/random", {
      fixture: "questions.json",
    }).as("getQuestions");
  });

  it("should start the quiz, answer a question, and see results", () => {
    cy.visit("http://localhost:3001");

    cy.contains("Start Quiz").click();

    // Wait for the mocked questions to load
    cy.wait("@getQuestions");

    // Now questions should appear
    cy.get("h2").should("exist");
    cy.get("button").first().click(); // Click the first answer button

    // Keep answering until quiz is complete
    cy.get("button").first().click({ multiple: true });

    // After completing quiz
    cy.contains("Quiz Completed").should("exist");
    cy.contains("Your score").should("exist");
  });
});
