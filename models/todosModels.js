const db = require("../db");

const findAll = async (userId) => {
  try {
    const data = await db.query(
      "SELECT * FROM todos WHERE user_id=$1 ORDER BY id",
      [userId]
    );
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
    const { label, done } = data;
    return await db.query(
      "INSERT INTO todos (label, done, user_id) values ($1, $2, $3) RETURNING *",
      [label, done, userId]
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const update = async (userId, id, data) => {
  try {
    const { label, done } = data;
    return await db.query(
      "UPDATE todos SET label = $1, done =$2 WHERE id =$3 AND user_id=$4 RETURNING *",
      [label, done, id, userId]
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateAll = async (userId, data) => {
  try {
    const { done } = data;
    return await db.query(
      "UPDATE todos SET done =$1 WHERE user_id = $2 RETURNING *",
      [done, userId]
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const remove = async (userId, id) => {
  try {
    return await db.query(
      "DELETE from todos WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, userId]
    );
  } catch (error) {
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
