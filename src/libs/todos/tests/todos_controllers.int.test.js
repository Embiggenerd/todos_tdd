const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const request = require('supertest');
const session = require('supertest-session');
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
  let testSession;

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

  describe('submit_todo test, unauthenticated', function() {
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
    const error = {
      name: 'YOU DONE GOOFED',
      message: 'Not authorized!'
    };
    it('res 401 for valid req, no authorization', async function() {
      await request(server)
        .post('/todos/submit')
        .send(todoData)
        .set('Content-Type', 'application/json')
        .set('accept', 'application/json')
        .expect(res => {
          assert.deepEqual(res.body, error);
        })
        .expect(401);
    });

    it('res 401 for invalid data, no auth', async function() {
      await request(server)
        .post('/todos/submit')
        .send(badTodoData)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(res => {
          assert.deepEqual(res.body, error);
        })
        .expect(401);
    });
  });

  describe('submit_todo test, authenticated', function() {
    testSession = session(app);
    let authedSession;
    const userData = {
      username: internet.userName(),
      password: internet.password()
    };

    const todoData = {
      todo: lorem.sentences(1),
      closed: false
    };
    const badTodoData = {
      todo: '',
      closed: false
    };
    before('signUp, signIn for session', async function() {
      await testSession
        .post('/user/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .send(userData)
        .expect(200);

      await testSession
        .post('/user/login')
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .send(userData)
        .expect(200);
      authedSession = testSession;
    });

    it('returns submitted todo for valid req', async function() {
      await authedSession
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

    it('returns 400 for invalid data', async function() {
      await authedSession
        .post('/todos/submit')
        .send(badTodoData)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)
        .expect(res => {
          assert.include(
            res.error.text,
            'todo validation failed: todo: Path `todo` is required.'
          );
        });
    });
  });

  describe('get_todos test', function() {
    testSession = session(app);
    let authedSession;
    const todoData = {
      user: ObjectId().toString(),
      todo: lorem.sentences(1),
      closed: false
    };
    const userData = {
      username: internet.userName(),
      password: internet.password()
    };

    before('signUp, signIn for session', async function() {
      await TodosModel.remove({});

      await testSession
        .post('/user/signup')
        .send(userData)
        .expect(200);

      await testSession
        .post('/user/login')
        .send(userData)
        .expect(200);
      authedSession = testSession;
    });

    it('returns a list of todos when authenticated', async function() {
      await authedSession
        .post('/todos/submit')
        .send(todoData)
        .expect(200);

      await authedSession
        .post('/todos/submit')
        .send(todoData)
        .expect(200);

      await authedSession
        .post('/todos/submit')
        .send(todoData)
        .expect(200);

      await authedSession.get('/todos/get').expect(res => {
        assert.equal(res.body.length, 3);
      });
    });
  });

  describe('toggle_closed test', function() {

    testSession = session(app);
    let authedSession;
    let returnedTodo = {};
    const userData = {
      username: internet.userName(),
      password: internet.password()
    };

    const todoData = {
      todo: lorem.sentences(1),
      closed: false
    };

    const badTodoData = {
      todo: '',
      closed: false
    };

    before('signUp, signIn for session', async function() {
      await testSession
        .post('/user/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .send(userData)
        .expect(200);

      await testSession
        .post('/user/login')
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .send(userData)
        .expect(200);
      authedSession = testSession;

      await authedSession
        .post('/todos/submit')
        .send(todoData)
        .set('Content-Type', 'application/json')
        .set('accept', 'application/json')
        .expect(res => {
          assert.deepInclude(res.body, todoData);
          returnedTodo = res.body;
          console.log('returnedTOdo', returnedTodo)
        })
        .expect(200);
    });

    it('flips closed property on todo', async function() {
      await authedSession
        .post('/todos/toggleClosed')
        .send({ _id: returnedTodo._id })
        .set('Content-Type', 'application/json')
        .set('accept', 'application/json')
        .expect(res => {
          console.log('ggg', res.body, returnedTodo)
          assert.equal(res.body.closed, !returnedTodo.closed);
        })
        .expect(200)
        .expect('Content-Type', /json/);

      await authedSession.get('/todos/get').expect(res => {
        assert.equal(res.body[0].closed, !returnedTodo.closed);
      });
    });
  });

  describe('delete_todo test', function() {
    testSession = session(app);
    let authedSession;
    let returnedTodo = {};
    const userData = {
      username: internet.userName(),
      password: internet.password()
    };

    const todoData = {
      todo: lorem.sentences(1),
      closed: false
    };

    before('signUp, signIn for session', async function() {
      await testSession
        .post('/user/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .send(userData)
        .expect(200);

      await testSession
        .post('/user/login')
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .send(userData)
        .expect(200);

      authedSession = testSession;

      await authedSession
        .post('/todos/submit')
        .send(todoData)
        .set('Content-Type', 'application/json')
        .set('accept', 'application/json')
        .expect(res => {
          console.log('fff', res.body)
          assert.deepInclude(res.body, todoData);
          returnedTodo = res.body;
        })
        .expect(200)
        .expect('Content-Type', /json/);
    });

    it('returns the right id', async function() {
      await authedSession
        .post('/todos/deleteTodo')
        .send({ _id: returnedTodo._id })
        .set('Content-Type', 'application/json')
        .set('accept', 'application/json')
        .expect(res => {
          console.log('returnedTOdo2', returnedTodo)
          console.log('res.body2', res.body)
          assert.deepInclude(res.body, { _id: returnedTodo._id });
        })
        .expect(200)
        .expect('Content-Type', /json/);
    });

    it('actually deletes correct todo', async function() {
      await authedSession.get('/todos/get').expect(res => {
        assert.equal(res.body.length, 0);
      });
    });
  });
  
  describe('editTodo test', function(){
    testSession = session(app);
    let authedSession;
    const userData = {
      username: internet.userName(),
      password: internet.password()
    };

    const todoData = {
      todo: lorem.sentences(1),
      closed: false
    };
    const newTodoData = {
      todo: lorem.sentences(2),
      closed: false
    };
    before('signUp, signIn for session, submit to do to edit', async function() {
      await testSession
        .post('/user/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .send(userData)
        .expect(200);

      await testSession
        .post('/user/login')
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .send(userData)
        .expect(200);
      authedSession = testSession;
      
      await authedSession
        .post('/todos/submit')
        .send(todoData)
        .set('Content-Type', 'application/json')
        .set('accept', 'application/json')
        .expect(res => {
          newTodoData._id = res.body._id
          assert.deepInclude(res.body, todoData);
        })
        .expect(200)
        .expect('Content-Type', /json/);
    });

    it('edits appropriate todo', async function(){
      await authedSession
        .post('/todos/editTodo')
        .send(newTodoData)
        .set('Content-Type', 'application/json')
        .set('accept', 'application/json')
        .expect(res => {
          // console.log('iii', res.body)

          assert.deepInclude(res.body, newTodoData);
        })
        .expect(200)
        .expect('Content-Type', /json/);
    })
  })
});
