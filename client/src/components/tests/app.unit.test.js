import React from "react";
import { mount, shallow } from "enzyme";
import { spy, stub } from "sinon";
import App from "../App";

describe("<App />", () => {
  it("calls componentDidMount", function() {
    spy(App.prototype, "componentDidMount");
    const wrapper = mount(<App />);
    expect(App.prototype.componentDidMount).to.have.property("callCount", 1);
    wrapper.unmount();
  });
  it("sets state.loading to false on mount", function() {
    const wrapper = mount(<App />);
    expect(wrapper.state().loading).to.equal(false);
    wrapper.unmount();
  });

  describe("When state.loading is,", function() {
    it("true, renders loading component", function() {
      const wrapper = mount(<App />);
      wrapper.setState({ loading: true });
      expect(wrapper.contains("Loading...")).to.equal(true);
      wrapper.unmount();
    });
  });

  describe("when state.auth is", function() {
    describe('false', function(){
      it("user is told to login or register", function() {
        const wrapper = mount(<App />);
        wrapper.setState({ auth: false });
        expect(wrapper.contains("Please login or register")).to.equal(true);
        wrapper.unmount();
      });
      it('sidebar displays links to login and register', function(){
        const wrapper = mount(<App />)
        wrapper.setState({auth:false})
        expect(wrapper.find('#login-btn')).to.have.length(1)
        expect(wrapper.find('#register-btn')).to.have.length(1)
        it("false, user is told to login or register", function() {
      const wrapper = mount(<App />);
      wrapper.setState({ auth: false });
      expect(wrapper.contains("Please login or register")).to.equal(true);
      wrapper.unmount();
    });
        expect(wrapper.contains({}))
      })
    })
    
    it()
    describe("true, and state.todos is ", function() {
      it("empty, user is told to submit a todo", function() {
        const wrapper = mount(<App />);
        wrapper.setState({ auth: true, todos: [] });
        expect(wrapper.contains("Submit a todo!")).to.equal(true)
        wrapper.unmount();
      });
      it("not empty, user is displayed a list of his todos", function() {
        const wrapper = mount(<App />);
        wrapper.setState({
          auth: true,
          todos: [{ todo: "cut hair" }, { todo: "eat carrots" }]
        });
        expect(wrapper.contains("cut hair")).to.equal(true)
        expect(wrapper.contains("eat carrots")).to.equal(true);
        wrapper.unmount()
      });
    });
  });
});
