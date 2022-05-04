const Koa = require("koa");
const BodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const cookieParser = require("koa-cookie");

const todoRouter = require("./routes/todosRoutes");
const authorizationRoutes = require("./routes/authorizationRoutes");
const logger = require("./middleware/logger");

const app = new Koa();

const PORT = process.env.PORT || 4000;

app.use(cookieParser.default());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(BodyParser());
app.use(logger);

app.use(todoRouter.routes()).use(todoRouter.allowedMethods());
app.use(authorizationRoutes.routes()).use(authorizationRoutes.allowedMethods());

app.on("error", (error, ctx) => {
  ctx.status = error.statusCode || error.status || 500;
  ctx.body = {
    message: error.message,
  };
 // console.log(error);
});

app.listen(PORT, () => {
  console.log("server has been started");
});
