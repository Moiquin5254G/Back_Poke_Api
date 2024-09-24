const { Router } = require("express");
const handleGetPokemons = require("../handlers/getHandlers/handleGetPokemons");
const handleGetPokemonById = require("../handlers/getHandlers/handleGetPokemonById");
const handlePostPokemon = require("../handlers/postHandlers/handlePostPokemon");
const validatePostPokemon = require("../middlewares/validatePostPokemon");

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

module.exports = pokemonsRoute;
