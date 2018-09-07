import React, { Component } from 'react';
import { PASSWORD, USER_FORM, USERNAME } from '../App/constants';

class UserForm extends Component {
  renderForm() {
    const {
      whichForm,
      handleFieldChange,
      handleFormSubmit,
      values
    } = this.props;
    console.log('values passed to userForm', values);

    switch (whichForm) {
      case 'login':
        return (
          <div className="form-wrapper">
            <h3>Login with your name and password</h3>
            <form onSubmit={e => handleFormSubmit(e, `/user/${whichForm}`)}>
              <label htmlFor="login-username">Username</label>
              <input
                id="login-username"
                type="text"
                name="username"
                placeholder="username"
                onChange={e => {
                  handleFieldChange(e, USERNAME, USER_FORM);
                }}
                value={values.username}
              />
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                name="password"
                placeholder="password"
                onChange={e => {
                  handleFieldChange(e, PASSWORD, USER_FORM);
                }}
                value={values.password}
              />
              <input
                id="login-btn"
                className="submit-btn"
                type="submit"
                value="submit"
              />
            </form>
            <p>If you can't remember your password, too bad!</p>
          </div>
        );
      case 'signup':
        return (
          <div className="form-wrapper">
            <h3>Register with a unique name and password</h3>
            <form onSubmit={e => handleFormSubmit(e, `/user/${whichForm}`)}>
              <label htmlFor="signup-username">Username</label>
              <input
                id="signup-username"
                type="text"
                name="username"
                placeholder="username"
                onChange={e => {
                  handleFieldChange(e, USERNAME, USER_FORM);
                }}
                value={values.username}
              />
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                name="password"
                placeholder="password"
                onChange={e => {
                  handleFieldChange(e, PASSWORD, USER_FORM);
                }}
                value={values.password}
              />
              <input
                id="signup-btn"
                className="submit-btn"
                type="submit"
                value="submit"
              />
            </form>
            <p>We only store the hashed + salted values of your password!</p>
          </div>
        );
      default:
        return <h1 data-test-id="user-greeting">Please login or register</h1>;
    }
  }

  render() {
    return <div className="content">{this.renderForm()}</div>;
  }
}

export default UserForm;
