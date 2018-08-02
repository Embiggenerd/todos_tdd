const {spy} = require('sinon')
const {expect} = require('chai')

const isLoggedIn = require('./isLoggedIn')

describe('authentication middleware unit test', function() {
  it('calls next if user authenticated', function(){
    const req = {
      session:{
        userId: true
      }
    }
    const res = {
      sendStatus: spy()
    }
    const next = spy()
    isLoggedIn(req, res, next)
    expect(res.sendStatus.notCalled).to.be.true
    expect(next.calledOnce).to.be.true
  })
  it('sendStatus with 401 called if not authenticated', function() {
    const req = {
      session: {
        userId: false
      }
    }
    const res = {
      sendStatus: spy()
    }
    const next = spy()
    isLoggedIn(req, res, next)
    expect(res.sendStatus.calledOnce).to.be.true
    expect(next.notCalled).to.be.true
    expect(res.sendStatus.firstCall.args[0]).to.equal(401);
  })
})