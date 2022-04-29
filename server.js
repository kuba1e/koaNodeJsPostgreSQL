const Koa = require("koa");
const BodyParser = require("koa-bodyparser");

const purchasesRouter = require("./routes/purchasesRoutes");
const clientsRouter = require("./routes/clientsRoutes");

const app = new Koa();

const PORT = process.env.PORT || 4000;

app.use(BodyParser());
app.use(clientsRouter.routes()).use(clientsRouter.allowedMethods());
app.use(purchasesRouter.routes()).use(purchasesRouter.allowedMethods());

app.on("error", (error, ctx) => {
  ctx.status = error.statusCode || error.status || 500;
  ctx.body = {
    message: error,
  };
  console.log(error);
});

app.listen(4000, () => {
  console.log("server has been started");
});
