const { Tarea } = require("../models");

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    
    const task = await Tarea.create({ 
      title,
      description,
      status,
      dueDate,
      userId: req.user.id, 
    });

    res.status(201).json({ 
      message: "Tarea creada exitosamente",
      task,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Obtener todas las tareas del usuario autenticado
exports.getAllUserTasks = async (req, res) => {
  try {

    console.log(req);
    const tasks = await Tarea.findAll({ 
      where: { userId: req.user.id } 
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Obtener una tarea específica del usuario
exports.getTaskById = async (req, res) => {
  try {
    const task = await Tarea.findOne({ 
      where: { 
        id: req.params.id,
        userId: req.user.id 
      } 
    });

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una tarea existente
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    
    // Obtenemos la tarea actual para validar las transiciones de estado
    const currentTask = await Tarea.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id 
      }
    });

    if (!currentTask) {
      return res.status(404).json({ message: "Tarea no encontrada o no tienes permisos" });
    }

    // Validación 1: Si la tarea está completada, no se puede modificar
    if (currentTask.status === 'completada') {
      return res.status(400).json({ message: "No se puede modificar una tarea completada" });
    }

    // Validación 2: Solo se puede marcar como "en progreso" si está en "pendiente"
    if (status === 'en progreso' && currentTask.status !== 'pendiente') {
      return res.status(400).json({ 
        message: "Solo se puede marcar como 'en progreso' si está en 'pendiente'" 
      });
    }

    // Validación 3: No se puede volver a "pendiente" desde "en progreso" o "completada"
    if (status === 'pendiente' && currentTask.status !== 'pendiente') {
      return res.status(400).json({ 
        message: "No se puede volver a 'pendiente' desde el estado actual" 
      });
    }

    // Validación 4: Solo se puede marcar como "completada" si está en "en progreso"
    if (status === 'completada' && currentTask.status !== 'en progreso') {
      return res.status(400).json({ 
        message: "Solo se puede marcar como 'completada' si está en 'en progreso'" 
      });
    }

    // Si pasa todas las validaciones, procedemos con la actualización
    const [updated] = await Tarea.update(
      { title, description, status, dueDate },
      { 
        where: { 
          id: req.params.id,
          userId: req.user.id 
        } 
      }
    );

    if (!updated) {
      return res.status(404).json({ message: "Error al actualizar la tarea" });
    }

    const updatedTask = await Tarea.findByPk(req.params.id);
    res.json({
      message: "Tarea actualizada exitosamente",
      task: updatedTask
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una tarea
exports.deleteTask = async (req, res) => {
  try {
    // Primero obtenemos la tarea para verificar su estado
    const task = await Tarea.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada o no tienes permisos" });
    }

    // Validación: Solo se puede eliminar si está en estado "completada"
    if (task.status !== 'completada') {
      return res.status(400).json({ 
        message: "Solo se pueden eliminar tareas en estado 'completada'" 
      });
    }

    // Si pasa la validación, procedemos con la eliminación
    const deleted = await Tarea.destroy({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!deleted) {
      return res.status(404).json({ message: "Error al eliminar la tarea" });
    }

    res.json({ message: "Tarea eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// const { Tarea } = require("../models");

// // Crear una nueva tarea
// exports.createTask = async (req, res) => {
//   try {
//     const { title, description, status, dueDate } = req.body;
    
//     const task = await Tarea.create({ 
//       title,
//       description,
//       status,
//       dueDate,
//       userId: req.user.id, 
//     });

//     res.status(201).json({ 
//       message: "Tarea creada exitosamente",
//       task,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Obtener todas las tareas del usuario autenticado
// exports.getAllUserTasks = async (req, res) => {
//   try {
//     const tasks = await Tarea.findAll({ 
//       where: { userId: req.user.id } 
//     });
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Obtener una tarea específica del usuario
// exports.getTaskById = async (req, res) => {
//   try {
//     const task = await Tarea.findOne({ 
//       where: { 
//         id: req.params.id,
//         userId: req.user.id 
//       } 
//     });

//     if (!task) {
//       return res.status(404).json({ message: "Tarea no encontrada" });
//     }

//     res.json(task);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Actualizar una tarea existente
// exports.updateTask = async (req, res) => {
//   try {
//     const { title, description, status, dueDate } = req.body;
    
//     const [updated] = await Tarea.update(
//       { title, description, status, dueDate },
//       { 
//         where: { 
//           id: req.params.id,
//           userId: req.user.id 
//         } 
//       }
//     );

//     if (!updated) {
//       return res.status(404).json({ message: "Tarea no encontrada o no tienes permisos" });
//     }

//     const updatedTask = await Tarea.findByPk(req.params.id);
//     res.json({
//       message: "Tarea actualizada exitosamente",
//       task: updatedTask
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Eliminar una tarea
// exports.deleteTask = async (req, res) => {
//   try {
//     const deleted = await Tarea.destroy({
//       where: {
//         id: req.params.id,
//         userId: req.user.id
//       }
//     });

//     if (!deleted) {
//       return res.status(404).json({ message: "Tarea no encontrada o no tienes permisos" });
//     }

//     res.json({ message: "Tarea eliminada exitosamente" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };