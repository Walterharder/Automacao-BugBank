/// <reference types="Cypress"/>
import { faker } from '@faker-js/faker'

describe ('Login', () =>{
    let acessos

    beforeEach('Acessar o ambiente BugBank', () => {
        cy.visit('/')

        acessos = {
            email: faker.internet.email(),
            password: faker.internet.password(),
            fullName: faker.name.fullName()
          }
    })

    // PRIMEIRA OPCÃO DE RESOLUCÃO, USANDO O CYPRESS.ENV
    it('Validar criação de conta com saldo', () => {
        cy.cadastroComSaldo(acessos).then(() =>{
            cy.get('#btnCloseModal').click()
            cy.get('input[name="email"]').eq(0).type(acessos.email, {force: true})
            cy.get('input[name="password"]').eq(0).type(acessos.password, {force: true})
            cy.contains('Acessar').click()

            cy.get('#textBalance').contains('R$ 1.000,00')  
            cy.get('#textAccountNumber').should('contain', 'Conta digital:') 

            cy.get('#textAccountNumber > span').should('contain', Cypress.env('numeroConta'));
        });
    })

    // SEGUNDA OPÇÃO DE RESOLUCÃO, USANDO O RETURN DENTRO DO COMMANDS
    it('Validar criação de conta com saldo 2', () => {
        cy.cadastroComSaldo2(acessos).then((numero) =>{
            cy.get('#btnCloseModal').click()
            cy.get('input[name="email"]').eq(0).type(acessos.email, {force: true})
            cy.get('input[name="password"]').eq(0).type(acessos.password, {force: true})
            cy.contains('Acessar').click()

            cy.get('#textBalance').contains('R$ 1.000,00') 
            cy.get('#textAccountNumber').should('contain', 'Conta digital:') 
            
            // OUTRA OPCÃO DE ASSERT ALEM DO CONTAINS :)
            cy.get('#textAccountNumber > span').should('have.text', numero);
        });
    })

    it('Validar criação de conta sem saldo', () => {
        cy.cadastroSemSaldo(acessos).then((numero) => {
            cy.get('#btnCloseModal').click()
            cy.get('input[name="email"]').eq(0).type(acessos.email, {force: true})
            cy.get('input[name="password"]').eq(0).type(acessos.password, {force: true})
            cy.contains('Acessar').click()

            cy.get('#textBalance').contains('R$ 0,00')
            cy.get('#textAccountNumber').should('contain', 'Conta digital:') 
            
            cy.get('#textAccountNumber > span').should('have.text', numero);
        })       

    })

    it('Validar campos obrigatórios de Login da conta', () => {
        let email
        let password

        cy.contains('Acessar').click()
        cy.get('p:contains("obrigatório")').eq(0).should('have.text', 'É campo obrigatório')
        cy.get('p:contains("obrigatório")').eq(1).should('have.text', 'É campo obrigatório')
        cy.get('input[name="email"]').eq(0).type(acessos.email, {force: true})
        cy.contains('Acessar').click()
        cy.get('p:contains("obrigatório")').eq(0).should('have.text', 'É campo obrigatório')
        cy.get('input[name="email"]').eq(0).clear().should('have.text', '')
        cy.get('input[name="password"]').eq(0).type(acessos.password, {force: true})
        cy.contains('Acessar').click()
        cy.get('p:contains("obrigatório")').eq(0).should('have.text', 'É campo obrigatório')

    })

    it('Validar a tentativa de login de usuário não cadastrado', () => {
        cy.get('input[name="email"]').eq(0).type(acessos.email, {force: true})
        cy.get('input[name="password"]').eq(0).type(acessos.password, {force: true})
        cy.contains('Acessar').click()
        
        cy.get('.styles__ContainerContent-sc-8zteav-1').should('be.visible')
        cy.get('#modalText').contains('Usuário ou senha inválido. Tente novamente ou verifique suas informações!')
        cy.get('#btnCloseModal').click()
    })

    it('Validar a tentativa de login sem usuário', () => {
        cy.get('input[name="password"]').eq(0).type(acessos.password, {force: true})
        cy.contains('Acessar').click()
        cy.get('p:contains("obrigatório")').eq(0).should('have.text', 'É campo obrigatório')

    })

    it('Validar a tentativa de login sem a senha', () => {
        cy.get('input[name="email"]').eq(0).type(acessos.email, {force: true})
        cy.contains('Acessar').click()
        cy.get('p:contains("obrigatório")').eq(0).should('have.text', 'É campo obrigatório')
    })

    it.only('Validar a tentativa de login com senha inválida', () => {
        cy.cadastroComSaldo(acessos)
        cy.get('#btnCloseModal').click()
        cy.get('input[name="email"]').eq(0).type(acessos.email, {force: true})
        cy.get('input[name="password"]').eq(0).type('Teste123', {force: true})
        cy.contains('Acessar').click()

        cy.get('.styles__ContainerContent-sc-8zteav-1').should('be.visible')
        cy.get('#modalText').contains('Usuário ou senha inválido. Tente novamente ou verifique suas informações!')
        cy.get('#btnCloseModal').click()

  
    })

})