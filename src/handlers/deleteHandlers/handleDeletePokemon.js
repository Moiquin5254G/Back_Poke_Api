const controllerDeletePokemon = require("../../controllers/deleteControllers/controllerDeletePokemon");

/**
 * Handler para eliminar un Pokemon.
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Promise<Object>} - El Pokemon eliminado o un error.
 * @throws {Error} - Lanza un error al intentar eliminar un Pokemon no existente.
 */
const handleDeletePokemon = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Debes pasar un ID." });
  }

  try {
    const result = await controllerDeletePokemon(id);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json({ message: result });
  } catch (error) {
    return res.status(500).json({ error: `Ocurrió un error en el servidor: ${error.message}` });
  }
};

module.exports = handleDeletePokemon;
