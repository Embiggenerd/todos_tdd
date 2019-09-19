const uuidv1 = require('uuid/v1');

describe('My First Test', function () {
    it('Title should include todos-tdd', function () {
        cy.visit('localhost:4200')
        cy.title().should('include', 'TodosTdd')
    })

    it('Should display a signup message', () => {
        const statement = 'Please signup with a unique username and password (passwords are never stored in plain text)'

        cy.get('[data-test-id="signup-statement"]').should('have.text', statement)
    })

    describe('When login data is entered, and...', () => {
        const userName = uuidv1()
        const password = uuidv1()

        it('Username is not valid, appropriate error msg is shown', () => {
            // cy.get('[data-test-id="username-input"]').type('wrong username')
            cy.get('[data-test-id="password-input"]').type('wrong password')
            cy.get('[data-test-id="user-submit-button"]').click()

            cy.get('div.error-wrapper').then(el => {                
                expect(el.text()).to.include('username is required')
            })
        })

        it('Username is not valid, appropriate error msg is shown', () => {
            // cy.get('[data-test-id="username-input"]').type('wrong username')
            cy.get('[data-test-id="password-input"]').type('wrong password')
            cy.get('[data-test-id="user-submit-button"]').click()

            cy.get('div.error-wrapper').then(el => {                
                expect(el.text()).to.include('password is required')
            })
        })
    })

})