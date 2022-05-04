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

router.use(authCheck);

router.get("/", getTodos);

router.get("/:id", getTodo);

router.post("/", createTodo);

router.put("/", updateAllTodo);

router.put("/:id", updateTodo);

router.delete("/", deleteCompletedTodo);

router.delete("/:id", deleteTodo);

module.exports = router;
