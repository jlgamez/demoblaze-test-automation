import {basePage} from '../common/base.page.js';
import { go } from '../common/base.page.js';
import {logIn} from './login.page.js';

describe ('log in the site', function () {
    let credentials;
    before ('Go to the main page', function () {
        cy.fixture('credentials.json').then(function(cred){
            credentials = cred;
        }); 

        go.toHomePage();
        basePage.urlShouldContain('/demoblaze.com');
    });

    beforeEach ('Reload page', function(){
        basePage.reload();
    });

    it ('Should display modal after clicking on log in', function () {
        logIn.clickOnLogInLink();

        logIn.logInModalShouldBeVisible();
    });

    it ('Should display the text "Log in" in the log in modal title', function(){
        logIn.clickOnLogInLink();

        logIn.modalTitleShouldHaveText('Log in');
    });

    it ('Should close modal after clicking on cross button', function(){
        logIn.clickOnLogInLink();
        logIn.clickOnCrossButton();

        logIn.logInModalShoulNotExist();
    });

    it ('Should display an alert asking to fill in the required data if nothing is typed', function(){
        logIn.clickOnLogInLink();
        logIn.clickOnLogInButton();

        logIn.logInAlertShouldHaveText('Please fill out Username and Password.');
    });

    it ('Should display an alert warning that the user does not exist if user is invalid', function () {
        logIn.clickOnLogInLink();
        logIn.typeUser(credentials.wrongUSer);
        logIn.typePassword(credentials.password);
        logIn.clickOnLogInButton();

        logIn.logInAlertShouldHaveText('User does not exist.');
    });

    it ('Should display an alert warning that the password is wrong if password is invalid', function(){
        logIn.clickOnLogInLink();
        logIn.typeUser(credentials.user);
        logIn.typePassword(credentials.wrongPassword);
        logIn.clickOnLogInButton();

        logIn.logInAlertShouldHaveText('Wrong password.');
    });

    it ('Should log in successfully after introducing valid credentials', function(){
        logIn.clickOnLogInLink();
        logIn.typeUser(credentials.user);
        logIn.typePassword(credentials.password);
        logIn.clickOnLogInButton();

        logIn.welcomeMessageShouldGreet(credentials.user);
    });
});