let tareas = ["Tarea 1", "Tarea 2"];
let listaTareas = document.getElementById("listaTareas");
console.log(listaTareas);
listarTareas(tareas);

function listarTareas(t) {
    listaTareas.innerHTML = "";
    t.forEach(tarea => {
      li=document.createElement("li");
      li.textContent = tarea;
      listaTareas.appendChild(li);
      li.className = "list-group-item";
    });
}

let btnAgregar = document.getElementById("btnAgregar"); //captura el boton
btnAgregar.addEventListener("click", agregarTarea); //agrega el evento click

function agregarTarea() {
  //funcion para agregar tarea
  let tarea = document.getElementById("txtTarea").value; //captura el valor del input tarea
  tareas.push(tarea); //agrega la tarea al arreglo de tareas
  listarTareas(tareas) //llama a la funcion listarTareas para mostrarlas
}

let btnBuscar = document.getElementById("btnBuscar"); //captura boton
btnBuscar.addEventListener("click", buscarTarea);

function buscarTarea() {
  let tareaBuscada = document.getElementById("txtTarea").value;

  if (tareaBuscada == "") {
    listarTareas(tareas);
  } else {
    tareasEncontradas = tareas.filter((tarea) => tarea == tareaBuscada);

      if (tareasEncontradas.length > 0) {
        listarTareas(tareasEncontradas);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: "No se encontraron tareas",
          footer: ""
      });
    }
  }
}
