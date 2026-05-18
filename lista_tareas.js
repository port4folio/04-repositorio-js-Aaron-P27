let tareas = ["Tarea 1", "Tarea 2"];
let listaTareas = document.getElementById("listaTareas");
let tareaSeleccionada = null;

console.log(listaTareas);
listarTareas(tareas);

function listarTareas(t) {
    listaTareas.innerHTML = "";
    tareaSeleccionada = null;

    t.forEach((tarea, index) => {
        let li = document.createElement("li");
        
        li.className = "list-group-item list-group-item-action cursor-pointer";
        li.textContent = tarea;
        li.style.cursor = "pointer";

        li.addEventListener("click", () => {
            
            document.querySelectorAll("#listaTareas li").forEach(el => el.classList.remove("active"));
            
            li.classList.add("active");
            tareaSeleccionada = index;
        });

        listaTareas.appendChild(li);
    });
}

let btnAgregar = document.getElementById("btnAgregar"); 
btnAgregar.addEventListener("click", agregarTarea); 

function agregarTarea() {
    let input = document.getElementById("txtTarea");
    let tarea = input.value.trim(); 
    if (tarea === "") {
        Swal.fire("Oops", "No puedes agregar una tarea vacía", "warning");
        return;
    }
    tareas.push(tarea); 
    listarTareas(tareas);
    input.value = ""; 
}

let btnBuscar = document.getElementById("btnBuscar"); 
btnBuscar.addEventListener("click", buscarTarea);

function buscarTarea() {
    let tareaBuscada = document.getElementById("txtTarea").value.trim();

    if (tareaBuscada == "") {
        listarTareas(tareas);
    } else {
        let tareasEncontradas = tareas.filter((tarea) => tarea.toLowerCase().includes(tareaBuscada.toLowerCase()));

        if (tareasEncontradas.length > 0) {
            listarTareas(tareasEncontradas);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops",
                text: "No se encontraron tareas que coincidan",
            });
        }
    }
}

let modalEditar = new bootstrap.Modal(document.getElementById("modalEditar"));
let btnEditar = document.getElementById("btnEditar");
btnEditar.addEventListener("click", buscarTareaEditar);
let i = 0;
function buscarTareaEditar() {
  let tarea_buscada = document.getElementById("txtTarea").value;
  i = tareas.findIndex((tarea)=> tarea == tarea_buscada);
  if (i == -1){
    Swal.fire({
      icon:"error",
      title:"Oops...",
      text: "No se encontraron tareas",
      footer:""
    });
  }

  else {
    let tituloModal = document.getElementById("modalEditarLabel");
    tituloModal.textContent = "Editando" + tareas[i];
    modalEditar.show();
  }
}

let btnGuardar = document.getElementById("btnGuardar");
btnGuardar.addEventListener("click", guardarTarea);
function guardarTarea() {
  let tarea_nueva = document.getElementById("tarea_nueva").value;
  modalEditar.hide();
  tareas[i] = tarea_nueva;
  listarTareas(tareas);
}

let modalEliminar = new bootstrap.Modal(
  document.getElementById("modalEliminar"))
  let btnEliminar = document.getElementById("btnEliminar");
  btnEliminar.addEventListener("click", eliminarTarea);
  function eliminarTarea() {
    let tarea_buscada = document.getElementById("txtTarea").value;
    i = tareas.findIndex((tarea) => tarea == tarea_buscada);
    if ( i == -1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se encuentr la tarea para eliminar",
        footer: "",
      })
    } else {
      let tituloModal = document.getElementById("modalEliminarLabel");
      tituloModal.textContent = "Eliminando" + tareas[i]
      modalEliminar.show();
    }
  }

  let btnDelete= document.getElementById("btnDelete")
  btnDelete.addEventListener("click", deleteTarea)
  function deleteTarea(){
      modalEliminar.hide();
      tareas=tareas.filter(t=>t != tareas[i]);
      listarTareas(tareas)
  }

