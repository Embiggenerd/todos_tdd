import React, { Component } from "react";
import axios from "axios";
import './main-float.css'

import Loading from "./Loading";
import Content from "./Content";
import Header from "./Header";
import Footer from "./Footer";

class App extends Component {
  state = {
    loading: true,
    auth: false,
    todos: [],
    error: ""
  };

  getTodos() {
    axios("http://localhost:3000/todos/get")
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
    const { loading, todos, auth, error } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <Header />
        <Content auth={auth} todos={todos} error={error} />
        <Footer />
      </div>
    );
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
