const server = require("./src/app.js");
const { conn } = require("./src/db.js");
require("dotenv").config();
const { PORT } = process.env;

const startServer = async () => {
  try {
    await conn.sync({ alter: false });

    server.listen(PORT, () => {
      console.log(`Server listening at PORT: ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();
