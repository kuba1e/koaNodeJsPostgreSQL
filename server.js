const Koa = require("koa");
const WebSocketServer = require("ws");
const http = require("http");
const BodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const cookieParser = require("koa-cookie");
require("dotenv").config();

const todoRouter = require("./routes/todosRoutes");
const authorizationRoutes = require("./routes/authorizationRoutes");
const userRoutes = require("./routes/userRoutes");
const logger = require("./middleware/logger");

const app = new Koa();
const server = http.createServer(app.callback());

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
app.use(userRoutes.routes()).use(userRoutes.allowedMethods());

app.on("error", (error, ctx) => {
  ctx.status = error.statusCode || error.status || 500;
  ctx.body = {
    message: error.message,
  };
  console.log(error);
});

app.listen(PORT, () => {
  console.log("server has been started");
});

const wss = new WebSocketServer.Server({
  port: 4001,
});

const rooms = {};

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
 const message = JSON.parse(data);

    
    switch (message.event) {
      case "join":
        if (!rooms[message.data.id]) {
          rooms[message.data.id] = [ws];
          return;
        }
        rooms[message.data.id].push(ws);

        broadcast(
          {
            data: "join successful",
          },
          message.data.id
        );
        break;
      case "add-todo":
        broadcast({
          data: "added todo",
        });
    }
    


  });

  ws.on("close", () => {
    console.log("client has disconnected");
  });

  ws.on("error", (error) => {
    console.log(`Error: ${error}`);
  });
});

function broadcast(message, id) {
  rooms[id].forEach(function each(client) {
    // console.log(client.readyState)
    if (client.readyState === WebSocketServer.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}
