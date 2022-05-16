const Router = require("@koa/router");

const authCheck = require("../middleware/authCheck");

const { deleteNotification } = require("../controllers/notificationsControl");

const router = new Router({
  prefix: "/notifications",
});

router.use(authCheck);

router.delete("/:id", deleteNotification);

module.exports = router;
