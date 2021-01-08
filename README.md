# **Demoblaze.com test automation**
A cypress test automation project for demoblaze.com

## **Requirements**
- Node version 14 or above
    - MacOS: brew install node
    - Ubuntu: sudo apt install nodejs
- Chrome version 87 or above

## **Set Up**
1. Clone the project in your machine
2. Traverse to the project directory 
3. In the project directory run "npm install" in ypur terminal to install the dependencies needed
4. You can have a look at the tests inside cypress/integration/ folder

## **Run the tests**
1. In the terminal run "npx cypress open" to open up cypress UI (it might take some time if it is the first time)
2. Once in the Cypress menu you can select any of the .spec.js files to run their test suites.

## **Important note:**
In cypress/integration/signUp/sign-up.spec.js there is a test that checks the site's ability to register a new user. This user data is retrieved from cypress/fixtures/credentials.json. In each run of such test you need to change the value of "newUser" in this json file to a different one. Otherwise the site will recognise the user as pre-existent and the test will fail. 
