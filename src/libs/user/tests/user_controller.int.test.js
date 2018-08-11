const mongoose = require("mongoose");
const request = require("supertest");
const { expect, assert } = require("chai");
const { internet } = require("faker");
const { compare } = require("bcrypt");

const app = require("../../../app");
const UserModel = require("../user_model");
const testDB = "mongodb://localhost:27017/todo_tdd_test";
mongoose.Promise = global.Promise;

describe("User controllers test", function() {
  it("app module is defined", function() {
    assert.isDefined(app);
  });

  let server;

  before("connect to db, run server", async function() {
    this.timeout(20000);
    try {
      server = await app.listen(3001);
      await mongoose.connect(
        testDB,
        { useNewUrlParser: true }
      );
    } catch (e) {
      throw new Error(e);
    }
  });

  after("close connection, server", function(done) {
    UserModel.remove({});
    mongoose.connection.close();
    server.close(done);
  });

  describe("signup test", function() {
    const userData = {
      username: internet.userName(),
      password: internet.password()
    };
    const error =  {
      name: "YOU DONE GOOFED",
      message: `${userData.username} is taken!`
    }
    it("returns user id and username on success", async function() {
      await request(server)
        .post("/user/signup")
        .send(userData)
        .set("Content-Type", "application/json")
        .expect(200)
        .expect(res => {
          expect(res.body.user).to.have.property('id')
          expect(res.body.user).to.have.property('username', userData.username)
        })
    });
    it("returns 400 if username already exists", async function() {
      await request(server)
        .post("/user/signup")
        .send(userData)
        .set("Content-Type", "application/json")
        .expect(400)
        .expect(res => {
          expect(res.body.error).to.deep.equal(error)
        })
    });
    it("saved user password is properly hashed", async function() {
      const user = await UserModel.findOne({ username: userData.username });
      const comparison = await compare(userData.password, user.password);
      expect(comparison).to.be.true;
    });
  });

  describe("logIn test", function() {
    const error = {
      name: "YOU DONE GOOFED",
      message: "Click out and try again!"
    };
    const userData = {
      username: internet.userName(),
      password: internet.password()
    };
    before("populate DB", function(done) {
      request(server)
        .post("/user/signup")
        .send(userData)
        .set("Content-Type", "application/json")
        .end(() => {
          console.log("db populated");
          done();
        });
    });
    after("clean db", function() {
      UserModel.remove({}, () => console.log("db cleaned of users"));
    });
    it("responds w/401 and error message if password invalid", async function() {
      await request(server)
        .post("/user/login")
        .send({ username: userData.username, password: internet.password() })
        .set("Content-Type", "application/json")
        .expect(401)
        .expect(res => {
          console.log("errz", res.body.error);
          expect(res.body.error).deep.equal(error);
        });
    });
    it("returns username and id if password valid", async function() {
      await request(server)
        .post("/user/login")
        .send(userData)
        .set("Content-Type", "application/json")
        .expect(200)
        .expect(res => {
          expect(res.body.user).to.have.property("id");
          expect(res.body.user).to.have.property('username', userData.username)
        });
    });
  });
  describe('logout test', function(){
    //todo
  })
});
