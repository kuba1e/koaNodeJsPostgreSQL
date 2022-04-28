const Todos = require("../models/todosModels");

const getTodos = async (ctx, next) => {
  try {
    const todos = await Todos.findAll();

    ctx.body = { data: todos };

    next();
  } catch (error) {}
};

const getTodo = async (ctx, next) => {
  try {
    const id = ctx.params.id;
    const todo = await Todos.find(id);
    ctx.body = todo;
    next();
  } catch (error) {}
};

const createTodo = async (ctx, next) => {
  try {
    const data = ctx.request.body;
    const id = await Todos.create(data);
    if (id) {
      ctx.body = { message: "Todo added successful" };
    }
    next();
  } catch (error) {}
};

const updateTodo = async (ctx, next) => {
  try {
    const data = ctx.request.body;
    const id = ctx.params.id;
    await Todos.update(id, data);
    ctx.body = { message: "Todo updated successful" };
    next();
  } catch (error) {}
};

const deleteTodo = async (ctx, next) => {
  try {
    const id = ctx.params.id;
    await Todos.remove(id);
    ctx.body = { message: "Deleted successful" };
    next();
  } catch (error) {}
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
