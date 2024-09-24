const axios = require("axios");
const cleanArrayApi = require("../../../utils/cleanArrayApi");

/**
 * Busca un Pokémon por su ID en la PokeAPI.
 * @param {number} id - El ID del Pokémon a buscar.
 * @returns {Promise<Object>} - El Pokémon encontrado o un objeto de error.
 */

const controllerGetPokemonByIdApi = async (id) => {
  if (!id) {
    return { error: "Debes pasar un ID." };
  }

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemonData = response.data;

    return cleanArrayApi([pokemonData])[0];
  } catch (error) {
    return { error: `No se encontró el Pokémon con el ID ${id}.` };
  }
};

module.exports = controllerGetPokemonByIdApi;
