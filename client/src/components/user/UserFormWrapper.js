import React from 'react';
import UserForm from './UserForm';

const UserFormWrapper = ({
  whichForm,
  handleFieldChange,
  handleFormSubmit,
  values
}) => {
  const renderForm = () => {
    return (
      <div className="form_wrapper">
        <UserForm
          whichForm={whichForm}
          handleFieldChange={handleFieldChange}
          handleFormSubmit={handleFormSubmit}
          values={values}
        />
      </div>
    );
  };
  if (whichForm) {
    return renderForm();
  }
  return <h1 data-test-id="user-greeting">Please login or register</h1>;
};

export default UserFormWrapper;
