describe("Página de login", () => {
  beforeEach(() => {
    cy.fixture("dadosParaTeste").as("dadosParaTeste");
    cy.visit("/");
  });

  it("Deve autenticar o usuário com sucesso após preencher o formulário de login corretamente", function () {
    const { nome, email, senha } = this.dadosParaTeste;
    console.log({ email, senha });

    cy.get(":nth-child(2) > a").click();
    cy.get('[data-test="input-loginEmail"]').type(email);
    cy.get('[data-test="input-loginSenha"]').type(senha);
    cy.get('[data-test="submit-button"]').click();
    cy.wait(2000);
    cy.get(".success-message")
      .should("be.visible")
      .and("contain", "Login bem-sucedido! Redirecionando...");
  });
});
