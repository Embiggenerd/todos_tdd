import { BasePage } from './basePage.po'

export class SignupPage extends BasePage {
    navigateTo() {
        return this.navigate('signup')
    }

    getSignupStatement() {
        return this.getText('[data-test-id="signup-statement"]')
    }

    getLoginStatement() {
        return this.getText('[data-test-id="login-statement"]')
    }

    clickSubmitButton() {
        return this.clickButton('[data-test-id="user-submit-button"]')
    }

    getErrorText() {
        return this.getText('[data-test-id="error-message"]')
    }

    submitUsername(userName) {
        const usernameInput = this.getElement('[data-test-id="username-input"]')
        return usernameInput.sendKeys(userName)
    }

    submitPassword(password) {
        const usernameInput = this.getElement('[data-test-id="password-input"]')
        return usernameInput.sendKeys(password)
    }

}