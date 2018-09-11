import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import axios from 'axios';

import TodoApp from '../index';
import store from '../../../store';

jest.mock('axios');

const render = state =>
  mount(
    <Provider store={store(state)}>
      <TodoApp />
    </Provider>
  );

const flushAllPromises = () => new Promise(resolve => setTimeout(resolve, 0));

test();
