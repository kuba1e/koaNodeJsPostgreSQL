const Purchases = require("../models/purchasesModel");

const getPurchases = async (ctx, next) => {
  try {
    const purchase = await Purchases.findAll();
    ctx.body = { message: "Todos found successful", data: purchase };

    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

const getCityPurchases = async (ctx, next) => {
  try {
    const purchase = await Purchases.findCityPurchases();
    ctx.body = { message: "Todo found succesful", data: purchase };
    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

const getProductsPurchasesCount = async (ctx, next) => {
  try {
    const purchase = await Purchases.findProductsPurchasesCount();
    ctx.body = { message: "Todo found succesful", data: purchase };
    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

const getMostLargestPurchase = async (ctx, next) => {
  try {
    const purchase = await Purchases.findMostLargestPurchase();
    ctx.body = { message: "Todo found succesful", data: purchase };
    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

const createPurchase = async (ctx, next) => {
  try {
    const data = ctx.request.body;
    const purchase = await Purchases.create(data);
    if (newTodo) {
      ctx.body = { message: "Todo added successful", data: purchase.rows[0] };
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
    const purchase = await Purchases.update(id, data);
    if (purchase.rows.length) {
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
    const purchase = await Purchases.remove(id);
    if (purchase.rows.length) {
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
  getCityPurchases,
  getProductsPurchasesCount,
  getMostLargestPurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
};
