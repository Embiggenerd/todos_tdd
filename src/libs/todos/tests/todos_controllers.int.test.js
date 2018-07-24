const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const request = require('supertest');
const { expect, assert } = require('chai');
const { internet, lorem } = require('faker');

const app = require('../../../app');
const TodosModel = require('../todos_model');
const testDB = 'mongodb://localhost:27017/todo_tdd_test';

describe('Todos controller test', function() {
  it('app module is defined', function() {
    assert.isDefined(app);
  });

  let server;

  before('connect to db, run server', async function() {
    server = await app.listen(3002);
    await mongoose.connect(
      testDB,
      { useNewUrlParser: true }
    );
    await TodosModel.remove({}, () => console.log('db cleaned of users'));
  });

  after('close connection, server', function(done) {
    mongoose.connection.close();
    server.close(done);
  });

  describe('submit_todo test', function() {});
});
