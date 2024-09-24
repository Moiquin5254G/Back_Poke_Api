/**
 * @module db
 * @description Configuración de la conexión a la base de datos utilizando Sequelize.
 * Este módulo establece la conexión a una base de datos PostgreSQL y define modelos.
 *
 * Dependencias:
 * - dotenv: para cargar variables de entorno.
 * - sequelize: para interactuar con la base de datos.
 * - fs: para trabajar con el sistema de archivos.
 * - path: para manejar rutas de archivos.
 *
 * Modelos:
 * - Se cargan todos los modelos definidos en el directorio /models y se establecen las relaciones entre ellos.
 * 
 * Relaciones:
 * - Un Pokémon puede tener muchos tipos y un tipo puede pertenecer a muchos Pokémon, lo que se gestiona a través de una tabla intermedia llamada "PokemonType".
 */

require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Pokemon, Type } = sequelize.models;

Pokemon.belongsToMany(Type, { through: "PokemonType" });
Type.belongsToMany(Pokemon, { through: "PokemonType" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
