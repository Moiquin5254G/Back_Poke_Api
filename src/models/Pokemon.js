const { DataTypes } = require('sequelize');

/**
 * Modelo de Pokémon que representa la estructura de los datos de un Pokémon en la base de datos.
 * @param {Object} sequelize - Instancia de Sequelize.
 */
module.exports = (sequelize) => {
    sequelize.define('Pokemon', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 100,
            },
        },
        attack: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 100,
            },
        },
        defense: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 100,
            },
        },
        speed: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 100,
            },
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 1000,
            },
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 1000,
            },
        },
        created: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, { timestamps: false });
};
