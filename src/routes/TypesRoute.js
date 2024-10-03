const { Router } = require("express");
const handleGetAllTypes = require("../handlers/getHandlers/getHandlersType/handleGetAllTypes");
const handleGetTypeById = require("../handlers/getHandlers/getHandlersType/handleGetTypeById");
const handlePostType = require("../handlers/postHandlers/postHandlersType/handlePostType");
const validatePostType = require("../middlewares/validatePostType");
const handlePutType = require("../handlers/putHandlers/handlePutType");
const validateUpdateType = require("../middlewares/validateUpdateType");
const handleDeleteType = require("../handlers/deleteHandlers/handleDeleteType");

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

/**
 * Ruta para actualizar un tipo existente.
 * - PUT /types/:id: Actualiza un tipo existente.
 */
typesRoute.put("/:id", validateUpdateType, handlePutType);

/**
 * Ruta para eliminar un tipo existente.
 * - DELETE /types/:id: Elimina un tipo existente.
 */
typesRoute.delete("/:id", handleDeleteType);

module.exports = typesRoute;
