const { Router } = require("express");
const handleGetPokemons = require("../handlers/getHandlers/getHandlersPokemon/handleGetPokemons");
const handleGetPokemonById = require("../handlers/getHandlers/getHandlersPokemon/handleGetPokemonById");
const handlePostPokemon = require("../handlers/postHandlers/postHandlersPokemon/handlePostPokemon");
const validatePostPokemon = require("../middlewares/validatePostPokemon");
const handlePutPokemon = require("../handlers/putHandlers/handlePutPokemon");
const validateUpdatePokemon = require("../middlewares/validateUpdatePokemon");
const handleDeletePokemon = require("../handlers/deleteHandlers/handleDeletePokemon");

const pokemonsRoute = Router();

/**
 * Ruta para obtener Pokémon.
 * - GET /: Obtiene todos los Pokémon o busca por nombre si se proporciona el parámetro "name".
 */
pokemonsRoute.get("/", handleGetPokemons);

/**
 * Ruta para obtener un Pokémon específico por su ID.
 * - GET /:id: Obtiene un Pokémon por su ID.
 */
pokemonsRoute.get("/:id", handleGetPokemonById);

/**
 * Ruta para crear un nuevo Pokemon.
 * - POST /: Crea un nuevo Pokemon.
 */
pokemonsRoute.post("/", validatePostPokemon, handlePostPokemon);

/**
 * Ruta para actualizar un Pokemon existente.
 * - PUT /:id: Actualiza un Pokemon existente.
 */
pokemonsRoute.put("/:id", validateUpdatePokemon, handlePutPokemon);

/**
 * Ruta para eliminar un Pokemon existente.
 * - DELETE /:id: Elimina un Pokemon existente.
 */
pokemonsRoute.delete("/:id", handleDeletePokemon);

module.exports = pokemonsRoute;
