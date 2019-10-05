import { BasePage } from './basePage.po'
import uuid from 'uuidv4'

export class TodosPage extends BasePage {
    navigateTo() {
        this.navigate('/')
        this.signupAndLogin()
        this.waitForURLChange('todo')
    }

    signupAndLogin() {
        const userName = uuid()
        const password = 'password'

        const usernameInput = this.getElement('[data-test-id="username-input"]')
        usernameInput.sendKeys(userName)

        const passwordInput = this.getElement('[data-test-id="password-input"]')
        passwordInput.sendKeys(password)

        this.clickButton('[data-test-id="user-submit-button"]')

        usernameInput.sendKeys(userName)
        passwordInput.sendKeys(password)

        this.clickButton('[data-test-id="user-submit-button"]')
    }

    getTodosStatement() {
        return this.getText('[data-test-id="todos-statement"]')
    }

    submitTodos(todos: string[]) {
        const todoInput = this.getElement('[data-test-id="todo-input"]')

        for (let i = 0; i < todos.length; i++) {
            todoInput.sendKeys(todos[i])
            this.clickButton('[data-test-id="todo-submit-btn"]')
        }
    }

    getTodos() {
        return this.getElement('[data-test-id="todo"]')
    }
}