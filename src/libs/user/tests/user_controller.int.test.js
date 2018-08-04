const mongoose = require('mongoose');
const request = require('supertest');
const { expect, assert } = require('chai');
const { internet } = require('faker');
const { compare } = require('bcrypt');

const app = require('../../../app');
const UserModel = require('../user_model');
const testDB = 'mongodb://localhost:27017/todo_tdd_test';
mongoose.Promise = global.Promise;

describe('User controllers test', function() {
  it('app module is defined', function() {
    assert.isDefined(app);
  });

  let server;

  before('connect to db, run server', async function() {
    this.timeout(20000)
    try {
      server = await app.listen(3001);
    await mongoose.connect(
      testDB,
      { useNewUrlParser: true }
    );
    } catch(e){
      throw new Error(e)
    }
    
  });

  after('close connection, server', function(done) {
    UserModel.remove({});
    mongoose.connection.close();
    server.close(done);
  });

  describe('signup test', function() {
    const userData = {
      username: internet.userName(),
      password: internet.password()
    };
    it('redirects to login', async function() {
      await request(server)
        .post('/user/signup')
        .send(userData)
        .set('Content-Type', 'application/json')
        .expect(302)
        .expect('Location', '/user/login');
    });
    it('returns 400 for username already exists', async function() {
      await request(server)
        .post('/user/signup')
        .send(userData)
        .set('Content-Type', 'application/json')
        .expect(400);
    });
    it('saved user password is properly hashed', async function() {
      const user = await UserModel.findOne({ username: userData.username });
      const comparison = await compare(userData.password, user.password);
      expect(comparison).to.be.true;
    });
  });

  describe('logIn test', function() {
    const userData = {
      username: internet.userName(),
      password: internet.password()
    };
    before('populate DB', function(done) {
      request(server)
        .post('/user/signup')
        .send(userData)
        .set('Content-Type', 'application/json')
        .end(() => {
          console.log('db populated');
          done();
        });
    });
    after('clean db', function() {
      UserModel.remove({}, () => console.log('db cleaned of users'));
    });
    it('redirects to 401 if password invalid', async function() {
      await request(server)
        .post('/user/login')
        .send({ username: userData.username, password: internet.password() })
        .set('Content-Type', 'application/json')
        .expect(302)
        .expect('Location', '/401');
    });
    it('redirects to todos if password valid', async function() {
      await request(server)
        .post('/user/login')
        .send(userData)
        .set('Content-Type', 'application/json')
        .expect(302)
        .expect('Location', '/todos');
    });
  });
});
