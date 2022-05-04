const Todos = require("../models/todosModels");

const getTodos = async (ctx, next) => {
  try {
    const { id: userId } = ctx.state.user;
    const todos = await Todos.findAll(userId);
    ctx.body = { message: "Todos found successful", data: todos };

    await next();
  } catch (error) {
    ctx.app.emit("error", error, ctx);
  }
};

const getTodo = async (ctx, next) => {
  try {
    const id = ctx.params.id;
    const { id: userId } = ctx.state.user;
    const todo = await Todos.find(userId, id);
    ctx.body = { message: "Todo found succesful", data: todo };
    await next();
  } catch (error) {
    ctx.app.emit("error", error, ctx);
  }
};

const createTodo = async (ctx, next) => {
  try {
    const { id: userId } = ctx.state.user;
    const data = ctx.request.body;
    const newTodo = await Todos.create(userId, data);
    if (newTodo) {
      ctx.body = { message: "Todo added successful", data: newTodo.rows[0] };
    }

    await next();
  } catch (error) {
    ctx.app.emit("error", error, ctx);
  }
};

const updateTodo = async (ctx, next) => {
  try {
    const data = ctx.request.body;
    const id = ctx.params.id;
    const { id: userId } = ctx.state.user;

    const updatedTodo = await Todos.update(userId, id, data);
    if (updatedTodo.rows.length) {
      ctx.body = { message: "Todo updated successful" };
    } else {
      ctx.body = { message: "Can't find todo with this ID" };
    }

    await next();
  } catch (error) {
    ctx.app.emit("error", error, ctx);
  }
};

const updateAllTodo = async (ctx, next) => {
  try {
    const data = ctx.request.body;
    const { id: userId } = ctx.state.user;

    const updatedTodo = await Todos.updateAll(userId, data);
    if (updatedTodo.rows.length) {
      ctx.body = { message: "Todo updated successful" };
    } else {
      ctx.body = { message: "Can't find todo with this ID" };
    }

    await next();
  } catch (error) {
    ctx.app.emit("error", error, ctx);
  }
};

const deleteTodo = async (ctx, next) => {
  try {
    const id = ctx.params.id;
    const { id: userId } = ctx.state.user;

    const data = await Todos.remove(userId, id);
    if (data.rows.length) {
      ctx.body = { message: "Deleted successful" };
    } else {
      ctx.body = { message: "Can't find todo with this ID" };
    }

    await next();
  } catch (error) {
    ctx.app.emit("error", error, ctx);
  }
};

const deleteCompletedTodo = async (ctx, next) => {
  try {
    const { id: userId } = ctx.state.user;
    const { todos: todosToDelete } = ctx.request.body;

    todosToDelete.map(async (id) => {
      return await Todos.remove(userId, id);
    });

    ctx.body = { message: "Deleted successful" };

    await next();
  } catch (error) {
    ctx.app.emit("error", error, ctx);
  }
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  updateAllTodo,
  deleteTodo,
  deleteCompletedTodo,
};
