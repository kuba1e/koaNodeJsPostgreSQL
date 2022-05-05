const Router = require("@koa/router");

const {
  registration,
  login,
  logout,
  activate,
  refresh,
  update,
} = require("../controllers/usersController");

const authCheck = require("../middleware/authCheck");

const router = new Router();

router.post("/registration", registration);

router.post("/login", login);

router.post("/logout", logout);

router.get("/activation/:link", activate);

router.get("/refresh", refresh);

router.put("/profile/:id", authCheck, update);

module.exports = router;
