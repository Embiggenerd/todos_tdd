import React, { Component } from 'react';

class TodosForm extends Component {
  render() {
    const { handleFieldChange, handleFormSubmit, todoVal } = this.props;
    return (
      <div className="form-wrapper">
        <form
          id="todos-form"
          onSubmit={e => handleFormSubmit(e, '/todos/submit')}
        >
          <label htmlFor="todos-input">Add Todo</label>
          <input
            id="todos-input"
            type="text"
            name="todos"
            placeholder="todos"
            maxLength="27"
            value={todoVal}
            onChange={e => handleFieldChange(e, 'todo', 'todosForm')}
          />
          <input className="submit-btn" type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default TodosForm;
