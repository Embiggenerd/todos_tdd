import { combineReducers } from 'redux';
import {
  ERROR,
  TOGGLE_CLOSED,
  DELETE_TODO,
  AUTH,
  USER_FORM_DISPLAY,
  USER_FORM,
  ADD_TODO,
  USERNAME
} from '../constants';

const getIndex = (_id, arr) => arr.findIndex(item => item._id === id);

const todosReducer = (state = [], action) => {
  const { _id, closed } = action.todo;
  switch (action.type) {
    case TOGGLE_CLOSED:
      const todos = [...state];
      todos[geIndex(id, state)] = Object.assign(oldTodos[geIndex(_id, state)], {
        closed
      });
      return todos;
    case DELETE_TODO:
      const indexToDelete = getIndex(_id, state);
      return state
        .slice(0, indexToDelete)
        .concat(state.slice(indexToDelete + 1));
    case ADD_TODO:
      return [...state, action.todo];
  }
};

const userFormDisplayReducer = (state = '', action) => {
  const { type, display } = action;
  switch (type) {
    case USER_DISPLAY_FORM:
      return display;
  }
};

const authReducer = (state = false, action) => {
  switch (action.type) {
    case AUTH:
      return action.auth;
  }
};

const userFormReducer = (state = { username: '', password: '' }, action) => {
  const { type, username, password } = action;
  switch (type) {
    case USER_FORM:
      return {
        username,
        password
      };
  }
};

const usernameReducer = (state = '', action) => {
  const { type, username } = actio;
  switch (type) {
    case USERNAME:
      return username;
  }
};

export default combineReducers({
  todos: todosReducer,
  auth: authReducer,
  userSubmitFormDisplay: userFormDisplayReducer,
  auth: authReducer,
  userForm: userFormReducer,
  username: usernameReducer
});

// const toggleClosed = res => {
//   console.log("res.data.todo.closed", res.data.todo.closed);
//   const oldTodos = [...this.state.todos];
//   oldTodos[getIndex(id, oldTodos)] = Object.assign(
//     oldTodos[getIndex(id, oldTodos)],
//     { closed: res.data.todo.closed }
//   );
//   const newTodos = [...oldTodos];
//   this.setState({
//     todos: newTodos
//   });
// };
// const deleteTodo = res => {
//   const todoIndex = getIndex(res.data.todo._id, this.state.todos);
//   const newTodos = this.state.todos
//     .slice(0, todoIndex)
//     .concat(this.state.todos.slice(todoIndex + 1));
//   this.setState({
//     todos: newTodos
//   });
// };
