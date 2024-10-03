const { Type } = require("../../db.js");
const { validate: isUUID } = require("uuid");

/**
 * Elimina un tipo de la base de datos.
 * @param {number|string} id - El ID del tipo a eliminar.
 * @returns {Promise<string|{error: string}>} - Un string con el mensaje de eliminacion correcta o un objeto de error.
 * @throws {Error} Lanza un error si no se encuentra el tipo en la base de datos o si la eliminacion falla.
 */

const controllerDeleteType = async (id) => {
  if (!id) {
    return { error: "Debes pasar un ID." };
  }

  if (!isUUID(id)) {
    return { error: "El ID debe ser un UUID." };
  }
  try {
    const type = await Type.findByPk(id);
    if (!type) {
      return { error: "El tipo no existe." };
    }

    const typeName = type.name;

    await Type.destroy({
      where: {
        id,
      },
    });
    return `Tipo "${typeName}" eliminado correctamente`;
  } catch (error) {
    return {
      error: "Hubo un problema al eliminar el tipo de la base de datos.",
    };
  }
};

module.exports = controllerDeleteType;
