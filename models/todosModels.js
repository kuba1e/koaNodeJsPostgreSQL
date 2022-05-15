const db = require("../db");
const types = require("pg").types;

types.setTypeParser(types.builtins.NUMERIC, function (val) {
  return parseFloat(val, 10);
});

const findAll = async (userId) => {
  try {
    const data = await db.query("SELECT * FROM todos WHERE user_id=$1", [
      userId,
    ]);
    return data.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const find = async (userId, id) => {
  try {
    const data = await db.query(
      "SELECT * FROM todos WHERE id = $1 AND user_id=$2",
      [id, userId]
    );
    return {
      data: data.rows[0],
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const create = async (userId, data) => {
  try {
    const { label, done, order_num } = data;
    const newTodo = await db.query(
      "INSERT INTO todos (label, done, user_id, order_num) values ($1, $2, $3, $4) RETURNING *",
      [label, done, userId, order_num]
    );
    const message = await db.query(
      "INSERT INTO notifications (type, message, user_id) values ($1, $2, $3) RETURNING *",
      ["add", JSON.stringify(newTodo.rows[0]), userId]
    );

    return {
      data: newTodo.rows[0],
      notification: message.rows[0],
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const update = async (userId, id, data) => {
  try {
    const { label, done, order_num } = data;
    const updatedTodo = await db.query(
      "UPDATE todos SET label = $1, done =$2, order_num=$5 WHERE id =$3 AND user_id=$4 RETURNING *",
      [label, done, id, userId, order_num]
    );

    const message =  await db.query(
      "INSERT INTO notifications (type, message, user_id) values ($1, $2, $3) RETURNING *",
      ["edit", JSON.stringify(updatedTodo.rows[0]), userId]
    );

    console.log(message.rows[0])
    return {
      data: updatedTodo.rows[0],
      notification: message.rows[0],
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateAll = async (userId, todos) => {
  try {
    await todos.map(async ({ id, label, order_num, done }) => {
      return await db.query(
        "UPDATE todos SET done =$1, label= $2, order_num=$3 WHERE user_id = $4  AND id=$5 RETURNING *",
        [done, label, order_num, userId, id]
      );
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const remove = async (userId, id) => {
  try {
    const deletedTodo = await db.query(
      "DELETE from todos WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, userId]
    );
    const message = await db.query(
      "INSERT INTO notifications (type, message, user_id) values ($1, $2,$3)  RETURNING *",
      ["delete", JSON.stringify(deletedTodo.rows[0]), userId]
    );

    return {
      data: deletedTodo.rows[0],
      notification: message.rows[0],
    };  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  findAll,
  find,
  create,
  update,
  updateAll,
  remove,
};
