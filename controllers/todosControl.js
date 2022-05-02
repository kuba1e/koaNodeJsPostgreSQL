const Todos = require("../models/todosModels");

const getTodos = async (ctx, next) => {
  try {
    const todos = await Todos.findAll();
    ctx.body = { message: "Todos found successful", data: todos };

    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

const getTodo = async (ctx, next) => {
  try {
    const id = ctx.params.id;
    const todo = await Todos.find(id);
    ctx.body = { message: "Todo found succesful", data: todo };
    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

const createTodo = async (ctx, next) => {
  try {
    const data = ctx.request.body;
    const newTodo = await Todos.create(data);
    if (newTodo) {
      ctx.body = { message: "Todo added successful", data: newTodo.rows[0] };
    }

    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

const updateTodo = async (ctx, next) => {
  try {
    const data = ctx.request.body;
    const id = ctx.params.id;
    const updatedTodo = await Todos.update(id, data);
    if (updatedTodo.rows.length) {
      ctx.body = { message: "Todo updated successful" };
    } else {
      ctx.body = { message: "Can't find todo with this ID" };
    }

    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

const updateAllTodo = async (ctx, next) => {
  try {
    const data = ctx.request.body;
    const updatedTodo = await Todos.updateAll(data);
    if (updatedTodo.rows.length) {
      ctx.body = { message: "Todo updated successful" };
    } else {
      ctx.body = { message: "Can't find todo with this ID" };
    }

    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

const deleteTodo = async (ctx, next) => {
  try {
    const id = ctx.params.id;
    const data = await Todos.remove(id);
    if (data.rows.length) {
      ctx.body = { message: "Deleted successful" };
    } else {
      ctx.body = { message: "Can't find todo with this ID" };
    }

    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  updateAllTodo,
  deleteTodo,
};
