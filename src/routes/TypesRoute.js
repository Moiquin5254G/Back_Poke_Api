const { Router } = require("express");
const handleGetAllTypes = require("../handlers/getHandlers/handleGetTypes");
const handleGetTypeById = require("../handlers/getHandlers/handleGetTypeById");

const typesRoute = Router();

/**
 * Ruta para obtener todos los tipos de los Pokemónes.
 * - GET /types: Obtiene todos los tipos de los Pokemónes o busca por nombre si se proporciona el parámetro "name".
 */
typesRoute.get("/", handleGetAllTypes);

/**
 * Ruta para obtener un tipo especifcado por su ID.
 * - GET /types/:id: Obtiene un tipo por su ID.
 */
typesRoute.get("/:id", handleGetTypeById);

module.exports = typesRoute;
