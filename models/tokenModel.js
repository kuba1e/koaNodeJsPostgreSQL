const jwt = require("jsonwebtoken");
require("dotenv").config();

const db = require("../db");

const jwtAccessSecretKey = process.env.ACCESS_SECRET_KEY;
const jwtRefreshSecreKey = process.env.REFRESH_SECRET_KEY;

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, jwtAccessSecretKey, {
    expiresIn: "60s",
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

const validateAccessToken = async (accessToken, ctx) => {
  try {
    return jwt.verify(accessToken, jwtAccessSecretKey, (error, decoded) => {
      if (error) {
        throw new Error("User is unauthorized");
      }
      return decoded;
    });
  } catch (error) {
    ctx.throw(401, error.message);
  }
};

const validateRefreshToken = async (refreshToken, ctx) => {
  try {
    return jwt.verify(refreshToken, jwtRefreshSecreKey, (error, decoded) => {
      if (error) {
        throw new Error("User is unauthorized");
      }
      return decoded;
    });
  } catch (error) {
    throw new Error(error);
  }
};

const findToken = async (token) => {
  try {
    const tokenData = await db.query("SELECT * FROM token WHERE user_id = $1", [
      token,
    ]);

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
