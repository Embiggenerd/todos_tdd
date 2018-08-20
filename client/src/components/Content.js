import React, { Component } from 'react';
import TodosDiv from './TodosDiv';
import TodosForm from './TodosForm';
import UserForm from './UserForm';

class Content extends Component {
  renderContent() {
    const { todos, auth, userFormDisplay } = this.props;
    if (auth) {
      return (
        <div className="content">
          <TodosDiv todos={todos} />
          <TodosForm />
        </div>
      );
    }
    return <UserForm whichForm={userFormDisplay} />;
  }
  render() {
    return this.renderContent();
  }
}

export default Content;
