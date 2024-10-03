# Pokémon CRUD Application

Esta es una aplicación pequeña que consume la API de Pokémon y proporciona funcionalidades básicas de CRUD (Crear, Leer, Actualizar y Eliminar) tanto para los Pokémon como para los tipos de Pokémon.

## Descripción

La aplicación incluye:
- CRUD básico para los modelos `pokemon` y `type`.
- Búsqueda lógica o inteligente para buscar Pokémon por nombre.
- Integración con la API de Pokémon para obtener información adicional.

## Dependencias

La aplicación utiliza las siguientes dependencias:

```json
{
  "dependencies": {
    "axios": "^1.7.7",
    "body-parser": "^1.20.2",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "morgan": "^1.10.0",
    "node": "^22.8.0",
    "nodemon": "^3.1.4",
    "pg": "^8.12.0",
    "sequelize": "^6.37.3"
  }
}
```


## Estructura del Proyecto

La aplicación está organizada de la siguiente manera:

- Controllers: Contiene la lógica para manejar las solicitudes y las respuestas de la aplicación.
- Handlers: Se encargan de recibir las solicitudes y delegar el trabajo a los controladores.
- Middlewares: Incluye funciones que se ejecutan antes de que se maneje la solicitud, útiles para la validación y la gestión de errores.
- Funciones limpiadoras: Funciones que se encargan de formatear o limpiar los datos antes de ser almacenados o utilizados.


## Instalación

- Clona el repositorio:
`bash`
```
git clone <URL_DEL_REPOSITORIO>
```
- Navega a la carpeta del proyecto:
`bash`
```
cd <NOMBRE_DE_LA_CARPETA>
```

- Instala las dependencias:
`bash`
```
npm install
```
Configura las variables de entorno en un archivo `.env`.

- Inicia la aplicación:
`bash`
```
npm start
```


## Uso

La aplicación expone una API RESTful que puedes utilizar para gestionar los Pokémon y los tipos. Puedes realizar peticiones HTTP a los siguientes endpoints:

- GET /pokemons: Obtiene todos los Pokémon.

- POST /pokemons: Crea un nuevo Pokémon.

- PUT /pokemons/:id: Actualiza un Pokémon existente.

- DELETE /pokemons/:id: Elimina un Pokémon.

- GET /types: Obtiene todos los tipos de Pokémon.

- POST /types: Crea un nuevo tipo de Pokémon.

- PUT /types/:id: Actualiza un tipo existente.

- DELETE /types/:id: Elimina un tipo de Pokémon.


## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o crea un pull request.