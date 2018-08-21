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
      form: {
        username:'',
        passwod:'',
      }
    };

    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleClickRegister = this.handleClickRegister.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    // this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
    // this.handleLoginSubmit = this.handleLoginSubmit.bind(this)

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
  handleFormSubmit(url, e) {
    e.preventDefault()
    axios.post('http://localhost:3000/{url}', {
      username: this.state.form.username,
      password: this.state.form.password
    })
  }

  handleFieldChange(key, e) {
    this.setState({[key]: e.target.value })
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



  contentChildren(){
    const { todos, auth, userFormDisplay } = this.state;
    if (auth) {
      return (
        <div className="content">
          <TodosDiv todos={todos} />
          <TodosForm />
        </div>
      );
    }
    return <UserForm whichForm={userFormDisplay} />
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
    
          <Content>
            {this.contentChildren()}
          </Content>
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
