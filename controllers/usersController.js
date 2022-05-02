const {
  userRegistration,
  userActivation,
  userLogin,
  userLogout,
  userRefreshToken,
  getAllUsers,
} = require("../service/userService");

const registration = async (ctx, next) => {
  try {
    const { email, password } = ctx.request.body;
    const userData = await userRegistration(email, password);

    ctx.body = { message: "User was added successful", data: userData };
    ctx.cookies.set("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

const login = async (ctx, next) => {
  try {
    const { email, password } = ctx.request.body;

    const userData = await userLogin(email, password);

    ctx.body = { message: "User was logined successful", data: userData };

    ctx.cookies.set("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

const logout = async (ctx, next) => {
  try {
    const refreshToken = ctx.cookies.get("refreshToken");

    console.log(refreshToken)

    const token = await userLogout(refreshToken);

    ctx.cookies.set("refreshToken", "");

    ctx.body = { message: "Logout succesful", data: token };

    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

const activate = async (ctx, next) => {
  try {
    const { link } = ctx.params;
    ctx.redirect("https://adaptive123.herokuapp.com/");

    await userActivation(link);

    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

const refresh = async (ctx, next) => {
  try {
    const refreshToken = ctx.cookies.get("refreshToken");

    const userData = await userRefreshToken(refreshToken);

    ctx.body = { message: "Token was updated successful", data: userData };
    ctx.cookies.set("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

const getUsers = async (ctx, next) => {
  try {
    const users = await getAllUsers();
    ctx.body = { message: "Users found successful", data: users };

    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

module.exports = {
  getUsers,
  registration,
  login,
  logout,
  activate,
  refresh,
};
