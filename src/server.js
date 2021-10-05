import http from "http";
import express from "express";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import dotenv from "dotenv";
import config from "./config/keys"
import socketio from "socket.io";
import WebSockets from "./utils/webSocket"
import router from "./routes/index";
import { Server } from "socket.io";


require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", router);

app.get("/", (request, response) => {
  response.status(200).json({
    status: true,
    message: "Group chat message API",
  });
});

app.use((request, response, next) => {
  next(createError.NotFound());
});

app.use((err, request, response, next) => {
  response.status(err.status || 500);
  response.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});


const server = http.createServer(app)

const io = new Server(server)

// const io = socketio.listen(server);

global.io = io;
/** Create socket connection */

global.io.on('connection', WebSockets.connection)

const PORT = config.db.port

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});

export default app;
