const controllerPutPokemon = require("../../controllers/putControllers/controllerPutPokemon");

/**
 * Handler para actualizar un Pokemon en la base de datos.
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Promise<Object>} - El Pokemon actualizado o un error.
 */

const handlePutPokemon = async (req, res) => {
  const { id } = req.params;
  const { name, image, hp, attack, defense, speed, height, weight } = req.body;

  try {
    const result = await controllerPutPokemon(
      id,
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight
    );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Ocurrió un error en el servidor: ${error.message}` });
  }
};

module.exports = handlePutPokemon;
