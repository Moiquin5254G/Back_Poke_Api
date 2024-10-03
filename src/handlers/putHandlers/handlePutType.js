const controllerPutType = require("../../controllers/putControllers/controllerPutType");

/**
 * Handler para actualizar un tipo existente.
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Promise<Object>} - El tipo actualizado o un error.
 * @throws {Error} Lanza un error al intentar actualizar un tipo no existente.
 */

const handlePutType = async (req, res) => {
  const { id } = req.params;
  const { name, url } = req.body;
  try {
    const result = await controllerPutType(id, name, url);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Ocurrio un error en el servidor: ${error.message}` });
  }
};

module.exports = handlePutType;
