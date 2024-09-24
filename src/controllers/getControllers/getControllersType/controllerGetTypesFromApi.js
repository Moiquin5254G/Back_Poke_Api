const axios = require("axios");

/**
 * Obtiene todos los tipos de Pokémon de la API, incluyendo el nombre y la URL.
 * @returns {Promise<Array>} - Array de objetos con nombre y URL de los tipos.
 */
const controllerGetTypesFromApi = async () => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    return response.data.results.map((type) => ({
      name: type.name,
      url: type.url,
    }));
  } catch (error) {
    throw new Error("No se pudieron obtener los tipos de la API.");
  }
};

module.exports = controllerGetTypesFromApi;
