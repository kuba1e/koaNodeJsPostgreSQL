const Router = require("@koa/router");

const authCheck = require("../middleware/authCheck");

const {
  getNotifications
} = require("../controllers/notificationsControl");

const router = new Router({
  prefix: "/notifications",
});

router.use(authCheck);



module.exports = router;
