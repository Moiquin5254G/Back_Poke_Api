const axios = require("axios");

/**
 * Busca un tipo por su nombre utilizando una búsqueda parcial y devuelve múltiples coincidencias.
 * @param {string} name El nombre del tipo a buscar.
 * @returns {Array|Object} Array con datos de tipo coincidentes o un objeto de error.
 */

const searchNameTypeApi = async (name) => {
  if (!name || typeof name !== "string") {
    return {
      error: "El nombre del tipo es obligatorio y debe ser una cadena de texto",
    };
  }

  const formattedName = name.toLowerCase().trim();

  try {
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    const types = response.data.results;

    const matchingTypes = types.filter((type) =>
      type.name.toLowerCase().includes(formattedName)
    );

    if (matchingTypes.length === 0) {
      return {
        error: `No se encontró el tipo ${name} en la API`,
      };
    }

    return matchingTypes.map((type, index) => {
      return {
        id: index + 1,
        name: type.name,
        url: type.url,
      };
    });
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        return {
          error: `No se encontró el tipo ${name} en la API`,
        };
      }
      return {
        error: `Error de la API: ${error.response.status} ${error.response.statusText}`,
      };
    } else if (error.request) {
      return {
        error: "No se recibió respuesta de la API",
      };
    } else {
      return {
        error: `Error al configurar la petición: ${error.message}`,
      };
    }
  }
};

module.exports = searchNameTypeApi;
