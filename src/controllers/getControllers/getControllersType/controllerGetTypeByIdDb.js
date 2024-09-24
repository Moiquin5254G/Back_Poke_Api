const { Type } = require("../../../db.js");

/**
 * Busca un tipo por su ID en la base de datos.
 * @param {number} id - El ID del tipo a buscar.
 * @returns {Promise<Object>} - El tipo encontrado o un objeto de error.
 */

const controllerGetTypeByIdDb = async (id) => {
  if (!id) {
    return { error: "Debes pasar un ID." };
  }

  try {
    const type = await Type.findByPk(id);

    if (!type) {
      throw new Error(`No se encontró el tipo con el ID ${id}.`);
    }

    return {
      id: type.id,
      name: type.name,
      url: null,
    };
  } catch (error) {
    return {
      error: "Hubo un problema al buscar el tipo en la base de datos.",
    };
  }
};

module.exports = controllerGetTypeByIdDb;
