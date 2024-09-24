const controllerGetTypeByIdDb = require("../../../controllers/getControllers/getControllersType/controllerGetTypeByIdDb");
const controllerGetTypeByIdApi = require("../../../controllers/getControllers/getControllersType/controllerGetTypeByIdApi");

/**
 * Handler para obtener un tipo por su ID. Busca en la base de datos y en la API.
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {void}
 */

const handleGetTypeById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: `Debes pasar un ID.` });
  }

  try {
    const [typeDb, typeApi] = await Promise.all([
      controllerGetTypeByIdDb(id),
      controllerGetTypeByIdApi(id),
    ]);

    if (typeDb.error && typeApi.error) {
      return res
        .status(404)
        .json({ error: `No se encontró el tipo con el ID ${id}.` });
    }

    return res.status(200).json(typeDb.error ? typeApi : typeDb);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Hubo un problema al procesar la petición." });
  }
};

module.exports = handleGetTypeById;
