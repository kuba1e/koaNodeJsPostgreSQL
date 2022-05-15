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
const authWebScocketCheck = require("./middleware/authWebSocketCheck");

const app = new Koa();
const httpServer = http.createServer(app.callback());

const PORT = process.env.PORT;

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
app.use(userRoutes.routes()).use(userRoutes.allowedMethods());
app.use(notificationsRoutes.routes()).use(notificationsRoutes.allowedMethods());

app.on("error", (error, ctx) => {
  ctx.status = error.statusCode || error.status || 500;
  ctx.body = {
    message: error.message,
  };
  console.log(error);
});

httpServer.listen(PORT, () => {
  console.log("server has been started");
});

const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000", credentials: true },
});

io.use(authWebScocketCheck);

io.on("connection", (socket) => {
  console.log("connected successful");
  const userId = socket.data.user.id;
  socket.join(userId);

  socket.on("add-todo", (payload) => {
    socket.to(userId).emit("added-todo", payload.data);
  });

  socket.on("edit-todo", (payload) => {
    socket.to(userId).emit("edited-todo", payload.data);
  });

  socket.on("delete-todo", (payload) => {
    socket.to(userId).emit("deleted-todo", payload.data);
  });

  socket.on("delete-completed", () => {
    socket.to(userId).emit("deleted-completed");
  });

  socket.on("update-all-todo", (data) => {
    socket.to(userId).emit("updated-all-todo", data);
  });
  socket.on("disconnect", () => {});
});
