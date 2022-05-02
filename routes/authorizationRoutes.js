const Router = require("@koa/router");

const authCheck = require("../middleware/authMiddleware");

const {
  getUsers,
  registration,
  login,
  logout,
  activate,
  refresh,
} = require("../controllers/usersController");

const router = new Router();

router.post("/registration", registration);

router.post("/login", login);

router.post("/logout", logout);

router.get("/activation/:link", activate);

router.get("/refresh", refresh);

module.exports = router;
