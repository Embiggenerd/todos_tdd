(function() {
  "use strict";
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
    }
  };
  const ul = document.querySelector("#todos-list");
  const form = document.querySelector("#todos-form");
  const input = document.querySelector("#todos-input");

  const populateList = (list, todos) => {
    list.innerHTML = ''
    todos.map(todo => {
      const li = document.createElement("li");
      li.innerHTML = todo.todo;
      list.appendChild(li);
    });
  };


  fetch("http://localhost:3000/todos/get", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
    .then(res => {
      if (res.ok) {
        render();
        return res.json();
      }
    })
    .then(json => {
      console.log(json);
      state.populateTodos(json.todos);
      populateList(ul, state.getTodos);
    });

  const render = () => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      fetch("http://localhost:3000/todos/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ todo: input.value })
      })
        .then(res => res.json())
        .then(json => {
          input.value = ""
          state.addTodo(json);
          populateList(ul, state.getTodos);
        });
    });
  };
})();
