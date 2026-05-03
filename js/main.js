let turnos = [];

// 🔹 Leer primero desde LocalStorage
const turnosGuardados = JSON.parse(localStorage.getItem("turnos")) || [];

// 🔹 Si no hay nada en LocalStorage, cargar desde JSON
async function cargarTurnos() {
  if (turnosGuardados.length > 0) {
    turnos = turnosGuardados;
    mostrarTurnos();
  } else {
    const response = await fetch("turnos.json");
    turnos = await response.json();
    mostrarTurnos();
    // Guardar los iniciales en LocalStorage
    localStorage.setItem("turnos", JSON.stringify(turnos));
  }
}

// Mostrar turnos en pantalla
function mostrarTurnos() {
  const lista = document.getElementById("listaTurnos");
  lista.innerHTML = "";

  turnos.forEach((t, index) => {
    const li = document.createElement("li");
    li.textContent = `${t.nombre} - ${t.especialidad} - ${t.fecha}`;

    // 🔹 Botón de borrar
    const btnBorrar = document.createElement("button");
    btnBorrar.textContent = "Eliminar";
    btnBorrar.style.marginLeft = "10px";
    btnBorrar.style.background = "#e74c3c";
    btnBorrar.style.color = "#fff";
    btnBorrar.style.border = "none";
    btnBorrar.style.padding = "5px 10px";
    btnBorrar.style.borderRadius = "4px";
    btnBorrar.style.cursor = "pointer";

    // Acción al hacer clic
    btnBorrar.addEventListener("click", () => {
      // Eliminar turno del array
      turnos.splice(index, 1);
      // Actualizar LocalStorage
      localStorage.setItem("turnos", JSON.stringify(turnos));
      // Volver a mostrar lista
      mostrarTurnos();

      // Notificación con SweetAlert
      Swal.fire({
        title: "Turno eliminado",
        text: `Se borró el turno de ${t.nombre}`,
        icon: "info",
        confirmButtonText: "OK"
      });
    });

    li.appendChild(btnBorrar);
    lista.appendChild(li);
  });
}


// Manejo del formulario
document.getElementById("formTurno").addEventListener("submit", e => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const especialidad = document.getElementById("especialidad").value;
  const fecha = document.getElementById("fecha").value;

  const nuevoTurno = { nombre, especialidad, fecha };
  turnos.push(nuevoTurno);
  mostrarTurnos();

  // 🔹 Guardar en LocalStorage cada vez que se agrega un turno
  localStorage.setItem("turnos", JSON.stringify(turnos));

  // Notificación con SweetAlert
  Swal.fire({
    title: "Turno reservado",
    text: `Paciente: ${nombre}\nEspecialidad: ${especialidad}\nFecha: ${fecha}`,
    icon: "success",
    confirmButtonText: "OK"
  });

  e.target.reset();
});

// Inicializar
cargarTurnos();
