import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';
import App from '../App';

/**
 * Large test describes the structure and logic of the app.
 * <App/> component is the most important and passes down
 * props to children, which defines their behavior. So, mounting
 * the parent component, then testing the output given various inputs
 * feels like a good testing and app building protocol.
 */

describe('<App />', () => {
  describe('When state.loading is true,', function() {
    let wrapper;
    before(function() {
      App.prototype.getTodos = function() {};
      wrapper = mount(<App />);
    });
    after(function() {
      wrapper.unmount;
    });
    it('it renders loading component', function() {
      expect(wrapper.contains('Loading...')).to.equal(true);
    });
  });
  describe('when state.loading is false,', function() {
    let wrapper;
    before(function() {
      App.prototype.getTodos = function() {
        this.setState({ loading: false });
      };
      wrapper = mount(<App />);
    });
    after(function() {
      wrapper.unmount();
    });

    describe('and when state.auth is', function() {
      describe('false', function() {
        it('user is told to login or register', function() {
          wrapper.setState({ auth: false });
          expect(wrapper.contains('Please login or register')).to.equal(true);
        });
        it('sidebar displays links to login and register', function() {
          expect(wrapper.find('#login-btn')).to.have.length(1);
          expect(wrapper.find('#register-btn')).to.have.length(1);
        });
        it('and state.userFormDisplay is "register", register form is displayed', function() {
          wrapper.setState({ userFormDisplay: 'register' });
          expect(
            wrapper.contains(
              'We only store the hashed + salted values of your password!'
            )
          ).to.equal(true);
        });
        it('and state.userFormDisplay is "login", register form is displayed', function() {
          wrapper.setState({ userFormDisplay: 'login' });
          expect(
            wrapper.contains("If you can't remember your password, too bad!")
          ).to.equal(true);
        });
        it('clicking on register in sidebar displays register form', function() {
          expect(wrapper.find('#signup-username')).to.have.length(0);
          expect(wrapper.find('#register-btn').simulate('click'));
          expect(wrapper.find('#signup-username')).to.have.length(1);
        });
        it('clicking on login in sidebar displays login form', function() {
          expect(wrapper.find('#login-username')).to.have.length(0);
          expect(wrapper.find('#login-btn').simulate('click'));
          expect(wrapper.find('#login-username')).to.have.length(1);
        });
      });

      describe('true, and state.todos is ', function() {
        it('empty, user is told to submit a todo,', function() {
          wrapper.setState({ auth: true, todos: [] });
          expect(wrapper.contains('Submit a todo!')).to.equal(true);
        });
        it('and given a form to submit', function() {
          expect(wrapper.find('#todos-form')).to.have.length(1);
        });
        it('not empty, user is displayed a list of his todos', function() {
          wrapper.setState({
            todos: [{ todo: 'cut hair' }, { todo: 'eat carrots' }]
          });
          expect(wrapper.contains('cut hair')).to.equal(true);
          expect(wrapper.contains('eat carrots')).to.equal(true);
        });
        it('and given a form to submit', function() {
          expect(wrapper.find('#todos-form')).to.have.length(1);
        });
      });
    });
  });
});
