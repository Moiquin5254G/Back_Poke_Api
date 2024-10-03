const { Pokemon } = require("../../db.js");
const { validate: isUUID } = require("uuid");

/**
 * Elimina un Pokemon de la base de datos.
 * @param {number} id - El ID del Pokemon a eliminar.
 * @returns {Promise<string|{error: string}>} - Un string con el mensaje de eliminacion correcta o un objeto de error.
 * @throws {Error} Lanza un error si no se encuentra el Pokemon en la base de datos o si la eliminacion falla.
 */
const controllerDeletePokemon = async (id) => {
  if (!id) {
    return { error: "Debes pasar un ID." };
  }

  if (!isUUID(id)) {
    return { error: "El ID debe ser un UUID." };
  }
  try {
    const pokemon = await Pokemon.findByPk(id);
    if (!pokemon) {
      return { error: "El Pokemon no existe." };
    }

    const pokemonName = pokemon.name;

    await Pokemon.destroy({
      where: {
        id,
      },
    });
    return `Pokemon "${pokemonName}" eliminado correctamente`;
  } catch (error) {
    return {
      error: "Hubo un problema al eliminar el Pokemon.",
    };
  }
};

module.exports = controllerDeletePokemon;
