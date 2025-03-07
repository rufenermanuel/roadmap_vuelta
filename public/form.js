document.addEventListener("DOMContentLoaded", () => {
  // Función para obtener y renderizar los usuarios en la tabla
  async function fetchUsers() {
    const response = await fetch("/api/users"); // Obtener usuarios del backend
    const users = await response.json();

    const userTable = document.getElementById("users"); // Tabla de usuarios
    userTable.innerHTML = ""; // Limpiar la tabla existente

    users.forEach((user) => {
      const row = document.createElement("tr"); // Crear una fila

      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
          <button onclick="deleteUser(${user.id})" style="background-color: #d50000; color: white; border: none; padding: 5px; border-radius: 4px;">Eliminar</button>
          <button onclick='showUpdateForm(${JSON.stringify(user)})' style="background-color: #0056b3; color: white; border: none; padding: 5px; border-radius: 4px;">Actualizar</button>
        </td>
      `;

      userTable.appendChild(row); // Agregar fila a la tabla
    });
  }

  // Función para eliminar un usuario
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

  // Mostrar el formulario de actualización con los datos del usuario
  function showUpdateForm(user) {
    document.getElementById("update-id").value = user.id;
    document.getElementById("update-name").value = user.name;
    document.getElementById("update-email").value = user.email;

    document.getElementById("update-form").style.display = "block";
  }

  // Ocultar el formulario de actualización
  function hideUpdateForm() {
    document.getElementById("update-form").style.display = "none";
  }

  // Manejador del formulario de actualización
  const formUpdate = document.getElementById("update-form");
  if (formUpdate) {
    formUpdate.addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevenir recarga de la página
  
      const id = document.getElementById("update-id").value;
      const name = document.getElementById("update-name").value;
      const email = document.getElementById("update-email").value;
  
      // Verificar que los datos se están obteniendo correctamente
      console.log("Datos a enviar:", { id, name, email });
  
      // Enviar la solicitud PUT al backend
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
  
      if (response.ok) {
        alert("Usuario actualizado correctamente");
        hideUpdateForm(); // Ocultar el formulario después de actualizar
        fetchUsers(); // Actualizar la lista de usuarios
      } else {
        alert("Error al actualizar el usuario");
      }
    });
  }
  

  // Manejador del formulario de creación
  const formCreate = document.getElementById("form-create");
  if (formCreate) {
    formCreate.addEventListener("submit", async function (event) {
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
  }

  // Exponer funciones globales
  window.deleteUser = deleteUser;
  window.showUpdateForm = showUpdateForm;

  // Cargar los usuarios al iniciar
  fetchUsers();
});
