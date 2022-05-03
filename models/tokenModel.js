const jwt = require("jsonwebtoken");

const db = require("../db");

const jwtAccessSecretKey = "this is a very secret key  ";
const jwtRefreshSecreKey = "this is an another secret key  ";

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, jwtAccessSecretKey, {
    expiresIn: "30m",
  });

  const refreshToken = jwt.sign(payload, jwtRefreshSecreKey, {
    expiresIn: "30d",
  });

  return {
    accessToken,
    refreshToken,
  };
};

const saveToken = async (userId, token) => {
  try {
    const tokenData = await db.query(
      "SELECT 	user_id FROM token WHERE user_id = $1",
      [userId]
    );
    if (tokenData.rows[0]) {
      const tokenInfo = await db.query(
        "UPDATE token SET refresh_token =$1 WHERE user_id = $2 RETURNING *",
        [token, userId]
      );
      return await tokenInfo.rows[0];
    }

    const tokenInfo = await db.query(
      "INSERT INTO token (user_id, refresh_token) values ($1, $2) RETURNING *",
      [userId, token]
    );

    return tokenInfo.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeToken = async (refreshToken) => {
  try {
    const tokenData = await db.query(
      "DELETE FROM token WHERE refresh_token = $1",
      [refreshToken]
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const validateAccessToken = async (accessToken) => {
  try {
    const userData = jwt.verify(accessToken, jwtAccessSecretKey);
    return userData;
  } catch (error) {
    throw new Error(error.message);
  }
};

const validateRefreshToken = async (refreshToken) => {
  try {
    const userData = jwt.verify(refreshToken, jwtRefreshSecreKey);
    return userData;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findToken = async (token) => {
  try {
    console.log(token);
    const tokenData = await db.query(
      "SELECT * FROM token WHERE refresh_token = $1",
      [token]
    );

    return tokenData.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  generateTokens,
  saveToken,
  removeToken,
  validateAccessToken,
  validateRefreshToken,
  findToken,
};
