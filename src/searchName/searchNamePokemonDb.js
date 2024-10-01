const { Pokemon, Type } = require("../db.js");
const { Op } = require("sequelize");

/**
 * Busca Pokémon en la base de datos por nombre o coincidencias parciales.
 * @param {string} name - El nombre o parte del nombre del Pokémon a buscar.
 * @returns {Promise<Array>} - Una lista de Pokémon que coincidan con el nombre dado, junto con sus tipos.
 * @throws {Error} - Lanza un error si la búsqueda en la base de datos falla.
 */
const searchNamePokemonDb = async (name) => {
  try {
    const formattedName = name?.toLowerCase().trim();

    console.log("Nombre formateado para búsqueda en DB:", formattedName);

    const results = await Pokemon.findAll({
      where: {
        name: { [Op.iLike]: `%${formattedName}%` },
      },
      include: {
        model: Type,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    console.log(
      `Resultados encontrados en DB para "${formattedName}":`,
      results.length
    );

    return results;
  } catch (error) {
    console.error(`Error al buscar en la DB:`, error);
    throw new Error(`No se pudo buscar el Pokémon ${name} en la base de datos`);
  }
};

module.exports = searchNamePokemonDb;
