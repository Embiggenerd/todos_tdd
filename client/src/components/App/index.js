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
  // constructor() {
  //   super();
  //   // this.state = {
  //   //   loading: true,
  //   //   auth: false,
  //   //   todos: [],
  //   //   error: '',
  //   //   userFormDisplay: '',
  //   //   userForm: {
  //   //     username: '',
  //   //     password: ''
  //   //   },
  //   //   username: '',
  //   //   todosForm: {
  //   //     todo: '',
  //   //     closed: false
  //   //   }
  //   // };
  //   // this.handleSidebarClick = this.handleSidebarClick.bind(this);
  //   // this.handleFormSubmit = this.handleFormSubmit.bind(this);
  //   // this.handleFieldChange = this.handleFieldChange.bind(this);
  //   // this.handleTodosButtonClick = this.handleTodosButtonClick.bind(this);
  //   // this.handleCloseModal = this.handleCloseModal.bind(this);
  // }

  // handleCloseModal() {
  //   this.setState({ error: '' });
  // }

  // handleTodosButtonClick(id, url) {
  //   axios
  //     .post(`http://localhost:3000/todos/${url}`, { id })
  //     .then(res => {
  //       const getIndex = (id, arr) => arr.findIndex(item => item._id === id);

  //       const toggleClosed = res => {
  //         console.log('res.data.todo.closed', res.data.todo.closed);
  //         const oldTodos = [...this.state.todos];
  //         oldTodos[getIndex(id, oldTodos)] = Object.assign(
  //           oldTodos[getIndex(id, oldTodos)],
  //           { closed: res.data.todo.closed }
  //         );
  //         const newTodos = [...oldTodos];
  //         this.setState({
  //           todos: newTodos
  //         });
  //       };
  //       const deleteTodo = res => {
  //         const todoIndex = getIndex(res.data.todo._id, this.state.todos);
  //         const newTodos = this.state.todos
  //           .slice(0, todoIndex)
  //           .concat(this.state.todos.slice(todoIndex + 1));
  //         this.setState({
  //           todos: newTodos
  //         });
  //       };

  //       switch (url) {
  //         case 'toggleClosed':
  //           toggleClosed(res);
  //           break;
  //         case 'deleteTodo':
  //           deleteTodo(res);
  //           break;
  //       }
  //     })
  //     .catch(e => {
  //       this.setState({ error: e.response.data.error });
  //     });
  // }

  // handleSidebarClick(e, form) {
  //   e.preventDefault();

  //   if (form === 'logout') {
  //     axios('http://localhost:3000/user/logout')
  //       .then(res => {
  //         this.setState({ auth: false, userFormDisplay: '' });
  //       })
  //       .catch(e => {});
  //   } else {
  //     this.setState({
  //       userFormDisplay: form
  //     });
  //   }
  // }

  // handleFormSubmit(e, url) {
  //   e.preventDefault();
  //   e.persist();
  //   console.log('handleSubmit called with url', url);
  //   const body = url => {
  //     if (url === '/todos/submit') {
  //       return {
  //         todo: this.state.todosForm.todo,
  //         closed: this.state.todosForm.closed
  //       };
  //     } else {
  //       return {
  //         username: this.state.userForm.username,
  //         password: this.state.userForm.password
  //       };
  //     }
  //   };

  //   axios
  //     .post(`http://localhost:3000${url}`, body(url))
  //     .then(res => {
  //       switch (url) {
  //         case '/user/signup':
  //           this.setState({ userFormDisplay: 'login' });
  //           break;
  //         case '/user/login':
  //           this.setState({
  //             auth: true,
  //             username: res.data.user.username,
  //             userForm: {
  //               username: '',
  //               password: ''
  //             }
  //           });

  //           break;
  //         case '/todos/submit':
  //           this.setState({
  //             todos: [...this.state.todos, res.data.todo],
  //             todosForm: {
  //               todo: ''
  //             }
  //           });
  //           break;
  //       }
  //     })
  //     .catch(e => {
  //       this.setState({ error: e.response.data.error });
  //     })
  //     .finally(() => (e.target.value = ''));
  // }

  // handleFieldChange(e, key, field) {
  //   if (!field) {
  //     return this.setState({ [key]: e.target.value });
  //   }

  //   this.setState({
  //     [field]: { ...this.state[field], [key]: e.target.value }
  //   });
  // }

  // getTodos() {
  //   axios('http://localhost:3000/todos/get')
  //     .then(res => {
  //       this.setState({
  //         auth: true,
  //         todos: res.data.todos
  //       });
  //     })
  //     .catch(() => {})
  //     .finally(() => this.setState({ loading: false }));
  // }

  contentChildren() {
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
            {todos.map(todo => (
              <TodoUnit
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

  renderContent() {
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

          <Content>{this.contentChildren()}</Content>
        </div>
        <Footer />
        <ErrorModal onClose={handleCloseModal} error={error} />
      </div>
    );
  }

  componentDidMount() {
    this.props.getTodos();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.auth !== prevProps.auth) {
      this.props.getTodos();
    }

    console.log(this.props);
  }
  render() {
    return this.renderContent();
  }
}

const mapStateToProps = ({
  loading,
  auth,
  todos,
  userFormDisplay,
  userForm,
  todosForm,
  error
}) => {
  return {
    loading,
    auth,
    todos,
    userFormDisplay,
    userForm,
    todosForm,
    error
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
