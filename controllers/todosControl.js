const Todos = require("../models/todosModels");

const getTodos = async (ctx, next) => {
  try {
    const todos = await Todos.findAll();

    ctx.body = { data: todos };

    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || 500;
    ctx.body = {
      message: error.message,
    };
  }
};

const getTodo = async (ctx, next) => {
  try {
    const id = ctx.params.id;
    const todo = await Todos.find(id);
    ctx.body = todo;
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || 500;
    ctx.body = {
      message: error.message,
    };
  }
};

const createTodo = async (ctx, next) => {
  try {
    const data = ctx.request.body;
    const id = await Todos.create(data);
    if (id) {
      ctx.body = { message: "Todo added successful" };
    }
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || 500;
    ctx.body = {
      message: error.message,
    };
  }
};

const updateTodo = async (ctx, next) => {
  try {
    const data = ctx.request.body;
    const id = ctx.params.id;
    await Todos.update(id, data);
    ctx.body = { message: "Todo updated successful" };
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || 500;
    ctx.body = {
      message: error.message,
    };
  }
};

const deleteTodo = async (ctx, next) => {
  try {
    const id = ctx.params.id;
    await Todos.remove(id);
    ctx.body = { message: "Deleted successful" };
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || 500;
    ctx.body = {
      message: error.message,
    };
  }
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
