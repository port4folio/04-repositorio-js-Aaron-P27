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

let btnEditar = document.getElementById("btnEditar");
btnEditar.addEventListener("click", editarTareaGlobal);

function editarTareaGlobal() {
    if (tareaSeleccionada === null) {
        Swal.fire("Aviso", "Por favor, haz clic en una tarea de la lista primero para seleccionarla.", "info");
        return;
    }

    Swal.fire({
        title: 'Editar tarea seleccionada',
        input: 'text',
        inputValue: tareas[tareaSeleccionada], 
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        inputValidator: (valor) => {
            if (!valor.trim()) {
                return '¡La tarea no puede estar vacía!';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            tareas[tareaSeleccionada] = result.value.trim(); 
            listarTareas(tareas); 
            Swal.fire('¡Actualizado!', 'La tarea ha sido modificada.', 'success');
        }
    });
}

let btnBorrar = document.getElementById("btnBorrar");
btnBorrar.addEventListener("click", borrarTareaGlobal);

function borrarTareaGlobal() {
    let tareaABorrar = document.getElementById("txtTarea").value.trim();

    if (tareaABorrar !== "") {
        let index = tareas.indexOf(tareaABorrar);
        if (index !== -1) {
            ejecutarBorrado(index);
            document.getElementById("txtTarea").value = "";
        } else {
            Swal.fire("Error", "No se encontró ninguna tarea con ese nombre exacto", "error");
        }
        return;
    }

    if (tareaSeleccionada !== null) {
        ejecutarBorrado(tareaSeleccionada);
    } else {
        Swal.fire("Aviso", "Escribe el nombre de una tarea o haz clic en una de la lista para borrarla.", "info");
    }
}

function ejecutarBorrado(index) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: `Vas a eliminar: "${tareas[index]}"`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            tareas.splice(index, 1); 
            listarTareas(tareas); 
            Swal.fire('¡Eliminado!', 'La tarea ha sido borrada.', 'success');
        }
    });
}