const { Pokemon, Type } = require("../../db");
const controllerGetTypesFromApi = require("../../controllers/getControllers/controllerGetTypesFromApi"); // Ajusta la ruta

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

    if (exists)
      throw new Error(`El Pokémon ${name} ya existe en la base de datos`);

    const validTypes = await controllerGetTypesFromApi();
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
    return newPokemon;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = controllerPostPokemon;
