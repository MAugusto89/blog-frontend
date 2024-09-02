describe("Página de login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

    it("Deve exibir uma mensagem de erro ao tentar logar com um email inválido", () => {
    const senha = "1A2e@5600";

    cy.get(":nth-child(2) > a").click();
    cy.get('[data-test="input-loginEmail"]').type("joaodasilva"); 
    cy.get('[data-test="input-loginSenha"]').type(senha);
    cy.get('[data-test="submit-button"]').click();
    // Verifica a mensagem de erro de validação do input de email
    // Cuidado porque cada Browser faz tratametno diferente para o input tipo email
    cy.get('[data-test="input-loginEmail"]').then(($input) => {
      expect($input[0].validationMessage).to.eq(
        'Inclua um "@" no endereço de e-mail. "joaodasilva" está com um "@" faltando.'
      );
    });
  });

  it("Deve exibir uma mensagem de erro ao tentar logar com uma senha inválida", () => {
    const email = "joaodasilva@gmail.com";

    cy.get(":nth-child(2) > a").click();
    cy.get(":nth-child(1) > input").type(email);
    cy.get(":nth-child(2) > input").type("123456789");
    cy.get("button").click();
    cy.get(".error-message")
      .should("be.visible")
      .and("contain", "User not authorized");
  });
});
