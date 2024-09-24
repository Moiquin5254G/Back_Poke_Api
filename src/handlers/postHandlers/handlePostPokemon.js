const controllerPostPokemon = require("../../controllers/postControllers/controllerPostPokemon");

/**
 * Handler para la creación de un nuevo Pokémon.
 * Valida los parámetros recibidos, llama al controlador y maneja las respuestas adecuadamente.
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {void}
 */
const handlePostPokemon = async (req, res) => {
  const {
    name,
    hp = 50,
    attack = 50,
    defense = 50,
    speed = 50,
    height = 5,
    weight = 50,
    types = [],
    image = "default_image_url",
  } = req.body;

  if (!name || !Array.isArray(types) || types.length === 0) {
    return res.status(400).json({
      error: "El nombre y al menos un tipo son obligatorios.",
    });
  }

  try {
    const newPokemon = await controllerPostPokemon(
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
      image
    );

    return res.status(201).json(newPokemon);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = handlePostPokemon;
