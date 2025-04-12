const express = require("express");
const router = express.Router();
const taskController = require("../controllers/tareaController");
const authMiddleware = require("../middlewares/auth");

// Públicas


// Privadas (requieren JWT)
router.post("/", authMiddleware, taskController.createTask);
router.get("/", authMiddleware, taskController.getAllUserTasks);
router.get("/:id", authMiddleware, taskController.getTaskById);
router.put("/:id", authMiddleware, taskController.updateTask);
router.delete("/:id", authMiddleware, taskController.deleteTask);

module.exports = router;