const {
  userRegistration,
  userActivation,
  userLogin,
  userLogout,
  userRefreshToken,
  updateUserData,
} = require("../models/userModel");

const { findAll } = require("../models/notificationsModels");

const sendResponseWithCookies = (message, data, ctx) => {
  ctx.body = { message, data };

  ctx.cookies.set("refreshToken", data.userInfo.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "lax",
    httpOnly: true,
    secure: false,
  });
};

const registration = async (ctx, next) => {
  try {
    const { email, password } = ctx.request.body;
    const userData = await userRegistration(email, password);

    sendResponseWithCookies(
      "User was added successful",
      { userInfo: userData },
      ctx
    );

    await next();
  } catch (error) {
    ctx.app.emit("error", error, ctx);
  }
};

const login = async (ctx, next) => {
  try {
    const { email, password } = ctx.request.body;

    const userData = await userLogin(email, password);
    const userNotifications = await findAll(userData.user.id);

    await sendResponseWithCookies(
      "User was logined successful",
      { userInfo: userData, notifications: userNotifications },
      ctx
    );

    await next();
  } catch (error) {
    ctx.app.emit("error", error, ctx);
  }
};

const logout = async (ctx, next) => {
  try {
    const refreshToken = ctx.cookies.get("refreshToken");

    await userLogout(refreshToken);

    ctx.cookies.set("refreshToken", "", {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      httpOnly: true,
      secure: false,
    });

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
    // console.log(ctx.socket.data)
    const refreshToken = ctx.cookies.get("refreshToken");

    const userData = await userRefreshToken(refreshToken, ctx);

    const userNotifications = await findAll(userData.user.id);

    sendResponseWithCookies(
      "Token was updated successful",
      { userInfo: userData, notifications: userNotifications },
      ctx
    );

    await next();
  } catch (error) {
    ctx.app.emit("error", error, ctx);
  }
};

const update = async (ctx, next) => {
  try {
    const { email: newEmail, oldPassword, newPassword } = ctx.request.body;
    const { email: currentEmail } = ctx.state.user;
    const { id } = ctx.params;
    const userData = await updateUserData(
      id,
      newEmail,
      currentEmail,
      oldPassword,
      newPassword
    );

    sendResponseWithCookies("User was added successful", userData, ctx);

    await next();
  } catch (error) {
    ctx.app.emit("error", error, ctx);
  }
};

module.exports = {
  registration,
  login,
  logout,
  activate,
  refresh,
  update,
};
