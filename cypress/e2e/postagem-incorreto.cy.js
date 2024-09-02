const { faker } = require("@faker-js/faker/locale/pt_BR");

describe("Pagina de Postagem", () => {
  let dadosParaTeste;

  beforeEach(() => {
    cy.fixture("dadosParaTeste").then((dados) => {
      dadosParaTeste = dados;

      cy.session("userLogin", () => {
        cy.visit("/login");
        cy.get('[data-test="input-loginEmail"]').type(dadosParaTeste.email);
        cy.get('[data-test="input-loginSenha"]').type(dadosParaTeste.senha);
        cy.get('[data-test="submit-button"]').click();
        cy.get(".success-message")
          .should("be.visible")
          .and("contain", "Login bem-sucedido! Redirecionando...");
      });

      cy.visit("/");
      cy.contains("a", "Criar Postagem").click();
    });
  });

  it("Deve exibir mensagem de erro ao tentar criar postagem com conteúdo acima de 144 caracteres", function () {
    const maximoCaracteresTitulo = 30;
    const titulo = faker.lorem.sentence().substring(0, maximoCaracteresTitulo);
    const conteudo = faker.lorem.paragraphs(3);

    cy.get('[data-test="input-postagemTitulo"]').type(titulo);
    cy.get('[data-test="input-postagemConteudo"]').type(conteudo);
    cy.get('[data-test="button-submit"]').click();
    cy.get('[data-test="postagemMensagemDeErro"]', { timeout: 2000 })
      .should("be.visible")
      .and("contain", "Erro ao criar postagem.");
  });

  it("Deve exibir mensagem de erro ao tentar criar postagem com titulo acima de 30 caracteres", function () {
    const maximoCaracteresConteudo = 144;
    const titulo = faker.lorem.paragraph();
    const conteudo = faker.lorem
      .paragraphs(3)
      .substring(0, maximoCaracteresConteudo);

    cy.get('[data-test="input-postagemTitulo"]').type(titulo);
    cy.get('[data-test="input-postagemConteudo"]').type(conteudo);
    cy.get('[data-test="button-submit"]').click();
    cy.get('[data-test="postagemMensagemDeErro"]', { timeout: 2000 })
      .should("be.visible")
      .and("contain", "Erro ao criar postagem.");
  });
});
