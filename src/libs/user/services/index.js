const UserModel = require('../user_model');
const UserServices = require('./user_services');

module.exports = UserServices(UserModel);
