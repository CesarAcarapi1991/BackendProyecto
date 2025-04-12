const Usuario = require('./Usuario');
const Tarea = require('./Tarea');

// Establece relaciones
Usuario.associate = (models) => {
  Usuario.hasMany(models.Tarea, { foreignKey: 'userId' });
};

Tarea.associate = (models) => {
  Tarea.belongsTo(models.Usuario, { foreignKey: 'userId' });
};

module.exports = {
  Usuario,
  Tarea
};