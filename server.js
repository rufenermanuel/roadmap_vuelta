// Importar el módulo express
const express = require("express");

// Crear una instancia de express
const app = express();

// Definir el puerto en el que escuchará el servidor
const port = 3000;

// Definir una ruta básica para la raíz "/"
app.get("/", (req, res) => {
  res.send("¡Hola Mundo desde Node.js y Express!");
});

// Iniciar el servidor para escuchar en el puerto definido
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
