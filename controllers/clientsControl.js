const Clients = require("../models/clientsModel");

const getClients = async (ctx, next) => {
  try {
    const todos = await Clients.findAll();
    ctx.body = { message: "Todos found successful", data: todos };

    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

const getClient = async (ctx, next) => {
  try {
    const id = ctx.params.id;
    const todo = await Clients.find(id);
    ctx.body = { message: "Todo found succesful", data: todo };
    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

const getClientPurchases = async (ctx, next) => {
  try {
    const id = ctx.params.id;
    const todo = await Clients.findClientPurchases(id);
    ctx.body = { message: "Todo found succesful", data: todo };
    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

const createClient = async (ctx, next) => {
  try {
    const data = ctx.request.body;
    const newTodo = await Clients.create(data);
    if (newTodo) {
      ctx.body = { message: "Todo added successful", data: newTodo.rows[0] };
    }

    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

const updateClient = async (ctx, next) => {
  try {
    const data = ctx.request.body;
    const id = ctx.params.id;
    const updatedTodo = await Clients.update(id, data);
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

const deleteClient = async (ctx, next) => {
  try {
    const id = ctx.params.id;
    const data = await Clients.remove(id);
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
  getClients,
  getClient,
  getClientPurchases,
  createClient,
  updateClient,
  deleteClient,
};
