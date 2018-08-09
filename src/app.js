const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

const { signUp, logIn } = require("./libs/user/controllers");
const { submitTodo, getTodos } = require("./libs/todos/controllers");

const app = express();
const isLoggedIn = require("./libs/middleware/isLoggedIn");

const pathTo = fileName => path.resolve(__dirname, "..", "public", fileName);

app.use(
  session({
    secret: "our little s...",
    resave: false,
    saveUninitialized: true
  })
);

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use(express.static(path.resolve(__dirname, "..", "public")));
app.get("/", (req, res) => {
  res.sendFile(pathTo("index.html"));
});
app.get("/user/login", (req, res) => {
  res.sendFile(pathTo("login.html"));
});
app.get("/user/signup", (req, res) => {
  res.sendFile(pathTo("register.html"));
});
app.post("/user/signup", signUp);
app.post("/user/login", logIn);
app.post("/todos/submit", isLoggedIn, submitTodo);
app.get("/todos/get", isLoggedIn, getTodos);
app.get("/user/logout", async (req, res) => {
  await req.session.destroy();
  res.redirect("/");
});

app.get("/todos", isLoggedIn, (req, res) => {
  res.sendFile(pathTo("todos.html"));
});

app.get("/401", (req, res) => {
  res.sendFile(pathTo("401.html"));
});

module.exports = app;
