import React, { Component } from 'react';
import { TODO, TODOS_FORM } from '../App/constants';

class TodosForm extends Component {
  render() {
    const { handleFieldChange, handleFormSubmit, todoVal } = this.props;
    return (
      <div className="form_wrapper">
        <form
          className="todos_form"
          data-test-id="todos-form"
          onSubmit={e => handleFormSubmit(e, '/todos/submit')}
        >
          <label htmlFor="todos-input">Add Todo</label>
          <input
            className="todos_form--input"
            data-test-id="todos-input"
            id="todos-input"
            type="text"
            name="todos"
            placeholder="todos"
            maxLength="27"
            value={todoVal}
            onChange={e => handleFieldChange(e, TODO, TODOS_FORM)}
          />
          <input className="button" type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default TodosForm;
