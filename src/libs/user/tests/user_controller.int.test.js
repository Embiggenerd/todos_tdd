const mongoose = require("mongoose");
const request = require("supertest");
const { expect, assert } = require("chai");
const { internet } = require("faker");
const { compare } = require('bcrypt')

const app = require("../../../app");
const UserModel = require("../user_model");
const testDB = "mongodb://localhost:27017/todo_tdd_test";

describe("User routers test", function() {
  it("app module is defined", function() {
    assert.isDefined(app);
  });

  let server;

  before("connect to db, run server", async function() {
    server = await app.listen(3001);
    await mongoose.connect(
      testDB,
      { useNewUrlParser: true }
    );
    UserModel.remove({}, () => console.log("db cleaned of users"));
  });

  after("close connection, server", function(done) {
    mongoose.connection.close();
    server.close(done);
  });

  describe("signup test", function() {
    const userData = {
      username: internet.userName(),
      password: internet.password()
    };
    it("edirects to login", async function() {
      await request(server)
        .post("/user/signup")
        .send(userData)
        .set("Content-Type", "application/json")
        .expect(302)
        .expect("Location", "/login");

      const foundUser = await UserModel.find({ username: userData.username });
    });
    it("returns 400 for username already exists", async function() {
      const foundUser = await UserModel.find({ username: userData.username });
      await request(server)
        .post("/user/signup")
        .send(userData)
        .set("Content-Type", "application/json")
        .expect(400);
    });
    it('saved user password is properly hashed', async function(){
      const user = await UserModel.findOne({ username: userData.username })
      console.log('user', user)
      const comparison = await compare(userData.password, user.password)
      expect(comparison).to.be.true;
    })
  });
});
