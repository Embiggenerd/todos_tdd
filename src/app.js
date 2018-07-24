const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const { signUp, logIn } = require('./libs/user/controllers');
const { submitTodo } = require('./libs/todos/controllers')

const app = express();

app.use(bodyParser.json());

app.use(
  session({
    secret: 'our little s...',
    resave: false,
    saveUninitialized: true
  })
);

app.post('/user/signup', signUp);
app.post('/user/login', logIn);
app.post('/todos/submit', submitTodo)

module.exports = app;
