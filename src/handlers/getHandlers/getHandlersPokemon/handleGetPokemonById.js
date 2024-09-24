const controllerGetPokemonByIdDb = require("../../../controllers/getControllers/getControllersPokemon/controllerGetPokemonByIdDb");
const controllerGetPokemonByIdApi = require("../../../controllers/getControllers/getControllersPokemon/controllerGetPokemonByIdApi");

/**
 * Handler para obtener un Pokémon por su ID. Busca en la base de datos o en la API.
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {void}
 */
const handleGetPokemonById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Debes pasar un ID." });
  }

  const isUUID =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      id
    );
  const isNumeric = /^\d+$/.test(id);

  try {
    let pokemonDb = null;
    let pokemonApi = null;

    if (isUUID) {
      pokemonDb = await controllerGetPokemonByIdDb(id);
      if (pokemonDb && !pokemonDb.error) {
        return res.status(200).json(pokemonDb);
      } else {
        return res.status(404).json({
          error: `No se encontró el Pokémon con el ID ${id} en la base de datos.`,
        });
      }
    }

    if (isNumeric) {
      pokemonApi = await controllerGetPokemonByIdApi(id);
      if (pokemonApi && !pokemonApi.error) {
        return res.status(200).json(pokemonApi);
      } else {
        return res.status(404).json({
          error: `No se encontró el Pokémon con el ID ${id} en la API.`,
        });
      }
    }

    return res.status(400).json({ error: `ID no válido: ${id}` });
  } catch (error) {
    return res.status(500).json({
      error: "Hubo un problema al procesar la solicitud.",
    });
  }
};

module.exports = handleGetPokemonById;
