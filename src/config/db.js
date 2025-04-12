const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false, // Para no ver logs en consola
    dialectOptions:{
      ssl:{
        require: true,
        rejectUnathorized: false
      }
    }
  }
);

module.exports = sequelize;