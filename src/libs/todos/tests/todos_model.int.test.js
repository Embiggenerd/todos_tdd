const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const { expect, assert } = require("chai");
const { internet, lorem } = require("faker");

const TodosModel = require("../todos_model");

const testDB = "mongodb://localhost:27017/todo_tdd_test";

describe("todos_model test", function() {
  it("module is defined", function() {
    assert.isDefined(TodosModel);
  });
  before("Clear db. start connection", async function() {
    await mongoose.connect(
      testDB,
      { useNewUrlParser: true },
      () => console.log("Connected to test db")
    );
    await TodosModel.remove({}, () => console.log("Todos documents dropped"));
  });
  afterEach("Clear Todos documents between tets", async function() {
    await TodosModel.remove({}, () => console.log("Todos cleared"));
  });
  after("Close mongoose connection", async function() {
    await mongoose.connection.close(() => console.log("Conneciton Closed"));
  });
  // user model should:
  it("Saves a todo", async function() {
    const todoData = {
      todo: lorem.sentences(1),
      closed: true,
      user: ObjectId()
    };
    const newTodo = new TodosModel(todoData);
    const savedTodo = await newTodo.save();
    assert.include(savedTodo, todoData);
  });
  it("Finds a todo", async function() {
    const todoData = {
      todo: lorem.sentences(1),
      closed: true,
      user: ObjectId()
    };
    const newTodo = new TodosModel(todoData);
    await newTodo.save();
    const foundTodo = await TodosModel.findOne({
      user: todoData.user
    });

    assert.deepInclude(foundTodo, todoData);
  });
  it("Todo field is required", async function() {
    const todoData = {
      todo: "",
      closed: true,
      user: ObjectId
    };
    try {
      const newTodo = new TodosModel(todoData);
      const savedTodo = await newTodo.save();
      assert.isNull(savedTodo);
    } catch (e) {
      assert.equal(e.name, "ValidationError");
    }
  });
  it("Closed field only takes boolean", async function() {
    const todoData = {
      todo: lorem.sentences(1),
      closed: "true",
      user: ObjectId
    };
    try {
      const newTodo = new TodosModel(todoData);
      const savedTodo = await newTodo.save();
      assert.isNull(savedTodo);
    } catch (e) {
      assert.equal(e.name, "ValidationError");
    }
  });
  // store a text body
  // be open or closed
  // have an author field
});
