import {alert} from '../common/base.page.js';

const signUpElements = {
    signUpLink: () => cy.get('#signin2'),
    signUpModal: () => cy.findByRole('dialog', {name: /sign up/i}),
    modalTitle: () => cy.get('#signInModalLabel'),
    crossButton: () => cy.get('#logInModalLabel + button'),
    userInput: () => cy.get('#sign-username'),
    passwordInput: () => cy.get('#sign-password'),
    signUpButton: () => cy.findByRole('button', {  name: /sign up/i}),
}

export const signUp = {
    clickOnSignUp () {signUpElements.signUpLink().click();},
    clickOnCrossButton () {signUpElements.crossButton().click({force:true});},
    clickOnSignUpButton () {signUpElements.signUpButton().click();},
    signUpModalShouldBeVisible () {signUpElements.signUpModal().should('be.visible');},
    signUpModalShoulNotBeVisible () {signUpElements.signUpModal().should('not.be.visible');},
    modalTitleShouldHaveText (text) {signUpElements.modalTitle().should('have.text', text)},
    typeUser (user) {signUpElements.userInput().invoke('val', user)},
    typePassword (password) {signUpElements.passwordInput().invoke('val', password);},
    signUpAlertShouldHaveText (text) {alert.textEqualsTo(text)},

}
