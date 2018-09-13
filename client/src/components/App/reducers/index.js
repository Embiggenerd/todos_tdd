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

const getIndex = (_id, arr) => arr.findIndex(item => item._id === _id);

const todosReducer = (state = [], action) => {
  const { type, todo } = action;
  switch (type) {
    case TOGGLE_CLOSED:
      console.log('TOGGL_CLOSED reducer called');

      const todos = [...state];
      todos[getIndex(todo._id, state)] = Object.assign(
        todos[getIndex(todo._id, state)],
        {
          closed: todo.closed
        }
      );
      return todos;
    case DELETE_TODO:
      console.log('DELET_TODO reducer called');
      const indexToDelete = getIndex(todo._id, state);
      return state
        .slice(0, indexToDelete)
        .concat(state.slice(indexToDelete + 1));
    case ADD_TODO:
      return [...state, todo];
    case GET_TODOS:
      console.log('get_todos reducer called with action', action);
      return [...action.todos];
    default:
      return state;
  }
};

const userFormDisplayReducer = (state = '', action) => {
  const { type, display } = action;
  switch (type) {
    case USER_FORM_DISPLAY:
      console.log('USER_FORM_D reducer called', display);
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

// const todosFormReducer = (state = { todo: '', closed: false }, action) => {
//   const { type, text, key } = action;
//   switch (type) {
//     case TODOS_FORM:
//       return {
//         [key]: text,
//         closed: false
//       };
//     default:
//       return state;
//   }
// };

const passwordFormReducer = (state = '', action) => {
  switch (action.key) {
    case PASSWORD:
      return action.text;
    default:
      return state;
  }
};

const usernameFormReducer = (state = '', action) => {
  switch (action.key) {
    case USERNAME:
      return action.text;
    default:
      return state;
  }
};
const userFormReducer = (state = { username: '', password: '' }, action) => {
  const { type, text, key } = action;
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

const todosFormReducer = (state = { todo: '' }, action) => {
  switch (action.type) {
    case TODOS_FORM:
      return {
        [action.key]: action.text,
        closed: false
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
  userForm: userFormReducer,
  username: usernameReducer,
  todosForm: todosFormReducer,
  error: errorReducer,
  loading: loadingReducer
});
