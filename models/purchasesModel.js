const db = require("../db");

const findAll = async () => {
  try {
    const data = await db.query("SELECT * FROM purchases");
    return data.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findCityPurchases = async () => {
  try {
    const data = await db.query(
      "SELECT clients.city, purchases.product, purchases.quantity, purchases.date_of_purchasing FROM purchases LEFT JOIN clients on clients.id = purchases.client_id ORDER BY clients.city"
    );
    return data.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findProductsPurchasesCount = async () => {
  try {
    const data = await db.query(
      "SELECT product, COUNT(client_id) AS quantity FROM purchases GROUP BY product"
    );
    return data.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const create = async (data) => {
  try {
    const { product, quantity, client_id, date_of_purchasing, city } = data;
    return await db.query(
      "INSERT INTO purchases (product, quantity,client_id, date_of_purchasing, city) values ($1, $2, $3,$4,$5) RETURNING *",
      [product, quantity, client_id, date_of_purchasing, city]
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const update = async (id, data) => {
  try {
    const { product, quantity, client_id, date_of_purchasing, city } = data;
    return await db.query(
      "UPDATE purchases SET product = $1, quantity =$2,client_id=$3, date_of_purchasing=$4, city=$5  WHERE id =$6 RETURNING *",
      [product, quantity, client_id, date_of_purchasing, city, id]
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const remove = async (id) => {
  try {
    return await db.query("DELETE from purchases WHERE id=$1 RETURNING *", [
      id,
    ]);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  findAll,
  findCityPurchases,
  findProductsPurchasesCount,
  create,
  update,
  remove,
};
