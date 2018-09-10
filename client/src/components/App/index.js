import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
axios.defaults.withCredentials = true;
import './mainFlex.css';
import {
  handleTodosButtonClick,
  handleSidebarClick,
  handleFormSubmit,
  handleFieldChange,
  getTodos,
  handleCloseModal
} from './actions';

import {
  Loading,
  Advertisement,
  Content,
  Footer,
  Header,
  Sidebar
} from '../layout';
import { TodosList, TodosForm, TodoUnit } from '../todos';
import { UserForm } from '../user';
import { ErrorModal } from '../modals';

class App extends Component {
  renderContent() {
    const {
      todos,
      auth,
      userFormDisplay,
      userForm,
      todosForm,
      handleTodosButtonClick,
      handleFormSubmit,
      handleFieldChange
    } = this.props;
    if (auth) {
      return (
        <div className="content">
          <TodosList todos={todos}>
            {todos.map((todo, index) => (
              <TodoUnit
                index={index}
                key={todo._id}
                todo={todo}
                handleToggleClosed={handleTodosButtonClick}
                handleDeleteTodo={handleTodosButtonClick}
              />
            ))}
          </TodosList>
          <TodosForm
            todoVal={todosForm.todo}
            handleFieldChange={handleFieldChange}
            handleFormSubmit={handleFormSubmit}
          />
        </div>
      );
    }
    return (
      <UserForm
        handleFieldChange={handleFieldChange}
        handleFormSubmit={handleFormSubmit}
        whichForm={userFormDisplay}
        values={userForm}
      />
    );
  }

  renderLayout() {
    const {
      loading,
      auth,
      username,
      error,
      handleSidebarClick,
      handleCloseModal
    } = this.props;
    if (loading) {
      return <Loading />;
    }
    return (
      <div className="layout">
        <Header auth={auth} username={username} />
        <div className="main">
          <Sidebar auth={auth} handleSidebarClick={handleSidebarClick} />

          <Advertisement />

          <Content>{this.renderContent()}</Content>
        </div>
        <Footer />
        <ErrorModal onClose={handleCloseModal} error={error} />
      </div>
    );
  }

  componentDidMount() {
    console.log('loadz', this.props);
    this.props.getTodos();
  }
  componentDidUpdate(prevProps) {
    if (this.props.auth !== prevProps.auth) {
      this.props.getTodos();
    }
    console.log('loadz', this.props);
  }
  render() {
    return this.renderLayout();
  }
}

const mapStateToProps = ({
  loading,
  auth,
  todos,
  userFormDisplay,
  userForm,
  todosForm,
  error,
  username
}) => {
  return {
    loading,
    auth,
    todos,
    userFormDisplay,
    userForm,
    todosForm,
    error,
    username
  };
};

const mapDispatchToProps = {
  handleTodosButtonClick,
  handleSidebarClick,
  handleFormSubmit,
  handleFieldChange,
  getTodos,
  handleCloseModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
