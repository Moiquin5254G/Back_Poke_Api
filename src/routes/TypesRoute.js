const { Router } = require("express");
const handleGetAllTypes = require("../handlers/getHandlers/getHandlersType/handleGetAllTypes");
const handleGetTypeById = require("../handlers/getHandlers/getHandlersType/handleGetTypeById");
const handlePostType = require("../handlers/postHandlers/postHandlersType/handlePostType");
const validatePostType = require("../middlewares/validatePostType");

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

/**
 * Ruta para crear un nuevo tipo.
 * - POST /types: Crea un nuevo tipo.
 */
typesRoute.post("/", validatePostType, handlePostType);

module.exports = typesRoute;
