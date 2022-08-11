//Dark Mode
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

//Evento para crear un nuevo registro
document.getElementById("formulario").addEventListener("submit",crear);

//funcion crear
function crear(e){
    titulo = document.getElementById("titulo").value
    descripcion = document.getElementById("descripcion").value
    categoria = document.getElementById("categoria").value

    let libro = {
        titulo,
        descripcion,
        categoria
    }

if(localStorage.getItem("Libros") === null){
    let libros = []
    libros.push(libro)
    localStorage.setItem("Libros",JSON.stringify(libros))
}else{
    let libros = JSON.parse(localStorage.getItem("Libros"))
    libros.push(libro)
    localStorage.setItem("Libros",JSON.stringify(libros))
}
leer();
document.getElementById("formulario").reset();
console.log("Libro Guardado Correctamente")
e.preventDefault()
}

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

//Funcion leer
function leer(){
    let libros = JSON.parse(localStorage.getItem("Libros"));
    document.getElementById("tbody").innerHTML = "";
    for(let i=0; i<libros.length; i++){
        let titulo = libros[i].titulo
        let descripcion = libros[i].descripcion
        let categoria = libros[i].categoria

        document.getElementById("tbody").innerHTML +=
        `<tr>
            <td>${titulo}</td>
            <td>${descripcion}</td>
            <td>${categoria}</td>
            <td><button onclick="eliminar('${titulo}')" class="btn btn-danger">Eliminar</button></td>
            <td><button onclick="editar('${titulo}')" class="btn btn-primary">Editar</button></td>
        </tr>`
    }
}

//Funcion Editar
function editar(titulo){
    let libros = JSON.parse(localStorage.getItem("Libros"));
    for(let i=0; i<libros.length; i++){
        if(libros[i].titulo === titulo){
            document.getElementById("body").innerHTML = `<div class="row">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-header">
                        <h2>Editar Registro</h2>
                    </div>
                    <div class="card-body">
                        <form id="formulario">
                            <div class="form- mb-3">
                                <input type="text" id="newtitulo" class="form-control" placeholder="${libros[i].titulo}" required>
                            </div>
                            <div class="form- mb-3">
                                <textarea id="newdescripcion" class="form-control" placeholder="${libros[i].descripcion}" required></textarea>
                            </div>
                            <div class="form- mb-3">
                                <select name="" id="newcategoria" class="form-control" required>
                                    <option value="" selected="selected" disabled>Seleccione la Categoria</option>
                                    <option value="Accion">Accion</option>
                                    <option value="Comedia">Comedia</option>
                                    <option value="Deportes">Deportes</option>
                                    <option value="Aventura">Aventura</option>
                                    <option value="Drama">Drama</option>
                                    <option value="Fantasia">Fantasia</option>
                                    <option value="Ciencia Ficcion">Ciencia Ficcion</option>
                                    <option value="Crimen">Crimen</option>
                                    <option value="Romance">Romance</option>
                                    <option value="Misterio">Misterio</option>
                                    <option value="Detectives">Detectives</option>
                                </select>
                        </div>   
                            <button class="btn btn-success" onclick="actualizar('${i}')">Actualizar</button>
                            <button class="btn btn-primary">Cancelar</button>

                        </form>
                    </div>
                </div>`
        }
    }
}

//Funcion Actualizar
function actualizar(i){
    let libros = JSON.parse(localStorage.getItem("Libros"));
    libros[i].titulo = document.getElementById("newtitulo").value;
    libros[i].descripcion = document.getElementById("newdescripcion").value;
    libros[i].categoria = document.getElementById("newcategoria").value;
    localStorage.setItem("Libros",JSON.stringify(libros));
}

//Funcion Eliminar
function eliminar(titulo){
    let libros = JSON.parse(localStorage.getItem("Libros"));
    for(let i=0; i<libros.length; i++){
        if(libros[i].titulo === titulo){
            libros.splice(i,1);
        }
    }

    localStorage.setItem("Libros",JSON.stringify(libros));
    leer();
}

leer()