import { regexp } from "assert-plus"
import { get } from "lodash"

Cypress.Commands.add('cadastroSemSaldo', function() {
    cy.get('.ihdmxA').click()
    cy.contains('Cadastrar').click({force: true})
    cy.get('input[name="email"]').eq(1).type('teste@automacao.com', {force: true})
    cy.get('input[type="name"]').click({force: true}).type('Teste Automação')
    cy.get('input[name="password"]').eq(1).type('1234', {force: true})
    cy.get('input[name="passwordConfirmation"]').type('1234', {force: true})
    cy.contains('Cadastrar').click({force: true})

    cy.get('.styles__ContainerContent-sc-8zteav-1').should('be.visible');
    cy.get('#modalText').contains('foi criada com sucesso').then(() => {
        cy.get('#modalText').invoke('text').then((frase) => {
            const regex = /\d+-?\d+/;
            const numero = frase.match(regex)[0];
            cy.log(numero)
        })
        
    })
   
    cy.get('#btnCloseModal').click()
})


Cypress.Commands.add('cadastroComSaldo', function() {
    cy.get('.ihdmxA').click()
    cy.contains('Cadastrar').click({force: true})
    cy.get('input[name="email"]').eq(1).type('teste@automacao.com', {force: true})
    cy.get('input[type="name"]').click({force: true}).type('Teste Automação')
    cy.get('input[name="password"]').eq(1).type('1234', {force: true})
    cy.get('input[name="passwordConfirmation"]').type('1234', {force: true})
    cy.get('#toggleAddBalance').click({force: true})
    cy.contains('Cadastrar').click({force: true})
    cy.get('.styles__ContainerContent-sc-8zteav-1').should('be.visible')
    cy.get('#modalText').contains('foi criada com sucesso')
    cy.get('#modalText').invoke('text').then((frase) => {
        const numero = frase.match(/\d+-?\d+/)[0];
        cy.data = numero
        cy.log(numero)
    })
    
    cy.get('#btnCloseModal').click()
})
