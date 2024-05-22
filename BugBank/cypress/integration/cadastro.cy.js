/// <reference types="Cypress"/>

describe('Cadastro', () =>{

    beforeEach('Acessar o ambiente BugBank', () => {
        cy.acessoUrl()
    })

    it('Validar se o campos na tela de registro estão vazios', () => {
        cy.cadastroCamposVazios()
    })

    it('Validar os campos obrigatórios da tela de cadastro', () => {
        cy.cadastroCamposObrigatorios()
    })

    it('Efetuar um cadastro de uma conta sem saldo com sucesso', () => {
        cy.cadastroSemSaldo()
    })

    it('Efetuar um cadastro de uma conta com saldo com sucesso', () => {
        cy.cadastroComSaldo()
    })
    it('Tentar cadastrar um conta com confirmação de senha diferentes', () => {
        cy.cadastroConfimacaoDeSenhas()
    })

    it('Validar o campo e-mail com formatação inválida', () => {
        cy.emailInvalido()
    })

})