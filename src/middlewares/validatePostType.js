/**
 * Middleware para validar los datos de un tipo antes de su creación.
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {Function} next - La función para pasar al siguiente middleware.
 * @returns {void}
 */

const validatePostType = (req, res, next) => {
    const { name, url } = req.body;
    if (!name || typeof name !== "string") {
        return res.status(400).json({
            error: "El nombre del tipo es obligatorio y debe ser una cadena de texto.",
        });
    }

    if (!url || typeof url !== "string") {
        return res.status(400).json({
            error: "La URL del icono es obligatoria y debe ser una cadena de texto.",
        });
    }
    
    next();
};

module.exports = validatePostType