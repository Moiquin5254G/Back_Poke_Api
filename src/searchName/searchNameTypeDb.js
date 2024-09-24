const { Type, Pokemon } = require("../db.js");
const { Op } = require("sequelize");

/**
 * Busca un tipo en la base de datos por nombre o coincidencias parciales.
 * @param {string} name - El nombre o parte del nombre del tipo a buscar.
 * @returns {Promise<Array>} - Una lista de tipos que coincidan con el nombre dado.
 * @throws {Error} - Lanza un error si la búsqueda en la base de datos falla.
 */

const searchNameTypeDb = async (name) => {
  try {
    const formattedName = name?.toLowerCase().trim();

    const types = await Type.findAll({
      where: {
        name: { [Op.iLike]: `%${formattedName}%` },
      },
      attributes: ["id", "name"],
    });

    return types.map((type) => {
      return {
        id: type.id,
        name: type.name,
        url: null,
      };
    });
  } catch (error) {
    throw new Error(
      `No se pudo buscar el tipo ${name} en la base de datos: ${error.message}`
    );
  }
};

module.exports = searchNameTypeDb;
