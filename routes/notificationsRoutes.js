const Router = require("@koa/router");

const authCheck = require("../middleware/authCheck");

const { deleteNotification, getNotifications } = require("../controllers/notificationsControl");

const router = new Router({
  prefix: "/notifications",
});

router.use(authCheck);

router.delete("/:id", deleteNotification);

router.get('/', getNotifications)

module.exports = router;
