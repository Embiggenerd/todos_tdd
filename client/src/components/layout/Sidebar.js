import React, { Component } from 'react';

class SideBar extends Component {
  render() {
    const { auth, handleSidebarClick } = this.props;
    if (auth) {
      return (
        <div className="sidebar">
          <a
            className="sidebar--link"
            href="#"
            id="logout-btn"
            onClick={e => handleSidebarClick(e, 'logout')}
          >
            Logout
          </a>
        </div>
      );
    }
    return (
      <div className="sidebar">
        <a
          className="sidebar--link"
          href="#"
          onClick={e => handleSidebarClick(e, 'login')}
          id="login-btn"
        >
          Login
        </a>
        <a
          className="sidebar--link"
          href="#"
          onClick={e => handleSidebarClick(e, 'signup')}
          id="register-btn"
        >
          Register
        </a>
      </div>
    );
  }
}

export default SideBar;
