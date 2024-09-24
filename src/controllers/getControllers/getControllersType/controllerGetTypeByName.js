const searchNameTypeDb = require("../../../searchName/searchNameTypeDb");
const searchNameTypeApi = require("../../../searchName/searchNameTypeApi");

/**
 * Obtiene un tipo por nombre, buscando en la base de datos y la PokeAPI.
 * @param {string} name - El nombre del tipo a buscar.
 * @returns {Promise<Array|Object>} - Un array con los tipos encontrados o un objeto con un mensaje de error.
 */

const controllerGetTypeByName = async (name) => {
  if (!name) {
    return { error: "El nombre del tipo es obligatorio." };
  }

  try {
    const [typeDb, typeApi] = await Promise.all([
      searchNameTypeDb(name),
      searchNameTypeApi(name),
    ]);

    if (typeDb && typeDb.length > 0) {
      return typeDb;
    }

    if (typeApi && Array.isArray(typeApi) && typeApi.length > 0) {
      return typeApi;
    }

    return {
      error: `No se encontró el tipo ${name} en la base de datos ni en la API.`,
    };
  } catch (error) {
    return { error: `Ocurrió un error al buscar el tipo: ${name}.` };
  }
};

module.exports = controllerGetTypeByName;
