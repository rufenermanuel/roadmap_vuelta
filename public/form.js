async function fetchUsers() {
  const response = await fetch("/api/users");
  const users = await response.json();

  const userList = document.getElementById("users");
  userList.innerHTML = ""; // Limpiar la lista anterior

  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `Nombre: ${user.name}, Email: ${user.email}`;

    // Botón para eliminar
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.onclick = () => deleteUser(user.id);

    // Botón para actualizar
    const updateButton = document.createElement("button");
    updateButton.textContent = "Actualizar";
    updateButton.onclick = () => showUpdateForm(user);

    li.appendChild(deleteButton);
    li.appendChild(updateButton);
    userList.appendChild(li);
  });
}

async function deleteUser(userId) {
  if (!confirm("¿Estás seguro de eliminar este usuario?")) return;

  const response = await fetch(`/api/users/${userId}`, { method: "DELETE" });
  if (response.ok) {
    alert("Usuario eliminado correctamente");
    fetchUsers();
  } else {
    alert("Error al eliminar el usuario");
  }
}

function showUpdateForm(user) {
  document.getElementById("update-id").value = user.id;
  document.getElementById("update-name").value = user.name;
  document.getElementById("update-email").value = user.email;

  document.getElementById("update-form").style.display = "block";
}

function hideUpdateForm() {
  document.getElementById("update-form").style.display = "none";
}

document
  .getElementById("form-update")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const id = document.getElementById("update-id").value;
    const name = document.getElementById("update-name").value;
    const email = document.getElementById("update-email").value;

    const response = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (response.ok) {
      alert("Usuario actualizado correctamente");
      hideUpdateForm();
      fetchUsers();
    } else {
      alert("Error al actualizar el usuario");
    }
  });

  document
  .getElementById("form-create")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    const name = document.getElementById("create-name").value;
    const email = document.getElementById("create-email").value;

    // Enviar la solicitud POST al servidor
    const response = await fetch("/api/users/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (response.ok) {
      alert("Usuario creado correctamente");
      document.getElementById("form-create").reset(); // Limpiar el formulario
      fetchUsers(); // Actualizar la lista de usuarios
    } else {
      alert("Error al crear el usuario");
    }
  });


document.addEventListener("DOMContentLoaded", fetchUsers);
