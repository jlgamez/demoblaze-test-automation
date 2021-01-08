import {basePage} from '../common/base.page.js';
import { go } from '../common/base.page.js';
import {logIn} from '../logIn/login.page.js';
import {cart} from './cart-addition.page.js';


describe('Load a product', function(){
    let credentials;

    before ('Go to the main page', function () {
        cy.fixture('credentials.json').then(function(cred){
            credentials = cred;
            // Access the site
            go.toHomePage();
            basePage.urlShouldContain('/demoblaze.com');

            // login
            logIn.clickOnLogInLink();
            logIn.typeUser(credentials.user);
            logIn.typePassword(credentials.password);
            logIn.clickOnLogInButton();

            logIn.welcomeMessageShouldGreet(credentials.user);
        }); 
        
        
    });

    beforeEach ('Keep cookies and reload', function(){
        basePage.keepCookies();
        basePage.reload();
    })

    it ('Should successfully load a product after clicking on it', function(){
        cart.clickOnProduct();

        basePage.urlShouldContain('\/prod.')
    })
});