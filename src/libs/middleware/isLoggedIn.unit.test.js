const { spy } = require("sinon");
const { expect } = require("chai");

const isLoggedIn = require("./isLoggedIn");

describe("authentication middleware unit test", function() {
  it("calls next if user authenticated", function() {
    const req = {
      session: {
        userId: true
      }
    };
    const res = {
      redirect: spy()
    };
    const next = spy();
    isLoggedIn(req, res, next);
    expect(res.redirect.notCalled).to.be.true;
    expect(next.calledOnce).to.be.true;
  });
  it("returns error if not authenticated", function() {
    const json = spy()
    const error = {
      name: "YOU DONE GOOFED",
      message: "Not authorized!"
    }
    const req = {
      session: {
        userId: false
      }
    };
    const res = {
      status(){
        return {
          json
        }
      }   
    };
    const next = spy();
    isLoggedIn(req, res, next);
    expect(json.calledOnce).to.be.true;
    expect(next.notCalled).to.be.true;
    expect(json.firstCall.args[0]).to.deep.equal({error});
  });
});
