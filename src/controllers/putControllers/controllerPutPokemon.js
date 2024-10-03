const { Pokemon } = require("../../db");

/**
 * Actualiza un Pokémon existente.
 * @param {string|number} id - El ID del Pokémon a actualizar.
 * @param {string} name - El nombre del Pokémon.
 * @param {string} image - La imagen del Pokémon.
 * @param {number} hp - La vida del Pokémon.
 * @param {number} attack - El ataque del Pokémon.
 * @param {number} defense - La defensa del Pokémon.
 * @param {number} speed - La velocidad del Pokémon.
 * @param {number} height - La altura del Pokémon.
 * @param {number} weight - El peso del Pokémon.
 * @returns {Promise<Object|{error: string}>} - El Pokémon actualizado o un objeto de error.
 * @throws {Error} Lanza un error al intentar actualizar un Pokémon no existente.
 */

const controllerPutPokemon = async (
  id,
  name,
  image,
  hp,
  attack,
  defense,
  speed,
  height,
  weight
) => {
  try {
    if (!id || (typeof id !== "string" && typeof id !== "number")) {
      throw new Error("El ID proporcionado no es válido.");
    }

    const formattedName = name?.toLowerCase().trim();

    const pokemon = await Pokemon.findByPk(id);

    if (!pokemon) {
      return {
        error: "El Pokémon no existe.",
      };
    }

    const existingPokemon = await Pokemon.findOne({
      where: { name: formattedName },
    });
    if (existingPokemon && existingPokemon.id !== id) {
      return {
        error: "El nombre del Pokémon ya existe.",
      };
    }

    await pokemon.update({
      name: formattedName,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
    });

    return pokemon;
  } catch (error) {
    throw new Error(
      `Ocurrió un error al actualizar el Pokémon: ${error.message}`
    );
  }
};

module.exports = controllerPutPokemon;
