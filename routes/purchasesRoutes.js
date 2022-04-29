const Router = require("@koa/router");

const {
  getPurchases,
  getCityPurchases,
  getProductsPurchasesCount,
  createPurchase,
  updatePurchase,
  deletePurchase,
} = require("../controllers/purchasesControl");

const router = new Router({
  prefix: "/purchases",
});

router.get("/", getPurchases);

router.get("/cities", getCityPurchases);

router.get("/products", getProductsPurchasesCount);

router.post("/", createPurchase);

router.put("/:id", updatePurchase);

router.delete("/:id", deletePurchase);

module.exports = router;
