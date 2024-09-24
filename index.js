/**
 * @module index
 * @description Archivo principal para iniciar el servidor y la conexión a la base de datos.
 * Este módulo importa el servidor y la conexión a la base de datos,
 * y define una función para iniciar el servidor.
 */

const server = require("./src/app.js");
const { conn } = require("./src/db.js");
require("dotenv").config();
const { PORT } = process.env;

/**
 * Inicia el servidor y sincroniza la conexión a la base de datos.
 * @async
 * @function startServer
 * @throws {Error} Lanza un error si hay problemas al iniciar el servidor.
 */
const startServer = async () => {
  try {
    await conn.sync({ alter: false });

    server.listen(PORT, () => {
      console.log(`Server listening at PORT: ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

// Llama a la función para iniciar el servidor.
startServer();
