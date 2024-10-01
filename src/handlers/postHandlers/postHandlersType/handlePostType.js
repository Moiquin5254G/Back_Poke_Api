const controllerPostType = require("../../../controllers/postControllers/postControllersType/controllerPostType");

/**
 * Handler para la creación de un nuevo tipo.
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {void}
 */

const handlePostType = async (req, res) => {
  const { name, url } = req.body;
  try {
    const newType = await controllerPostType(name, url);
    res.status(201).json(newType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlePostType;
