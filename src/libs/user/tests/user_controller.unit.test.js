const { spy, stub, mock } = require('sinon');
const { expect, assert } = require('chai');
const { internet } = require('faker');
const rewire = require('rewire');
const { hash } = require('bcrypt');

const signUpRW = rewire('../controllers/sign_up');
const userController = rewire('../controllers');
const { signUp } = userController;

describe('userController unit tests', function() {
  it('userController module is defined', function() {
    assert.isDefined(userController);
  });

  describe('signUp test', function() {
    it('is defined', function() {
      assert.isDefined(signUp);
    });
    // calls res.json(err) if username is taken
    // it('calls res.json(err) if username is taken', function() {
    //   const req = {
    //     body: {
    //       username: internet.userName(),
    //       password: internet.password()
    //     }
    //   };
    //   const res = {
    //     json: spy()
    //   };
    //   const next = spy();
    //   signUpRW.__set__('userExists', () => true);
    //   signUpRW(req, res, next);

    //   // expect(count.calledOnce).to.be.true;
    //   // expect(count.firstCall.args[0]).to.deep.equal({ username });
    //   expect(res.json.calledOnce).to.be.true;
    //   expect(res.json.firstCall.args[0]).to.deep.equal({
    //     error: `${req.body.username} is taken`
    //   });
    // });
    it('calls res.redirect if username is not taken', function() {
      const req = {
        body: {
          username: internet.userName(),
          password: internet.password()
        }
      };
      const res = {
        redirect: spy()
      };
      const next = spy();
      signUpRW.__set__('userExists', () => false);
      signUpRW(req, res, next);

      expect(res.redirect.calledOnce).to.be.true;
      expect(res.redirect.firstCall.args[0]).toEqual('/login');
    });

    // calls saveUser on username, hashed password,
    // calls res.redirect('/login) if user is new
    // it('calls saveUser, res.redirect if user is new', function() {
    //   const req = {
    //     body: {
    //       username: internet.userName(),
    //       password: internet.password()
    //     }
    //   };
    //   const res = {
    //     redirect: spy()
    //   };
    //   const userExistsStub = stub().returns(false);
    //   const saveUserSpy = spy();
    //   const encryptPWSpy = spy();

    //   signUpRW.__set__({
    //     userExists: userExistsStub,
    //     saveUser: saveUserSpy,
    //     encryptPassword: encryptPWSpy
    //   });
    //   const next = spy();
    //   signUpRW(req, res, next);
    //   expect(saveUserSpy.calledOnce).to.be.true;
    //   // expect(res.redirect.calledOnce).to.be.true;
    // });
  });
});
