import {basePage} from '../common/base.page.js';
import {logIn} from '../logIn/login.page.js';
import { go } from '../common/base.page.js';
import {buy} from './cart-addition.page.js';
import {cart} from './cart-addition.page.js';



describe('Select a product and add it to cart', function(){
    let credentials;
    let paying;
    before ('Go to the main page', function () {
        cy.fixture('credentials.json').then(function(creds){
            credentials = creds;

            // Access the site
            go.toHomePage();
            basePage.urlShouldContain('/demoblaze.com');

            // Login
            logIn.clickOnLogInLink();
            logIn.typeUser(credentials.user);
            logIn.typePassword(credentials.password);
            logIn.clickOnLogInButton();

            logIn.welcomeMessageShouldGreet(credentials.user);
            basePage.wait();

        })

        cy.fixture('payingData.json').then(function(data){
            paying = data;
             // Clear the cart in case there were products in
            buy.clickOnCart();
            cart.clear(paying.name, paying.creditCard);

        });

        
        
    });

    beforeEach ('Keep cookies and reload', function(){
        Cypress.Cookies.preserveOnce('tokenp_', 'user');
        basePage.reload();
        go.toHomePage();
    })

    it ('Should successfully load a product after clicking on it', function(){
        buy.clickOnProduct();

        basePage.urlShouldContain('/prod.')
    })

    it ('Should display product title', function() {
        buy.clickOnProduct();
        
        buy.productTitleShouldBeVisible();
    })

    it ('Should display product image', function() {
        buy.clickOnProduct();
        
        buy.imageShouldBeVisible();
    })

    it ('Should display product price', function() {
        buy.clickOnProduct();
        
        buy.priceContainerShouldBeVisible();
    })

    it ('Should display product price', function() {
        buy.clickOnProduct();
        
        buy.priceContainerShouldBeVisible();
    })

    it ('Should display product description', function() {
        buy.clickOnProduct();
        
        buy.productDescriptionShouldBeVisible();
    })

    it ('Should successfully add a product to cart', function() {
        buy.clickOnProduct();
        buy.clickOnAddToCart();

        buy.cartAlertShouldHaveText('Product added');
    })

});

describe('Checkout products in cart', function(){
    let paying;
    let credentials;
    before ('Go to the main page', function () {
        // load credentials
        cy.fixture('credentials.json').then(function(creds){
            credentials = creds;

            // Access the site
            go.toHomePage();
            basePage.urlShouldContain('/demoblaze.com');

            // Login
            logIn.clickOnLogInLink();
            logIn.typeUser(credentials.user);
            logIn.typePassword(credentials.password);
            logIn.clickOnLogInButton();

            logIn.welcomeMessageShouldGreet(credentials.user);
            basePage.wait();

            //Check the cart page loads successfully
            buy.clickOnCart();
            basePage.urlShouldContain('cart');
        });
        
        
        // load paying data
        cy.fixture('payingData.json').then(function(data){
            paying = data;

            // Clear the cart in case there were products in
            cart.clear(paying.name, paying.creditCard);
            // Add three products to the cart
            go.toHomePage();
            buy.clickOnProduct();
            buy.clickOnAddToCart();
            basePage.wait();
            buy.clickOnAddToCart();
            basePage.wait();
            buy.clickOnAddToCart();
        })

        buy.clickOnCart();

    });

    beforeEach ('Keep cookies and reload', function(){
        Cypress.Cookies.preserveOnce('tokenp_', 'user');
        basePage.reload();
        cy.wait(1000);
    });


    it ('Should display the Products title', function(){
        buy.cartPageTitleShouldBe('Products');
    });

    it ('Should display products table header correctly', function(){
        buy.tableHeadImageTextShouldBe('Pic');
        buy.tableHeadTitleTextShouldBe('Title');
        buy.tableHeadPriceTextShouldBe('Price');
        buy.tableHeadDeleteTextShouldBe('x');
    });

    it ('Should display two products in the cart', function(){
        // For this case we will check if the three products added
        // at the begginging are loaded in the cart
        buy.numberOfProductsAddedShouldBe(3)
    })

    it ('Should successfully delete the first product', function(){
        buy.deleteFirstProduct();

        buy.numberOfProductsAddedShouldBe(2);
    });

    it ('Should display the total price', function(){
        buy.totalPriceShoulBeVisible();
    });

    it ('Should display purchase modal after clicking on place order', function(){
        buy.placeORder();

        buy.orderModalShouldBeVisible();
    });

    it ('Should not allow to place an order without name or card introduced', function(){
        buy.placeORder();
        buy.clickOnPurchase();

        buy.cartAlertShouldHaveText('Please fill out Name and Creditcard.');
    });

    it ('Should place an order after introducing name and card', function(){
        buy.placeORder();
        buy.typeName(paying.name);
        buy.typeCard(paying.creditCard);
        buy.clickOnPurchase();

        buy.sweetAlertShouldBeVisible();
        buy.orderTextShouldContain(paying.name);
        buy.orderTextShouldContain(paying.creditCard);
        buy.orderTextShouldHavePrice()

    });
});