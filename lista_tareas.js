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