import { ELEMENTS } from './elements';
const el = ELEMENTS;

class Login{
    acessarUrl() {
        cy.visit('/');
    }
    teste() {
        cy.get(el.email).type('');
    }
}

export default new Login();