import React, { Component } from 'react';
import axios from 'axios';
require('promise.prototype.finally').shim();
import './main-flex.css';

import Loading from './Loading';
import Content from './Content';
import Header from './Header';
import Footer from './Footer';
import SideBar from './SideBar';
import Advertisement from './Advertisement';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      auth: false,
      todos: [],
      error: '',
      userFormDisplay: ''
    };

    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleClickRegister = this.handleClickRegister.bind(this);
  }

  handleClickLogin(e) {
    e.preventDefault();
    this.setState({
      userFormDisplay: 'login'
    });
  }
  handleClickRegister(e) {
    e.preventDefault();
    this.setState({
      userFormDisplay: 'register'
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

  renderContent() {
    const { loading, todos, auth, error, userFormDisplay } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div className="layout">
        <Header />
        <div className="main">
          <SideBar
            auth={auth}
            handleClickRegister={this.handleClickRegister}
            handleClickLogin={this.handleClickLogin}
          />
          <Advertisement />
          <Content
            auth={auth}
            todos={todos}
            error={error}
            userFormDisplay={userFormDisplay}
          />
        </div>
        <Footer />
      </div>
    );
  }

  componentDidMount() {
    this.getTodos();
  }
  render() {
    return this.renderContent();
  }
}

export default App;
