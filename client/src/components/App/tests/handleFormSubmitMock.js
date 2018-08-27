module.exports = function(e, url) {
  // console.log(this.state);
  switch (url) {
    case '/user/signup':
      this.setState({ userFormDisplay: '/user/login' });
      break;
    case '/user/login':
      this.setState({ auth: true, username: this.state.userForm.username });
      break;
    case '/todos/submit':
      this.setState({
        todos: [
          ...this.state.todos,
          {
            todo: this.state.todosForm.todo,
            closed: this.state.todosForm.closed,
            _id: Math.floor(Math.random() * 1000)
          }
        ]
      });
      break;
  }
  this.setState({ userFormDisplay: 'login' });
  // console.log('statesies', this.state);
};
