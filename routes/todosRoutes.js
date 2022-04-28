const Router = require("@koa/router");

const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todosControl");

const router = new Router({
  prefix: "/todos",
});

router.get("/", getTodos);

router.get("/:id", getTodo);

router.post("/", createTodo);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

module.exports = router;
