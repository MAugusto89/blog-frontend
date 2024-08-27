describe('testar login',()=>{

   it('Deve criar usuário para o teste', ()=>{
        const nome = 'joao da silva';
        const email = 'joaodasilva@gmail.com';
        const senha = '1A2e@5600';
        cy.visit('/');
        cy.contains('a','Cadastrar Usuário').click();
        cy.get('[data-test="nome-input"]').type(nome);
        cy.get('[data-test="email-input"]').type(email);
        cy.get('[data-test="senha-input"]').type(senha);
        cy.get('[data-test="cadastrar-button"]').click();
        //cy.get('[data-test="success-message"]').should('be.visible').and('contain','Usuário registrado com sucesso!');
   })


    it('Deve logar corretamente', () => {
        const nome = 'joao da silva';
        const email = 'joaodasilva@gmail.com';
        const senha = '1A2e@5600';
        cy.visit('/');
        cy.get(':nth-child(2) > a').click();
        cy.get(':nth-child(1) > input').type(email);
        cy.get(':nth-child(2) > input').type(senha);
        cy.get('button').click();
        cy.get('.success-message').should('be.visible').and('contain','Login bem-sucedido! Redirecionando...');
      })
    it('Deve dar erro ao logar com email inválido', ()=>{
        const senha = '1A2e@5600';
        cy.visit('/');
        cy.get(':nth-child(2) > a').click();
        cy.get(':nth-child(1) > input').type('joaodasilva');
        cy.get(':nth-child(2) > input').type(senha);
        cy.get('button').click();
        cy.get(':nth-child(1) > input').then(($input)=> {expect($input[0].validationMessage).to.eq('Inclua um "@" no endereço de e-mail. "joaodasilva" está com um "@" faltando.')})
        //cy.get(':nth-child(1) > input').should('have.attr', 'aria-invalid', 'true')
    })

    it('Deve dar erro ao logar com senha inválida', ()=>{
        const email = 'joaodasilva@gmail.com';
        cy.visit('/');
        cy.get(':nth-child(2) > a').click();
        cy.get(':nth-child(1) > input').type(email);
        cy.get(':nth-child(2) > input').type('123456789');
        cy.get('button').click();
        cy.get('.error-message').should('be.visible').and('contain','User not authorized');
    })
})