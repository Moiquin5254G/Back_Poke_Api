const axios = require("axios");
const { Type } = require("../../../db");

/**
 * Obtiene todos los tipos de Pokémon de la API y los guarda en la base de datos si no existen.
 * @returns {Promise<Array<string>>} - Array con los nombres de los tipos.
 * @throws {Error} - Lanza un error si no se pueden obtener los tipos de la API o guardarlos en la base de datos.
 */
const controllerGetTypesFromApi = async () => {
  try {
    const existingTypes = await Type.findAll();
    console.log("Tipos existentes en la DB: ", existingTypes.map(t => t.name));

    if (existingTypes.length > 0) {
      return existingTypes.map((type) => type.name);
    }

    const response = await axios.get("https://pokeapi.co/api/v2/type");
    console.log("Tipos obtenidos de la API: ", response.data.results);

    const typesFromApi = response.data.results.map((type) => ({
      name: type.name,
      url: type.url,
    }));

    console.log("Tipos mapeados desde la API: ", typesFromApi);

    await Promise.all(
      typesFromApi.map((type) =>
        Type.findOrCreate({
          where: { name: type.name },
          defaults: { url: type.url },
        })
      )
    );

    const types = typesFromApi.map((type) => type.name);
    console.log("Tipos que se devolverán: ", types);

    return types;
  } catch (error) {
    console.error("Error dentro de controllerGetTypesFromApi: ", error);
    throw new Error("No se pudieron obtener los tipos de la API.");
  }
};

module.exports = controllerGetTypesFromApi;
