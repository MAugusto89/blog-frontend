const { faker } = require("@faker-js/faker/locale/pt_BR");

describe("Pagina de Postagem", () => {
  let dadosParaTeste;

  before(() => {
    cy.fixture("dadosParaTeste").then((dados) => {
      dadosParaTeste = dados;

      cy.session("userLogin", () => {
        cy.visit("/login");
        cy.get('[data-test="input-loginEmail"]').type(dadosParaTeste.email);
        cy.get('[data-test="input-loginSenha"]').type(dadosParaTeste.senha);
        cy.get('[data-test="submit-button"]').click();
        cy.wait(2000);
        cy.get(".success-message")
          .should("be.visible")
          .and("contain", "Login bem-sucedido! Redirecionando...");
      });
    });

    cy.visit("/");
  });

  it("Deve criar uma nova postagem com título e conteúdo dentro do limite de caracteres", function () {
    const maxCaracteresTitulo = 30;
    const maxCaracteresConteudo = 144;
    const titulo = faker.lorem.sentence().substring(0, maxCaracteresTitulo);
    const conteudo = faker.lorem
      .paragraphs(3)
      .substring(0, maxCaracteresConteudo);

    cy.contains("a", "Criar Postagem").click();
    cy.get('[data-test="input-postagemTitulo"]').type(titulo);
    cy.get('[data-test="input-postagemConteudo"]').type(conteudo);
    cy.get('[data-test="button-submit"]').click();
    cy.wait(2000);
    cy.get('[data-test="postagemMensagemDeSucesso"]', { timeout: 20000 })
      .should("be.visible")
      .and("contain", "Postagem criada com sucesso!");
  });
});
