window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
    if (localStorage.getItem("token")) {
            headers = {
                headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            } 
        }
        loadPokemon();
    } else { 
        window.location.href = "index.html"
    }
}

function loadPokemon() {
    axios.get(url + "/poke_empleados", headers)
    .then(function(res) { 
        console.log(res);
        displayPokemon(res.data.message);
    }).catch(function(err) {
        console.log(err);
    })
}


const agregar_contenedor = document.getElementById('container_agregar');
const editar_contenedor = document.getElementById('container_editar');
const eliminar_contenedor = document.getElementById('container_eliminar');
const agregar_popup_titulo = document.getElementById('agregar_popup_titulo');


const input_name = document.getElementById('input_name');
const input_last_name = document.getElementById('input_last_name');
const input_address = document.getElementById('input_address');
const input_phone_number = document.getElementById('input_phone_number');
const input_mail = document.getElementById('input_mail');
const input_password = document.getElementById('input_password');

function abrirAgregar() {
    agregar_contenedor.classList.add("active");
    agregar_popup_titulo.textContent = "Agregar nuevo empleado.";

    input_name.textContent = "";
    input_last_name.textContent = "";
    input_address.textContent = "";
    input_phone_number.textContent = "";
    input_mail.textContent = "";
    input_password.textContent = "";

}
function abrirEditar(id) {
    var empleado = pokemon[id];
    agregar_contenedor.classList.add("active");
    agregar_popup_titulo.textContent = `Editar ${empleado}.`;

    input_name.textContent = empleado.nombre;
    input_last_name.textContent = empleado.apellido;
    input_address.textContent = empleado.direccion;
    input_phone_number.textContent = empleado.telefono;
    input_mail.textContent = empleado.correo;
    input_password.textContent = empleado.password;


}
function abrirEliminar() {
    eliminar_contenedor.classList.add("active");
}

function cerrarDialogos() {
    // var dialogo = document.querySelector("popup-container");
    // dialogo.classList.remove("active");
    const dialogs = document.getElementsByClassName("popup-container");
    for (var dialog of dialogs) { 
        console.log(dialog);
        console.log(dialog.classList);
        dialog.classList.remove("active");
    }
}

function displayPokemon(pokemon) {
    var body = document.querySelector("body");
    console.log(pokemon);
    for(var i = 0; i < pokemon.length; i++) {
        // body.innerHTML += `<h3>${pokemon[i].pok_name}</h3>`;
        tabla_datos.appendChild(generarFila(pokemon[i]));
    }
}

function generarFila(admon) {
    var row = document.createElement("tr");
    row.className = "table_rowcontent";
    row.appendChild(generarColumna(admon.nombre));
    row.appendChild(generarColumna(admon.apellido));
    row.appendChild(generarColumna(admon.correo));
    row.appendChild(generarColumna(admon.direccion));
    row.appendChild(generarColumna(admon.telefono));
    row.appendChild(generarBotones(admon.id));
    row.id = admon.id;
    return row;
}
function generarColumna(texto) {
    var column = document.createElement("td");
    column.textContent = texto;
    return column;
}
function generarBotones(id) {
    var column = document.createElement("td");
    column.appendChild(generarBotonEditar(id));
    column.appendChild(generarBotonEliminar(id));
    return column;
}
function generarBotonEditar(id) {
    var boton = document.createElement("button");
    var span = document.createElement("span");
    span.className = "far fa-edit";
    boton.appendChild(span);
    boton.addEventListener('click', () => {
        abrirEditar(id);
    });
    return boton;
}
function generarBotonEliminar(id) {
    var boton = document.createElement("button");
    var span = document.createElement("span");
    span.className = "far fa-trash-alt";
    boton.appendChild(span);
    boton.addEventListener('click', () => {
        abrirEliminar();
    });
    return boton;
}
function editar_OnClick(e) {
    //window.open(listClases[e.path[1].id].enlace);
}
function eliminar_OnClick(e) {
    //window.open(listClases[e.path[1].id].enlace);

}

// const open = document.getElementById('open');
// const close = document.getElementById('close');
// const container = document.getElementById('container');

// open.addEventListener('click', () => {
// 	container.classList.add("active");
// });

// close.addEventListener('click', () => {
// 	container.classList.remove("active");
// });