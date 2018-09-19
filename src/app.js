const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo')(session);

const { signUp, logIn, logOut } = require('./libs/user/controllers');
const {
  submitTodo,
  getTodos,
  toggleClosed,
  deleteTodo
} = require('./libs/todos/controllers');

const app = express();
const isLoggedIn = require('./libs/middleware/isLoggedIn');

const sessionUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return `mongodb://${process.env.PROD_DB_USER}:${
      process.env.PROD_DB_PASS
    }@ds161322.mlab.com:61322/todos_tdd_prod`;
  }
  return 'mongodb://localhost/todos_tdd_dev';
};

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
    store: new MongoStore({
      url: sessionUrl()
    })
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));
app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});
app.post('/user/signup', signUp);
app.post('/user/login', logIn);
app.get('/user/logout', isLoggedIn, logOut);
app.post('/todos/toggleClosed', isLoggedIn, toggleClosed);
app.post('/todos/submit', isLoggedIn, submitTodo);
app.get('/todos/get', isLoggedIn, getTodos);
app.post('/todos/deleteTodo', isLoggedIn, deleteTodo);
app.use((err, req, res, next) => {
  if (err.name) {
    res.status(400).json({
      error: {
        name: 'SOMEBODY GOOFED',
        message: `${err.message}!`
      }
    });
  }
  next(err);
});

module.exports = app;
