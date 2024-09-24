/**
 * Limpia y formatea un array de objetos Pokémon obtenidos de la base de datos.
 * @param {Array} array - Array de objetos Pokémon.
 * @returns {Array} - Array de objetos Pokémon formateados.
 */
const cleanArrayDb = (array) => {
  return array.map(
    ({
      id,
      name,
      image,
      types,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      created,
    }) => ({
      id,
      name,
      image,
      types: types.map(({ name }) => name),
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      created,
    })
  );
};

module.exports = cleanArrayDb;
