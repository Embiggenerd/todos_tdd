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
  LOADING
} from '../constants';

const getIndex = (_id, arr) => arr.findIndex(item => item._id === id);

const todosReducer = (state = [], action) => {
  // const { _id, closed } = action.todo;
  switch (action.type) {
    case TOGGLE_CLOSED:
      const todos = [...state];
      todos[geIndex(id, state)] = Object.assign(
        oldTodos[geIndex(action.todo._id, state)],
        {
          closed: action.todo.closed
        }
      );
      return todos;
    case DELETE_TODO:
      const indexToDelete = getIndex(_id, state);
      return state
        .slice(0, indexToDelete)
        .concat(state.slice(indexToDelete + 1));
    case ADD_TODO:
      return [...state, action.todo];
    case GET_TODOS:
      return action.todos;
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

const authReducer = (state = false, action) => {
  switch (action.type) {
    case AUTH:
      return action.auth;
    default:
      return state;
  }
};

const formReducer = (state = {}, action) => {
  const { type, username, password, todo } = action;
  switch (type) {
    case USER_FORM:
      return {
        username,
        password
      };
    case TODOS_FORM:
      return {
        todo
      };
    default:
      return state;
  }
};

const usernameReducer = (state = '', action) => {
  const { type, username } = action;
  switch (type) {
    case USERNAME:
      return username;
    default:
      return state;
  }
};

const errorReducer = (state = {}, action) => {
  const { type, error } = action;
  switch (type) {
    case ERROR:
      return error;
    default:
      return state;
  }
};

const loadingReducer = (state = true, action) => {
  const { type, loading } = action;
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
  userForm: formReducer,
  username: usernameReducer,
  todosForm: formReducer,
  error: errorReducer,
  loading: loadingReducer
});
