const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const { signUp } = require('./libs/user/controllers')

const app = express();

app.use(bodyParser.json());

app.post('/user/signup', signUp)

module.exports = app;
