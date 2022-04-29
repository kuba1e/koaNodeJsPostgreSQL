const Router = require("@koa/router");

const {
  getClients,
  getClient,
  getClientPurchases,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientsControl");

const router = new Router({
  prefix: "/clients",
});

router.get("/", getClients);

router.get("/:id", getClient);

router.get("/:id/purchases", getClientPurchases);

router.post("/", createClient);

router.put("/:id", updateClient);

router.delete("/:id", deleteClient);

module.exports = router;
