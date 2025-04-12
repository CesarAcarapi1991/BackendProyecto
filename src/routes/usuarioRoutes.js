const express = require("express");
const router = express.Router();
const userController = require("../controllers/usuarioController");
const authMiddleware = require("../middlewares/auth");

// Públicas
router.post("/register", userController.registrar);
router.post("/login", userController.login);

// Privadas (requieren JWT)
router.get("/", authMiddleware, userController.getAllUsers);
router.get("/me", authMiddleware, userController.getProfile);

module.exports = router;