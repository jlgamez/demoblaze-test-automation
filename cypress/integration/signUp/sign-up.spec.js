import {basePage} from '../common/base.page.js';
import { go } from '../common/base.page.js';
import {signUp} from './sign-up.page.js';

describe ('Sign up', function () {
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

    it ('Should pop up a sign up modal after clicking on sign up', function(){
        signUp.clickOnSignUp();
        
        signUp.signUpModalShouldBeVisible();
    });

    it ('Should display the text "Sign Up" in the sign up modal title  ', function(){
        signUp.clickOnSignUp();

        signUp.modalTitleShouldHaveText('Sign up');
    });

    it ('Should display an alert warning abut the user pre-existence if the user is duplicated', function(){
        signUp.clickOnSignUp();
        signUp.typeUser(credentials.existingUser);
        signUp.typePassword(credentials.password);
        signUp.clickOnSignUpButton();

        signUp.userDuplicatedAlertHasText('This user already exist.');
    });

    it ('Should display a success alert if the user is new', function() {
        signUp.clickOnSignUp();
        signUp.typeUser(credentials.user);
        signUp.typePassword(credentials.password);
        signUp.clickOnSignUpButton();

        signUp.userDuplicatedAlertHasText('Sign up successful.');
    })

   
})