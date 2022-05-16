const db = require("../db");
const types = require("pg").types;

types.setTypeParser(types.builtins.JSON, function (val) {
  return JSON.parse(val);
});

const findAll = async (userId) => {
  try {
    const data = await db.query(
      "SELECT * FROM notifications WHERE user_id = $1",
      [userId]
    );
    return data.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const remove = async (userId, id) => {
  try {
    const deletedNotification = await db.query(
      "DELETE from notifications WHERE user_id=$1 AND id = $2 RETURNING *",
      [userId, id]
    );
    return deletedNotification.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  findAll,
  remove,
};
