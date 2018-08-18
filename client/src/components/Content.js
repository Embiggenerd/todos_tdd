import React, { Component } from "react";
import TodosDiv from "./TodosDiv";

class Content extends Component {
  renderContent() {
    const { todos, auth } = this.props;
    if (auth) {
      return <TodosDiv todos={todos} />;
    }
    return <h1>Please login or register</h1>;
  }
  render() {
    return this.renderContent();
  }
}

export default Content;
