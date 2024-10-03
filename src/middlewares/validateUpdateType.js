/**
 * Middleware para validar los datos de un tipo antes de su actualizaci n.
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {Function} next - La funci n para pasar al siguiente middleware.
 * @returns {void}
 *
 * Valida que el nombre sea una cadena no vac a y la URL del icono sea una cadena de texto.
 */
const validateUpdateType = (req, res, next) => {
    const { name, url } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'El nombre es obligatorio y debe ser una cadena de texto no vacía.' });
    }

    if (typeof url !== 'string') {
      return res.status(400).json({ error: 'La URL debe ser una cadena de texto.' });
    }

    next();
};

module.exports = validateUpdateType;