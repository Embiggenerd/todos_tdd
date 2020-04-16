const UserServices = require("../services/user_services");
const { expect, assert } = require("chai");
const { spy, stub, mock } = require("sinon");
const { internet } = require("faker");
const { hash, compare } = require("bcryptjs");
const { ObjectId } = require("mongoose").Types;

describe("User Services:", () => {
  it("UserServices module is defined", () => {
    assert.isDefined(UserServices);
  });
  describe("saveUser test", function() {
    it("Invoked save method on model", () => {
      const save = spy();
      const UserModelMock = function() {
        return {
          save
        };
      };
      const userServices = UserServices(UserModelMock);
      userServices.saveUser(internet.userName(), internet.password());
      assert(save.calledOnce);
    });
  });
  describe("userExists test", function() {
    it("If user exists, returns true", async function() {
      const countDocuments = stub().returns(1);
      const username = internet.userName();

      const UserModelMock = {
        countDocuments
      };
      const userServices = UserServices(UserModelMock);
      const actual = await userServices.userExists(username);
      const expected = true;

      expect(countDocuments.calledOnce).to.be.true;
      expect(countDocuments.firstCall.args[0]).to.deep.equal({ username });
      expect(actual).to.equal(expected);
    });
    it("If user does not exist, returns false", async function() {
      const countDocuments = stub().returns(0);
      const username = internet.userName();

      const UserModelMock = {
        countDocuments
      };

      const userServices = UserServices(UserModelMock);
      const actual = await userServices.userExists(username);
      const expected = false;

      expect(countDocuments.calledOnce).to.be.true;
      expect(countDocuments.firstCall.args[0]).to.deep.equal({ username });
      expect(actual).to.equal(expected);
    });
  });

  describe("encryptPassword test", function() {
    it("returns the hash of the arg", async function() {
      const password = internet.password();

      const userServices = UserServices({});
      const encryptedPass = await userServices.encryptPassword(password);
      const actual = await compare(password, encryptedPass);
      const expected = true;
      expect(actual).to.equal(expected);
    });
  });
  describe("validateUser test", function() {
    it("returns undefined if user not found in database", async function() {
      const UserModelMock = {
        findOne: stub().returns(false)
      };
      const userData = {
        username: internet.userName(),
        password: internet.password()
      };
      const userServices = UserServices(UserModelMock);
      const actual = await userServices.validateUser(userData);
      const expected = undefined;

      expect(actual).to.equal(expected);
    });
    it("returns undefined if passwords don't match", async function() {
      const userData = {
        username: internet.userName(),
        password: internet.password()
      };
      const UserModelMock = {
        findOne: stub().returns({
          id: ObjectId(),
          username: userData.username,
          password: internet.password()
        })
      };
      const userServices = UserServices(UserModelMock);
      const actual = await userServices.validateUser(
        userData.username,
        userData.password
      );
      const expected = undefined;
      expect(actual).to.equal(expected);
    });
    it("returns user id and username when passwords match", async function() {
      const userData = {
        username: internet.userName(),
        password: internet.password()
      };
      const encryptedPass = await hash(userData.password, 2);
      const id = ObjectId();
      const UserModelMock = {
        findOne: stub().returns({
          id,
          username: userData.username,
          password: encryptedPass
        })
      };
      const userServices = UserServices(UserModelMock);
      const actual = await userServices.validateUser(
        userData.username,
        userData.password
      );
      const expected = { id, username: userData.username };
      expect(actual).to.deep.equal(expected);
    });
  });
  describe("loginUser test", function() {
    it("returns user id on req.session.userId property", function() {
      const req = {
        session: {
          userId: undefined
        }
      };
      const userId = ObjectId();
      const UserModelMock = {};
      const userServices = UserServices(UserModelMock);
      const actual = userServices.loginUser(userId, req);
      const expected = userId;
      expect(actual).to.equal(expected);
    });
  });
  describe("logOut test", function() {
    it('calls destroy on session', function(){
      const destroy = spy()
      const req = {
        session: {
          destroy
        }
      }
      const UserModelMock = {}
      const userServices = UserServices(UserModelMock)
      userServices.logOut(req)
      const actual = destroy.calledOnce
      const expected = true
      expect(actual).to.equal(expected)
    })
  })
});
