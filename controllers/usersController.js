const {
  userRegistration,
  userActivation,
  userLogin,
  userLogout,
  userRefreshToken,
} = require("../models/userModel");

const sendResponseWithCookies = (message, data, ctx) => {
  ctx.body = { message, data };
  ctx.cookies.set("refreshToken", data.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

const registration = async (ctx, next) => {
  try {
    const { email, password } = ctx.request.body;
    const userData = await userRegistration(email, password);

    sendResponseWithCookies("User was added successful", userData, ctx);

    await next();
  } catch (error) {
    ctx.app.emit("error", error, ctx);
  }
};

const login = async (ctx, next) => {
  try {
    const { email, password } = ctx.request.body;

    const userData = await userLogin(email, password);

    sendResponseWithCookies("User was logined successful", userData, ctx);

    await next();
  } catch (error) {
    ctx.app.emit("error", error, ctx);
  }
};

const logout = async (ctx, next) => {
  try {
    const refreshToken = ctx.cookies.get("refreshToken");

    await userLogout(refreshToken);

    ctx.cookies.set("refreshToken", "");
    ctx.body = { message: "Logout succesful" };

    await next();
  } catch (error) {
    ctx.app.emit("error", error, ctx);
  }
};

const activate = async (ctx, next) => {
  try {
    const { link } = ctx.params;
    ctx.redirect("https://adaptive123.herokuapp.com/");

    await userActivation(link);

    await next();
  } catch (error) {
    ctx.app.emit("error", error, ctx);
  }
};

const refresh = async (ctx, next) => {
  try {
    const refreshToken = ctx.cookies.get("refreshToken");

    const userData = await userRefreshToken(refreshToken, ctx);

    sendResponseWithCookies("Token was updated successful", userData, ctx);

    await next();
  } catch (error) {
   console.log(error)
    ctx.app.emit("error", error, ctx);
  }
};

module.exports = {
  registration,
  login,
  logout,
  activate,
  refresh,
};
