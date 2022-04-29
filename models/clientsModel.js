const db = require("../db");

const findAll = async () => {
  try {
    const data = await db.query("SELECT * FROM clients ORDER BY first_name");
    return data.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const find = async (id) => {
  try {
    const data = await db.query("SELECT * FROM clients WHERE id = $1", [id]);
    return {
      data: data.rows[0],
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const findClientPurchases = async (id) => {
  try {
    const data = await db.query(
      "SELECT clients.id, clients.first_name, clients.last_name, purchases.product, purchases.quantity FROM (clients INNER JOIN purchases ON clients.id = purchases.client_id) WHERE clients.id = $1 ORDER BY purchases.quantity ",
      [id]
    );
    return data.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};


const create = async (data) => {
  try {
    const {
      first_name,
      last_name,
      age,
      city,
      date_of_registry,
      date_of_birth,
    } = data;
    return await db.query(
      "INSERT INTO clients (first_name, last_name, age, city, date_of_registry, date_of_birth) values ($1, $2, $3, $4, $5, $6) RETURNING *",
      [first_name, last_name, age, city, date_of_registry, date_of_birth]
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const update = async (id, data) => {
  try {
    const { firstName, lastName, age, city, dateOfRegistry, dateOfBirth } =
      data;
    return await db.query(
      "UPDATE clients SET firstName=$1, lastName =$2, age=$3, city=$4, dateOfRegistry=$5, dateOfBirth=$6 WHERE id =$7 RETURNING *",
      [firstName, lastName, age, city, dateOfRegistry, dateOfBirth, id]
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const remove = async (id) => {
  try {
    return await db.query("DELETE from clients WHERE id=$1 RETURNING *", [id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  findAll,
  find,
  findClientPurchases,
  create,
  update,
  remove,
};
