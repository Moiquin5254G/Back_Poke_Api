/**
 * Middleware para validar los datos de un Pokemon antes de su actualización.
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {Function} next - La función para pasar al siguiente middleware.
 * @returns {void}
 *
 * Valida que el nombre sea una cadena no vacía y los valores de hp, attack, defense, speed, height y weight sean números entre 0 y 100 (o 1000 en caso de las dimensiones).
 */

const validateUpdatePokemon = (req, res, next) => {
    const { name, hp, attack, defense, speed, height, weight } = req.body;
  
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'El nombre es obligatorio y debe ser una cadena de texto no vacía.' });
    }
  
    const MAX_STAT_VALUE = 100;
    const MAX_DIMENSION_VALUE = 1000;
  
    const stats = { hp, attack, defense, speed };
    for (const [key, value] of Object.entries(stats)) {
      if (value === undefined || typeof value !== 'number' || value < 0 || value > MAX_STAT_VALUE) {
        return res.status(400).json({ error: `El valor de ${key} debe ser un número entre 0 y ${MAX_STAT_VALUE}.` });
      }
    }
  
    const dimensions = { height, weight };
    for (const [key, value] of Object.entries(dimensions)) {
      if (value === undefined || typeof value !== 'number' || value < 0 || value > MAX_DIMENSION_VALUE) {
        return res.status(400).json({ error: `El valor de ${key} debe ser un número entre 0 y ${MAX_DIMENSION_VALUE}.` });
      }
    }
  
    next();
  };
  
  module.exports = validateUpdatePokemon;
  