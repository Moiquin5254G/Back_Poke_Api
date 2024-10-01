const { Type, Pokemon } = require("../../../db.js");

/**
 * Crea un nuevo tipo en la base de datos.
 * @param {string} name - El nombre del tipo.
 * @param {string} url - La URL del icono del tipo.
 * @returns {Promise<Object>} El tipo creado o un objeto de error.
 */

const controllerPostType = async (name, url) => {
  try {
    const formattedName = name?.toLowerCase().trim();
    const exists = await Type.findOne({ where: { name: formattedName } });
    if (exists) {
      return {
        error: "El tipo ya existe.",
      };
    }
    const newType = await Type.create({
      name: formattedName,
      url,
    });
    return newType;
  } catch (error) {
    return {
      error: `Hubo un problema al crear el tipo ${name}.`,
    };
  }
};

module.exports = controllerPostType;
