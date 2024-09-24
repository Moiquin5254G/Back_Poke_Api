const axios = require("axios");

/**
 * Busca un tipo por su ID en la PokeAPI.
 * @param {number} id - El ID del tipo a buscar.
 * @returns {Promise<Object>} - El tipo encontrado o un objeto de error.
 */

const controllerGetTypeByIdApi = async (id) => {
  if (!id) {
    return { error: "Debes pasar un ID." };
  }

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${id}`);
    const typeData = response.data;
    return {
      id: typeData.id,
      name: typeData.name,
      url: `https://pokeapi.co/api/v2/type/${typeData.id}`,
    };
  } catch (error) {
    return { error: `No se encontró el tipo con el ID ${id}.` };
  }
};

module.exports = controllerGetTypeByIdApi;
