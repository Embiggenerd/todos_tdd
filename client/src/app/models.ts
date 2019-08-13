export class User {
    id?: number
    username: string
    password?: string
}

export class Todo {
    closed: boolean
    todo: string
    user: string
}