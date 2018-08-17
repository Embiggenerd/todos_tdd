import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import App from '../App';

describe('<App />', () => {
  it('calls componentDidMount', function() {
    spy(App.prototype, 'componentDidMount');
    const wrapper = mount(<App />);
    expect(App.prototype.componentDidMount).to.have.property('callCount', 1);
    wrapper.unmount();
  });
  it('sets state.loading to false on mount', function() {
    const wrapper = mount(<App />);
    expect(wrapper.state().loading).to.equal(false);
    wrapper.unmount();
  });

  describe('When state.loading is,', function() {
    it('true, renders loading component', function() {
      const wrapper = mount(<App />);
      wrapper.setState({ loading: true });
      // console.log(wrapper.props());
      // console.log(wrapper.children());
      console.log('chilfs', wrapper.find('div').children());
      expect(wrapper.find('div').children()).to.contain('Loading...');
      wrapper.unmount();
    });
  });

  describe('When getTodos returns 401, it', function() {
    it('');
  });
});
