/**
 * @module server
 * @description Configuración del servidor Express para la API.
 * Este módulo configura middlewares, define rutas y maneja errores.
 *
 * Dependencias:
 * - express: para crear el servidor.
 * - cookie-parser: para parsear cookies.
 * - body-parser: para parsear el cuerpo de las solicitudes.
 * - morgan: para registrar peticiones HTTP.
 * - cors: para habilitar CORS (Cross-Origin Resource Sharing).
 *
 * Rutas:
 * - Las rutas de la aplicación se definen en ./routes/index.js.
 *
 * Manejo de errores:
 * - Se maneja cualquier error que ocurra en la aplicación y se devuelve un mensaje JSON.
 */

const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index.js");
require("./db.js");

const server = express();

server.name = "API";

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

server.use("/", routes);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  console.error(err);
  res.status(status).json({ error: message });
});

module.exports = server;
