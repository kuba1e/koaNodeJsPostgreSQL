
const { validateAccessTokenSocket } = require("../models/tokenModel");

const authWebScocketCheck = async (socket, next) => {
  try {
    const authorizationHeader = socket.request.headers.authorization;

    if (!authorizationHeader) {
      const error = new Error("User is unauthorized");
      error.status = 401;
    return  await next(error);
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      const error = new Error("User is unauthorized");
      error.status = 401;
    return  await next(error);
    }

    const userData = await validateAccessTokenSocket(accessToken);

    if (!userData) {
      const error = new Error("User is unauthorized");
      error.status = 401;
    return  await next(error);
    }

    console.log(userData)
    socket.data.user = userData;
    await next();
  } catch (error) {
    await next(error);
  }
};

module.exports = authWebScocketCheck;
