import {alert, basePage} from '../common/base.page.js';

const product = {
    thirdProduct: () => cy.get('.card-block a').eq(2),
    productImage: () => cy.get('.active img'),
    productTitle: () => cy.get('#tbodyid .name'),
    priceContainer: () => cy.get('h3.price-container'),
    productDescriptionTab: () => cy.get('div.description'),
    addToCartButton: () => cy.findByRole('link', {name: /add to cart/i}),
    cart: () => cy.get('#cartur'),
    productsAdded: () => cy.get('.success'),
    totalPrice: () => cy.get('#totalp'),
    cartPageTitle: () => cy.get('.col-lg-8 h2'),
    tableHeadImage: () => cy.get('thead th').eq(0),
    tableHeadTitle: () => cy.get('thead th').eq(1),
    tableHeadPrice: () => cy.get('thead th').eq(2),
    tableHeadDelete: () => cy.get('thead th').eq(3),
    firstDeleteButton: () => cy.get('.success a').eq(0),
    placeOrderButton: () => cy.get('.btn-success'),
    orderModal: () => cy.get('div#orderModal'),
    purchaseButton: () => cy.findByRole('button', { name: /purchase/i}),
    inputName: () => cy.get('#name'),
    inputCreditCard: () => cy.get('#card'),
    sweetAlert: () => cy.get('.sweet-alert'),
    okButton: () => cy.findByRole('button', {name: /ok/i}),
    orderText: () => cy.findByText(/Card Number:/i),


}

export const buy = {
    clickOnProduct () {product.thirdProduct().click();},
    imageShouldBeVisible () {product.productImage().should('be.visible')},
    productTitleShouldBeVisible () {product.productTitle().should('be.visible')},
    priceContainerShouldBeVisible () {product.priceContainer().should('be.visible')},
    productDescriptionShouldBeVisible () {product.productDescriptionTab().should('be.visible')},
    clickOnAddToCart () {product.addToCartButton().click();},
    cartAlertShouldHaveText (text) {alert.textEqualsTo(text)},
    clickOnCart (){product.cart().click();},
    numberOfProductsAddedShouldBe (number) {product.productsAdded().should('have.length', number)},
    totalPriceShoulBeVisible(){product.totalPrice().should('be.visible')},
    cartPageTitleShouldBe(text){product.cartPageTitle().should('have.text', text)},
    tableHeadImageTextShouldBe(text){product.tableHeadImage().should('have.text', text)},
    tableHeadTitleTextShouldBe(text){product.tableHeadTitle().should('have.text', text)},
    tableHeadPriceTextShouldBe(text){product.tableHeadPrice().should('have.text', text)},
    tableHeadDeleteTextShouldBe(text){product.tableHeadDelete().should('have.text', text)},
    deleteFirstProduct(){product.firstDeleteButton().click();},
    placeORder(){product.placeOrderButton().click()},
    orderModalShouldBeVisible () {product.orderModal().should('be.visible');},
    clickOnPurchase(){product.purchaseButton().click();},
    typeName(text) {product.inputName().invoke('val', text);},
    typeCard(text) {product.inputCreditCard().invoke('val', text);},
    sweetAlertShouldBeVisible(){product.sweetAlert().should('be.visible');},
    clickOkButton () {product.okButton().click()},
    orderTextShouldContain(data){product.orderText().should('contain', data);},
    orderTextShouldHavePrice(){
        product.totalPrice().invoke('text').then((text)=>{
            product.orderText().should('contain', text);
        })
    },
        
        
    
}

export const cart = {
    clear(name, card){

        basePage.wait();
        buy.placeORder();
        buy.typeName(name);
        buy.typeCard(card);
        buy.clickOnPurchase();
        buy.clickOkButton();

    }
}
