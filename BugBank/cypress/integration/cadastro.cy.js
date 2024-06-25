/// <reference types="Cypress"/>

describe('Cadastro', () =>{

    beforeEach('Acessar o ambiente BugBank', () => {
        cy.acessoUrl()
    })

    it('Validar se o campos na tela de registro estão vazios', () => {
        cy.get('.ihdmxA').click()
        cy.get('input[name="email"]').eq(1).should('have.value', '')
        cy.get('input[type="name"]').should('have.value', '')
        cy.get('input[name="password"]').eq(1).should('have.value', '')
        cy.get('input[name="passwordConfirmation"]').should('have.value','')
    })

    it('Validar os campos obrigatórios da tela de cadastro', () => {
        cy.get('.ihdmxA').click()
        cy.contains('Cadastrar').click({force: true})
        cy.get('p:contains("obrigatório")').eq(0).should('have.text', 'É campo obrigatório') //
        cy.get('input[name="email"]').eq(1).type('teste@automacao.com')
        cy.contains('Cadastrar').click({force: true})
        cy.get('p:contains("obrigatório")').eq(0).should('have.text', 'É campo obrigatório')
        cy.get('input[name="password"]').eq(1).type('1234')
        cy.contains('Cadastrar').click({force: true})
        cy.get('p:contains("obrigatório")').eq(0).should('have.text', 'É campo obrigatório')
        cy.contains('Cadastrar').click({force: true})
        cy.get('input[name="passwordConfirmation"]').type('1234')
        cy.contains('Cadastrar').click({force: true})
        cy.get('#modalText').should('be.visible').contains('Nome não pode ser vazio.')
        cy.get('#btnCloseModal').click()
        cy.get('input[type="name"]').click({force: true}).should('be.enabled').type('Teste Automação')
        cy.contains('Cadastrar').click({force: true})
        cy.get('.styles__ContainerContent-sc-8zteav-1').should('be.visible')
        cy.get('#modalText').contains('foi criada com sucesso')
        cy.get('#btnCloseModal').click()
    })

    it('Efetuar um cadastro de uma conta sem saldo com sucesso', () => {
        cy.cadastroSemSaldo()
    })

    it('Efetuar um cadastro de uma conta com saldo com sucesso', () => {
        cy.cadastroComSaldo()
    })
    it('Tentar cadastrar um conta com confirmação de senha diferentes', () => {
        cy.get('.ihdmxA').click()
        cy.get('input[name="email"]').eq(1).click({force: true}).type('teste@automacao.com')
        cy.get('input[type="name"]').click({force: true}).type('Teste Automação')
        cy.get('input[name="password"]').eq(1).click({force: true}).type('1234')
        cy.get('input[name="passwordConfirmation"]').click({force: true}).type('12345')
        cy.contains('Cadastrar').click({force: true})
        cy.get('.styles__ContainerContent-sc-8zteav-1').should('be.visible')
        cy.get('#modalText').contains('As senhas não são iguais.')
        cy.get('#btnCloseModal').click()
    })

    it('Validar o campo e-mail com formatação inválida', () => {
        cy.get('.ihdmxA').click()
        cy.get('input[name="email"]').eq(1).type('teste', {force: true})
        cy.get('.kOeYBn > .input__warging').should('have.text', 'Formato inválido')
        cy.get('input[name="email"]').eq(1).clear().type('teste@', {force: true})
        cy.get('.kOeYBn > .input__warging').should('have.text', 'Formato inválido')
        cy.get('input[name="email"]').eq(1).clear().type('teste.com', {force: true})
        cy.get('.kOeYBn > .input__warging').should('have.text', 'Formato inválido')
        cy.get('input[name="email"]').eq(1).clear().type('teste@.com', {force: true})
        cy.get('.kOeYBn > .input__warging').should('have.text', 'Formato inválido')
        cy.get('input[name="email"]').eq(1).clear().type('com', {force: true})
        cy.get('.kOeYBn > .input__warging').should('have.text', 'Formato inválido')
        cy.get('input[name="email"]').eq(1).clear().type('@.com', {force: true})
        cy.get('.kOeYBn > .input__warging').should('have.text', 'Formato inválido')
    })

})