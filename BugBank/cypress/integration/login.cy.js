/// <reference types="Cypress"/>

describe ('Login', () =>{

    beforeEach('Acessar o ambiente BugBank', () => {
        cy.acessoUrl()
    })

    // PRIMEIRA OPCÃO DE RESOLUCÃO, USANDO O CYPRESS.ENV
    it('Validar criação de conta com saldo', () => {
        cy.cadastroComSaldo().then(() =>{
            cy.get('input[name="email"]').eq(0).type('teste@automacao.com', {force: true})
            cy.get('input[name="password"]').eq(0).type('1234', {force: true})
            cy.contains('Acessar').click()

            cy.get('#textAccountNumber').should('contain', 'Conta digital:') 
            cy.get('#textBalance').contains('R$ 1.000,00') 

            cy.get('#textAccountNumber > span').should('contain', Cypress.env('numeroConta'));
        });
    })

    // SEGUNDA OPÇÃO DE RESOLUCÃO, USANDO O RETURN DENTRO DO COMMANDS
    it('Validar criação de conta com saldo 2', () => {
        cy.cadastroComSaldo2().then((numero) =>{
            cy.get('#btnCloseModal').click()
            cy.get('input[name="email"]').eq(0).type('teste@automacao.com', {force: true})
            cy.get('input[name="password"]').eq(0).type('1234', {force: true})
            cy.contains('Acessar').click()

            cy.get('#textAccountNumber').should('contain', 'Conta digital:') 
            cy.get('#textBalance').contains('R$ 1.000,00') 

            // OUTRA OPCÃO DE ASSERT ALEM DO CONTAINS :)
            cy.get('#textAccountNumber > span').should('have.text', numero);
        });
    })

    it('Validar criação de conta sem saldo', () => {
        cy.cadastroSemSaldo()

        cy.get('input[name="email"]').eq(0).type('teste@automacao.com', {force: true})
        cy.get('input[name="password"]').eq(0).type('1234', {force: true})
        cy.contains('Acessar').click()

        // cy.get('#textAccountNumber > span').invoke('text').then((frase) => {
        //     frase.match(numero)[0];
        //     cy.data = numero
        // })

        cy.get('#textAccountNumber').should('contain', 'Conta digital:') 
        cy.get('#textBalance').contains('R$ 0,00')

        

    })

    it('Validar campos obrigatórios de Login da conta', () => {
        cy.contains('Acessar').click()
        cy.get('p:contains("obrigatório")').eq(0).should('have.text', 'É campo obrigatório')
        cy.get('p:contains("obrigatório")').eq(1).should('have.text', 'É campo obrigatório')
        cy.get('input[name="email"]').eq(0).type('teste@automacao.com', {force: true})
        cy.contains('Acessar').click()
        cy.get('p:contains("obrigatório")').eq(0).should('have.text', 'É campo obrigatório')
        cy.get('input[name="email"]').eq(0).clear().should('have.text', '')
        cy.get('input[name="password"]').eq(0).type('1234', {force: true})
        cy.contains('Acessar').click()
        cy.get('p:contains("obrigatório")').eq(0).should('have.text', 'É campo obrigatório')

    })

    it('Validar a tentativa de login de usuário não cadastrado', () => {
        cy.get('input[name="email"]').eq(0).type('testeauromacao@automacao.com', {force: true})
        cy.get('input[name="password"]').eq(0).type('123456', {force: true})
        cy.contains('Acessar').click()
        
        cy.get('.styles__ContainerContent-sc-8zteav-1').should('be.visible')
        cy.get('#modalText').contains('Usuário ou senha inválido. Tente novamente ou verifique suas informações!')
        cy.get('#btnCloseModal').click()
    })

    it('Validar a tentativa de login sem usuário', () => {
        cy.get('input[name="password"]').eq(0).type('123456', {force: true})
        cy.contains('Acessar').click()
        cy.get('p:contains("obrigatório")').eq(0).should('have.text', 'É campo obrigatório')

    })

    it('Validar a tentativa de login sem a senha', () => {
        cy.get('input[name="email"]').eq(0).type('testeauromacao@automacao.com', {force: true})
        cy.contains('Acessar').click()
        cy.get('p:contains("obrigatório")').eq(0).should('have.text', 'É campo obrigatório')
    })

    it('Validar a tentativa de login com senha inválida', () => {
        cy.cadastroComSaldo()

        cy.get('input[name="email"]').eq(0).type('teste@automacao.com', {force: true})
        cy.get('input[name="password"]').eq(0).type('12345', {force: true})
        cy.contains('Acessar').click()

        cy.get('.styles__ContainerContent-sc-8zteav-1').should('be.visible')
        cy.get('#modalText').contains('Usuário ou senha inválido. Tente novamente ou verifique suas informações!')
        cy.get('#btnCloseModal').click()

  
    })

})