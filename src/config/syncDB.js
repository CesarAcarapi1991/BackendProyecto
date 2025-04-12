const sequelize = require("./db");
//const User = require("../models/Usuario");
const { Usuario, Tarea } = require("../models");

(async () => {
  try {
    await sequelize.sync({ force: true }); // `force: true` borra y recrea las tablas (¡cuidado en producción!)
    console.log("Base de datos sincronizada");
  } catch (error) {
    console.error("Error al sincronizar:", error);
  }
})();