const { faker } = require("@faker-js/faker/locale/pt_BR");

describe("Pagina de cadastro de usuário", () => {
  beforeEach(() => {
    cy.fixture("dadosParaTeste").as("dadosParaTeste");
    cy.visit("/");
    cy.contains("a", "Cadastrar Usuário").click();
  });

  it("Deve exibir mensagem de erro ao tentar cadastrar um usuário com dados já existentes", function () {
    const { nome, email, senha } = this.dadosParaTeste;

    cy.get('[data-test="input-cadastroNome"]').type(nome);
    cy.get('[data-test="input-cadastroEmail"]').type(email);
    cy.get('[data-test="input-cadastroSenha"]').type(senha);
    cy.get('[data-test="submit-button"]').click();
    cy.wait(2000);
    cy.get('[data-test="error-message"]')
      .should("be.visible")
      .and("contain", "Erro ao registrar o usuário. Tente novamente.");
    cy.contains("a", "Fechar Cadastro").click();
  });

  it("Deve falhar ao cadastrar usuário com dados incompletos e não exibir mensagem de sucesso", () => {
    const nome = faker.person.fullName();
    const senha = faker.internet.password();

    cy.get('[data-test="input-cadastroNome"]').type(nome);
    cy.get('[data-test="input-cadastroSenha"]').type(senha);
    cy.get('[data-test="submit-button"]').click();
    cy.get('[data-test="success-message"]').should("not.exist");
    cy.contains("a", "Fechar Cadastro").click();
  });
});
