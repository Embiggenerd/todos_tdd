import axios from 'axios';
import {
  ERROR,
  DELETE_TODO,
  TOGGLE_CLOSED,
  AUTH,
  USER_FORM_DISPLAY,
  USERNAME,
  ADD_TODO,
  USER_FORM,
  TODOS_FORM,
  LOADING
} from '../constants';

export const handleTodosButtonClick = (id, url) => {
  return async dispatch => {
    let res;
    try {
      res = await axios.post(`http://localhost:3000/todos/${url}`, { id });
    } catch (e) {
      return dispatch({
        type: ERROR,
        error: e.response.data.error
      });
    }
    switch (url) {
      case 'toggleClosed':
        disatch({
          type: TOGGLE_CLOSED,
          todo: res.data.todo
        });
      case 'deleteTodo':
        dispatch({
          type: DELETE_TODO,
          todoToDelete: res.data.todo
        });
    }
  };
};

export const handleSidebarClick = (e, form) => {
  e.preventDefault();
  return async dispatch => {
    if (form === 'logout') {
      try {
        axios('http://localhost:3000/user/logout');
      } catch (e) {
        return dispatch({
          type: ERROR,
          error: e.response.data.error
        });
      }
      dispatch({
        type: AUTH,
        auth: false
      });
      dispatch({
        type: USER_FORM_DISPLAY,
        display: ''
      });
    } else {
      dispatch({
        type: USER_FORM_DISPLAY,
        display: form
      });
    }
  };
};

export const handleFormSubmit = (e, url) => {
  e.preventDefault();
  e.persist();

  let res;
  return async (dispatch, getState) => {
    const body = url => {
      if (url === '/todos/submit') {
        return {
          todo: getState().todosForm.todo,
          closed: getState().todosForm.closed
        };
      } else {
        return {
          username: getState().userForm.username,
          password: getState().userForm.password
        };
      }
    };
    try {
      res = axios.post(`http://localhost:3000${url}`, body(url));
    } catch (e) {
      return dispatch({
        type: ERROR,
        error: e.response.data.error
      });
    } finally {
      e.target.value = '';
    }
    switch (url) {
      case '/user/signup':
        dispatch({
          type: USER_FORM_DISPLAY,
          display: 'login'
        });
        break;
      case '/user/login':
        dispatch({
          type: AUTH,
          auth: true
        });
        dispatch({
          type: USERNAME,
          username: res.data.user.username
        });
        dispatch({
          type: USER_FORM,
          username: '',
          password: ''
        });

        break;
      case '/todos/submit':
        dispatch({
          type: ADD_TODO,
          todo: res.data.todo
        });
        dispatch({
          type: TODOS_FORM,
          todo: ''
        });

        break;
    }
  };
};

export const handleFieldChange = (e, key, field) => {
  return dispatch => {
    if (!field) {
      return dispatch({
        type: key,
        text: e.target.value
      });
    }
    dispatch({
      type: field,
      key: key,
      text: e.target.value
    });
  };
};

export const getTodos = () => {
  return async dispatch => {
    let res;
    try {
      res = await axios('http://localhost:3000/todos/get');
      dispatch({
        type: AUTH,
        auth: true
      });
      dispatch({
        type: GET_TODOS,
        todos: res.data.todos
      });
    } catch (e) {
      return dispatch({
        type: ERROR,
        error: e.response.data.error
      });
    } finally {
      dispatch({
        type: LOADING,
        loading: false
      });
    }
  };
};

export const handleCloseModal = () => {
  return dispatch => {
    dispatch({
      type: ERROR,
      error: ''
    });
  };
};
