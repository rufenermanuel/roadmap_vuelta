const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Verificar que se haya importado correctamente
console.log(userController); // Esto debería mostrar el objeto con las funciones

// Rutas
// Obtener usuarios
router.get("/", userController.getUsers);

// Crear usuario (ya implementado)
router.post("/create", userController.createUser);

// Modificar usuario
router.put("/:id", userController.updateUser);

// Eliminar usuario
router.delete("/:id", userController.deleteUser);

module.exports = router;
