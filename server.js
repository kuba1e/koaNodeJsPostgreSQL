const Koa = require("koa");
const BodyParser = require("koa-bodyparser");

const todoRouter = require("./routes/todosRoutes");

const app = new Koa();

const PORT = process.env.PORT || 4000;

app.use(BodyParser());
app.use(todoRouter.routes()).use(todoRouter.allowedMethods());

app.listen(4000, () => {
  console.log("server has been started");
});
