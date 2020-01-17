const uuidv1 = require('uuid/v1');

describe('My First Test', function () {

    beforeEach(()=>{
        cy.visit('localhost:4200')
    })
    it('Title should include todos-tdd', function () {
        cy.visit('localhost:4200')
        cy.title().should('include', 'TodosTdd')
    })

    it('Should display a signup message', () => {
        const statement = 'Please signup with a unique username and password (passwords are never stored in plain text)'

        cy.get('[data-test-id="signup-statement"]').should('have.text', statement)
    })

    describe('When login data is entered, and...', () => {
        
        it('Password is not entered, appropriate error msg is shown', () => {
            // cy.get('[data-test-id="username-input"]').type('wrong username')
            cy.visit('localhost:4200')

            cy.get('[data-test-id="username-input"]').type('wrong username')
            cy.get('[data-test-id="user-submit-button"]').click()

            cy.get('div.error-wrapper').then(el => {                
                expect(el.text()).to.include('Password is required')
            })
        })

        it('Username is not valid, appropriate error msg is shown', () => {
            // cy.get('[data-test-id="username-input"]').type('wrong username')
            cy.visit('localhost:4200')

            cy.get('[data-test-id="password-input"]').type('wrong password')
            cy.get('[data-test-id="user-submit-button"]').click()

            cy.get('div.error-wrapper').then(el => {                
                expect(el.text()).to.include('Username is required')
            })
        })
    })

    describe('After registering', () => {
        const userName = uuidv1()
        const password = uuidv1()

        Cypress.Commands.add('login', ()=>{
            cy.get('[data-test-id="password-input"]').type(password)
            cy.get('[data-test-id="username-input"]').type(userName)
            cy.get('[data-test-id="user-form"]').submit()
        })

        it('user is presented with the login screen', () => {
            cy.login()
            cy.get('[data-test-id="login-statement"]').should('be.visible')
        })
    })

    describe('when server returns x', () => {
        it('makes an request to auth', () => {
            cy.server()

            cy.route('GET', 'http://localhost:4200/api/user/auth').as('authReq')
            // cy.request('')

            cy.visit('localhost:4200')

            cy.wait('@authReq')

            cy.get('@authReq').should(res => {
                expect(res.responseBody).to.have.property('authenticated')
                expect(res.responseBody.authenticated).to.eq(false)
            })

        })
    })

})