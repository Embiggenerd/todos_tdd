import React from 'react';
import ErrorModal from '../ErrorModal';
import { mount } from 'enzyme';

describe('<ErrorModal/>', function() {
  let wrapper;
  const errMock = {
    name: 'error name',
    message: 'error message'
  };
  before(function() {
    wrapper = mount(
      <body>
        <ErrorModal error={errMock} onClose={() => {}} />
      </body>
    );
  });
  after(function() {
    wrapper.unmount();
  });
  it('renders the error message', function() {
    expect(wrapper.contains('error name')).to.equal(true);
    // expect(
    //   wrapper
    //     .find('.modal')
    //     .at(0)
    //     .text()
    // ).to.contain('error name');
  });
});
