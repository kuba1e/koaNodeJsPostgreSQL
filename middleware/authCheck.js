const { validateAccessToken } = require("../models/tokenModel");

const authCheck = async (ctx, next) => {
  try {
    const authorizationHeader = ctx.header.authorization;
    if (!authorizationHeader) {
      throw new Error("User is unauthorized");
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      throw new Error("User is unauthorized");
    }

    const userData = await validateAccessToken(accessToken);

    if (!userData) {
      throw new Error("User is unauthorized");
    }

    ctx.state.user = userData;

    await next();
  } catch (error) {
    ctx.app.emit("error", error.message, ctx);
  }
};

module.exports = authCheck;
