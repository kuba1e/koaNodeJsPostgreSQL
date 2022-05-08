const Router = require("@koa/router");

const { update } = require("../controllers/usersController");

const authCheck = require("../middleware/authCheck");

const router = new Router();

router.put("/profile/:id", authCheck, update);

module.exports  = router