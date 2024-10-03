const controllerDeleteType = require("../../controllers/deleteControllers/controllerDeleteType");

const handleDeleteType = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Debes pasar un ID." });
  }

  try {
    const result = await controllerDeleteType(id);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    
    return res.status(200).json({ message: result });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Ocurrio un error en el servidor: ${error.message}` });
  }
};

module.exports = handleDeleteType;
