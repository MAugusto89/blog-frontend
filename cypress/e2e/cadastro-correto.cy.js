const {faker} = require('@faker-js/faker/locale/pt_BR')

describe('Pagina de cadastro', () => {
  it('Deve preencher os campos do formulario corretamente e fazer um novo cadastro', () => {
    const nome = faker.person.fullName();
    const email = faker.internet.email();
    const senha = faker.internet.password();
    cy.visit('/');
    cy.contains('a','Cadastrar Usuário').click();
    cy.get('[data-test="nome-input"]').type(nome);
    cy.get('[data-test="email-input"]').type(email);
    cy.get('[data-test="senha-input"]').type(senha);
    cy.get('[data-test="cadastrar-button"]').click();
    cy.get('[data-test="success-message"]').should('be.visible').and('contain','Usuário registrado com sucesso!');
  })

})