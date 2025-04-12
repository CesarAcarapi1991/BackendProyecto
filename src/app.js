const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/usuarioRoutes");
const taskRoutes = require("./routes/tareaRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", userRoutes);
app.use("/api/tasks", taskRoutes); 

//const PORT = process.env.PORT || 3000;
const PORT = 5432;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});