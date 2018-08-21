import React, { Component } from 'react';

class UserForm extends Component {
  state = {
    username: '',
    password: ''
  };
  renderForm() {
    const { whichForm } = this.props;

    switch (whichForm) {
      case 'login':
        return (
          <div className="form-wrapper">
            <h3>Login with your name and password</h3>
            <form>
              <label htmlFor="login-username">Username</label>
              <input
                id="login-username"
                type="text"
                name="username"
                placeholder="username"
                onChange={e => {
                  this.setState({ username: e.target.value });
                }}
              />
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                name="password"
                placeholder="password"
                onChange={e => {
                  this.setState({ password: e.target.value });
                }}
              />
              <input className="submit-btn" type="submit" value="submit" />
            </form>
            <p>If you can't remember your password, too bad!</p>
          </div>
        );
      case 'register':
        return (
          <div className="form-wrapper">
            <h3>Register with a unique name and password</h3>
            <form>
              <label htmlFor="signup-username">Username</label>
              <input
                id="signup-username"
                type="text"
                name="username"
                placeholder="username"
                onChange={e => {
                  this.setState({ username: e.target.value });
                }}
              />
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                name="password"
                placeholder="password"
                onChange={e => {
                  this.setState({ password: e.target.value });
                }}
              />
              <input className="submit-btn" type="submit" value="submit" />
            </form>
            <p>We only store the hashed + salted values of your password!</p>
          </div>
        );
      default:
        return <h1>Please login or register</h1>;
    }
  }

  render() {
    return <div className="content">{this.renderForm()}</div>;
  }
}

export default UserForm;
