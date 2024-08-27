describe("e2e tests over home page", () => {
  beforeEach(() => {
    cy.visit("");
  });

  it("Criar uma postagem", function () {
    cy.get(':nth-child(4) > a').click().should('be.visible')
    cy.get('input').click().type("Sobre Hoje")
    cy.get('textarea').click().type("Fez frio, esquentou e fez frio de novo!")
    cy.get('button').click()
  })
});