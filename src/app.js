const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index.js");
require("./db.js");

const server = express();

server.name = "API";

// Middleware
server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));

// Rutas
server.use("/", routes);

// Manejo de errores
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  console.error(err);
  res.status(status).json({ error: message });
});

module.exports = server;
