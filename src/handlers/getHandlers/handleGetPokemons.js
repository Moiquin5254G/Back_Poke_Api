const controllerGetAllPokemons = require("../../controllers/getControllers/controllerGetAllPokemons");
const controllerGetPokemonByName = require("../../controllers/getControllers/controllerGetPokemonByName");

/**
 * Handler para obtener Pokémon. Puede buscar todos los Pokémon o uno específico por nombre.
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {void}
 */

const handleGetPokemons = async (req, res) => {
  const { name } = req.query;

  if (name && typeof name !== "string") {
    return res
      .status(400)
      .json({ error: 'El parámetro "name" debe ser una cadena.' });
  }

  try {
    const results = name
      ? await controllerGetPokemonByName(name)
      : await controllerGetAllPokemons();
    return res.status(200).json(results);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Hubo un problema al procesar la solicitud." });
  }
};

module.exports = handleGetPokemons;
