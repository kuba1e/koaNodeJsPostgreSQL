const Router = require("@koa/router");

const authCheck = require("../middleware/authMiddleware");

const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  updateAllTodo,
  deleteTodo,
} = require("../controllers/todosControl");

const router = new Router({
  prefix: "/todos",
});

router.get("/", authCheck, getTodos);

router.get("/:id", getTodo);

router.post("/", createTodo);

router.put("/", updateAllTodo);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

module.exports = router;
