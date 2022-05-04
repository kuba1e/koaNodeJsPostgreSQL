const { validateAccessToken } = require("../models/tokenModel");

const authCheck = async (ctx, next) => {
  try {
    const authorizationHeader = ctx.header.authorization;
    if (!authorizationHeader) {
      ctx.throw(401, "User is unauthorized");
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      ctx.throw(401, "User is unauthorized");
    }

    const userData = await validateAccessToken(accessToken, ctx);

    if (!userData) {
      ctx.throw(401, "User is unauthorized");
    }

    ctx.state.user = userData;

    await next();
  } catch (error) {
    ctx.app.emit("error", error, ctx);
  }
};

module.exports = authCheck;
