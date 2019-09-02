import { SignupPage } from './signup.po'

import { internet } from 'faker'

describe('Signup Page', () => {
    let page: SignupPage;

    beforeEach(() => {
        page = new SignupPage();
    });

    it('Displays info about signing up', () => {
        page.navigateTo()
        expect(page.getSignupStatement()).toBe('Please signup with a unique username and password (passwords are never stored in plain text)')
    })

    describe('When signu[] button is clicked', ()=> {
        const userName = internet.userName()
        const password = internet.password()

        it('Dislays appropriate error message if no username or password is provided', () => {
            page.clickSubmitButton()
            expect(page.getErrorText()).toBe('Username is required!')
        })

        it('Displays appropriate error message if no password is provided', () => {
            page.submitUsername("lala")
            page.clickSubmitButton()
            expect(page.getErrorText()).toBe('Password is required!')
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
            expect(page.getLoginStatement()).toBe('Please log in with your username and password.')
        })

        describe('When login button is clicked', () => {
            
        })

        // it('Displays appropriate error message when stale username is submitted', () => {
        //     page.submitUsername(userName)
        //     page.submitPassword(password)
        //     expect(page.getErrorText()).toBe('.')
        // })
    })



})