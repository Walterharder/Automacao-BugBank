/// <reference types="Cypress"/>

describe ('Login', () =>{

    beforeEach('Acessar o ambiente BugBank', () => {
        cy.acessoUrl()
    })

    it.only('Validar criação de conta com saldo', () => {
        cy.cadastroComSaldo()

        cy.get('input[name="email"]').eq(0).type('teste@automacao.com', {force: true})
        cy.get('input[name="password"]').eq(0).type('1234', {force: true})
        cy.contains('Acessar').click()

        // const numero = cy.data(numero)
        // cy.get('#textAccountNumber > span').invoke('text').then(texto => {
        //     expect(texto).to.contain(cy.data(numero));
        //   });

        // // const numero = numero
        cy.get('#textAccountNumber').should('contain', 'Conta digital:') 
        cy.get('#textBalance').contains('R$ 1.000,00') 
            
        // // })
    


    })

    it('Validar criação de conta sem saldo', () => {

    })

    it('Validar campos obrigatórios de Login da conta', () => {

    })

    it('Validar a tentaiva de login com usuário não cadastrado', () => {

    })

    it('Validar a tentaiva de login sem usuário', () => {

    })

    it('Validar a tentaiva de login com usuário sem senha', () => {

    })

    it('Validar a tentaiva de login com senha inválida', () => {

    })

})