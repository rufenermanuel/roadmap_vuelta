const express = require("express");
const { getUsers, createUser  } = require("../controllers/userController");

const router = express.Router();

// Rutas
router.get("/", getUsers); // Maneja solicitudes GET
router.post("/", createUser); // Maneja solicitudes POST

module.exports = router;
