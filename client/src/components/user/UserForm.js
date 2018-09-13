import React from 'react';
import { PASSWORD, USER_FORM, USERNAME } from '../App/constants';

const footNote = form => {
  switch (form) {
    case 'login':
      return "If you can't remember your password, too bad!";
    case 'signup':
      return 'We only store the hashed + salted values of your password!';
  }
};
const instructions = form => {
  switch (form) {
    case 'login':
      return 'Login with your name and password';
    case 'signup':
      return 'Register with a unique name and password';
  }
};
const UserForm = ({
  whichForm,
  handleFieldChange,
  handleFormSubmit,
  values
}) => {
  return [
    <h3>{instructions(whichForm)}</h3>,
    <form
      className="user_form"
      data-test-id={`${whichForm}-form`}
      onSubmit={e => handleFormSubmit(e, `/user/${whichForm}`)}
    >
      <label className="label" htmlFor={`${whichForm}-username`}>
        Username
      </label>
      <input
        className="user_form--input"
        data-test-id={`${whichForm}-username-input`}
        id={`${whichForm}-username`}
        type="text"
        name="username"
        placeholder="username"
        onChange={e => {
          handleFieldChange(e, USERNAME, USER_FORM);
        }}
        value={values.username}
      />
      <label className="label" htmlFor={`${whichForm}-password`}>
        Password
      </label>
      <input
        className="user_form--input"
        data-test-id={`${whichForm}-password-input`}
        id={`${whichForm}-password`}
        type="password"
        name="password"
        placeholder="password"
        onChange={e => {
          handleFieldChange(e, PASSWORD, USER_FORM);
        }}
        value={values.password}
      />
      <input
        className="button button--user_submit"
        type="submit"
        value="submit"
      />
    </form>,
    <p>{footNote(whichForm)}</p>
  ];
};

export default UserForm;
