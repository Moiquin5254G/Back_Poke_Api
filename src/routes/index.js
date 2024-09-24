const { Router } = require("express");
const pokemonRoute = require("./PokemonsRoute.js");
const typeRoute = require("./TypesRoute.js");

const router = Router();

/**
 * Rutas relacionadas con Pokémon.
 * - /pokemons: Maneja las operaciones relacionadas con Pokémon.
 */
router.use("/pokemons", pokemonRoute);

/**
 * Rutas relacionadas con tipos de Pokémon.
 * - /types: Maneja las operaciones relacionadas con tipos de Pokémon.
 */
router.use("/types", typeRoute);

module.exports = router;
