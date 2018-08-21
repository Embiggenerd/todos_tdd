import React, { Component } from 'react';

class SideBar extends Component {
  render() {
    const { auth, handleClickLogin, handleClickRegister } = this.props;
    if (auth) {
      return (
        <div className="sidebar">
          <a href="#" id="logout-btn">Logout</a>
          <a href="#" id="todos-btn">Todos</a>
        </div>
      );
    }
    return (
      <div className="sidebar">
        <a href="#" onClick={handleClickLogin} id="login-btn">
          Login
        </a>
        <a href="#" onClick={handleClickRegister} id="register-btn">
          Register
        </a>
      </div>
    );
  }
}

export default SideBar;
