const { faker} = require('@faker-js/faker/locale/pt_BR')

describe('Pagina de cadastro de usuário', () => {


  it('Deve preencher os campos do formulario com dados já cadastrados e falhar ao fazer um novo cadastro', () => {
    const nome = faker.person.fullName();
    const email = faker.internet.email();
    const senha = faker.internet.password();
console.log(nome);
    cy.visit('/');
    cy.contains('a', 'Cadastrar Usuário').click();
    cy.get('[data-test="nome-input"]').type(nome);
    cy.get('[data-test="email-input"]').type(email);
    cy.get('[data-test="senha-input"]').type(senha);
    cy.get('[data-test="cadastrar-button"]').click();
    cy.contains('a', 'Fechar Cadastro').click();

    cy.contains('a', 'Cadastrar Usuário').click();
    cy.get('[data-test="nome-input"]').type(nome);
    cy.get('[data-test="email-input"]').type(email);
    cy.get('[data-test="senha-input"]').type(senha);
    cy.get('[data-test="cadastrar-button"]').click();
    cy.get('[data-test="error-message"]').should('be.visible').and('contain', 'Erro ao registrar o usuário. Tente novamente.');
    cy.contains('a', 'Fechar Cadastro').click();
  })

  it('Deve preencher os campos do formulário incorretamente  e falhar ao fazer um novo cadastro', () => {
    const nome = faker.person.fullName();
    const senha = faker.internet.password();
  cy.visit("/");
    cy.contains('a', 'Cadastrar Usuário').click();
    cy.get('[data-test="nome-input"]').type(nome);
    cy.get('[data-test="senha-input"]').type(senha);
    cy.get('[data-test="cadastrar-button"]').click();
    cy.get('[data-test="success-message"]').should('not.exist');
    cy.contains('a', 'Fechar Cadastro').click();
  })
})