const { Todos } = require("../config");

const findAll = async () => {
  try {
    const data = await Todos.get();
    return data.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  } catch (error) {
    throw new Error(error);
  }
};

const find = async (id) => {
  try {
    const data = await Todos.doc(id).get();
    return {
      id: data.id,
      ...data.data(),
    };
  } catch (error) {}
};

const create = async (data) => {
  try {
    return await Todos.add(data);
  } catch (error) {}
};

const update = async (id, data) => {
  try {
    await Todos.doc(id).update(data);
  } catch (error) {}
};

const remove = async (id) => {
  try {
    await Todos.doc(id).delete();
  } catch (error) {}
};

module.exports = {
  findAll,
  find,
  create,
  update,
  remove,
};
