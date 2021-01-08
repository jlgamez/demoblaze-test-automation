import {alert} from '../common/base.page.js';

const cartElements = {
    thirdProduct: () => cy.get('.card-block a').eq(2),
    productImage: () => cy.get('.active img'),
    productTitle: () => cy.get('#tbodyid .name'),
    priceContainer: () => cy.get('h3.price-container'),
    productDescriptionTab: () => cy.get('div.description'),
    addToCartButton: () => cy.findByRole('link', {name: /add to cart/i}),
    cart: () => cy.get('#cartur'),


}

export const cart = {
    clickOnProduct () {cartElements.thirdProduct().click();},
    imageShouldBeVisible () {cartElements.productImage().should('be.visible')},
    titleShouldBeVisible () {cartElements.productTitle().should('be.visible')},
    priceContainerShouldBeVisible () {cartElements.priceContainer().should('be.visible')},
    priouctDescriptionShouldBeVisible () {cartElements.productDescriptionTab().should('be.visible')},
    clickOnAddToCart () {cartElements.addToCartButton().click();},
    cartAlertShouldHaveText (text) {alert.textEqualsTo(text)},
    clickOnCart (){cartElements.cart().click();}
}