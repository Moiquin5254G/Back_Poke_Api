const axios = require("axios");

/**
 * Obtiene todos los tipos de Pokémon de la API.
 * @returns {Promise<Array>} - Array de los tipos.
 */
const controllerGetTypesFromApi = async () => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    return response.data.results.map((type) => type.name);
  } catch (error) {
    throw new Error("No se pudieron obtener los tipos de la API.");
  }
};

module.exports = controllerGetTypesFromApi;
