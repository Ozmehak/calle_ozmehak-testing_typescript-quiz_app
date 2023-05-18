import {gameConfig} from "../../src/utils/GameConfig";
describe("Quiz App", () => {
  it("should select difficulty, region, and start the game", () => {
    cy.visit("http://localhost:3000"); // Visit localhost:3000
    cy.get(".nameInput") // Select the input field by name attribute
      .type("Testsson"); // Type "Testsson" in the input field
    cy.wait(1500);
    cy.get(".dropDown1") // Select element for difficulty
      .select("Medium"); // Choose the "Medium" option
    cy.wait(1500);
    cy.get(".dropDown2") // Select element for region
      .select("Sweden"); // Choose the "Sweden" option
    cy.wait(1500);
    cy.contains("Start Game").click(); // Click the "Start Game" button
    for (let i = 0; i < gameConfig.questionsPerRound; i++) {
      cy.get("button.categoryButton") // Select all buttons with the class "categoryButton"
        .then((categoryButtons) => {
          const categoryRandomIndex = Math.floor(
            Math.random() * categoryButtons.length
          );
          cy.wrap(categoryButtons).eq(categoryRandomIndex).click(); // Click the random category button
        });

      cy.wait(4500);

      cy.get("button.answerButton") // Select all buttons with the class "answerButton"
        .then((answerButtons) => {
          const answerRandomIndex = Math.floor(
            Math.random() * answerButtons.length
          );
          cy.wrap(answerButtons).eq(answerRandomIndex).click(); // Click the random answer button
        });

      cy.wait(1500);
    }
    cy.contains("Well done Testsson!").should("be.visible");
  });
});
