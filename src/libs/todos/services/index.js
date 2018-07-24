const TodosModel = require('../todos_model');
const TodosServices = require('./todos_services');

module.exports = TodosServices(TodosModel);
