const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const request = require("supertest");
const session = require("supertest-session");
const { expect, assert } = require("chai");
const { internet, lorem } = require("faker");

const app = require("../../../app");
const TodosModel = require("../todos_model");
const testDB = "mongodb://localhost:27017/todo_tdd_test";

describe("Todos controller test", function() {
  it("app module is defined", function() {
    assert.isDefined(app);
  });

  let server;
  let testSession;

  before("connect to db, run server", async function() {
    server = await app.listen(3002);
    await mongoose.connect(
      testDB,
      { useNewUrlParser: true }
    );
    await TodosModel.remove({});
  });

  after("close connection, server", function(done) {
    mongoose.connection.close();
    server.close(done);
  });

  describe("submit_todo test, unauthenticated", function() {
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
    it("redirects 401 for valid req, no authorization", async function() {
      await request(server)
        .post("/todos/submit")
        .send(todoData)
        .set("Content-Type", "application/json")
        .set("accept", "application/json")
        .expect(res => {
          assert.deepEqual(res.body, {});
        })
        .expect(302)
        .expect("Location", "/401");
    });

    it("redirects 401 for invalid data, no auth", async function() {
      await request(server)
        .post("/todos/submit")
        .send(badTodoData)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(res => {
          assert.deepEqual(res.body, {});
        })
        .expect(302)
        .expect("Location", "/401");
    });
  });

  describe("submit_todo test, authenticated", function() {
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
      todo: "",
      closed: false
    };
    before("signUp, signIn for session", async function() {
      await testSession
        .post("/user/signup")
        .set('Content-Type', 'application/json')
        .send(userData)
        .expect(302)
        .expect("Location", "/login");

      await testSession
        .post("/user/login")
        .send(userData)
        .expect(302)
        .expect("Location", "/todos");
      authedSession = testSession;
    });

    it("returns submitted todo for valid req", async function() {
      await authedSession
        .post("/todos/submit")
        .send(todoData)
        .set("Content-Type", "application/json")
        .set("accept", "application/json")
        .expect(res => {
          assert.deepInclude(res.body, todoData);
        })
        .expect(200)
        .expect("Content-Type", /json/);
    });

    it("returns 500 for invalid data", async function() {
      await authedSession
        .post("/todos/submit")
        .send(badTodoData)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(500)
        .expect(res => {
          assert.include(res.error.text, "ValidationError: user validation failed: todo: Path `todo` is required")
        });
    });
  });
  describe("get_todos test", function() {
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

    before("signUp, signIn for session", async function() {
      await TodosModel.remove({});

      await testSession
        .post("/user/signup")
        .send(userData)
        .expect(302)
        .expect("Location", "/login");

      await testSession
        .post("/user/login")
        .send(userData)
        .expect(302)
        .expect("Location", "/todos");
      authedSession = testSession;
    });
    it("returns a list of todos when authenticated", async function() {
      await authedSession
        .post("/todos/submit")
        .send(todoData)
        .expect(200);
      await authedSession
        .post("/todos/submit")
        .send(todoData)
        .expect(200);
      await authedSession
        .post("/todos/submit")
        .send(todoData)
        .expect(200);

      await authedSession
        .get("/todos/get")
        .expect(res => {
          assert.equal(res.body.todos.length, 3)
        })
    });
  });
});
