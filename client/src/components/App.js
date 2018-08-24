import React, { Component } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
require('promise.prototype.finally').shim();
import './main-flex.css';

import Loading from './Loading';
import Content from './Content';
import Header from './Header';
import Footer from './Footer';
import SideBar from './SideBar';
import Advertisement from './Advertisement';
import TodosDiv from './TodosDiv';
import TodosForm from './TodosForm';
import UserForm from './UserForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      auth: false,
      todos: [],
      error: '',
      userFormDisplay: '',
      userForm: {
        username: '',
        password: ''
      },
      username: '',
      todosForm: {
        todo: '',
        closed: false
      }
    };

    this.handleSidebarClick = this.handleSidebarClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleTodosButtonClick = this.handleTodosButtonClick.bind(this);
  }
  handleTodosButtonClick(id, url) {
    const body = url => {
      switch (url) {
        case 'toggleClosed':
          return { id };
      }
    };
    console.log('handleToggleCLosed called with id', id);
    axios.post(`http://localhost:3000/todos/${url}`, body()).then(res => {
      const findTodoIndex = todos => todos.findIndex(todo => todo._id === id);
      const oldTodos = [...this.state.todos];
      oldTodos[findTodoIndex(oldTodos)] = res.data.todo;
      const newTodos = [...oldTodos];

      this.setState({
        todos: newTodos
      });
    });
  }

  handleSidebarClick(e, form) {
    e.preventDefault();
    this.setState({
      userFormDisplay: form
    });
  }

  handleFormSubmit(e, url) {
    e.preventDefault();
    const body = url => {
      if (url === '/todos/submit') {
        return {
          todo: this.state.todosForm.todo,
          closed: this.state.todosForm.closed
        };
      } else {
        return {
          username: this.state.userForm.username,
          password: this.state.userForm.password
        };
      }
    };

    axios
      .post(`http://localhost:3000${url}`, body(url))
      .then(res => {
        switch (url) {
          case '/user/signup':
            this.setState({ userFormDisplay: '/user/login' });
            break;
          case '/user/login':
            this.setState({
              auth: true,
              username: res.data.user.username
            });
            break;
          case '/todos/submit':
            this.setState({
              todos: [...this.state.todos, res.data.todo]
            });
            break;
        }
        this.setState({ userFormDisplay: 'login' });
      })
      .catch(e => {
        console.log('message', e.message);
        console.log('response', e.response);

        this.setState({ error: e.response.data.error });
      });
  }

  handleFieldChange(e, key, field) {
    if (!field) {
      return this.setState({ [key]: e.target.value });
    }

    this.setState({
      [field]: { ...this.state[field], [key]: e.target.value }
    });
  }

  getTodos() {
    axios('http://localhost:3000/todos/get')
      .then(res => {
        this.setState({
          auth: true,
          todos: res.data.todos
        });
      })
      .catch(err => {
        this.setState({ error: err });
      })
      .finally(() => this.setState({ loading: false }));
  }

  contentChildren() {
    const { todos, auth, userFormDisplay, userForm } = this.state;
    if (auth) {
      return (
        <div className="content">
          <TodosDiv
            todos={todos}
            handleToggleClosed={this.handleTodosButtonClick}
            handleDeleteTodo={this.handleTodosButtonClick}
          />
          <TodosForm
            handleFieldChange={this.handleFieldChange}
            handleFormSubmit={this.handleFormSubmit}
          />
        </div>
      );
    }
    return (
      <UserForm
        handleFieldChange={this.handleFieldChange}
        handleFormSubmit={this.handleFormSubmit}
        whichForm={userFormDisplay}
        values={userForm}
      />
    );
  }

  renderContent() {
    const { loading, auth, username } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div className="layout">
        <Header username={username} />
        <div className="main">
          <SideBar auth={auth} handleSidebarClick={this.handleSidebarClick} />

          <Advertisement />

          <Content>{this.contentChildren()}</Content>
        </div>
        <Footer />
      </div>
    );
  }

  componentDidMount() {
    this.getTodos();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.auth !== prevState.auth) {
      this.getTodos();
    }
    console.log('this.state.todos', this.state.todos);
  }
  render() {
    return this.renderContent();
  }
}

export default App;
