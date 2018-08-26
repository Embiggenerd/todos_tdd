import React from "react";
import { mount, shallow } from "enzyme";
import App from "../App";

import handleFormSubmitMock from "./handleFormSubmitMock";
import handleTodosButtonClickMock from "./handleTodosButtonClickMock";
import handleSidebarClickMock from "./handleSidebarClickMock"
import handleFormSubmitErrorMock from "./handleFormSubmitErrorMock"

/**
 * Large test describes the structure and logic of the app.
 * <App/> component is the most important and passes down
 * props to children, which defines their behavior. So, mounting
 * the parent component, then testing the output given various inputs
 * feels like a good testing and app building protocol.
 */

describe("<App />", () => {
  describe("When state.loading is true,", function() {
    let wrapper;
    before(function() {
      App.prototype.getTodos = function() {};
      wrapper = mount(<App />);
    });
    after(function() {
      wrapper.unmount;
    });
    it("it renders loading component", function() {
      expect(wrapper.contains("Loading...")).to.equal(true);
    });
  });
  describe("when state.loading is false,", function() {
    let wrapper;
    before(function() {
      App.prototype.getTodos = function() {
        this.setState({ loading: false });
      };
      App.prototype.handleFormSubmit = handleFormSubmitMock;
      App.prototype.handleTodosButtonClick = handleTodosButtonClickMock;
      App.prototype.handleSidebarClick = handleSidebarClickMock
      wrapper = mount(<App />);
    });
    after(function() {
      wrapper.unmount();
    });

    describe("and when state.auth is", function() {
      describe("false", function() {
        it("user is told to login or register", function() {
          wrapper.setState({ auth: false });
          expect(wrapper.contains("Please login or register")).to.equal(true);
        });
        it("sidebar displays links to login and register", function() {
          expect(wrapper.find("#login-btn")).to.have.length(1);
          expect(wrapper.find("#register-btn")).to.have.length(1);
        });
        it('and when state.userFormDisplay is "signup", register form is displayed', function() {
          wrapper.setState({ userFormDisplay: "signup" });
          expect(
            wrapper.contains(
              "We only store the hashed + salted values of your password!"
            )
          ).to.equal(true);
        });
        it('and when state.userFormDisplay is "login", login form is displayed', function() {
          wrapper.setState({ userFormDisplay: "login" });
          expect(
            wrapper.contains("If you can't remember your password, too bad!")
          ).to.equal(true);
        });
        it("and clicking on login in sidebar displays login form", function() {
          wrapper.setState({ userFormDisplay: "signup" });
          expect(wrapper.find("#login-username")).to.have.length(0);
          expect(wrapper.find("#login-btn").simulate("click"));
          expect(wrapper.find("#login-username")).to.have.length(1);
        });
        it("and clicking on register in sidebar displays register form", function() {
          expect(wrapper.find("#signup-username")).to.have.length(0);
          expect(wrapper.find("#register-btn").simulate("click"));
          expect(wrapper.find("#signup-username")).to.have.length(1);
        });
        describe("and when submitting user info to register", function() {
          before(function() {
            wrapper
              .find("#signup-username")
              .simulate("change", { target: { value: "Conor" } });
            wrapper
              .find("#signup-password")
              .simulate("change", { target: { value: "McGreggor" } });
            wrapper.find("form").simulate("submit");
          });

          it("login form is displayed with appropriate values", function() {
            expect(wrapper.find("#login-username")).to.have.length(1);
            expect(wrapper.find("#login-username").instance().value).to.equal(
              "Conor"
            );
            expect(wrapper.find("#login-password").instance().value).to.equal(
              "McGreggor"
            );
          });

          it("and when submitted, log out button is displayed and header contains username", function() {
            wrapper.find("form").simulate("submit");
            const logoutBtn = wrapper.find("#logout-btn");
            expect(logoutBtn).to.have.length(1);
            expect(
              wrapper
                .find("header")
                .at(0)
                .text()
            ).to.contain("Conor");
            
          });
        });
      });
      describe("true,", function() {
        it("header contains the username,", function() {
          expect(
            wrapper
              .find(".header")
              .at(0)
              .text()
          ).to.not.contain("abc");
          wrapper.setState({ auth: true, username: "abc" });
          expect(
            wrapper
              .find(".header")
              .at(0)
              .text()
          ).to.contain("abc");
        });
        it("and sidebar displays logout btn", function() {
          expect(wrapper.find("#logout-btn")).to.have.length(1);
        });
        describe("and when state.todos is empty, user is", function() {
          it("told to submit a todo,", function() {
            wrapper.setState({ todos: [] });
            expect(wrapper.contains("Submit a todo!")).to.equal(true);
          });
          it("and given a form to submit", function() {
            expect(wrapper.find("#todos-form")).to.have.length(1);
          });
        });
        describe("not empty, user is ", function() {
          it("displayed a list of his todos", function() {
            wrapper.setState({
              todos: [
                {
                  closed: false,
                  todo: "cut hair",
                  _id: Math.floor(Math.random() * 100)
                },
                {
                  closed: true,
                  todo: "eat carrots",
                  _id: Math.floor(Math.random() * 100)
                }
              ]
            });
            expect(wrapper.contains("cut hair")).to.equal(true);
            expect(wrapper.contains("eat carrots")).to.equal(true);
          });
          it("with apropriate done/undo buttns,", function() {
            expect(
              wrapper
                .find(".todo-unit")
                .at(0)
                .contains("Done")
            ).to.equal(true);
            expect(
              wrapper
                .find(".todo-unit")
                .at(1)
                .contains("Undo")
            ).to.equal(true);
          });
          it("a delete button", function() {
            expect(wrapper.find(".danger-btn")).to.have.length(2);
          });
          it("and given a form to submit", function() {
            expect(wrapper.find("#todos-form")).to.have.length(1);
          });
          describe("and when a todo is submitted", function() {
            before(function() {
              wrapper.find("#todos-input").simulate("change", {
                target: { value: "enlighten the masses" }
              });
              wrapper.find("#todos-form").simulate("submit");
            });
            it("it is displayed in the todos list", function() {
              expect(
                wrapper
                  .find("#todos-list")
                  .at(0)
                  .text()
              ).to.contain("enlighten the masses");
            });
            it("and when the done button is pressed, that todo is crossed out", function() {
              const todoBefore = wrapper.find(".todo-text").at(2);
              expect(todoBefore.prop("style")).to.deep.equal({
                textDecoration: "none"
              });
              wrapper
                .find("#toggle-closed-button")
                .at(2)
                .simulate("click");
              const todoAfter = wrapper.find(".todo-text").at(2);
              expect(todoAfter.prop("style")).to.deep.equal({
                textDecoration: "line-through"
              });
            });
            it('and when it"s clicked again, it is no longer crossed out', function() {
              wrapper
                .find("#toggle-closed-button")
                .at(2)
                .simulate("click");
              const todoAfter = wrapper.find(".todo-text").at(2);
              expect(todoAfter.prop("style")).to.deep.equal({
                textDecoration: "none"
              });
            });
            it("and when you click the delete button, the todo is deleted", function() {
              expect(
                wrapper
                  .find("#todos-list")
                  .at(0)
                  .text()
              ).to.contain("enlighten the masses");

              wrapper
                .find("#delete-button")
                .at(2)
                .simulate("click");

              expect(
                wrapper
                  .find(".todos-wrapper")
                  .at(0)
                  .text()
              ).to.not.contain("enlighten the masses");
            });
          });
          
        });
        describe("and when logout btn is clicked", function() {
          it(", user is logged out", function() {
            expect(wrapper.find("#login-btn")).to.have.length(0);
            const logoutBtn = wrapper.find('#logout-btn')
            expect(logoutBtn).to.have.length(1)
            logoutBtn.simulate("click");
            expect(
              wrapper
                .find(".sidebar")
                .at(0)
                .text()
            ).to.contain("Login");
            
          });
        });
      });
    });
  });

  describe("error handling test", function() {
    let wrapper;
      before(function() {
        App.prototype.getTodos = function() {
          this.setState({ loading: false , auth:true});
        };
        App.prototype.handleFormSubmit = handleFormSubmitErrorMock;
        App.prototype.handleTodosButtonClick = handleTodosButtonClickMock;
        App.prototype.handleSidebarClick = handleSidebarClickMock;
        wrapper = mount(<App />);
       
      });
      after(function() {
        wrapper.unmount();
      });

      describe("When you submit an empty todo,", function() {
        before(function() {
          wrapper.find("#todos-input").simulate("change", {
            target: { value: "" }
          });
          wrapper.find("#todos-form").simulate("submit");
        });
        it("the user is displayed an error,", function() {
          wrapper.update()

          expect(
            wrapper
            .contains("GOOFED")).to.equal(true);
        });
      });
    
  });
});
