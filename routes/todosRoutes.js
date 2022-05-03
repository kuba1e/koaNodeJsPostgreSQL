const Router = require("@koa/router");

const authCheck = require("../middleware/authCheck");

const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  updateAllTodo,
  deleteTodo,
  deleteCompletedTodo,
} = require("../controllers/todosControl");

const router = new Router({
  prefix: "/todos",
});

router.get("/", authCheck, getTodos);

router.get("/:id", authCheck, getTodo);

router.post("/", authCheck, createTodo);

router.put("/", authCheck, updateAllTodo);

router.put("/:id", authCheck, updateTodo);

router.delete("/", authCheck, deleteCompletedTodo);

router.delete("/:id", authCheck, deleteTodo);

module.exports = router;
