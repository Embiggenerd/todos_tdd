import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import moxios from "moxios";
import store from '../../../store'
import TodoApp from "../index";

const render = () =>
  mount(
    <Provider store={store()}>
      <TodoApp />
    </Provider>
  );

describe("connected <App/> test", function() {
  before(function() {
    moxios.install();
  });
  after(function() {
    moxios.uninstall();
  });

  describe("before getTodos is called, ", function() {
    const component = render();
    it("loading screen is present", function() {
      expect(component.find('[data-test-id="loading-screen"]').text()).to.equal('Loading...')
    });
  });
  describe("after todos is called, ")
    it("loading screen goes away")
});
