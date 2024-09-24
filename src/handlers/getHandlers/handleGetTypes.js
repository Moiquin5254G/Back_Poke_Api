const controllerGetAllTypes = require("../../controllers/getControllers/controllerGetAllTypes");
const controllerGetTypeByName = require("../../controllers/getControllers/controllerGetTypeByName");

/**
 * Handler para obtener todos los tipos de los Pokemónes.
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {void}
 */

const handleGetTypes = async (req, res) => {
  const { name } = req.query;

  if (name && typeof name !== "string") {
    return res
      .status(400)
      .json({ error: 'El parámetro "name" debe ser una cadena.' });
  }

  try {
    const results = name
      ? await controllerGetTypeByName(name)
      : await controllerGetAllTypes();
    return res.status(200).json(results);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Hubo un problema al procesar la solicitud." });
  }
};

module.exports = handleGetTypes;
