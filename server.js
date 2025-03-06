// Importar el módulo express
const express = require("express");

// Crear una instancia de express
const app = express();

// Definir el puerto en el que escuchará el servidor
const port = 3000;

// Middleware para manejar JSON
app.use(express.json());
// Middleware para manejar datos de formularios
app.use(express.urlencoded({ extended: true }));

// Importamos las rutas
const userRoutes = require("./src/routes/users");
app.use("/api/users", userRoutes);

// Iniciamos el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
