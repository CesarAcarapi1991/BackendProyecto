const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false // 👈 Opcional (coherente con tu sync)
});

Usuario.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

// 👇 Esta línea debe estar ANTES de module.exports
Usuario.associate = (models) => {
  Usuario.hasMany(models.Tarea, { foreignKey: 'userId' });
};

module.exports = Usuario;