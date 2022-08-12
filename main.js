//DARK MODE
const body = document.querySelector('body'),
sidebar = body.querySelector('nav'),
toggle = body.querySelector(".toggle"),
searchBtn = body.querySelector(".search-box"),
modeSwitch = body.querySelector(".toggle-switch"),
modeText = body.querySelector(".mode-text");


toggle.addEventListener("click" , () =>{
sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click" , () =>{
sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click" , () =>{
body.classList.toggle("dark");

if(body.classList.contains("dark")){
  modeText.innerText = "Light mode";
}else{
  modeText.innerText = "Dark mode";
  
}
});

var selectedRow = null;
document.formulario.titulo.focus();

//MOSTRAR ALERTS
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3500);
}

//LIMPIAR LOS IMPUTS
function clearFields(){
    document.querySelector("#titulo").value = "";
    document.querySelector("#descripcion").value = "";
    document.querySelector("#categoria").value = "";
}

//AGREGAR NUEVO INPUT
document.querySelector("#formulario").addEventListener("submit", (e) =>{
    e.preventDefault();

    //OBTENER VALORES DEL FORMULARIO
    const titulo = document.querySelector("#titulo").value;
    const descripcion = document.querySelector("#descripcion").value;
    const categoria = document.querySelector("#categoria").value;

    //VALIDACION DE DATOS
    if(titulo == "" || descripcion == "" || categoria == ""){
        showAlert("Llenar el formulario", "danger");
    }
    else{
        if(selectedRow == null){
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${titulo}</td>
            <td>${descripcion}</td>
            <td>${categoria}</td>
            <td>
                <a accesskey="v" href="#" class="btn btn-primary btn-sm edit">Editar</a>
                <a accesskey="x" href="#" class="btn btn-danger btn-sm delete">Eliminar</a>
            </td>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Registro Agregado", "success");
        }
        else{
            selectedRow.children[0].textContent = titulo;
            selectedRow.children[1].textContent = descripcion;
            selectedRow.children[2].textContent = categoria;
            selectedRow = null;
            showAlert("Registro Editado", "info");
        }
        clearFields();
        document.formulario.titulo.focus();
    }
});

//EDITAR REGISTRO
document.querySelector("#student-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#titulo").value = selectedRow.children[0].textContent;
        document.querySelector("#descripcion").value = selectedRow.children[1].textContent;
        document.querySelector("#categoria").value = selectedRow.children[2].textContent;
    }
})

//ELIMINAR REGISTRO
document.querySelector("#student-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Registro Eliminado", "danger");
    }
    document.formulario.titulo.focus();
})

//funcion buscar
function doSearch() {
    var tableReg = document.getElementById('regTable');
    var searchText = document.getElementById('searchTerm').value.toLowerCase();
    for (var i = 1; i < tableReg.rows.length; i++) {
        var cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        var found = false;
        for (var j = 0; j < cellsOfRow.length && !found; j++) {
            var compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1)) {
                found = true;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = '';
        } else {
            tableReg.rows[i].style.display = 'none';
        }
    }
}