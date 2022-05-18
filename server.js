const Koa = require("koa");
const { Server } = require("socket.io");
const http = require("http");
const BodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const cookieParser = require("koa-cookie");

require("dotenv").config();

const todoRouter = require("./routes/todosRoutes");
const authorizationRoutes = require("./routes/authorizationRoutes");
const userRoutes = require("./routes/userRoutes");
const notificationsRoutes = require("./routes/notificationsRoutes");
const logger = require("./middleware/logger");

const app = new Koa();
const httpServer = http.createServer(app.callback());

const PORT = process.env.PORT;

app.use(cookieParser.default());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(BodyParser());
app.use(logger);

httpServer.listen(PORT, () => {
  console.log("server has been started");
});

const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000", credentials: true },
});

app.use(async (ctx, next) => {
  ctx.io = io;
  await next();
});

io.on("connection", (socket) => {
  console.log("connected successful");
  socket.join(socket.id);
});

app.use(todoRouter.routes()).use(todoRouter.allowedMethods());
app.use(authorizationRoutes.routes()).use(authorizationRoutes.allowedMethods());
app.use(userRoutes.routes()).use(userRoutes.allowedMethods());
app.use(notificationsRoutes.routes()).use(notificationsRoutes.allowedMethods());

app.on("error", (error, ctx) => {
  ctx.status = error.statusCode || error.status || 500;
  ctx.body = {
    message: error.message,
  };
  console.log(error);
});
