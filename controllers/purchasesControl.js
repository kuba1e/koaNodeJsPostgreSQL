const Purchases = require("../models/purchasesModel");

const getPurchases = async (ctx, next) => {
  try {
    const todos = await Purchases.findAll();
    ctx.body = { message: "Todos found successful", data: todos };

    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

const getPurchase = async (ctx, next) => {
  try {
    const id = ctx.params.id;
    const todo = await Purchases.find(id);
    ctx.body = { message: "Todo found succesful", data: todo };
    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

const getCityPurchases = async (ctx, next) => {
  try {
    const todo = await Purchases.findCityPurchases();
    ctx.body = { message: "Todo found succesful", data: todo };
    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

const createPurchase = async (ctx, next) => {
  try {
    const data = ctx.request.body;
    const newTodo = await Purchases.create(data);
    if (newTodo) {
      ctx.body = { message: "Todo added successful", data: newTodo.rows[0] };
    }

    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

const updatePurchase = async (ctx, next) => {
  try {
    const data = ctx.request.body;
    const id = ctx.params.id;
    const updatedTodo = await Purchases.update(id, data);
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

const deletePurchase = async (ctx, next) => {
  try {
    const id = ctx.params.id;
    const data = await Purchases.remove(id);
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
  getPurchases,
  getPurchase,
  getCityPurchases,
  createPurchase,
  updatePurchase,
  deletePurchase,
};
