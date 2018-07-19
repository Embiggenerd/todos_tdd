const UserServices = require('../services/user_services');
const { expect, assert } = require('chai');
const { spy, stub, mock } = require('sinon');
const { internet } = require('faker');
const { compare } = require('bcrypt');

describe('User Services:', () => {
  it('UserServices module is defined', () => {
    assert.isDefined(UserServices);
  });
  describe('saveUser test', function() {
    it('Invoked save method on model', () => {
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
  describe('userExists test', function() {
    it('If user exists, returns true', async function() {
      const countDocuments = stub().returns(1);
      const username = internet.userName();

      const UserModelMock = {
        countDocuments
      };
      const userServices = UserServices(UserModelMock);
      const actual = await userServices.userExists(username);
      console.log('actual', actual);
      const expected = true;

      expect(countDocuments.calledOnce).to.be.true;
      expect(countDocuments.firstCall.args[0]).to.deep.equal({ username });
      expect(actual).to.equal(expected);
    });
    it('If user does not exist, returns false', async function() {
      const countDocuments = stub().returns(0);
      const username = internet.userName();

      const UserModelMock = {
        countDocuments
      };

      const userServices = UserServices(UserModelMock);
      const actual = await userServices.userExists(username);
      console.log('actual', actual);
      const expected = false;

      expect(countDocuments.calledOnce).to.be.true;
      expect(countDocuments.firstCall.args[0]).to.deep.equal({ username });
      expect(actual).to.equal(expected);
    });
  });

  describe('encryptPassword test', function() {
    it('returns the hash of the arg', async function() {
      const password = internet.password();

      const userServices = UserServices({});
      const encryptedPass = await userServices.encryptPassword(password);
      const actual = await compare(password, encryptedPass);
      const expected = true;
      expect(actual).to.equal(expected);
    });
  });
});
