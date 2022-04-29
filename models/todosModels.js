const { Todos } = require("../config");
const db = require("../db");

const findAll = async () => {
  try {
    const data = await db.query("SELECT * FROM todos ORDER BY label");
    return data.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const find = async (id) => {
  try {
    const data = await db.query("SELECT * FROM todos WHERE id = $1", [id]);
    return {
      data: data.rows[0],
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const create = async (data) => {
  try {
    const { label, done } = data;
    return await db.query(
      "INSERT INTO todos (label, done) values ($1, $2) RETURNING *",
      [label, done]
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const update = async (id, data) => {
  try {
    const { label, done } = data;
    return await db.query(
      "UPDATE todos SET label = $1, done =$2 WHERE id =$3 RETURNING *",
      [label, done, id]
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const remove = async (id) => {
  try {
    return await db.query("DELETE from todos WHERE id=$1 RETURNING *", [id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  findAll,
  find,
  create,
  update,
  remove,
};
