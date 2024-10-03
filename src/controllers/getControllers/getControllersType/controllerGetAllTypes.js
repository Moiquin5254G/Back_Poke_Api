const { Type, Pokemon } = require("../../../db.js");
const axios = require("axios");

/**
 * Obtiene todos los tipos de los Pokémones de la base de datos.
 * Si faltan tipos, los trae de la API para garantizar que siempre haya 20 tipos.
 * @returns {Promise<Array>} Array de los tipos de los Pokémones.
 */
const controllerGetAllTypes = async () => {
  try {
    const apiResponse = await axios.get("https://pokeapi.co/api/v2/type");
    const apiTypes = apiResponse.data.results.map((type, index) => ({
      id: index + 1,
      name: type.name,
      url: type.url,
    }));

    const dbTypes = await Type.findAll({
      attributes: ["id", "name", "url"],
      include: {
        model: Pokemon,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    const dbTypeNames = new Set(dbTypes.map((type) => type.name));

    const missingTypes = apiTypes.filter((type) => !dbTypeNames.has(type.name));

    const allTypes = [...dbTypes, ...missingTypes];

    return allTypes;
  } catch (error) {
    return { error: "Hubo un problema al obtener los tipos de Pokémon." };
  }
};

module.exports = controllerGetAllTypes;
