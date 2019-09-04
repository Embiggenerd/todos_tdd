import { SignupPage } from './signup.po'

import { internet } from 'faker'
import { ARIA_DESCRIBER_PROVIDER } from '@angular/cdk/a11y';

describe('Signup Page', () => {
    let page: SignupPage;

    beforeEach(() => {
        page = new SignupPage();
    });

    it('Displays info about signing up', () => {
        page.navigateTo()
        expect(page.getSignupStatement()).toBe('Please signup with a unique username and password (passwords are never stored in plain text)')
    })

    describe('When toggle form button is clicked,', () => {
        it('Switches form from signup to login', () => {
            page.clickToggleUserFormButton()
            expect(page.getLoginStatement()).toBe('Please log in with your username and password')
        })

        it('Then from login to signup', () => {
            page.clickToggleUserFormButton()
            expect(page.getSignupStatement()).toBe('Please signup with a unique username and password (passwords are never stored in plain text)')
        })

    })

    describe('When submit button is clicked', () => {
        const userName = internet.userName()
        const password = internet.password()

        it('Displays appropriate error message if no username or password is provided', () => {
            page.clickSubmitButton()
            expect(page.getErrorText()).toBe('Username is required!')
        })

        it('Displays appropriate error message if no password is provided', () => {
            page.submitUsername(userName)
            page.clickSubmitButton()
            expect(page.getErrorText()).toBe('Password is required!')
        })


        it('Changes submit statement when good username and password data is submitted', () => {
            page.submitUsername(userName)
            page.submitPassword(password)
            page.clickSubmitButton()
            expect(page.getLoginStatement()).toBe('Please log in with your username and password')
        })

        describe('and the user has signed up,', () => {
            it('And the data is invalid, url does not change to todos and an appropriate error appears', () => {
                page.submitUsername(userName + 'a')
                page.submitPassword(password)
                page.clickSubmitButton()
                expect(page.getURL()).toBe('http://localhost:4200/signup')
                expect(page.getErrorText()).toBe(`Try again!`)
            })

            it('And the data is valid, url points to todos ', () => {
                page.submitUsername(userName)
                page.submitPassword(password)
                page.clickSubmitButton()
                expect(page.getURL()).toBe('http://localhost:4200/todos')
            })
        })

        describe('When logout button is clicked', () => {
            it('The URL goes back to signup', () => {
                page.clickLogoutButton()
                expect(page.getURL()).toBe('http://localhost:4200/signup')
            })

            it('The logout button is not displayed', ()=>{
                // page.wait(1)
                expect(page.exists('[data-test-id="logout-button"]')).toBeFalsy()
            })
        })
    })



})