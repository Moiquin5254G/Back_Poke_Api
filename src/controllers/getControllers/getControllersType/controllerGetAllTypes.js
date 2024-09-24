const { Type, Pokemon } = require("../../../db.js");
const axios = require("axios");

/**
 * Obtiene todos los tipos de los Pokémones de la API y la base de datos,
 * limpiando la información para que solo incluya el ID y el nombre.
 * @returns {Promise<Array>} Array de los tipos de los Pokémones de la API.
 */

const controllerGetAllTypes = async () => {
  try {
    const dbTypes = await Type.findAll({
      attributes: ["id", "name", "url"],
      include: {
        model: Pokemon,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    const apiResponse = await axios.get("https://pokeapi.co/api/v2/type");

    const apiTypes = apiResponse.data.results.map((type, index) => ({
      id: index + 1,
      name: type.name,
      url: type.url,
    }));

    return [...dbTypes, ...apiTypes];
  } catch (error) {
    return { error: "Hubo un problema al obtener los tipos de Pokémon." };
  }
};

module.exports = controllerGetAllTypes;
