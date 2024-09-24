/**
 * Middleware para validar los datos de un Pokémon antes de su creación.
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {Function} next - La función para pasar al siguiente middleware.
 * @returns {void}
 */
const validatePostPokemon = (req, res, next) => {
  const { name, hp, attack, defense, speed, height, weight, types, image } =
    req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({
      error:
        "El nombre del Pokémon es obligatorio y debe ser una cadena de texto.",
    });
  }

  if (!hp || typeof hp !== "number" || hp <= 0) {
    return res.status(400).json({
      error:
        "La vida del Pokemon es obligatoria y debe ser un número mayor a 0.",
    });
  }

  if (!attack || typeof attack !== "number" || attack <= 0) {
    return res.status(400).json({
      error:
        "El ataque del Pokemon es obligatorio y debe ser un número mayor a 0.",
    });
  }

  if (!defense || typeof defense !== "number" || defense <= 0) {
    return res.status(400).json({
      error:
        "La defensa del Pokemon es obligatoria y debe ser un número mayor a 0.",
    });
  }

  if (!speed || typeof speed !== "number" || speed <= 0) {
    return res.status(400).json({
      error:
        "La velocidad del Pokemon es obligatoria y debe ser un número mayor a 0.",
    });
  }

  if (!height || typeof height !== "number" || height <= 0) {
    return res.status(400).json({
      error:
        "La altura del Pokemon es obligatoria y debe ser un número mayor a 0.",
    });
  }

  if (!weight || typeof weight !== "number" || weight <= 0) {
    return res.status(400).json({
      error:
        "El peso del Pokemon es obligatorio y debe ser un número mayor a 0.",
    });
  }

  if (!types || !Array.isArray(types) || types.length === 0) {
    return res.status(400).json({
      error:
        "Los tipos del Pokemon son obligatorios y deben ser una lista de cadenas de texto.",
    });
  }

  if (!image || typeof image !== "string") {
    return res.status(400).json({
      error:
        "La imagen del Pokemon es obligatoria y debe ser una cadena de texto.",
    });
  }

  next();
};

module.exports = validatePostPokemon;
