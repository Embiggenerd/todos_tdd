const { spy, stub, mock } = require('sinon');
const { expect, assert } = require('chai');
const { ObjectId } = require('mongoose').Types;
const { lorem } = require('faker');

const TodosServices = require('../services/todos_services');

describe('Todos services test:', function() {
  it('UserServices module is defined', function() {
    assert.isDefined(TodosServices);
  });

  describe('submitTodo test', function() {
    const save = spy();
    const TodosModelMock = function() {
      return {
        save
      };
    };
    const todoData = {
      user: ObjectId(),
      todo: lorem.sentences(1),
      closed: true
    };

    it('calls save on TodosModel object', function() {
      const { user, todo, closed } = todoData;
      const todosServices = TodosServices(TodosModelMock);
      todosServices.submitTodo(todo, closed, user);
      assert(save.calledOnce);
    });
  });
  describe('getTodos test', function() {
    const find = spy();
    const TodosModelMock = { find };
    const todoData = {
      user: ObjectId(),
      todo: lorem.sentences(1),
      closed: true
    };

    it('calls find on TodosModel with user as arg', function() {
      const user = todoData.user;
      const todosServices = TodosServices(TodosModelMock);
      todosServices.getTodos(user);
      assert.deepEqual(find.firstCall.args[0], { user: todoData.user });
    });
  });
});
