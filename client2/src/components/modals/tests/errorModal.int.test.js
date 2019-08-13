import React from 'react';
import Modal from '../Modal';
import { shallow } from 'enzyme';

const props = {
  name: 'goofy name',
  message: 'goofy message'
};

const modal = shallow(<Modal {...props} />);

it('modal renders with right name and message', function() {
  expect(modal.text()).toContain(props.name);
  expect(modal.text()).toContain(props.message);
});
