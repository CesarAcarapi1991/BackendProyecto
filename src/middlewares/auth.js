const jwt = require("jsonwebtoken");
const User = require("../models/Usuario");

module.exports = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No autorizado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] }, // Excluye la contraseña
    });

    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    req.user = user; // Adjunta el usuario completo a la solicitud
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};