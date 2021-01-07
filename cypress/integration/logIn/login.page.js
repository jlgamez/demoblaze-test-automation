import {basePage} from '../common/base.page.js';
import {alert} from '../common/base.page.js';

const loginElements = {
    logInLink: () => cy.get('#login2'),
    logInModal: () => cy.get('div#logInModal'),
    modalTitle: () => cy.get('#logInModalLabel'),
    crossButton: () => cy.get('#logInModalLabel + button'),
    userInput: () => cy.get('#loginusername'),
    passwordInput: () => cy.get('#loginpassword'),
    logInButton: () => cy.findByRole('button', {  name: /log in/i}),
    welcomeMessage: () => cy.get('#nameofuser'),
    logOutLink: () => cy.get('#logout2'),
}

export const logIn = {
    clickOnLogInLink () {loginElements.logInLink().click();},
    clickOnLogInButton () {loginElements.logInButton().click();},
    clickOnCrossButton () {
        cy.wait(500);
        loginElements.crossButton().click({force:true});
    },
    clickOnLogOut() {
        loginElements.logOutLink().should('be.visible');
        loginElements.logOutLink().click();
    },
    logInModalShouldBeVisible () {loginElements.logInModal().should('be.visible');},
    logInModalShoulNotBeVisible () {loginElements.logInModal().should('not.be.visible');},
    modalTitleShouldHaveText (text) {loginElements.modalTitle().should('have.text', text)},
    typeUser (user) {loginElements.userInput().invoke('val', user)},
    typePassword (password) {loginElements.passwordInput().invoke('val', password);},
    logInAlertShouldHaveText (text) {alert.textEqualsTo(text)},
    welcomeMessageShouldGreet(user) {
        let message = 'Welcome ' + user;
        loginElements.welcomeMessage().should('have.text', message);
    },
    welcomeMessageShouldNotBeVisible(){loginElements.welcomeMessage().should('not.be.visible');},

}