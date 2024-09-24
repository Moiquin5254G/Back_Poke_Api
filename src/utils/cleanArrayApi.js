/**
 * Limpia y formatea un array de objetos Pokémon obtenidos de la API.
 * @param {Array} array - Array de objetos Pokémon.
 * @returns {Array} - Array de objetos Pokémon formateados.
 */
const cleanArrayApi = (array) => {
  return array.map(
    ({
      id,
      name,
      sprites: {
        other: {
          home: { front_default: image },
        },
      },
      types,
      stats,
      height,
      weight,
    }) => {
      const [hpStat, attackStat, defenseStat, , , speedStat] = stats.map(
        (stat) => stat.base_stat
      );

      return {
        id,
        name,
        image,
        types: types.map(({ type: { name } }) => name),
        hp: hpStat,
        attack: attackStat,
        defense: defenseStat,
        speed: speedStat,
        height,
        weight,
        created: false,
      };
    }
  );
};

module.exports = cleanArrayApi;
