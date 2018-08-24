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

const pathTo = fileName => path.resolve(__dirname, '..', 'public', fileName);

app.use(
  cors({
    origin: ['http://localhost:8080', 'http://localhost:8081'],
    methods: ['GET', 'POST'],
    credentials: true
  })
);

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

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
// app.get("/", (req, res) => {
//   res.sendFile(pathTo("index.html"));
// });
// app.get("/user/login", (req, res) => {
//   res.sendFile(pathTo("login.html"));
// });
// app.get("/user/signup", (req, res) => {
//   res.sendFile(pathTo("register.html"));
// });
app.post('/user/signup', signUp);
app.post('/user/login', logIn);
app.get('/user/logout', isLoggedIn, logOut);
app.post('/todos/toggleClosed', isLoggedIn, toggleClosed);
app.post('/todos/submit', isLoggedIn, submitTodo);
app.get('/todos/get', isLoggedIn, getTodos);
app.post('/todos/delete', isLoggedIn, deleteTodo);
// app.get("/user/logout", async (req, res) => {
//   await req.session.destroy();
//   res.redirect("/");
// });

// app.get("/todos", isLoggedIn, (req, res) => {
//   res.sendFile(pathTo("todos.html"));
// });

// app.get("/401", (req, res) => {
//   res.sendFile(pathTo("401.html"));
// });

module.exports = app;
