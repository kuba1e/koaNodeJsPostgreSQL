const db = require("../db");
const types = require("pg").types;

types.setTypeParser(types.builtins.JSON, function (val) {
  return JSON.parse(val);
});

const findAllActive = async (userId) => {
  try {
    const data = await db.query(
      "SELECT * FROM notifications WHERE user_id = $1 AND hidden= $2",
      [userId, false]
    );
    return data.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findAll = async (userId) => {
  try {
    const data = await db.query(
      "SELECT * FROM notifications WHERE date > NOW() - INTERVAL '2 week'",
      []
    );
    return data.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const remove = async (userId, id) => {
  try {
    const deletedNotification = await db.query(
      "UPDATE notifications SET hidden = $1 WHERE user_id=$2 AND id = $3 RETURNING *",
      [true, userId, id]
    );
    return deletedNotification.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  findAll,
  remove,
  findAllActive,
};
