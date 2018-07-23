const mongoose = require('mongoose');
const { expect, assert } = require('chai');
const { internet } = require('faker');

const UserModel = require('../user_model');

const testDB = 'mongodb://localhost:27017/todo_tdd_test';

describe('User Model test', function() {
  it('UserModel module is defined', function() {
    assert.isDefined(UserModel);
  });

  before('Clear db, start connection', async function() {
    await mongoose.connect(
      testDB,
      { useNewUrlParser: true },
      () => console.log('Connected to test db')
    );
    await UserModel.remove({}, () => console.log('DB cleaned of users'));
  });

  afterEach('Clear users from db between tests', async function() {
    await UserModel.remove({}, () => console.log('db cleared for next test'));
  });
  after('Close Connection', async function() {
    await mongoose.connection.close(() =>
      console.log('connection to testDB closed')
    );
  });

  it('Saves a user', async function() {
    const newUserData = {
      username: internet.userName(),
      password: internet.password()
    };
    const newUser = new UserModel(newUserData);
    const savedUser = await newUser.save();
    assert.include(savedUser, newUserData);
  });

  it('Finds a user', async function() {
    const newUserData = {
      username: internet.userName(),
      password: internet.password()
    };
    const newUser = new UserModel(newUserData);
    await newUser.save();
    const foundUser = await UserModel.findOne({
      username: newUserData.username
    });
    assert.deepInclude(foundUser, newUserData);
  });

  it('Updates a user', async function() {
    const newUserData = {
      username: internet.userName(),
      password: internet.password()
    };
    const newUser = new UserModel(newUserData);
    await newUser.save();
    const newPassword = internet.password();
    await UserModel.updateOne(
      { username: newUserData.username },
      { password: newPassword }
    );
    const foundUser = await UserModel.findOne({
      username: newUserData.username
    });
    assert.include(foundUser, { password: newPassword });
  });
});
