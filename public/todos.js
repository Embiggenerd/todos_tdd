(function() {
  'use strict';
  /**
   * Initial get call initializes the script, if successful.
   */
  const state = {
    todos: [],
    get getTodos() {
      return this.todos;
    },
    addTodo(todo) {
      this.todos = [...this.todos, todo];
    },
    populateTodos(todos) {
      this.todos = todos;
    },
    populateList(list, todos) {
      todos.map(todo => {
        list.insertAdjacentHTML('beforeend', `<li>${todo.todo}</li>`);
      });
    },
    addToList(list, todo) {
      console.log('adding:', todo);
      list.insertAdjacentHTML('beforeend', `<li>${todo.todo}</li>`);
    }
  };
  const ul = document.querySelector('#todos-list');
  const form = document.querySelector('#todos-form');
  const inputField = document.querySelector('#todos-field');

  fetch('http://localhost:3000/todos/get', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }).then(
    res => {
      console.log(res);
      if (res.ok) {
        res.json().then(
          json => {
            console.log(json);
            state.populateTodos(json.todos);
            state.populateList(ul, state.getTodos);
            render();
          },
          err => console.log(err)
        );
      }
    },
    err => console.log(err)
  );

  const render = () => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      fetch('http://localhost:3000/todos/submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ todo: inputField.value })
      })
        .then(
          res => {
            return res.json();
          },
          err => console.log(err)
        )
        .then(json => {
          state.addTodo(json);
          state.addToList(ul, json);
        });
    });
  };
})();
