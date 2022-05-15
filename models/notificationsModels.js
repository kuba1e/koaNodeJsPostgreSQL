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
    const deletedTodo = await db.query(
      "DELETE from notifications WHERE message ->'userId' = $1 AND message ->'id' = $2 RETURNING *",
      [id, userId]
    );
    await db.query(
      "INSERT INTO notifications (type, message) values ($1, $2)",
      ["delete", JSON.stringify(deletedTodo.rows[0])]
    );

    return deletedTodo;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  findAll,
};
