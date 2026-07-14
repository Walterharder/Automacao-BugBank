import { ELEMENTS } from './elements';
const el = ELEMENTS;

class Cadastro  {
    preencherNome(nome) {
        cy.get(el.nome).type(nome);
    }
}

export default new Cadastro();