import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import moxios from 'moxios';
import store from '../../../store';
import TodoApp from '../index';
import { stub, spy } from 'sinon';
// import axios from 'axios';

const render = () =>
  mount(
    <Provider store={store()}>
      <TodoApp />
    </Provider>
  );

describe('connected <App/> test', function() {
  beforeEach(function() {
    moxios.install();
  });
  afterEach(function() {
    moxios.uninstall();
  });

  describe('before getTodos is called,', function() {
    const component = render();
    it('loading screen is present', function() {
      expect(
        component.find('[data-test-id="loading-screen"]').exists()
      ).to.equal(true);
    });
    component.unmount();
  });

  describe('after todos is called, ', function() {
    const error = {
      name: 'Error name.',
      message: 'Error message'
    };
    const todos = [
      {
        todo: 'enlighten masses',
        closed: false
      },
      {
        todo: 'train elephant',
        closed: true
      }
    ];
    const component = render();
    it('loading screen goes away', function() {
      moxios.stubRequest('http://localhost:3000/todos/get', {
        status: 401,
        error
      });
      component.update();
      expect(
        component.find('[data-test-id="loading-screen"]').exists()
      ).to.equal(false);
    });
    it('user is told to register or login if unauthorized', function() {
      expect(component.find('[data-test-id="user-greeting"]').text()).to.equal(
        'Please login or register'
      );
      expect(component.find('[data-test-id="error-modal"]').exists()).to.equal(
        false
      );
    });
    it('user is displayed a todos form and list when authorized', function() {
      moxios.stubRequest('http://localhost:3000/todos/get', {
        status: 200,
        data: { todos }
      });
      component.update();
      expect(
        component.find('[data-test-id="user-greeting"]').exists()
      ).to.equal(false);
      expect(component.find('[data-test-id="todos-list"]').exists()).to.equal(
        true
      );
      // expect(component.find('[data-test-id="todos-list"]').exists()).to.equal(
      //   true
      // );
      expect(
        component
          .find('[data-test-class="todos-li"]')
          .at(0)
          .text()
      ).to.deepContain(todos[0].todo);
      expect(
        component
          .find('[data-test-class="todos-li"]')
          .at(1)
          .text()
      ).to.deepContain(todos[1].todo);
      expect(component.find('[data-test-id="todos-form"]').exists()).to.equal(
        true
      );
    });
  });
});
