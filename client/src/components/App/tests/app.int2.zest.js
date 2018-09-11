import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../../../store';
import TodoApp from '../index';
import { stub, spy } from 'sinon';
import {
  authedTodosListMockState,
  authedEmptyTodosListMockState,
  unauthedTodosListMockState,
  unauthedSignupFormMockState,
  unauthedLoginFormMockState
} from './mocks';

const render = state =>
  mount(
    <Provider store={store(state)}>
      <TodoApp />
    </Provider>
  );

describe('before getTodos is called', function() {
  test('loading screen is present', function() {
    const component = render({});

    expect(component.find('[data-test-id="loading-screen"]').exists()).to.equal(
      true
    );
    component.unmount();
  });
});

describe('after getTodos is called', function() {
  test('loading screen goes away', function() {
    const component = render({ loading: false });
    expect(component.find('[data-test-id="loading-screen"]').exists()).to.equal(
      false
    );
    component.unmount();
  });
});

describe('when user is authorized', function() {
  it('list of todos is displayed', function() {
    const component = render(authedTodosListMockState);
    expect(component.find('[data-test-id="todos-list"]').exists()).to.equal(
      true
    );
    expect(component.find('[data-test-id="todos-li-0"]').text()).to.contain(
      authedTodosListMockState.todos[0].todo
    );
    expect(component.find('[data-test-id="todos-li-1"]').text()).to.contain(
      authedTodosListMockState.todos[1].todo
    );
  });
  it('empty list of todos is not displayed', function() {
    const component = render(authedEmptyTodosListMockState);
    expect(component.find('[data-test-id="todos-list"]').exists()).to.equal(
      false
    );
    expect(component.find('[data-test-id="todos-li-0"]').exists()).to.equal(
      false
    );

    expect(component.find('[data-test-id="todos-li-1"]').exists()).to.equal(
      false
    );
    component.unmount();
  });
});

describe('when user is not authorized', function() {
  const component = render(unauthedTodosListMockState);

  it('user greeting screen is displayed', function() {
    expect(component.find('[data-test-id="user-greeting"]').exists()).to.equal(
      true
    );
  });
  it('todos list is not displayed', function() {
    expect(component.find('[data-test-id="todos-list"]').exists()).to.equal(
      false
    );
    component.unmount();
  });
});

describe('when unauthorized and signup button is clicked', function() {
  it('signup form is displayed', function() {
    const component = render(unauthedSignupFormMockState);
    expect(component.find('[data-test-id="signup-form"]').exists()).to.equal(
      true
    );
    component.unmount();
  });
});

describe('when unauthorized and login button is clicked', function() {
  it('login form is displayed', function() {
    const component = render(unauthedLoginFormMockState);

    expect(component.find('[data-test-id="login-form"]').exists()).to.equal(
      true
    );
    component.unmount();
  });
});

// const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

// describe('connected <App/> test', function() {
//   before(function() {});
//   after(function() {});

//   describe('before getTodos is called,', function() {
//     const component = render();
//     it('loading screen is present', function() {
//       expect(
//         component.find('[data-test-id="loading-screen"]').exists()
//       ).to.equal(true);
//       component.unmount();
//     });
//   });

//   describe('after getTodos is called with 401, ', function() {
//     const error = {
//       name: 'Error name.',
//       message: 'Error message'
//     };
//     const component = render();
//     it('loading screen goes away', function() {
//       // console.log('propz-2', component.find('App').props());

//       component.update();
//       // console.log('propz-1', component.find('App').props());

//       expect(
//         component.find('[data-test-id="loading-screen"]').exists()
//       ).to.equal(false);
//     });
//     it('user is told to register or login if unauthorized', function() {
//       expect(component.find('[data-test-id="user-greeting"]').text()).to.equal(
//         'Please login or register'
//       );
//     });
//     it('user is not given an error warning', function() {
//       expect(component.find('[data-test-id="error-modal"]').exists()).to.equal(
//         false
//       );
//       component.unmount();
//     });
//   });

//   describe('after getTodos is called with 200', function() {
//     const todos = [
//       {
//         todo: 'enlighten masses',
//         closed: false
//       },
//       {
//         todo: 'train elephant',
//         closed: true
//       }
//     ];
//     before(function() {
//       // moxios.stubRequest('http://localhost:3000/todos/get', {
//       // status: 200,
//       // data: {
//       //   todos
//       // }
//       // });
//     });
//     const component = render();

//     it('loading screen goes away', function() {
//       // moxios.stubRequest('http://localhost:3000/todos/get', {
//       //   status: 200,
//       //   data: { todos }
//       // });

//       // console.log('propz-0', component.find('App').props());
//       // flushAllPromises();
//       component.update();
//       // console.log('rezent', moxios.requests.mostRecent());
//       // flushAllPromises();
//       // component.update();
//       // console.log('propz1', component.find('App').props());
//       expect(
//         component.find('[data-test-id="loading-screen"]').exists()
//       ).to.equal(false);
//     });
//     it('user greeting is not displayed', function() {
//       expect(
//         component.find('[data-test-id="user-greeting"]').exists()
//       ).to.equal(false);
//     });
//     it('user is displayed a todos form and list when authorized', function() {
//       expect(component.find('[data-test-id="todos-list"]').exists()).to.equal(
//         true
//       );
//       expect(component.find(['data-test-id="todos-li-0"']).text()).to.equal(
//         todos[0].todo
//       );
//       expect(component.find(['data-test-id="todos-li-1"']).text()).to.equal(
//         todos[1].todo
//       );

//       // expect(
//       //   component.find('[data-test-id="user-greeting"]').exists()
//       // ).to.equal(false);
//       // expect(component.find('[data-test-id="todos-list"]').exists()).to.equal(
//       //   true
//       // );
//       // expect(component.find('[data-test-id="todos-list"]').exists()).to.equal(
//       //   true
//       // );

//       // expect(
//       //   component
//       //     .find('[data-test-class="todos-li"]')
//       //     .at(0)
//       //     .text()
//       // ).to.deepContain(todos[0].todo);
//       // expect(
//       //   component
//       //     .find('[data-test-class="todos-li"]')
//       //     .at(1)
//       //     .text()
//       // ).to.deepContain(todos[1].todo);
//       // expect(component.find('[data-test-id="todos-form"]').exists()).to.equal(
//       //   true
//       // );
//     });
//   });
// });
