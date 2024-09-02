// const { faker } = require("@faker-js/faker/locale/pt_BR");

describe("Pagina de cadastro", () => {
  beforeEach(() => {
    cy.fixture('dadosParaTeste').as('dadosParaTeste');
    cy.visit("/");
  })
  it("Deve realizar o cadastro de um novo usuário preenchendo corretamente todos os campos do formulário", function() {
    const { nome, email, senha } = this.dadosParaTeste;
    cy.visit("/");
    cy.contains("a", "Cadastrar Usuário").click();
    cy.get('[data-test="input-cadastroNome"]').type(nome);
    cy.get('[data-test="input-cadastroEmail"]').type(email);
    cy.get('[data-test="input-cadastroSenha"]').type(senha);
    cy.get('[data-test="submit-button"]').click();
    cy.wait(2000);
    cy.get('[data-test="success-message"]', { timeout: 20000 })
      .should("be.visible")
      .and("contain", "Usuário registrado com sucesso!");
  });
});
