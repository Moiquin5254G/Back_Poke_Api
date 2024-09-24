const { Pokemon, Type } = require("../../../db");
const controllerGetTypesFromApi = require("../../getControllers/getControllersType/controllerGetTypesFromApi");

/**
 * Crea un nuevo Pokémon en la base de datos.
 * @param {string} name - El nombre del Pokémon.
 * @param {number} hp - La vida del Pokémon.
 * @param {number} attack - El ataque del Pokémon.
 * @param {number} defense - La defensa del Pokémon.
 * @param {number} speed - La velocidad del Pokémon.
 * @param {number} height - La altura del Pokémon.
 * @param {number} weight - El peso del Pokémon.
 * @param {Array<string>} types - Un array de strings que representan los tipos del Pokémon.
 * @param {string} image - La imagen del Pokémon.
 * @returns {Promise<Object>} El Pokémon creado o un objeto de error.
 * @throws {Error} Lanza un error si la creación en la base de datos falla.
 * @throws {Error} Lanza un error si los tipos proporcionados no existen.
 * @throws {Error} Lanza un error si el Pokémon ya existe en la base de datos.
 * @throws {Error} Lanza un error si el nombre del Pokémon es obligatorio.
 */
const controllerPostPokemon = async (
  name,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
  types,
  image
) => {
  try {
    const formattedName = name?.toLowerCase().trim();
    const exists = await Pokemon.findOne({ where: { name: formattedName } });

    if (exists) {
      throw new Error(`El Pokémon ${name} ya existe en la base de datos`);
    }

    const validTypesFromApi = await controllerGetTypesFromApi();
    const validTypesFromDb = await Type.findAll({ attributes: ["name"] });
    const validTypes = [
      ...validTypesFromApi,
      ...validTypesFromDb.map((type) => type.name),
    ];

    const invalidTypes = types.filter((type) => !validTypes.includes(type));
    if (invalidTypes.length > 0) {
      throw new Error(
        `Uno o más tipos proporcionados no existen: ${invalidTypes.join(", ")}`
      );
    }

    const newPokemon = await Pokemon.create({
      name: formattedName,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
    });

    const pokemonTypes = await Type.findAll({ where: { name: types } });

    await newPokemon.addTypes(pokemonTypes);

    const pokemonWithTypes = await Pokemon.findByPk(newPokemon.id, {
      include: {
        model: Type,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    return pokemonWithTypes;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = controllerPostPokemon;
