const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const { signUp, logIn, logOut } = require('./libs/user/controllers');
const {
  submitTodo,
  getTodos,
  toggleClosed,
  deleteTodo
} = require('./libs/todos/controllers');

const app = express();
const isLoggedIn = require('./libs/middleware/isLoggedIn');

app.use(
  cors({
    origin: ['http://localhost:8080', 'http://localhost:8081'],
    methods: ['GET', 'POST'],
    credentials: true
  })
);

app.use(
  session({
    secret: 'our little s...',
    resave: false,
    saveUninitialized: true
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.post('/user/signup', signUp);
app.post('/user/login', logIn);
app.get('/user/logout', isLoggedIn, logOut);
app.post('/todos/toggleClosed', isLoggedIn, toggleClosed);
app.post('/todos/submit', isLoggedIn, submitTodo);
app.get('/todos/get', isLoggedIn, getTodos);
app.post('/todos/deleteTodo', isLoggedIn, deleteTodo);
app.use((err, req, res, next) => {
  if (err.name) {
    const fullError = res.status(400).json({
      error: {
        name: 'SOMEBODY GOOFED',
        message: `${err.message}!`
      }
    });
  }
  next(err);
});

module.exports = app;
