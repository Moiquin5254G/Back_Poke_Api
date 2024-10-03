const { Type } = require("../../db.js");

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
  try {
    const type = await Type.findByPk(id);
    if (!type) {
      return { error: "El tipo no existe." };
    }

    if (type.created === false) {
      return {
        error: "No se puede eliminar un tipo que proviene de la API.",
      };
    }

    const typeName = type.name;

    await Type.destroy({
      where: {
        id,
      },
    });
    return `Tipo "${typeName}" eliminado correctamente`;
  } catch (error) {
    throw new Error({
      error: "Hubo un problema al eliminar el tipo de la base de datos.",
    });
  }
};

module.exports = controllerDeleteType;
