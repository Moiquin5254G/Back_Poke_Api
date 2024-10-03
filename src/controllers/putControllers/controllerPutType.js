const { Type } = require("../../db.js");

/**
 * Actualiza un tipo existente.
 * @param {string|number} id - El ID del tipo a actualizar.
 * @param {string} name - El nombre del tipo.
 * @param {string} url - La URL del icono del tipo.
 * @returns {Promise<Object>} El tipo actualizado o un objeto de error.
 * @throws {Error} Lanza un error si el tipo no existe, si el ID no es válido o si la actualización falla.
 */

const controllerPutType = async (id, name, url) => {
  if (!id || (typeof id !== "string" && typeof id !== "number")) {
    throw new Error("El ID proporcionado no es válido.");
  }

  const formattedName = name?.toLowerCase().trim();

  const type = await Type.findByPk(id);
  if (!type) {
    throw new Error(`No se encontró el tipo con el ID ${id}.`);
  }

  const existingType = await Type.findOne({
    where: { name: formattedName },
  });
  if (existingType && existingType.id !== id) {
    throw new Error(`Ya existe un tipo con el nombre ${name}.`);
  }

  try {
    await type.update({ name: formattedName, url });

    return {
      id: type.id,
      name: type.name,
      url: type.url,
    };
  } catch (error) {
    throw new Error(
      "Hubo un problema al actualizar el tipo en la base de datos."
    );
  }
};

module.exports = controllerPutType;
