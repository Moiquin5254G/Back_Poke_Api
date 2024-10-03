const { DataTypes } = require("sequelize");

/**
 * Modelo de Tipo que representa la estructura de los tipos de Pokémon en la base de datos.
 * @param {Object} sequelize - Instancia de Sequelize.
 */
module.exports = (sequelize) => {
  sequelize.define(
    "Type",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
