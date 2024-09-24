const { Type, Pokemon } = require("../../db.js");

/**
 * Busca un tipo por su ID en la base de datos.
 * @param {number} id El ID del tipo a buscar.
 * @returns {Promise<Object>} El tipo encontrado o un objeto de error.
 */

const contollerGetTypeByIdDb = async (id) => {
  if (isNaN(id) || id <= 0) {
    return { error: "ID inválido. Debe ser un número positivo." };
  }

  try {
    const type = await Type.findByPk(id, {
      include: ["id", "name"],
    });

    if (!type) {
      throw new Error(`No se encontro el tipo con el ID ${id}`);
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

module.exports = contollerGetTypeByIdDb;
