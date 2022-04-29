const Router = require("@koa/router");

const {
  getPurchases,
  getCityPurchases,
  createPurchase,
  updatePurchase,
  deletePurchase,
} = require("../controllers/purchasesControl");

const router = new Router({
  prefix: "/purchases",
});

router.get("/", getPurchases);

router.get("/citys", getCityPurchases);

router.post("/", createPurchase);

router.put("/:id", updatePurchase);

router.delete("/:id", deletePurchase);

module.exports = router;
