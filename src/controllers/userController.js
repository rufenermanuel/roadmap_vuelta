// Base de datos en memoria con usuarios predefinidos
const users = [
  { id: 1, name: "Manuel", email: "manuel@example.com" },
  { id: 2, name: "Valentina", email: "valentina@example.com" },
];

// Obtener todos los usuarios
const getUsers = (req, res) => {
  res.json(users);
};

// Crear un nuevo usuario
const createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);

  res.status(201).json(newUser);
};

// Actualizar un usuario existente
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  if (name) user.name = name;
  if (email) user.email = email;

  res.status(200).json(user);
};

// Eliminar un usuario
const deleteUser = (req, res) => {
  const { id } = req.params;

  const userIndex = users.findIndex((user) => user.id === parseInt(id));
  if (userIndex === -1) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  const deletedUser = users.splice(userIndex, 1);
  res.status(200).json(deletedUser[0]);
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
