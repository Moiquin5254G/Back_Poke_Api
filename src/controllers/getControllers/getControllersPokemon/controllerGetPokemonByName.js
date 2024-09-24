const searchNamePokemonApi = require("../../../searchName/searchNamePokemonApi");
const searchNamePokemonDb = require("../../../searchName/searchNamePokemonDb");

/**
 * Obtiene un Pokémon por nombre, buscando en la base de datos y la PokeAPI.
 * @param {string} name - El nombre del Pokémon a buscar.
 * @returns {Promise<Array|Object>} - Un array con los Pokémon encontrados o un objeto con un mensaje de error.
 */

const controllerGetPokemonByName = async (name) => {
  if (!name) {
    return {
      error: "El nombre del Pokémon es obligatorio.",
    };
  }

  try {
    const [pokemonDb, pokemonApi] = await Promise.all([
      searchNamePokemonDb(name),
      searchNamePokemonApi(name),
    ]);

    const dbResults = pokemonDb || [];
    const apiResults = pokemonApi || [];

    if (dbResults.length === 0 && apiResults.length === 0) {
      return {
        error: `No se encontró el Pokémon ${name} en la base de datos ni en la API.`,
      };
    }

    return [...dbResults, ...apiResults];
  } catch (error) {
    return { error: `Ocurrió un error al buscar el Pokémon: ${name}.` };
  }
};

module.exports = controllerGetPokemonByName;
