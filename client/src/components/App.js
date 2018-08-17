import React, { Component } from 'react';
import axios from 'axios';

import Loading from './Loading';

class App extends Component {
  state = {
    loading: true,
    auth: false,
    todos: [],
    error: ''
  };

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
      });
  }

  renderContent() {
    if (this.state.loading) {
      return <Loading />;
    }
  }

  componentDidMount() {
    this.getTodos();
    this.setState({ loading: false });
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default App;
