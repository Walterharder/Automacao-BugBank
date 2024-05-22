# Automação BugBank - Cypress

Este é um projeto de automação pessoal, praticando os conhecimentos adiquiridos durante o Curso Básico de Cypress do Walmyr. 

Para isso utilizei o site [https://bugbank.netlify.app/#] 

## Pré-requisitos

É necessário ter Node.js e npm instalados para executar este projeto.

>Usei as versões `v16.13.2` e `8.3.0` do Node.js e npm, respectivamente. É sugerido que você use as mesmas versões ou versões posteriores.

## Instalação

>Execute o comando ` npm i --save-dev cypress-mochawesome-reporter` para instalar o `mochawesome - reporter`

## Testes

Você pode executar os testes com os seguintes comandos scripts personalizados:

Execute `npm test` para executar o teste no modo headless em uma viewport desktop.

Ou execute `npm run cy:open` para abrir o Cypress no modo interativo em uma viewport desktop.

Ou execute `npm run cypress run --reporter mochawesome` para executar o teste no modo headless em uma viewport desktop com o reporter mochawesome.

