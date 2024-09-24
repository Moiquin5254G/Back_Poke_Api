const { Pokemon, Type } = require("../../../db.js");

/**
 * Busca un Pokémon por su ID en la base de datos.
 * @param {number} id El ID del pokemon a buscar.
 * @returns {Promise<Object>} El pokemon encontrado o un objeto de error.
 */

const controllerGetPokemonByIdDb = async (id) => {
  if (!id) {
    return { error: "Debes pasar un ID." };
  }

  try {
    const pokemon = await Pokemon.findByPk(id, {
      include: {
        model: Type,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    if (!pokemon) {
      throw new Error(`No se encontro el pokemon con el ID ${id}`);
    }

    return pokemon;
  } catch (error) {
    return {
      error: "Hubo un problema al buscar el Pokémon en la base de datos.",
    };
  }
};

module.exports = controllerGetPokemonByIdDb;
