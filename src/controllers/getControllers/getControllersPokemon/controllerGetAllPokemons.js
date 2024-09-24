const { Pokemon, Type } = require("../../../db.js");
const axios = require("axios");
const cleanArrayApi = require("../../../utils/cleanArrayApi");

/**
 * Obtiene todos los Pokémon de la base de datos y de la PokeAPI.
 * @returns {Promise<Array>} - Un array combinado de Pokémon desde la API y la base de datos.
 */

const controllerGetAllPokemons = async () => {
  try {
    const [databasePokemon, apiResponse] = await Promise.all([
      Pokemon.findAll({
        include: {
          model: Type,
          attributes: ["name"],
          through: { attributes: [] },
        },
      }),
      axios.get("https://pokeapi.co/api/v2/pokemon?limit=80"),
    ]);

    const apiPokemonDetails = await Promise.all(
      apiResponse.data.results.map((pokemon) =>
        axios.get(pokemon.url).then((res) => res.data)
      )
    );

    const cleanedApiPokemons = cleanArrayApi(apiPokemonDetails);

    return [...databasePokemon, ...cleanedApiPokemons];
  } catch (error) {
    return { error: "Hubo un problema al obtener los Pokémon." };
  }
};

module.exports = controllerGetAllPokemons;
