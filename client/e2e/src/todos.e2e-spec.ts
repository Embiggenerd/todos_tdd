import { TodosPage } from './todos.po'
import { internet } from 'faker'

fdescribe('todos page', () => {
    let page: TodosPage

    beforeAll(() => {
        page = new TodosPage()
        page.navigateTo()
    })

    it('goes to todos url', ()=> {
        const todoStatement = page.getTodosStatement()
        expect(todoStatement).toBe('What you need to do today:')
    })

    it('displays posted todos', () => {
        const todo1 = 'train elephant'
        const todo2 = 'solve problems'

        page.submitTodos([todo1, todo2])

        const todos = page.getTodos()

        expect(todos.getText()).toContain(todo1)
        expect(todos.getText()).toContain(todo2)
    })

    it('deletes todos', () => {
        const todo1 = 'train elephant'
        page.deleteTodo()

        const todos = page.getTodos()
        expect(todos.getText()).not.toContain(todo1)
    })

    it('can close and open a todo again', () => {
        page.toggleTodo()
        const todo = page.getTodo()
        expect(todo.getCssValue('text-decoration')).toContain('line-through')

        page.toggleTodo()
        expect(todo.getCssValue('text-decoration')).toContain('none')
    })

    it('shows todo detail', () =>{
        const todo = page.getTodo()
        todo.click()

        expect(page.getElement('[data-test-id="todo-detail-input"]').getAttribute('value')).toBe('solve problems')
    })

    it('edits todo', () => {
        page.editTodo('lalala')
        const todo = page.getTodo()
        expect(todo.getText()).toContain("lala")
    })

    it('after logging out, does not display todos', () => {
        expect(page.exists('[data-test-id="todos-list"')).toBeTruthy()
        page.clickButton('[data-test-id="logout-button"]')
        expect(page.exists('[data-test-id="todos-list"')).toBeFalsy()
    })
})