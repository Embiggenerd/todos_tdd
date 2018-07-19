const { spy, stub, mock } = require("sinon");
const { expect, assert } = require("chai");
const { internet } = require("faker");
const rewire = require("rewire");
const { hash } = require("bcrypt");

const signUpRW = rewire("../controllers/sign_up");
const userController = rewire("../controllers");
const { signUp } = userController;

describe("userController unit tests", function() {
  it("userController module is defined", function() {
    assert.isDefined(userController);
  });

  describe("signUp test", function() {
    it("is defined", function() {
      assert.isDefined(signUp);
    });

    it("calls res.status(400) if username is taken", async function() {
      const req = {
        body: {
          username: internet.userName(),
          password: internet.password()
        }
      };
      const res = {
        status: spy(),
        redirect: spy()
      };
      
      const next = spy()
      signUpRW.__set__({
        existence: true
      });
      signUpRW(req, res, next);
      // expect(count.calledOnce).to.be.true;
      // expect(count.firstCall.args[0]).to.deep.equal({ username });
      expect(res.status.calledOnce).to.be.true;
      expect(res.status.firstCall.args[0]).to.equal(400);
      expect(res.redirect.notCalled).to.be.true;
    });
    // it('calls res.redirect if username is not taken', function() {
    //   const req = {
    //     body: {
    //       username: internet.userName(),
    //       password: internet.password()
    //     }
    //   };
    //   const res = {
    //     redirect: spy()
    //   };
    //   const next = spy();
    //   signUpRW.__set__('userExists', () => false);
    //   signUpRW(req, res, next);

    //   expect(res.redirect.calledOnce).to.be.true;
    //   expect(res.redirect.firstCall.args[0]).to.equal('/login');
    // });

    // calls saveUser on username, hashed password,
    // calls res.redirect('/login) if user is new
    it("calls saveUser, res.redirect if user is new", function(done) {
      const req = {
        body: {
          username: internet.userName(),
          password: internet.password()
        }
      };
      const res = {
        redirect: spy()
      };
      const userExistsStub = stub().returns(false);
      const saveUserSpy = spy();
      const encryptPWSpy = spy();

      signUpRW.__set__({
        userExists: userExistsStub,
        saveUser: saveUserSpy,
        encryptPassword: encryptPWSpy
      });
      const next = spy();
      signUpRW(req, res, next);
      // expect(saveUserSpy.calledOnce).to.be.true;
      expect(res.redirect.calledOnce).to.be.true;
    });
  });
});
