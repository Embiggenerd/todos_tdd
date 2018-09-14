import { combineReducers } from 'redux';
import {
  ERROR,
  TOGGLE_CLOSED,
  DELETE_TODO,
  AUTH,
  USER_FORM_DISPLAY,
  USER_FORM,
  ADD_TODO,
  USERNAME,
  TODOS_FORM,
  GET_TODOS,
  LOADING,
  PASSWORD
} from '../constants';

/**
 * Computed name values in some reducers are a deliberate anti pattern
 */

const getIndex = (_id, arr) => arr.findIndex(item => item._id === _id);

const todosReducer = (state = [], action) => {
  const { type, todo } = action;
  switch (type) {
    case TOGGLE_CLOSED:
      const todos = [...state];
      todos[getIndex(todo._id, state)] = Object.assign(
        todos[getIndex(todo._id, state)],
        {
          closed: todo.closed
        }
      );
      return todos;
    case DELETE_TODO:
      const indexToDelete = getIndex(todo._id, state);
      return state
        .slice(0, indexToDelete)
        .concat(state.slice(indexToDelete + 1));
    case ADD_TODO:
      return [...state, todo];
    case GET_TODOS:
      return [...action.todos];
    default:
      return state;
  }
};

const userFormDisplayReducer = (state = '', action) => {
  const { type, display } = action;
  switch (type) {
    case USER_FORM_DISPLAY:
      return display;
    default:
      return state;
  }
};

const authReducer = (state = false, { type, auth }) => {
  switch (type) {
    case AUTH:
      return auth;
    default:
      return state;
  }
};

const passwordFormReducer = (state = '', { key, text }) => {
  switch (key) {
    case PASSWORD:
      return text;
    default:
      return state;
  }
};

const usernameFormReducer = (state = '', { key, text }) => {
  switch (key) {
    case USERNAME:
      return text;
    default:
      return state;
  }
};
const userFormReducer = (
  state = { username: '', password: '' },
  { type, text, key }
) => {
  switch (type) {
    case USER_FORM:
      return {
        password: passwordFormReducer(state.password, { key, text }),
        username: usernameFormReducer(state.username, { key, text })
      };
    default:
      return state;
  }
};

const todosFormReducer = (state = { todo: '' }, { type, text, key }) => {
  switch (type) {
    case TODOS_FORM:
      return {
        [key]: text,
        closed: false
      };
    default:
      return state;
  }
};

const usernameReducer = (state = '', { type, username }) => {
  switch (type) {
    case USERNAME:
      return username;
    default:
      return state;
  }
};

const errorReducer = (state = {}, { type, error }) => {
  switch (type) {
    case ERROR:
      return error;
    default:
      return state;
  }
};

const loadingReducer = (state = true, { type, loading }) => {
  switch (type) {
    case LOADING:
      return loading;
    default:
      return state;
  }
};

export default combineReducers({
  todos: todosReducer,
  auth: authReducer,
  userFormDisplay: userFormDisplayReducer,
  userForm: userFormReducer,
  username: usernameReducer,
  todosForm: todosFormReducer,
  error: errorReducer,
  loading: loadingReducer
});
