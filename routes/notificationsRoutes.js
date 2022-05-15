const Router = require("@koa/router");

const authCheck = require("../middleware/authCheck");

const {
  getNotifications
} = require("../controllers/notificationsControl");

const router = new Router({
  prefix: "/notifications",
});

router.use(authCheck);

router.get("/", getNotifications);
/*
router.delete("/", deleteCompletedTodo);

router.delete("/:id", deleteTodo);
*/

module.exports = router;
