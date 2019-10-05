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

        expect(todos[0]).toContain(todo1)
        expect(todos[1]).toContain(todo2)
    })

})