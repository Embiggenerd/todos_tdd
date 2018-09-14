import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import axios from 'axios';

import TodoApp from '../index';
import store from '../../../store';
import {
  authedTodosListMockState,
  unauthedLoginFormMockState,
  unauthedSignupFormMockState,
  unauthedMockState
} from './mocks';

jest.mock('axios');

const render = state =>
  mount(
    <Provider store={store(state)}>
      <TodoApp />
    </Provider>
  );

const flushAllPromises = () => new Promise(resolve => setTimeout(resolve, 0));

describe('When getTodos returns todos,', function() {
  const data = {
    todos: [
      {
        todo: 'train elephants',
        closed: true
      },
      {
        todo: 'enlighten the masses',
        closed: false
      }
    ]
  };

  axios.get.mockReturnValueOnce(new Promise(resolve => resolve({ data })));
  const component = render();

  it('loading screen goes away', async function() {
    expect(component.find('[data-test-id="loading-screen"]').exists()).toBe(
      true
    );

    await flushAllPromises();
    component.update();

    expect(component.find('[data-test-id="loading-screen"]').exists()).toBe(
      false
    );
  });
  it('a list of the right todos is displayed', function() {
    expect(component.find('[data-test-id="todos-list"]').exists()).toBe(true);
    expect(component.find('[data-test-id="todos-li-0"]').text()).toContain(
      data.todos[0].todo
    );
    expect(component.find('[data-test-id="todos-li-1"]').text()).toContain(
      data.todos[1].todo
    );
  });

  it('a todos form is presented', function() {
    expect(component.find('[data-test-id="todos-form"]').exists()).toBe(true);

    component.unmount();
  });
});

describe('when getTodos returns empty array', function() {
  axios.get.mockReturnValueOnce(
    new Promise(resolve => resolve({ data: { todos: [] } }))
  );
  axios.post.mockImplementationOnce(
    (url, body) =>
      new Promise(resolve =>
        resolve({
          data: {
            todo: body
          }
        })
      )
  );
  const todo = 'race the wind';
  const component = render();
  it('user is asked to submit a todo', async function() {
    await flushAllPromises();
    component.update();

    expect(component.find('[data-test-id="empty-todos-list"]').text()).toMatch(
      'Submit a todo!'
    );
  });

  it('on submission, todo appears in state.todos', async function() {
    component
      .find('[data-test-id="todos-input"]')
      .simulate('change', { target: { value: todo } });
    component.update();
    component.find('[data-test-id="todos-form"]').simulate('submit');

    await flushAllPromises();
    component.update();

    expect(component.find('[data-test-id="empty-todos-list"]').exists()).toBe(
      false
    );
    expect(component.find('[data-test-id="todos-li-0"]').text()).toMatch(todo);
    component.unmount();
  });
});

describe('when getTodos rejects', function() {
  axios.get.mockReturnValueOnce(
    new Promise((resolve, reject) => reject({ error: 'some error' }))
  );
  const component = render();

  it('user is told to log in', async function() {
    await flushAllPromises();
    component.update();

    const greetingText = component
      .find('[data-test-id="user-greeting"]')
      .text();
    expect(greetingText).toMatch('Please login or register');

    component.unmount();
  });
});

describe('clicking the delete button', function() {
  axios.post.mockImplementationOnce(
    (url, { id }) =>
      new Promise(resolve =>
        resolve({
          data: {
            todo: {
              _id: id
            }
          }
        })
      )
  );
  const component = render(authedTodosListMockState);
  it('takes a todo out of the list', async function() {
    expect(component.find('[data-test-id="todos-list"]').exists()).toBe(true);
    expect(component.find('[data-test-id="todos-li-0"]').text()).toContain(
      authedTodosListMockState.todos[0].todo
    );
    component
      .find('[data-test-id="delete-button"]')
      .at(0)
      .simulate('click');
    await flushAllPromises();
    component.update();

    expect(component.find('[data-test-id="todos-li-0"]').text()).not.toContain(
      authedTodosListMockState.todos[0].todo
    );
    component.unmount();
  });
});

describe('clicking the toggle closed button', function() {
  axios.post.mockImplementationOnce(
    (url, { id }) =>
      new Promise(resolve =>
        resolve({
          data: {
            todo: {
              _id: id
            }
          }
        })
      )
  );
  const component = render(authedTodosListMockState);

  it('toggles closed status', async function() {
    expect(component.find('[data-test-id="todos-list"]').exists()).toBe(true);
    expect(component.find('[data-test-id="todos-li-0"]').text()).toContain(
      'Undo'
    );
    expect(component.find('[data-test-id="todos-li-0"]').text()).not.toContain(
      'Done'
    );
    component
      .find('[data-test-id="toggle-closed-button"]')
      .at(0)
      .simulate('click');

    await flushAllPromises();
    component.update();

    expect(component.find('[data-test-id="todos-li-0"]').text()).not.toContain(
      'Undo'
    );
    expect(component.find('[data-test-id="todos-li-0"]').text()).toContain(
      'Done'
    );
    component.unmount();
  });
});

describe('when the signup button is clicked', function() {
  const component = render(unauthedLoginFormMockState);

  it('login form goes away', function() {
    expect(component.find('[data-test-id="login-form"]').exists()).toBe(true);

    component.find('[data-test-id="signup-button"]').simulate('click');

    expect(component.find('[data-test-id="login-form"]').exists()).toBe(false);
  });
});

describe('when signup button is clicked', function() {
  const user = {
    username: 'frederico yuang',
    password: 'stars'
  };
  axios.get.mockReturnValueOnce(
    new Promise((resolve, reject) => reject({ error: 'hithere' }))
  );
  axios.post.mockImplementation((url, body) => {
    return new Promise(resolve =>
      resolve({
        data: {
          user: body
        }
      })
    );
  });
  const component = render(unauthedMockState);

  it('signup form appears', async function() {
    component.find('[data-test-id="signup-button"]').simulate('click');
    expect(component.find('[data-test-id="signup-form"]').exists()).toBe(true);
  });

  it('when sign up form is submited, login form appears', async function() {
    const usernameInput = component.find(
      '[data-test-id="signup-username-input"]'
    );
    const passwordInput = component.find(
      '[data-test-id="signup-password-input"]'
    );
    const userForm = component.find('[data-test-id="signup-form"]');

    usernameInput.simulate('change', { target: { value: user.username } });
    passwordInput.simulate('change', { target: { value: user.username } });
    userForm.simulate('submit');

    await flushAllPromises();
    component.update();

    expect(component.find('[data-test-id="login-form"]').exists()).toBe(true);
  });
  it('when login form is submitted, empty todos list appears', async function() {
    component.find('[data-test-id="login-form"]').simulate('submit');

    await flushAllPromises();
    component.update();

    expect(component.find('[data-test-id="empty-todos-list"]').exists()).toBe(
      true
    );
  });
  it('and the username appears in the header', function() {
    expect(component.find('[data-test-id="header"]').text()).toContain(
      user.username
    );
    axios.post.mockReset();
  });
});

describe('when you click the logout button', function() {
  axios.get.mockImplementation(url => {
    if (url === 'http://localhost:3000/user/logout') {
      return new Promise(resolve => resolve({ hithere: 'hithere' }));
    }
    return new Promise((resolve, reject) => reject({ error: 'hithere' }));
  });

  const component = render(authedTodosListMockState);

  it('todos list disappears', async function() {
    expect(component.find('[data-test-id="todos-list"]').exists()).toBe(true);
    component.find('[data-test-id="logout-button"]').simulate('click');

    await flushAllPromises();
    component.update();

    expect(component.find('[data-test-id="todos-list"]').exists()).toBe(false);
  });

  it('and user is told to log back in', function() {
    expect(component.find('[data-test-id="user-greeting"]').text()).toMatch(
      'Please login or register'
    );
    axios.post.mockRestore();
    component.unmount();
  });
});

describe('when the login button is clicked', function() {
  const component = render(unauthedSignupFormMockState);
  it('signup form goes away and login form appears', function() {
    expect(component.find('[data-test-id="signup-form"]').exists()).toBe(true);

    component.find('[data-test-id="login-button"]').simulate('click');

    expect(component.find('[data-test-id="signup-form"]').exists()).toBe(false);
    expect(component.find('[data-test-id="login-form"]').exists()).toBe(true);
    component.unmount();
  });
});

describe('when the user is authenticated', function() {
  const component = render(authedTodosListMockState);
  it('the header displayed the user name', function() {
    expect(component.find('[data-test-id="header"]').text()).toContain(
      authedTodosListMockState.username
    );
    component.unmount();
  });
});
