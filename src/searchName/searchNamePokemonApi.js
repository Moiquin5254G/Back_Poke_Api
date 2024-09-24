const axios = require("axios");
const cleanArrayApi = require("../utils/cleanArrayApi");

/**
 * Busca un Pokémon por su nombre utilizando una búsqueda parcial y devuelve múltiples coincidencias.
 * @param {string} name El nombre del Pokémon a buscar.
 * @returns {Array|Object} Array con datos de Pokémon coincidentes o un objeto de error.
 */
const searchNamePokemonApi = async (name) => {
  if (!name || typeof name !== "string") {
    return {
      error:
        "El nombre del Pokémon es obligatorio y debe ser una cadena de texto",
    };
  }

  const formattedName = name.toLowerCase().trim();

  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=800"
    );
    const pokemons = response.data.results;

    const matchingPokemon = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(formattedName)
    );

    if (matchingPokemon.length === 0) {
      return {
        error: `No se encontró ningún Pokémon que coincida con ${name}`,
      };
    }

    const pokemonDetails = await Promise.all(
      matchingPokemon.map((pokemon) => axios.get(pokemon.url))
    );

    return pokemonDetails.map((response) => cleanArrayApi([response.data]));
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        return { error: `No se encontró el Pokémon ${name}` };
      }
      return {
        error: `Error de la API: ${error.response.status} ${error.response.statusText}`,
      };
    } else if (error.request) {
      return {
        error: "No se recibió respuesta de la API",
      };
    } else {
      return { error: `Error al configurar la petición: ${error.message}` };
    }
  }
};

module.exports = searchNamePokemonApi;
