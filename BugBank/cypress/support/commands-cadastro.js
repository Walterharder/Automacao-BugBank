import { regexp } from "assert-plus"
import { get } from "lodash"
import { faker } from '@faker-js/faker'

Cypress.Commands.add('cadastroSemSaldo', acessos => {
    let numero;
    cy.get('.ihdmxA').click()
    cy.contains('Cadastrar').click({force: true})
    cy.get('input[name="email"]').eq(1).type(acessos.email, {force: true})
    cy.get('input[type="name"]').click({force: true}).type(acessos.fullName)
    cy.get('input[name="password"]').eq(1).type(acessos.password, {force: true})
    cy.get('input[name="passwordConfirmation"]').type(acessos.password, {force: true})
    cy.contains('Cadastrar').click({force: true})

    cy.get('.styles__ContainerContent-sc-8zteav-1').should('be.visible');
    cy.get('#modalText').contains('foi criada com sucesso')
    cy.get('#modalText').invoke('text').then((frase) => {
        const regex = /\d+-?\d+/;
        return numero = frase.match(regex)[0];   
    })
})

// COMMANDS DA 1 OPCAO 
Cypress.Commands.add('cadastroComSaldo', acessos => {
    cy.get('.ihdmxA').click()
    cy.contains('Cadastrar').click({force: true})
    cy.get('input[name="email"]').eq(1).type(acessos.email, {force: true})
    cy.get('input[type="name"]').click({force: true}).type(acessos.fullName)
    cy.get('input[name="password"]').eq(1).type(acessos.password, {force: true})
    cy.get('input[name="passwordConfirmation"]').type(acessos.password, {force: true})
    cy.get('#toggleAddBalance').click({force: true})
    cy.contains('Cadastrar').click({force: true})
    cy.get('.styles__ContainerContent-sc-8zteav-1').should('be.visible')
    cy.get('#modalText').contains('foi criada com sucesso')
    cy.get('#modalText').invoke('text').then((frase) => {
        Cypress.env('numeroConta', frase.match(/\d+-?\d+/)[0])
    })
})

// COMMANDS DA 2 OPCAO
Cypress.Commands.add('cadastroComSaldo2', acessos => {
    let numero;
    cy.get('.ihdmxA').click()
    cy.contains('Cadastrar').click({force: true})
    cy.get('input[name="email"]').eq(1).type(acessos.email, {force: true})
    cy.get('input[type="name"]').click({force: true}).type(acessos.fullName)
    cy.get('input[name="password"]').eq(1).type(acessos.password, {force: true})
    cy.get('input[name="passwordConfirmation"]').type(acessos.password, {force: true})
    cy.get('#toggleAddBalance').click({force: true})
    cy.contains('Cadastrar').click({force: true})
    cy.get('.styles__ContainerContent-sc-8zteav-1').should('be.visible')
    cy.get('#modalText').contains('foi criada com sucesso')
    return cy.get('#modalText').invoke('text').then((frase) => {
        return numero = frase.match(/\d+-?\d+/)[0];
    })
})