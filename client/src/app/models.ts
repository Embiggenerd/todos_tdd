export class User {
    id?: number
    username: string
    password?: string
}

export class Todo {
    _id?: string
    closed: boolean
    todo: string
    user: string
}

export class A {
    authenticated: boolean
  } 