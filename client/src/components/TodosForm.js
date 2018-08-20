import React, { Component } from 'react';

class TodosForm extends Component {
  state = {};
  render() {
    return (
      <div className="form-wrapper">
        <form id="todos-form">
          <label htmlFor="todos-input">Add Todo</label>
          <input
            id="todos-input"
            type="text"
            name="todos"
            placeholder="todos"
          />
          <input className="submit-btn" type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default TodosForm;
