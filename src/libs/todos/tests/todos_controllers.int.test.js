const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const request = require('supertest');
const { expect, assert } = require('chai');
const { internet, lorem } = require('faker');
const { waterfall, series } = require('async');

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
    await TodosModel.remove({});
  });

  after('close connection, server', function(done) {
    mongoose.connection.close();
    server.close(done);
  });

  describe('submit_todo test', function() {
    // const userId = ObjectId();
    const todoData = {
      user: ObjectId().toString(),
      todo: lorem.sentences(1),
      closed: false
    };
    const badTodoData = {
      user: 123,
      todo: lorem.sentences(1),
      closed: false
    };
    it('returns submitted todo for valid req', async function() {
      await request(server)
        .post('/todos/submit')
        .send(todoData)
        .set('Content-Type', 'application/json')
        .set('accept', 'application/json')
        .expect(res => {
          assert.deepInclude(res.body, todoData);
        })
        .expect(200)
        .expect('Content-Type', /json/);
    });

    it('returns 500 for invalid data', async function() {
      await request(server)
        .post('/todos/submit')
        .send(badTodoData)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(500)
        .expect(res => {
          assert(
            res.body,
            `ValidationError: user validation failed: use: Cast to ObjectID failed for value "123" at path "user"`
          );
        });
    });
  });
  describe('get_todos test', function() {
    const todoData = {
      user: ObjectId().toString(),
      todo: lorem.sentences(1),
      closed: false
    };
    before('clear db of todos', async function() {
      await TodosModel.remove({});
    });
    it('returns a list of todos', function(done) {
      this.timeout(10000);
      waterfall(
        [
          function(cb) {
            request(server)
              .post('/todos/submit')
              .send(todoData)
              .expect(200);
          },
          function(cb) {
            request(server)
              .post('/todos/submit')
              .send(todoData)
              .expect(200);
          },
          function(cb) {
            request(server)
              .post('/todos/submit')
              .send(todoData)
              .expect(200);
          },
          function(cb) {
            request(server)
              .get('/todos/get')
              .expect(res => {
                console.log('res.body getTodos', res.body);
              });
          }
        ],
        done()
      );
    });
  });
});
