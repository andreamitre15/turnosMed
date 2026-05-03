// Cargar turnos desde archivo JSON
let turnos = [];

async function cargarTurnos() {
  const response = await fetch("turnos.json");
  turnos = await response.json();
  mostrarTurnos();
}

// Mostrar turnos en pantalla
function mostrarTurnos() {
  const lista = document.getElementById("listaTurnos");
  lista.innerHTML = "";
  turnos.forEach(t => {
    const li = document.createElement("li");
    li.textContent = `${t.nombre} - ${t.especialidad} - ${t.fecha}`;
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

  // Notificación con SweetAlert
  Swal.fire({
    title: "Turno reservado",
    text: `Paciente: ${nombre}\nEspecialidad: ${especialidad}\nFecha: ${fecha}`,
    icon: "success",
    confirmButtonText: "OK"
  });

  // Resetear formulario
  e.target.reset();
});

// Inicializar
cargarTurnos();
